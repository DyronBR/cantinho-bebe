'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const useProducts = () => {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = useMemo(
        () => 
        createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        ),
        []
    )

    useEffect(() => {
        const fetchProducts = async () => {
        console.log('Buscando produtos...')

        const { data, error } = await supabase
            .from('products')
            .select('*')

        if (error) {
            console.error('Erro ao buscar produtos:', error)
            setError(error.message)
            setLoading(false)
            return
        }

        console.log('Produtos recebidos:', data)
        setProducts(data ?? [])
        setLoading(false)
        }

        fetchProducts()
    }, [supabase])

    return { products, loading, error }
}

export { useProducts }
