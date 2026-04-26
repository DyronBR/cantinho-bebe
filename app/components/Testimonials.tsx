'use client';

import { testimonials } from '@/app/data/testimonials';

export default function Testimonials() {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confira os depoimentos de mães e pais que confiam no Cantinho do Bebê
          </p>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-pink-100"
            >
              {/* Avatar e Estrelas */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(testimonial.name)}
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
              </div>

              {/* Citação */}
              <blockquote className="mb-6">
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </blockquote>

              {/* Nome */}
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {testimonial.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-12 border border-pink-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Deixe seu depoimento! 💕
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Sua opinião é muito importante para nós. Compartilhe sua experiência com o Cantinho do Bebê.
          </p>
          <a
            href="https://wa.me/5548996915637?text=Olá! Gostaria de deixar um depoimento sobre minha experiência com o Cantinho do Bebê."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
          >
            Enviar Depoimento via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}