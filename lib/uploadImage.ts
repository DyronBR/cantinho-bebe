import { createSupabaseClient } from '@/lib/supabase';
  const supabase = createSupabaseClient();

export async function uploadImage(file: File): Promise<string | null> {
  try {
    // Valida tipo de arquivo (apenas imagens)
    if (!file.type.startsWith('image/')) {
      throw new Error('Apenas arquivos de imagem são permitidos.');
    }

    // Valida tamanho máximo (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('O arquivo deve ter no máximo 5MB.');
    }

    // Gera nome único para o arquivo
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${timestamp}-${randomStr}.${extension}`;

    // Faz upload para o bucket 'products'
    const { data, error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

        if (uploadError) {
        throw new Error(`Erro no upload: ${uploadError.message}`);
        }

        // Obtém a URL pública da imagem
        const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);

        return publicUrl;
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        return null;
    }
}
