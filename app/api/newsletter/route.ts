import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

        // Validação melhorada
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
        if (trimmedEmail.length === 0 || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmedEmail)) {
        return NextResponse.json(
            {
            success: false,
            message: 'Formato de email inválido.',
            error: 'Invalid email format.'
            },
            { status: 400 }
        );
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase env vars missing');
        return NextResponse.json(
            {
            success: false,
            message: 'Serviço indisponível.',
            error: 'Supabase configuration error.'
            },
            { status: 500 }
        );
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        console.log('Tentando inserir email:', trimmedEmail);

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

        // Tratamento específico para UNIQUE constraint (email duplicado)
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
