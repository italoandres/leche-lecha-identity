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

// Função para buscar progresso do usuário
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Erro ao buscar user_progress:', error);
    return null;
  }

  return data;
}

// Função para marcar leitura como concluída
export async function markReadingComplete(userId: string) {
  const { data, error} = await supabase
    .from('user_progress')
    .update({
      completed_chapter_ids: ['identidade_negociada'],
      last_updated: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao marcar leitura como concluída:', error);
    throw error;
  }

  return data;
}

// Função para marcar/desmarcar capítulo individual
export async function toggleChapterComplete(userId: string, chapterId: string) {
  console.log('🔄 toggleChapterComplete chamado:', { userId, chapterId });
  
  // Buscar progresso atual
  const progress = await getUserProgress(userId);
  if (!progress) {
    console.error('❌ Progresso não encontrado para userId:', userId);
    throw new Error('Progresso não encontrado');
  }

  const currentChapters = progress.completed_chapter_ids || [];
  let updatedChapters: string[];

  // Se já está completo, remove. Se não, adiciona.
  if (currentChapters.includes(chapterId)) {
    updatedChapters = currentChapters.filter(id => id !== chapterId);
    console.log('➖ Removendo capítulo:', chapterId);
  } else {
    updatedChapters = [...currentChapters, chapterId];
    console.log('➕ Adicionando capítulo:', chapterId);
  }

  console.log('📝 Atualizando Supabase:', {
    userId,
    before: currentChapters,
    after: updatedChapters
  });

  // Atualizar no Supabase
  const { data, error } = await supabase
    .from('user_progress')
    .update({
      completed_chapter_ids: updatedChapters,
      last_updated: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('❌ Erro ao atualizar capítulo:', error);
    throw error;
  }

  console.log('✅ Capítulo atualizado com sucesso:', data);
  return data;
}
