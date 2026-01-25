import { createClient } from '@supabase/supabase-js';

// Verificar se as variáveis de ambiente estão configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Cliente público (para uso no frontend)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

// Cliente com service role (para uso em API routes)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null as any;

// Tipos TypeScript para user_progress
export interface UserProgress {
  user_id: string;
  journey_entry_point: string;
  onboarding_complete: boolean;
  completed_chapter_ids: string[];
  unlocked_piece_indices: number[];
  reflections: Record<string, any>;
  video_positions: Record<string, number>;
  last_updated: string;
}

// Função para criar/atualizar progresso do usuário
export async function upsertUserProgress(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('user_progress')
    .upsert({
      user_id: userId,
      journey_entry_point: 'web_identidade_negociada',
      onboarding_complete: false,
      completed_chapter_ids: [],
      unlocked_piece_indices: [],
      reflections: {},
      video_positions: {},
      last_updated: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar user_progress:', error);
    throw error;
  }

  return data;
}
