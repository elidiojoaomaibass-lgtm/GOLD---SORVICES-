-- Reset Schemas (Cuidado: Isso limpa as políticas antigas para recriar corretamente)
-- Não deletamos as tabelas para não perder dados, apenas as políticas de segurança.

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Tables (IF NOT EXISTS garante que não dê erro se já existirem)
CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  link TEXT NOT NULL,
  button_text TEXT NOT NULL,
  type TEXT DEFAULT 'image',
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS promos (
  id TEXT PRIMARY KEY, -- 'top' or 'bottom'
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

-- 3. Reset Policies (Remove old policies to avoid "already exists" error)
DROP POLICY IF EXISTS "Public read access for banners" ON banners;
DROP POLICY IF EXISTS "Admins can insert banners" ON banners;
DROP POLICY IF EXISTS "Admins can update banners" ON banners;
DROP POLICY IF EXISTS "Admins can delete banners" ON banners;

DROP POLICY IF EXISTS "Public read access for videos" ON videos;
DROP POLICY IF EXISTS "Admins can insert videos" ON videos;
DROP POLICY IF EXISTS "Admins can update videos" ON videos;
DROP POLICY IF EXISTS "Admins can delete videos" ON videos;

DROP POLICY IF EXISTS "Public read access for notices" ON notices;
DROP POLICY IF EXISTS "Admins can insert notices" ON notices;
DROP POLICY IF EXISTS "Admins can update notices" ON notices;
DROP POLICY IF EXISTS "Admins can delete notices" ON notices;

DROP POLICY IF EXISTS "Public read access for promos" ON promos;
DROP POLICY IF EXISTS "Admins can insert promos" ON promos;
DROP POLICY IF EXISTS "Admins can update promos" ON promos;
DROP POLICY IF EXISTS "Admins can delete promos" ON promos;

DROP POLICY IF EXISTS "Admins can read admins" ON admins;

-- 4. Enable RLS
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 5. Helper function for admin check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE user_id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Recreate Policies

-- Banners
CREATE POLICY "Public read access for banners" ON banners FOR SELECT USING (true);
CREATE POLICY "Admins can insert banners" ON banners FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update banners" ON banners FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete banners" ON banners FOR DELETE USING (is_admin());

-- Videos
CREATE POLICY "Public read access for videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Admins can insert videos" ON videos FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update videos" ON videos FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete videos" ON videos FOR DELETE USING (is_admin());

-- Notices
CREATE POLICY "Public read access for notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Admins can insert notices" ON notices FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update notices" ON notices FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete notices" ON notices FOR DELETE USING (is_admin());

-- Promos
CREATE POLICY "Public read access for promos" ON promos FOR SELECT USING (true);
CREATE POLICY "Admins can insert promos" ON promos FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update promos" ON promos FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete promos" ON promos FOR DELETE USING (is_admin());

-- Admins
CREATE POLICY "Admins can read admins" ON admins FOR SELECT USING (is_admin());
