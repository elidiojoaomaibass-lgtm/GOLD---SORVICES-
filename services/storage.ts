
import { Banner, VideoCard, PromoCard, Notice } from '../types';
import { supabase } from './supabase';

const BANNERS_KEY = 'vh_banners';
const VIDEOS_KEY = 'vh_videos';
const PROMO_KEY = 'vh_promo';
const BOTTOM_PROMO_KEY = 'vh_bottom_promo';
const NOTICES_KEY = 'vh_notices';

// Dados vazios para produção
const DEFAULT_BANNERS: Banner[] = [];
const DEFAULT_VIDEOS: VideoCard[] = [];
const DEFAULT_NOTICES: Notice[] = [];

const DEFAULT_PROMO: PromoCard = {
  title: '',
  description: '',
  buttonText: '',
  buttonLink: '',
  isActive: false
};

const DEFAULT_BOTTOM_PROMO: PromoCard = {
  title: '',
  description: '',
  buttonText: '',
  buttonLink: '',
  isActive: false
};

const safeSaveLocal = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[Storage] Storage limit exceeded for ${key}.`);
  }
};

export const storageService = {
  // ========== BANNERS ==========
  getBanners: async (): Promise<Banner[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('banners').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    const data = localStorage.getItem(BANNERS_KEY);
    return data ? JSON.parse(data) : DEFAULT_BANNERS;
  },

  saveBanners: async (banners: Banner[]) => {
    safeSaveLocal(BANNERS_KEY, banners);
    if (supabase) {
      try {
        await supabase.from('banners').delete().neq('id', '0');
        const payload = banners.map((b, idx) => ({ ...b, sort_order: idx }));
        await supabase.from('banners').insert(payload);
      } catch (err) {
        console.error("Error saving banners:", err);
      }
    }
  },

  deleteBanner: async (id: string) => {
    // 1. Atualizar LocalStorage
    const current = JSON.parse(localStorage.getItem(BANNERS_KEY) || '[]');
    const updated = current.filter((b: any) => b.id !== id);
    safeSaveLocal(BANNERS_KEY, updated);

    // 2. Atualizar Supabase
    if (supabase) {
      try {
        await supabase.from('banners').delete().eq('id', id);
      } catch (err) {
        console.error("Error deleting banner:", err);
      }
    }
  },

  updateBanner: async (banner: Banner) => {
    // 1. Atualizar LocalStorage
    const current = JSON.parse(localStorage.getItem(BANNERS_KEY) || '[]');
    const updated = current.map((b: any) => b.id === banner.id ? banner : b);
    safeSaveLocal(BANNERS_KEY, updated);

    // 2. Atualizar Supabase
    if (supabase) {
      try {
        await supabase.from('banners').upsert(banner);
      } catch (err) {
        console.error("Error updating banner:", err);
      }
    }
  },

  // ========== VIDEOS ==========
  getVideos: async (): Promise<VideoCard[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('videos').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    const data = localStorage.getItem(VIDEOS_KEY);
    return data ? JSON.parse(data) : DEFAULT_VIDEOS;
  },

  saveVideos: async (videos: VideoCard[]) => {
    safeSaveLocal(VIDEOS_KEY, videos);
    if (supabase) {
      try {
        await supabase.from('videos').delete().neq('id', '0');
        const payload = videos.map((v, idx) => ({ ...v, sort_order: idx }));
        await supabase.from('videos').insert(payload);
      } catch (err) {
        console.error("Error saving videos:", err);
      }
    }
  },

  deleteVideo: async (id: string) => {
    // 1. Atualizar LocalStorage
    const current = JSON.parse(localStorage.getItem(VIDEOS_KEY) || '[]');
    const updated = current.filter((v: any) => v.id !== id);
    safeSaveLocal(VIDEOS_KEY, updated);

    if (supabase) {
      try {
        await supabase.from('videos').delete().eq('id', id);
      } catch (err) {
        console.error("Error deleting video:", err);
      }
    }
  },

  updateVideo: async (video: VideoCard) => {
    // 1. Atualizar LocalStorage
    const current = JSON.parse(localStorage.getItem(VIDEOS_KEY) || '[]');
    const updated = current.map((v: any) => v.id === video.id ? video : v);
    safeSaveLocal(VIDEOS_KEY, updated);

    if (supabase) {
      try {
        await supabase.from('videos').upsert(video);
      } catch (err) {
        console.error("Error updating video:", err);
      }
    }
  },

  // ========== NOTICES ==========
  getNotices: async (): Promise<Notice[]> => {
    if (supabase) {
      const { data, error } = await supabase.from('notices').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    const data = localStorage.getItem(NOTICES_KEY);
    return data ? JSON.parse(data) : DEFAULT_NOTICES;
  },

  saveNotices: async (notices: Notice[]) => {
    safeSaveLocal(NOTICES_KEY, notices);
    if (supabase) {
      try {
        await supabase.from('notices').delete().neq('id', '0');
        const payload = notices.map((n, idx) => ({ ...n, sort_order: idx }));
        await supabase.from('notices').insert(payload);
      } catch (err) {
        console.error("Error saving notices:", err);
      }
    }
  },

  deleteNotice: async (id: string) => {
    // 1. Atualizar LocalStorage
    const current = JSON.parse(localStorage.getItem(NOTICES_KEY) || '[]');
    const updated = current.filter((n: any) => n.id !== id);
    safeSaveLocal(NOTICES_KEY, updated);

    if (supabase) {
      try {
        await supabase.from('notices').delete().eq('id', id);
      } catch (err) {
        console.error("Error deleting notice:", err);
      }
    }
  },

  updateNotice: async (notice: Notice) => {
    // 1. Atualizar LocalStorage
    const current = JSON.parse(localStorage.getItem(NOTICES_KEY) || '[]');
    const updated = current.map((n: any) => n.id === notice.id ? notice : n);
    safeSaveLocal(NOTICES_KEY, updated);

    if (supabase) {
      try {
        await supabase.from('notices').upsert(notice);
      } catch (err) {
        console.error("Error updating notice:", err);
      }
    }
  },

  // ========== PROMO CARDS ==========
  // ========== PROMO CARDS ==========
  // ========== PROMO CARDS ==========
  getPromoCard: async (): Promise<PromoCard> => {
    // PRIORIDADE TOTAL AO LOCALSTORAGE PARA EVITAR PERDA DE DADOS
    try {
      const stored = localStorage.getItem(PROMO_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Se tiver dados válidos locais, retorna eles e ignora o banco na inicialização
        if (parsed && (parsed.title || parsed.isActive)) {
          return parsed;
        }
      }
    } catch(e) {}

    // Só busca no banco se não tiver nada local
    if (supabase) {
      const { data, error } = await supabase.from('promos').select('*').eq('id', 'top').single();
      if (!error && data) return data;
    }
    
    return DEFAULT_PROMO;
  },

  savePromoCard: async (promo: PromoCard) => {
    safeSaveLocal(PROMO_KEY, promo);
    if (supabase) {
      const { error } = await supabase.from('promos').upsert({ ...promo, id: 'top' });
      if (error) console.error("Erro CRITICO ao salvar Promo Top no Supabase:", error);
    }
  },

  getBottomPromoCard: async (): Promise<PromoCard> => {
    // PRIORIDADE TOTAL AO LOCALSTORAGE
    try {
      const stored = localStorage.getItem(BOTTOM_PROMO_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.title || parsed.isActive)) {
          return parsed;
        }
      }
    } catch(e) {}

    if (supabase) {
      const { data, error } = await supabase.from('promos').select('*').eq('id', 'bottom').single();
      if (!error && data) return data;
    }
    
    return DEFAULT_BOTTOM_PROMO;
  },

  saveBottomPromoCard: async (promo: PromoCard) => {
    safeSaveLocal(BOTTOM_PROMO_KEY, promo);
    if (supabase) {
      const { error } = await supabase.from('promos').upsert({ ...promo, id: 'bottom' });
      if (error) console.error("Erro CRITICO ao salvar Promo Bottom no Supabase:", error);
    }
  },

  // ========== REALTIME SYNC ==========
  subscribeToChanges: (callbacks: {
    onBannersChange?: (banners: Banner[]) => void;
    onVideosChange?: (videos: VideoCard[]) => void;
    onNoticesChange?: (notices: Notice[]) => void;
    onPromosChange?: () => void;
  }) => {
    if (!supabase) return () => {};

    const channels: any[] = [];

    // Subscribe to banners changes
    if (callbacks.onBannersChange) {
      const bannersChannel = supabase
        .channel('banners-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'banners' }, async () => {
          const { data } = await supabase.from('banners').select('*').order('sort_order', { ascending: true });
          if (data) {
            safeSaveLocal(BANNERS_KEY, data);
            callbacks.onBannersChange!(data);
          }
        })
        .subscribe();
      channels.push(bannersChannel);
    }

    // Subscribe to videos changes
    if (callbacks.onVideosChange) {
      const videosChannel = supabase
        .channel('videos-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, async () => {
          const { data } = await supabase.from('videos').select('*').order('sort_order', { ascending: true });
          if (data) {
            safeSaveLocal(VIDEOS_KEY, data);
            callbacks.onVideosChange!(data);
          }
        })
        .subscribe();
      channels.push(videosChannel);
    }

    // Subscribe to notices changes
    if (callbacks.onNoticesChange) {
      const noticesChannel = supabase
        .channel('notices-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, async () => {
          const { data } = await supabase.from('notices').select('*').order('sort_order', { ascending: true });
          if (data) {
            safeSaveLocal(NOTICES_KEY, data);
            callbacks.onNoticesChange!(data);
          }
        })
        .subscribe();
      channels.push(noticesChannel);
    }

    // Subscribe to promos changes
    if (callbacks.onPromosChange) {
      const promosChannel = supabase
        .channel('promos-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'promos' }, () => {
          callbacks.onPromosChange!();
        })
        .subscribe();
      channels.push(promosChannel);
    }

    // Return cleanup function
    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }
};
