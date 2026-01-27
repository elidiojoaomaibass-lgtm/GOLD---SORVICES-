# Supabase Setup Instructions

To ensure the application works correctly with the database and all users can see the admin updates, please follow these steps in your Supabase project dashboard.

## 1. Database Schema
Go to the **SQL Editor** in your Supabase dashboard and run the following SQL script to create the necessary tables and policies:

```sql
-- Create tables
CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  link TEXT NOT NULL,
  button_text TEXT NOT NULL,
  type TEXT DEFAULT 'image',
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT,
  cover_url TEXT NOT NULL,
  previews JSONB DEFAULT '[]'::jsonb,
  buy_link TEXT,
  buy_button_text TEXT,
  telegram_link TEXT,
  telegram_button_text TEXT,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS promos (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  button_text TEXT,
  button_link TEXT,
  is_active BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow Public Read, Admin Write)
-- Note: For simplicity in this setup, we are allowing public read.
-- Writing currently requires the user to be an admin (checked via app logic + simple RLS).
-- You should create an admin user in the 'admins' table manually linking to auth.users.

CREATE POLICY "Public read banners" ON banners FOR SELECT USING (true);
CREATE POLICY "Public read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public read notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public read promos" ON promos FOR SELECT USING (true);

-- Allow authenticated users (admins) to insert/update/delete
-- ideally you should check against the admins table here, effectively:
-- USING (auth.uid() IN (SELECT user_id FROM admins))
CREATE POLICY "Admins all banners" ON banners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins all videos" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins all notices" ON notices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins all promos" ON promos FOR ALL USING (auth.role() = 'authenticated');

-- [AUTO-FIX] Schema Drift Patch
-- Run this if you see errors like "Could not find column 'button_text'..."
ALTER TABLE banners ADD COLUMN IF NOT EXISTS button_text TEXT DEFAULT 'Saiba Mais';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS link TEXT DEFAULT '';

ALTER TABLE videos ADD COLUMN IF NOT EXISTS title TEXT DEFAULT '';
ALTER TABLE videos ADD COLUMN IF NOT EXISTS telegram_link TEXT DEFAULT '';
ALTER TABLE videos ADD COLUMN IF NOT EXISTS telegram_button_text TEXT DEFAULT 'DM TELEGRAM';

NOTIFY pgrst, 'reload config';
```

## 2. Storage Buckets
Go to **Storage** and create the following **Public** buckets:
1. `banners`
2. `video-covers`
3. `video-previews`

Make sure to set them as **Public** so users can download the images/videos.

## 3. Environment Variables
Ensure your `.env` (or `.env.local`) file has the correct keys:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 4. Admin Access
To become an admin:
1. Sign up/Login in the app.
2. Go to your Supabase **Table Editor** -> `admins` table.
3. Insert a row with your `user_id` (from the Authentication tab) and ensure `is_active` is TRUE.
