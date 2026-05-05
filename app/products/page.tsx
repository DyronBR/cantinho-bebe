'use client'

import { useProducts } from '@/app/hooks/useProducts'
import Products from '@/app/components/Products'

export default function ProductsPage() {
    const { products, loading, error } = useProducts()

    if (loading) return <div className="text-center p-8">Carregando...</div>
    if (error) return <div className="text-center p-8 text-red-500">Erro: {error}</div>

    return <Products products={products} />
}