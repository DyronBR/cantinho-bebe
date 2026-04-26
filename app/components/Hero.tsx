'use client';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-pink-200 via-blue-200 to-green-200 py-24 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-8">❤️</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Qualidade e Carinho em Cada Ponto
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Nossas criações são tecidas com os melhores materiais e um toque especial de afeto, garantindo durabilidade, conforto e estilo único para o seu dia a dia.
        </p>
        <a
          href="#products"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
        >
          Ver Coleção
        </a>
      </div>
    </div>
  );
}