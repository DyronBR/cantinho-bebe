'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase';
import type { FormEvent, ChangeEvent } from 'react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const supabase = useMemo(() => createSupabaseClient(), []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.push('/admin/dashboard');
            }
        });
    }, [router, supabase]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Preencha todos os campos.');
            setLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Email inválido.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Senha deve ter pelo menos 6 caracteres.');
            setLoading(false);
            return;
        }

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
        } else {
            router.push('/admin/dashboard');
        }

        setLoading(false);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFB6D9] via-[#D4A5D9] to-[#87CEEB] p-4 sm:p-8">
            <div className="bg-white/20 backdrop-blur-3xl shadow-2xl rounded-3xl p-8 sm:p-12 max-w-md w-full border border-white/30">
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#FFB6D9] via-[#D4A5D9] to-[#87CEEB] bg-clip-text text-transparent mb-4 drop-shadow-lg">
                        Cantinho do Bebê
                    </h1>
                    <p className="text-xl text-white/90 font-semibold">Login Administrador</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-100 px-4 py-3 rounded-2xl backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-3">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="email"
                            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#FFB6D9]/40 focus:border-[#FFB6D9] transition-all duration-300 text-gray-900 font-medium shadow-lg hover:shadow-xl"
                            placeholder="admin@cantinhodobebe.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-3">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D4A5D9]/40 focus:border-[#D4A5D9] transition-all duration-300 text-gray-900 font-medium shadow-lg hover:shadow-xl"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#FFB6D9] via-[#D4A5D9] to-[#87CEEB] hover:from-[#FF9BCD] hover:via-[#C893C9] hover:to-[#75C2E5] text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Admin'}
                    </button>
                </form>
            </div>
        </div>
    );
}
