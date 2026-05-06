import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

/**
 * Remove barra final da URL para evitar caminhos inválidos como
 * "https://xxxx.supabase.co//rest/v1/..." que causam o erro
 * "Invalid path specified in request URL".
 */
const sanitizeUrl = (url: string) => url.replace(/\/+$/, '')

/**
 * Cliente Supabase para browser / componentes client.
 * Usa @supabase/ssr para guardar a sessão em COOKIES — necessário para que
 * o proxy.ts no servidor consiga ler a sessão e proteger /admin/*.
 */
export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Variáveis de ambiente do Supabase não encontradas. Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.')
    }

    return createBrowserClient(sanitizeUrl(supabaseUrl), supabaseAnonKey)
}

/**
 * Cliente Supabase com service role key — só pode ser usado em rotas/handlers do servidor.
 * NUNCA importar este client em código que roda no browser; ele bypass-a RLS.
 */
export const createSupabaseAdminClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Variáveis de ambiente do Supabase admin não encontradas. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.')
    }

    return createClient(sanitizeUrl(supabaseUrl), serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
}
