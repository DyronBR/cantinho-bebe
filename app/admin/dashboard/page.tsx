'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase';
import { uploadImage } from '@/lib/uploadImage';
import NewsletterTab from '@/app/components/admin/NewsletterTab'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

type Category = {
    id: string;
    name: string;
    created_at?: string;
    };

    type Product = {
    id: string;
    name: string;
    short_description: string;
    full_description: string;
    material?: string;
    age?: string;
    colors?: string;
    size?: string;
    washing_instructions?: string;
    image_url?: string;
    category_id: string;
    created_at?: string;
    };

    type ProductForm = Omit<Product, 'id'> & { imageFile?: File };

    const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const supabase = useMemo(() => createSupabaseClient(), []);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [productSearch, setProductSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 10;
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'newsletter'>('products');

    // Modal states for products
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productForm, setProductForm] = useState<ProductForm>({
        name: '',
        short_description: '',
        full_description: '',
        material: '',
        age: '',
        colors: '',
        size: '',
        washing_instructions: '',
        image_url: '',
        category_id: '',
    });
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');

    // Modal states for categories
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [categoryForm, setCategoryForm] = useState({ name: '' });

    // Auth check
    useEffect(() => {
        const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/admin/login');
            return;
        }
        };
        checkAuth();
    }, [router]);

    // Fetch data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
        const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
            supabase.from('products').select('*'),
            supabase.from('categories').select('*'),
        ]);
        setProducts(productsData || []);
        setCategories(categoriesData || []);
        } catch (err) {
        setError('Erro ao carregar dados');
        } finally {
        setLoading(false);
        }
    };

    const handleUploadImage = async () => {
        if (!imageFile) return;
        setUploadingImage(true);
        setUploadMessage('');
        try {
        const url = await uploadImage(imageFile);
        setProductForm({ ...productForm, image_url: url });
        setImagePreview(url);
        setUploadMessage('Imagem enviada com sucesso!');
        } catch (err) {
        setUploadMessage('Erro ao enviar imagem');
        } finally {
        setUploadingImage(false);
        setImageFile(null);
        }
    };

    const validateProductForm = (): string => {
        if (!productForm.name.trim()) return 'Nome é obrigatório';
        if (!productForm.short_description.trim()) return 'Descrição curta é obrigatória';
        if (!productForm.full_description.trim()) return 'Descrição completa é obrigatória';
        if (!productForm.category_id) return 'Categoria é obrigatória';
        return '';
    };

    const handleSaveProduct = async () => {
        const validationError = validateProductForm();
        if (validationError) {
        alert(validationError);
        return;
        }

        setLoading(true);
        try {
        if (editingProduct) {
            const { error } = await supabase
            .from('products')
            .update({
                ...productForm,
                category_id: productForm.category_id,
            })
            .eq('id', editingProduct.id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('products').insert(productForm);
            if (error) throw error;
        }
        setShowProductModal(false);
        setProductForm({
            name: '',
            short_description: '',
            full_description: '',
            material: '',
            age: '',
            colors: '',
            size: '',
            washing_instructions: '',
            image_url: '',
            category_id: '',
        });
        setImagePreview('');
        setUploadMessage('');
        fetchData();
        } catch (err: any) {
        alert(`Erro ao salvar produto: ${err.message}`);
        } finally {
        setLoading(false);
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
        name: product.name,
        short_description: product.short_description,
        full_description: product.full_description,
        material: product.material || '',
        age: product.age || '',
        colors: product.colors || '',
        size: product.size || '',
        washing_instructions: product.washing_instructions || '',
        image_url: product.image_url || '',
        category_id: product.category_id,
        });
        setImagePreview(product.image_url || '');
        setShowProductModal(true);
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Confirma exclusão?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
        alert('Erro ao deletar');
        } else {
        fetchData();
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setProductForm({
        name: '',
        short_description: '',
        full_description: '',
        material: '',
        age: '',
        colors: '',
        size: '',
        washing_instructions: '',
        image_url: '',
        category_id: '',
        });
        setImagePreview('');
        setUploadMessage('');
        setShowProductModal(true);
    };

    // Category handlers
    const validateCategoryForm = (): string => {
        if (!categoryForm.name.trim()) return 'Nome é obrigatório';
        return '';
    };

    const handleSaveCategory = async () => {
        const validationError = validateCategoryForm();
        if (validationError) {
        alert(validationError);
        return;
        }

        try {
        if (editingCategory) {
            const { error } = await supabase
            .from('categories')
            .update({ name: categoryForm.name })
            .eq('id', editingCategory.id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('categories').insert(categoryForm);
            if (error) throw error;
        }
        setShowCategoryModal(false);
        setCategoryForm({ name: '' });
        fetchData();
        } catch (err: any) {
        alert(`Erro ao salvar categoria: ${err.message}`);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryForm({ name: category.name });
        setShowCategoryModal(true);
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Confirma exclusão?')) return;
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) {
        alert('Erro ao deletar');
        } else {
        fetchData();
        }
    };

    const handleAddCategory = () => {
        setEditingCategory(null);
        setCategoryForm({ name: '' });
        setShowCategoryModal(true);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const filteredProducts = useMemo(
        () => products.filter((p) => p.name.toLowerCase().includes(productSearch.trim().toLowerCase())),
        [products, productSearch]
    );
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedProducts = filteredProducts.slice(
        (safePage - 1) * PRODUCTS_PER_PAGE,
        safePage * PRODUCTS_PER_PAGE
    );

    if (loading) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFB6D9] to-[#D4A5D9] flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#87CEEB]"></div>
        </div>
        );
    }

    return (
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-[#FFB6D9] via-[#D4A5D9] to-[#87CEEB] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] bg-clip-text text-transparent">
                Dashboard Admin - Cantinho do Bebê
            </h1>
            <button
                onClick={handleLogout}
                className="bg-[#87CEEB] hover:bg-[#87CEEB]/90 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
                Sair
            </button>
            </div>

            {/* Tabs */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex border-b border-[#D4A5D9]/50">
                <button
                className={`px-6 py-3 font-semibold transition-all ${activeTab === 'products' ? 'border-b-4 border-[#FFB6D9] text-[#FFB6D9]' : 'text-gray-600 hover:text-[#D4A5D9]'}`}
                onClick={() => setActiveTab('products')}
                >
                Produtos
                </button>

                <button
                className={`px-6 py-3 font-semibold transition-all ${activeTab === 'categories' ? 'border-b-4 border-[#87CEEB] text-[#87CEEB]' : 'text-gray-600 hover:text-[#D4A5D9]'}`}
                onClick={() => setActiveTab('categories')}
                >
                Categorias
                </button>

                <button
                className={`px-6 py-3 font-semibold transition-all ${activeTab === 'newsletter' ? 'border-b-4 border-[#D4A5D9] text-[#D4A5D9]' : 'text-gray-600 hover:text-[#87CEEB]'}`}
                onClick={() => setActiveTab('newsletter')}
                >
                Newsletter
                </button>
            </div>
            </div>

            {/* Content */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            {activeTab === 'products' && (
                <>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-[#D4A5D9]">Gerenciar Produtos</h2>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            value={productSearch}
                            onChange={(e) => { setProductSearch(e.target.value); setCurrentPage(1); }}
                            placeholder="Buscar produto..."
                            className="px-4 py-3 rounded-xl border border-[#D4A5D9]/50 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB6D9] text-gray-700 w-full sm:w-64"
                        />
                        <button
                            onClick={handleAddProduct}
                            className="bg-[#FFB6D9] hover:bg-[#FFB6D9]/90 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-semibold whitespace-nowrap"
                        >
                            + Adicionar Produto
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] text-white">
                        <th className="p-4 text-left font-semibold">Imagem</th>
                        <th className="p-4 text-left font-semibold">Nome</th>
                        <th className="p-4 text-left font-semibold">Categoria</th>
                        <th className="p-4 text-left font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.length === 0 ? (
                        <tr><td colSpan={4} className="p-6 text-center text-gray-500">Nenhum produto encontrado.</td></tr>
                        ) : paginatedProducts.map((product) => {
                        const category = categories.find((c) => c.id === product.category_id);
                        return (
                            <tr key={product.id} className="hover:bg-[#FFB6D9]/10 transition-colors border-b border-gray-100">
                            <td className="p-4">
                                <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg shadow-md"
                                />
                            </td>
                            <td className="p-4 font-medium text-[#D4A5D9]">{product.name}</td>
                            <td className="p-4">{category?.name || 'N/A'}</td>
                            <td className="p-4">
                                <button
                                onClick={() => handleEditProduct(product)}
                                className="bg-[#87CEEB] hover:bg-[#87CEEB]/90 text-white px-4 py-1 rounded-lg mr-2 shadow-md transition-all"
                                >
                                Editar
                                </button>
                                <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded-lg shadow-md transition-all"
                                >
                                Deletar
                                </button>
                            </td>
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
                {filteredProducts.length > 0 && totalPages > 1 && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-6">
                    <p className="text-sm text-gray-600">
                        Mostrando {(safePage - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(safePage * PRODUCTS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            className="bg-[#87CEEB] hover:bg-[#87CEEB]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg shadow-md transition-all"
                        >
                            Anterior
                        </button>
                        <span className="text-sm font-semibold text-[#D4A5D9] px-2">
                            Página {safePage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            className="bg-[#87CEEB] hover:bg-[#87CEEB]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg shadow-md transition-all"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
                )}
                </>
            )}

            {activeTab === 'categories' && (
                <>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#D4A5D9]">Gerenciar Categorias</h2>
                    <button
                    onClick={handleAddCategory}
                    className="bg-[#87CEEB] hover:bg-[#87CEEB]/90 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                    >
                    + Adicionar Categoria
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#87CEEB] to-[#D4A5D9] text-white">
                        <th className="p-4 text-left font-semibold">Nome</th>
                        <th className="p-4 text-left font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-[#87CEEB]/10 transition-colors border-b border-gray-100">
                            <td className="p-4 font-medium text-[#D4A5D9]">{category.name}</td>
                            <td className="p-4">
                            <button
                                onClick={() => handleEditCategory(category)}
                                className="bg-[#FFB6D9] hover:bg-[#FFB6D9]/90 text-white px-4 py-1 rounded-lg mr-2 shadow-md transition-all"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded-lg shadow-md transition-all"
                            >
                                Deletar
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </>
            )}
            {activeTab === 'newsletter' && (
            <NewsletterTab supabase={supabase} />
            )}
            </div>

            {/* Product Modal */}
            {showProductModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4">
                <div className="p-8 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-[#D4A5D9]">
                    {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
                    </h3>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Nome *"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB6D9] focus:border-transparent w-full"
                    />
                    <select
                        value={productForm.category_id}
                        onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent w-full"
                    >
                        <option value="">Selecione uma categoria *</option>
                        {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Descrição Curta *"
                        value={productForm.short_description}
                        onChange={(e) => setProductForm({ ...productForm, short_description: e.target.value })}
                        rows={3}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB6D9] focus:border-transparent w-full md:col-span-2"
                    />
                    <textarea
                        placeholder="Descrição Completa *"
                        value={productForm.full_description}
                        onChange={(e) => setProductForm({ ...productForm, full_description: e.target.value })}
                        rows={4}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4A5D9] focus:border-transparent w-full md:col-span-2"
                    />
                    <input
                        type="text"
                        placeholder="Material"
                        value={productForm.material || ''}
                        onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] w-full"
                    />
                    <input
                        type="text"
                        placeholder="Idade"
                        value={productForm.age || ''}
                        onChange={(e) => setProductForm({ ...productForm, age: e.target.value })}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] w-full"
                    />
                    <input
                        type="text"
                        placeholder="Cores"
                        value={productForm.colors || ''}
                        onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] w-full"
                    />
                    <input
                        type="text"
                        placeholder="Tamanho"
                        value={productForm.size || ''}
                        onChange={(e) => setProductForm({ ...productForm, size: e.target.value })}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] w-full"
                    />
                    <textarea
                        placeholder="Instruções de Lavagem"
                        value={productForm.washing_instructions || ''}
                        onChange={(e) => setProductForm({ ...productForm, washing_instructions: e.target.value })}
                        rows={3}
                        className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] w-full md:col-span-2"
                    />
                    </div>

                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-[#FFB6D9] rounded-2xl p-8 text-center">
                    <div className="space-y-4">
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                            setUploadMessage('');
                            }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#FFB6D9] file:text-white hover:file:bg-[#FFB6D9]/90"
                        />
                        {imagePreview && (
                        <div>
                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded-xl shadow-lg" />
                        </div>
                        )}
                        <button
                        onClick={handleUploadImage}
                        disabled={!imageFile || uploadingImage}
                        className="bg-[#D4A5D9] hover:bg-[#D4A5D9]/90 disabled:opacity-50 text-white px-8 py-3 rounded-xl shadow-lg transition-all font-semibold"
                        >
                        {uploadingImage ? 'Enviando...' : 'Enviar Imagem'}
                        </button>
                        {uploadMessage && (
                        <p className={`font-semibold ${uploadMessage.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
                            {uploadMessage}
                        </p>
                        )}
                    </div>
                    </div>

                    <input
                    type="text"
                    placeholder="URL da Imagem (alternativa)"
                    value={productForm.image_url || ''}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] w-full md:col-span-2"
                    />
                </div>
                <div className="p-8 border-t border-gray-200 flex justify-end space-x-4">
                    <button
                    onClick={() => setShowProductModal(false)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                    >
                    Cancelar
                    </button>
                    <button
                    onClick={handleSaveProduct}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] hover:from-[#FFB6D9]/90 text-white px-8 py-3 rounded-xl shadow-lg transition-all font-semibold disabled:opacity-50"
                    >
                    {loading ? 'Salvando...' : editingProduct ? 'Atualizar' : 'Adicionar'}
                    </button>
                </div>
                </div>
            </div>
            )}

            {/* Category Modal */}
            {showCategoryModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full mx-4">
                <div className="p-8 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-[#87CEEB]">
                    {editingCategory ? 'Editar Categoria' : 'Adicionar Categoria'}
                    </h3>
                </div>
                <div className="p-8">
                    <input
                    type="text"
                    placeholder="Nome *"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ name: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87CEEB] focus:border-transparent"
                    />
                </div>
                <div className="p-8 border-t border-gray-200 flex justify-end space-x-4">
                    <button
                    onClick={() => setShowCategoryModal(false)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                    >
                    Cancelar
                    </button>
                    <button
                    onClick={handleSaveCategory}
                    className="bg-gradient-to-r from-[#87CEEB] to-[#D4A5D9] hover:from-[#87CEEB]/90 text-white px-8 py-3 rounded-xl shadow-lg transition-all font-semibold"
                    >
                    {editingCategory ? 'Atualizar' : 'Adicionar'}
                    </button>
                </div>
                </div>
            </div>
            )}

            {error && (
            <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg z-40 animate-pulse">
                {error}
            </div>
            )}
        </div>
        </div>
        <Footer />
        </>
    );
};

export default AdminDashboard;
