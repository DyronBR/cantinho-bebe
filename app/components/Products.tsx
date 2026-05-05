'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import React, { useState, useEffect } from 'react';

type Specification = Record<string, string>;

type Product = {
  id: number;
  name: string;
  description: string;
  fullDescription?: string;
  image: string;
  category: string;
  specifications?: Specification;
};

const mockProducts: Product[] = [
  // Roupas (4)
  {
    id: 1,
    name: 'Body de Algodão RN',
    description: 'Body macio e confortável para recém-nascidos.',
    fullDescription: 'Body de algodão 100% orgânico, perfeito para a pele sensível do bebê. Fechamento em snap, mangas curtas e estampa fofa. Ideal para o dia a dia.',
    image: '/images/logo.png',
    category: 'Roupas',
    specifications: {
      'Material': '100% Algodão Orgânico',
      'Tamanho': 'RN',
      'Idade': '0-3 meses',
      'Lavagem': 'Máquina 40°C',
      'Cores': 'Branco, Rosa'
    }
  },
  {
    id: 2,
    name: 'Macacão Estampado',
    description: 'Macacão divertido com estampas animais.',
    fullDescription: 'Macacão de algodão com zíper frontal e pés cobertos. Design lúdico com animais fofos, respirável e anti-alérgico. Perfeito para brincar.',
    image: '/images/logo.png',
    category: 'Roupas',
    specifications: {
      'Material': 'Algodão 95%',
      'Tamanho': '0-6M',
      'Idade': '0-6 meses',
      'Lavagem': 'Máquina 30°C',
      'Cores': 'Azul, Verde'
    }
  },
  {
    id: 3,
    name: 'Conjunto pijama',
    description: 'Pijama suave para noites tranquilas.',
    fullDescription: 'Conjunto de pijama com calça e camisa longa, tecido modal super macio. Anti-rugas e hipoalergênico, ideal para sono confortável.',
    image: '/images/logo.png',
    category: 'Roupas',
    specifications: {
      'Material': 'Modal 100%',
      'Tamanho': '6-12M',
      'Idade': '6-12 meses',
      'Lavagem': 'Mão fria',
      'Cores': 'Cinza, Azul'
    }
  },
  {
    id: 4,
    name: 'Naninha',
    description: 'Naninha elegante para ocasiões especiais.',
    fullDescription: 'Naninha de tule e algodão com laços e babados. Confortável e estiloso para festas de bebê.',
    image: '/images/logo.png',
    category: 'Roupas',
    specifications: {
      'Material': 'Algodão e Tule',
      'Tamanho': '12M',
      'Idade': '12 meses+',
      'Lavagem': 'Máquina delicada',
      'Cores': 'Rosa, Branco'
    }
  },
  // Toalhas (4)
  {
    id: 5,
    name: 'Toalha de Banho Capuz',
    description: 'Toalha com capuz fofinho para pós-banho.',
    fullDescription: 'Toalha de algodão turco com capuz e orelhas de animal. Absorvente e macia, seca rapidamente.',
    image: '/images/logo.png',
    category: 'Toalhas',
    specifications: {
      'Material': 'Algodão Turco',
      'Tamanho': '80x80cm',
      'Idade': '0-2 anos',
      'Absorção': 'Alta',
      'Secagem': 'Rápida'
    }
  },
  {
    id: 6,
    name: 'Kit Toalhas 3u',
    description: 'Kit com 3 toalhas multiuso.',
    fullDescription: 'Três toalhas de face e banho em algodão penteado. Versáteis para pele e cabelo do bebê.',
    image: '/images/logo.png',
    category: 'Toalhas',
    specifications: {
      'Material': 'Algodão Penteado',
      'Tamanho': '30x30cm / 70x140cm',
      'Idade': 'Todos',
      'Quantidade': '3un',
      'Cores': 'Branco'
    }
  },
  {
    id: 7,
    name: 'Toalha de Mesa',
    description: 'Toalha impermeável para trocas.',
    fullDescription: 'Toalha de mesa com camada impermeável e almofadada. Fácil limpeza e portátil.',
    image: '/images/logo.png',
    category: 'Toalhas',
    specifications: {
      'Material': 'Algodão + PU',
      'Tamanho': '60x60cm',
      'Idade': '0-12M',
      'Impermeável': 'Sim',
      'Lavável': 'Máquina'
    }
  },
  {
    id: 8,
    name: 'Pano umedecido',
    description: 'Paninhos para limpeza rápida.',
    fullDescription: 'Kit de 6 panos de microfibra para umedecer e limpar. Antibacteriano e reutilizável.',
    image: '/images/logo.png',
    category: 'Toalhas',
    specifications: {
      'Material': 'Microfibra',
      'Tamanho': '20x20cm',
      'Idade': 'Todos',
      'Quantidade': '6un',
      'Antibact': 'Sim'
    }
  },
  // Acessórios (4)
  {
    id: 9,
    name: 'Porta Chupeta',
    description: 'Porta Chupeta em algodão.',
    fullDescription: 'Porta Chupeta, formato ortodôntico que respeita o palato. Escudo ventilado.',
    image: '/images/logo.png',
    category: 'Acessórios',
    specifications: {
      'Material': 'Silicone Médico',
      'Tamanho': '0-6M',
      'Idade': '0-6 meses',
      'BPA Free': 'Sim',
      'Esterilizável': 'Sim'
    }
  },
  {
    id: 10,
    name: 'Mordedor',
    description: 'Mordedor para dentição.',
    fullDescription: 'Mordedor com texturas variadas. Alivia dor de dente e massageia gengivas.',
    image: '/images/logo.png',
    category: 'Acessórios',
    specifications: {
      'Material': 'Gel + Silicone',
      'Tamanho': '10cm',
      'Idade': '3-12M',
      'Refrigerável': 'Sim',
      'Lavável': 'Sim'
    }
  },
  {
    id: 11,
    name: 'Babete Siliconado',
    description: 'Babador impermeável e ajustável.',
    fullDescription: 'Babete de silicone com bolso coletor. Fácil limpeza e ajuste no pescoço.',
    image: '/images/logo.png',
    category: 'Acessórios',
    specifications: {
      'Material': 'Silicone Alimentício',
      'Tamanho': 'Ajustável',
      'Idade': '6M+',
      'Impermeável': 'Sim',
      'BPA Free': 'Sim'
    }
  },
  {
    id: 12,
    name: 'Chocalho de Pano',
    description: 'Chocalho de Pano.',
    fullDescription: 'Chocalho em pano natural com guizo suave. Desenvolve coordenação motora.',
    image: '/images/logo.png',
    category: 'Acessórios',
    specifications: {
      'Material': 'Madeira FSC',
      'Tamanho': '12cm',
      'Idade': '0-12M',
      'Não Tóxico': 'Sim',
      'Som': 'Suave'
    }
  },
  // Sapatinhos (4)
  {
    id: 13,
    name: 'Sapatinho',
    description: 'Sapatinhos macios.',
    fullDescription: 'Sapatinhos de algodão que protegem os pezinhos.',
    image: '/images/logo.png',
    category: 'Sapatinhos',
    specifications: {
      'Material': 'Algodão',
      'Tamanho': '0-6M',
      'Idade': '0-6 meses',
      'Antiderrapante': 'Sim',
      'Lavável': 'Máquina'
    }
  },
  {
    id: 14,
    name: 'Botinha de Lã',
    description: 'Botinhas quentinhas para inverno.',
    fullDescription: 'Botinhas de lã merino, respiráveis e térmicas. Elástico no tornozelo.',
    image: '/images/logo.png',
    category: 'Sapatinhos',
    specifications: {
      'Material': 'Lã Merino',
      'Tamanho': '6-12M',
      'Idade': '6-12 meses',
      'Térmica': 'Sim',
      'Respirável': 'Sim'
    }
  },
  {
    id: 15,
    name: 'Mocassim Macio',
    description: 'Mocassins flexíveis para engatinhar.',
    fullDescription: 'Mocassins de couro sintético macio. Permitem movimento natural dos dedos.',
    image: '/images/logo.png',
    category: 'Sapatinhos',
    specifications: {
      'Material': 'Couro Sintético',
      'Tamanho': '12M+',
      'Idade': '12 meses+',
      'Flexível': 'Sim',
      'Durável': 'Alta'
    }
  },
  {
    id: 16,
    name: 'Meias Anti-dedo',
    description: 'Meias com reforço anti-furo.',
    fullDescription: 'Meias de algodão com reforço no dedão. Pacote com 5 pares.',
    image: '/images/logo.png',
    category: 'Sapatinhos',
    specifications: {
      'Material': 'Algodão 80%',
      'Tamanho': 'RN-12M',
      'Idade': 'Todos',
      'Quantidade': '5 pares',
      'Anti-furo': 'Sim'
    }
  },
  // Higiene & Cuidados (4)
  {
    id: 17,
    name: 'Escova Dentes Silicone',
    description: 'Escovinha de silicone para bebês.',
    fullDescription: 'Escova com cerdas ultra macias de silicone. Cabo ergonômico para pais.',
    image: '/images/logo.png',
    category: 'Higiene & Cuidados',
    specifications: {
      'Material': 'Silicone FDA',
      'Idade': '0-12M',
      'Cerdas': 'Ultra macias',
      'BPA Free': 'Sim',
      'Esterilizável': 'Sim'
    }
  },
  {
    id: 18,
    name: 'Termômetro Digital',
    description: 'Termômetro de testa infravermelho.',
    fullDescription: 'Termômetro sem contato, medição em 1s. Memória de 32 leituras.',
    image: '/images/logo.png',
    category: 'Higiene & Cuidados',
    specifications: {
      'Tipo': 'Infravermelho',
      'Precisão': '±0.2°C',
      'Idade': 'Todos',
      'Bateria': '2x AAA',
      'Memória': '32 leituras'
    }
  },
  {
    id: 19,
    name: 'Corta Unhas Bébé',
    description: 'Cortador de unhas seguro com lupa.',
    fullDescription: 'Corta unhas com serra fina e lupa 4x. Inclui arquivo e pinça.',
    image: '/images/logo.png',
    category: 'Higiene & Cuidados',
    specifications: {
      'Material': 'Aço Inox',
      'Idade': '0-12M',
      'Lupa': '4x',
      'Acessórios': 'Arquivo + Pinça',
      'Seguro': 'Sim'
    }
  },
  {
    id: 20,
    name: 'Shampoo Natural',
    description: 'Shampoo sem lágrimas hipoalergênico.',
    fullDescription: 'Shampoo de camomila e aveia, sem sulfatos. Fórmula suave para couro cabeludo sensível.',
    image: '/images/logo.png',
    category: 'Higiene & Cuidados',
    specifications: {
      'Volume': '200ml',
      'Ingredientes': 'Camomila, Aveia',
      'Idade': '0+',
      'Sem Lágrimas': 'Sim',
      'Vegano': 'Sim'
    }
  }
];

const categories = ['Todas', 'Roupas', 'Toalhas', 'Acessórios', 'Sapatinhos', 'Higiene & Cuidados'];

const ProductCard: React.FC<{ product: Product; view: 'grid' | 'compact' | 'list'; onDetails: (product: Product) => void }> = ({ product, view, onDetails }) => {
  const gradient = 'bg-gradient-to-br from-[#FFB6D9] via-[#D4A5D9] to-[#87CEEB]';
  const shadow = 'shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:shadow-[#FFB6D9]/30 hover:scale-102 hover:-translate-y-1';
  const transition = 'transition-all duration-300 ease-out';

  if (view === 'grid') {
    return (
      <div className={`bg-gradient-to-r from-[#F5F3F0] to-white ${shadow} ${transition} rounded-2xl p-6 cursor-pointer max-w-sm mx-auto`} onClick={() => onDetails(product)}>
        <div className="w-full h-48 bg-[#87CEEB]/20 rounded-xl overflow-hidden mb-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <span className="inline-block bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] text-white px-4 py-2 rounded-full text-sm font-semibold">Ver Detalhes</span>
      </div>
    );
  } else if (view === 'compact') {
    return (
      <div className={`flex ${shadow} ${transition} rounded-xl p-4 cursor-pointer bg-white`} onClick={() => onDetails(product)}>
        <div className="w-20 h-20 bg-[#87CEEB]/20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
        </div>
      </div>
    );
  } else { // list
    return (
      <div className={`grid grid-cols-3 gap-6 ${shadow} ${transition} rounded-2xl p-6 bg-gradient-to-r from-[#F5F3F0] to-white cursor-pointer`} onClick={() => onDetails(product)}>
        <div className="col-span-1">
          <div className="w-full h-24 bg-[#87CEEB]/20 rounded-xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <span className="inline-block bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] text-white px-3 py-1 rounded-full text-xs font-semibold">Ver Detalhes</span>
        </div>
      </div>
    );
  }
};

const ProductModal: React.FC<{ product: Product | null; onClose: () => void; products: Product[]; onProductChange: (product: Product) => void }> = ({ product, onClose, products, onProductChange }) => {
  if (!product) return null;

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white/90 backdrop-blur-md rounded-3xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white/100 z-10 flex justify-between items-center p-6 border-b border-gray-100 rounded-t-3xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] bg-clip-text text-transparent">{product.name}</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-200">×</button>
        </div>
        <div className="p-8 pb-4 space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="w-full min-h-[400px] bg-gradient-to-br from-[#87CEEB]/20 to-[#D4A5D9]/20 rounded-2xl overflow-hidden shadow-xl">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">{product.fullDescription ?? product.description}</p>
              <div>
                <h4 className="font-bold text-xl mb-4 bg-gradient-to-r from-[#FFB6D9] to-[#87CEEB] bg-clip-text text-transparent">Especificações Técnicas</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(product.specifications ?? {}).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <span className="font-semibold text-gray-600">{key}:</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {similarProducts.length > 0 && (
            <div>
              <h4 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#D4A5D9] to-[#87CEEB] bg-clip-text text-transparent">Produtos Similares</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map(similar => (
                  <div 
                    key={similar.id} 
                    className="group cursor-pointer p-4 rounded-xl hover:bg-[#F5F3F0] transition-all"
                    onClick={() => onProductChange(similar)}
                  >
                    <img src={similar.image} alt={similar.name} className="w-full h-24 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform" />
                    <h5 className="font-bold text-sm line-clamp-1 group-hover:text-[#FFB6D9] transition-colors">{similar.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Products: React.FC<{ products?: Product[] }> = ({ products: incomingProducts }) => {
  const [products] = useState<Product[]>(incomingProducts ?? mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [view, setView] = useState<'grid' | 'compact' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let result = products;
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    }
    if (categoryFilter !== 'Todas') {
      result = result.filter(p => p.category === categoryFilter);
    }
    setFilteredProducts(result);
  }, [search, categoryFilter, products]);

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  const handleDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const gradientInput = 'bg-gradient-to-r from-[#F5F3F0]/50 to-white/50 backdrop-blur-sm border border-[#FFB6D9]/30 focus:border-[#D4A5D9]';
  const gradientBtn = 'bg-gradient-to-r from-[#FFB6D9] to-[#D4A5D9] hover:from-[#D4A5D9] hover:to-[#87CEEB] text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.08)]';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3F0] via-white to-[#87CEEB]/10 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-8 mt-16 md:mt-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#FFB6D9] via-[#D4A5D9] to-[#87CEEB] bg-clip-text text-transparent drop-shadow-2xl">
            Produtos para Bebês
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Descubra nossa seleção premium de roupas, acessórios e cuidados para o seu bebê.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center justify-center mb-12 p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl">
          <div className={`relative w-full max-w-md ${gradientInput} p-4 pr-12 rounded-2xl shadow-lg`}>
            <input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-lg placeholder-gray-500"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`${gradientInput} p-4 rounded-2xl shadow-lg text-lg font-semibold min-w-[200px] cursor-pointer`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-3 rounded-xl ${view === 'grid' ? gradientBtn : 'bg-white/50 text-gray-700 hover:bg-[#F5F3F0]'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setView('compact')}
              className={`p-3 rounded-xl ${view === 'compact' ? gradientBtn : 'bg-white/50 text-gray-700 hover:bg-[#F5F3F0]'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-3 rounded-xl ${view === 'list' ? gradientBtn : 'bg-white/50 text-gray-700 hover:bg-[#F5F3F0]'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Count */}
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${{
          grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          compact: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          list: 'grid-cols-1'
        }[view]}`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} view={view} onDetails={handleDetails} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">Nenhum produto encontrado.</p>
          </div>
        )}
      </div>

      {showModal && <ProductModal product={selectedProduct} onClose={() => setShowModal(false)} products={products} onProductChange={setSelectedProduct} />}
    </div>
  );
};

export default Products;
