import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Corpo da requisição inválido.',
                    error: 'Invalid JSON body.'
                },
                { status: 400 }
            );
        }

        const { email } = body;

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email é obrigatório.',
                    error: 'Email is required.'
                },
                { status: 400 }
            );
        }

        const trimmedEmail = email.trim().toLowerCase();
        if (trimmedEmail.length === 0 || !/^[\w\-.]+@([\w\-]+\.)+[\w\-]{2,4}$/.test(trimmedEmail)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Formato de email inválido.',
                    error: 'Invalid email format.'
                },
                { status: 400 }
            );
        }

        let supabase;
        try {
            supabase = createSupabaseAdminClient();
        } catch (configErr) {
            console.error('Supabase env vars missing:', configErr);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Serviço indisponível.',
                    error: 'Supabase configuration error.'
                },
                { status: 500 }
            );
        }

        const { data, error } = await supabase
            .from('newsletters')
            .insert({ email: trimmedEmail })
            .select('email')
            .single();

        if (error) {
            console.error('Erro do Supabase:', {
                code: error.code,
                message: error.message,
                details: error.details,
                hint: error.hint,
                email: trimmedEmail
            });

            if (error.code === '23505') {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Este email já está cadastrado na newsletter.',
                        error: 'Email already subscribed.'
                    },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    message: 'Erro ao cadastrar o email. Tente novamente.',
                    error: error.message
                },
                { status: 500 }
            );
        }

        console.log('Inscrição bem-sucedida:', { email: data?.email });

        return NextResponse.json(
            {
                success: true,
                message: 'Inscrito na newsletter com sucesso!'
            },
            { status: 201 }
        );
    } catch (err) {
        console.error('Erro inesperado na API de newsletter:', err);
        return NextResponse.json(
            {
                success: false,
                message: 'Erro interno do servidor.',
                error: err instanceof Error ? err.message : 'Erro desconhecido'
            },
            { status: 500 }
        );
    }
}
