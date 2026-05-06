'use client';

import { useState } from 'react';
import { useProducts } from '@/app/hooks/useProducts';
import staticProducts from '@/app/data/products';
import type { Product } from '@/app/data/products';

const FEATURED_COUNT = 8;

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products: supabaseProducts, loading, error } = useProducts();

  // Usa produtos do Supabase se disponíveis, caso contrário usa os estáticos como fallback
  const products: Product[] = supabaseProducts.length > 0
    ? supabaseProducts.slice(0, FEATURED_COUNT)
    : staticProducts.slice(0, FEATURED_COUNT);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Roupas': 'from-pink-500 to-rose-500',
      'Toalhas': 'from-blue-500 to-cyan-500',
      'Acessórios': 'from-purple-500 to-violet-500',
      'Sapatinhos': 'from-amber-500 to-orange-500',
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  return (
    <>
      <section className="py-20 px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Confira nossa coleção exclusiva de produtos delicados e seguros para seu bebê bem pequeninho...
            </p>
          </div>

          {/* Estado de carregamento */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          )}

          {/* Erro do Supabase — exibe produtos estáticos como fallback, sem mostrar erro ao usuário */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-pink-100 hover:border-purple-300 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Imagem Grande em Destaque */}
                  <div className="h-64 overflow-hidden bg-gray-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Badge de Categoria */}
                    <span className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(product.category)} text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg`}>
                      {product.category}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Botão Saiba Mais */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg group/btn flex items-center justify-center gap-2"
                    >
                      Saiba Mais
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-16 pt-12 border-t border-pink-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quer conhecer todos os produtos?
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Explore nossa coleção completa com centenas de itens especiais para seu bebê
            </p>
            <a
              href="https://wa.me/5548996915637?text=Olá! Gostaria de conhecer melhor a coleção completa de produtos do Cantinho do Bebê."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all hover:shadow-lg"
            >
              Fale Conosco via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Modal de Detalhes */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-pink-200 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-50 to-purple-50 p-8 border-b border-pink-200 flex items-start justify-between gap-4">
              <div>
                <span className="inline-block text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold p-2 rounded-full hover:bg-gray-200 transition-all flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Imagem */}
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>

                {/* Informações */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Descrição</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.fullDescription || selectedProduct.description}
                    </p>
                  </div>

                  {/* Especificações dinâmicas do produto */}
                  {Object.keys(selectedProduct.specifications).length > 0 && (
                    <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                      <h4 className="font-bold text-gray-900 mb-3">✨ Especificações</h4>
                      <ul className="text-gray-700 space-y-2 text-sm">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <li key={key}>
                            <span className="font-semibold">{key}:</span> {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProduct.specifications['Lavagem'] && (
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                      <h4 className="font-bold text-gray-900 mb-2">📋 Cuidados</h4>
                      <p className="text-gray-700 text-sm">
                        {selectedProduct.specifications['Lavagem']}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA no Modal */}
              <div className="border-t border-gray-200 pt-8 text-center">
                <p className="text-gray-600 mb-4">Interessado neste produto?</p>
                <a
                  href={`https://wa.me/5548996915637?text=Olá! Gostaria de saber mais sobre o produto: ${selectedProduct.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all hover:shadow-lg"
                >
                  Fale Conosco via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
