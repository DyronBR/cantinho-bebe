'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase';
  const supabase = createSupabaseClient();

type ConnectionStatus = 'idle' | 'loading' | 'success' | 'error'

export default function TestSupabasePage() {
    const [status, setStatus] = useState<ConnectionStatus>('idle')
    const [message, setMessage] = useState('')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não configurado'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
    ? `${(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string).slice(0, 20)}...`
    : 'Não configurado'

    const testConnection = async () => {
    setStatus('loading')
    setMessage('')

    try {
        const { data, error } = await supabase
        .from('countries')
        .select('id', { count: 'exact', head: true })

        if (error) throw error

        setStatus('success')
        setMessage('Conexão com Supabase estabelecida com sucesso!')
    } catch (error: any) {
        setStatus('error')
        setMessage(`Erro na conexão: ${error.message}`)
    }
    }

    useEffect(() => {
    testConnection()
    }, [])

    return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Teste de Conexão Supabase
        </h1>
        <div className="space-y-6">
            <div>
            <h2 className="text-xl font-semibold mb-4">Informações da Conexão</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL:</label>
                <code className="bg-gray-100 p-3 rounded-lg text-sm block font-mono break-all">
                    {supabaseUrl}
                </code>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chave Anon (truncada):</label>
                <code className="bg-gray-100 p-3 rounded-lg text-sm block font-mono break-all">
                    {supabaseAnonKey}
                </code>
                </div>
            </div>
            </div>

            <div>
            <h2 className="text-xl font-semibold mb-4">Status da Conexão</h2>
            <div
                className={`p-6 rounded-lg border-2 ${
                status === 'success'
                    ? 'bg-green-100 border-green-400 text-green-800'
                    : status === 'error'
                    ? 'bg-red-100 border-red-400 text-red-800'
                    : status === 'loading'
                    ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                    : 'bg-gray-100 border-gray-400 text-gray-800'
                }`}
            >
                <p className="font-semibold text-lg mb-2">
                {status === 'loading'
                    ? 'Testando conexão...'
                    : status === 'success'
                    ? '✅ Sucesso'
                    : status === 'error'
                    ? '❌ Erro'
                    : 'ℹ️ Aguardando teste'}
                </p>
                {message && <p>{message}</p>}
            </div>
            </div>

            <button
            onClick={testConnection}
            disabled={status === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
            {status === 'loading' ? 'Testando...' : '🔄 Testar Conexão Manualmente'}
            </button>
        </div>
        </div>
    </div>
    )
}
