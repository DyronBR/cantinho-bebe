import React, { useState, useEffect, useCallback } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

type Newsletter = {
    id: string;
    email: string;
    created_at: string | null;
    status?: string | null;
    };

    interface Props {
    supabase: SupabaseClient;
    }

    const NewsletterTab: React.FC<Props> = ({ supabase }) => {
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 10;

    const fetchNewsletters = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
        let query = supabase
            .from('newsletters')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        if (searchTerm.trim()) {
            query = query.ilike('email', `%${searchTerm.trim()}%`) as any;
        }

        const from = (currentPage - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        const { data, error, count } = await query.range(from, to);

        if (error) throw error;

        setNewsletters(data || []);
        setTotalPages(count ? Math.ceil(count / PAGE_SIZE) : 0);
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }, [supabase, searchTerm, currentPage]);

    useEffect(() => {
        fetchNewsletters();
    }, [fetchNewsletters]);

    const handleExport = async () => {
        try {
        let query = supabase
            .from('newsletters')
            .select('*')
            .order('created_at', { ascending: false });

        if (searchTerm.trim()) {
            query = query.ilike('email', `%${searchTerm.trim()}%`) as any;
        }

        const { data, error } = await query;
        if (error) throw error;

        if (!data || data.length === 0) {
            alert('Nenhum dado para exportar.');
            return;
        }

        const headers = ['Email', 'Data de Inscrição', 'Status'];
        const rows = data.map((item: Newsletter) => [
            `"${item.email}"`,
            item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : 'N/A',
            item.status || 'Ativo'
        ]);

        const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `newsletters_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        } catch (err: any) {
        alert(`Erro ao exportar: ${err.message}`);
        }
    };

    const deleteNewsletter = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar este email?')) return;

        try {
        const { error } = await supabase.from('newsletters').delete().eq('id', id);
        if (error) throw error;
        fetchNewsletters();
        } catch (err: any) {
        alert(`Erro ao deletar: ${err.message}`);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] bg-clip-text text-transparent">
            Emails da Newsletter
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button
            onClick={handleExport}
            className="bg-[#87CEEB] hover:bg-[#87CEEB]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
            >
            Exportar para CSV
            </button>
            <input
            type="text"
            placeholder="Buscar por email..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB6D9] focus:border-transparent"
            />
        </div>

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            </div>
        )}

        {loading ? (
            <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A5D9]"></div>
            </div>
        ) : (
            <>
            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-[#FFB6D9]">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                        Data de Inscrição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                        Ações
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {newsletters.map((newsletter) => (
                    <tr key={newsletter.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {newsletter.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {newsletter.created_at
                            ? new Date(newsletter.created_at).toLocaleDateString('pt-BR')
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {newsletter.status || 'Ativo'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                            onClick={() => deleteNewsletter(newsletter.id)}
                            className="text-red-600 hover:text-red-900 font-medium transition-colors"
                        >
                            Deletar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {newsletters.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-lg">
                Nenhum email encontrado.
                </div>
            )}

            {totalPages > 0 && (
                <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#D4A5D9] text-white rounded-lg disabled:opacity-50 hover:bg-[#D4A5D9]/90 transition-colors font-medium disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <span className="text-sm text-gray-700 font-medium">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#D4A5D9] text-white rounded-lg disabled:opacity-50 hover:bg-[#D4A5D9]/90 transition-colors font-medium disabled:cursor-not-allowed"
                >
                    Próxima
                </button>
                </div>
            )}
            </>
        )}
        </div>
    );
};

export default NewsletterTab;