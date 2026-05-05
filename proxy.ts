import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Next.js 16 renomeou middleware para proxy.
 * Protege rotas /admin/* exigindo sessão Supabase válida.
 * Login (/admin/login) fica acessível para usuários não autenticados.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Login page é pública — deixa passar
    if (pathname === '/admin/login') {
        return NextResponse.next()
    }

    const response = NextResponse.next({ request })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        // Se a config falhar em produção, manda pro login para evitar exposição
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    response.cookies.set(name, value, options)
                })
            },
        },
    })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*'],
}
