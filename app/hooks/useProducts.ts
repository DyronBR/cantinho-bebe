'use client'

import { useEffect, useMemo, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import type { Product } from '@/app/data/products'

// Linha bruta vinda do Supabase (schema do admin)
type RawProduct = {
    id: string
    name: string
    short_description: string | null
    full_description: string | null
    material: string | null
    age: string | null
    colors: string | null
    size: string | null
    washing_instructions: string | null
    image_url: string | null
    category_id: string | null
    categories?: { name: string } | { name: string }[] | null
}

const buildSpecifications = (row: RawProduct): Record<string, string> => {
    const specs: Record<string, string> = {}
    if (row.material) specs['Material'] = row.material
    if (row.size) specs['Tamanho'] = row.size
    if (row.age) specs['Idade'] = row.age
    if (row.colors) specs['Cores'] = row.colors
    if (row.washing_instructions) specs['Lavagem'] = row.washing_instructions
    return specs
}

const mapRowToProduct = (row: RawProduct): Product => {
    // Supabase retorna a relação como objeto (1-N) ou array dependendo da config
    const cat = Array.isArray(row.categories)
        ? row.categories[0]?.name
        : row.categories?.name
    return {
        id: row.id,
        name: row.name,
        description: row.short_description ?? '',
        fullDescription: row.full_description ?? row.short_description ?? '',
        image: row.image_url ?? '/images/logo.png',
        category: cat ?? '',
        specifications: buildSpecifications(row),
    }
}

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = useMemo(() => createSupabaseClient(), [])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*, categories(name)')

            if (error) {
                console.error('Erro ao buscar produtos:', error)
                setError(error.message)
                setLoading(false)
                return
            }

            const rows = (data ?? []) as unknown as RawProduct[]
            setProducts(rows.map(mapRowToProduct))
            setLoading(false)
        }

        fetchProducts()
    }, [supabase])

    return { products, loading, error }
}

export { useProducts }
