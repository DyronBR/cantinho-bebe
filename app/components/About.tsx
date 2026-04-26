import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';


const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <Header />
      {/* 1. HERO SECTION */}
      <section className="relative mb-20 md:mb-32">
        <img 
          src="/images/logo-icons.png" 
          alt="Banner Logo Icons" 
          className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl animate-pulse" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-pink-600/40 to-blue-600/40 rounded-2xl backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 drop-shadow-2xl">
            Cantinho do Bebê
          </h1>
          <p className="text-xl md:text-2xl text-white text-center px-8 drop-shadow-lg">
            🎀 Tudo com carinho para o seu pequeno 🧸❤️
          </p>
        </div>
      </section>

      {/* 2. NOSSA HISTÓRIA */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          Nossa História 👶
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Fundada com amor em 2020, a Cantinho do Bebê nasceu da paixão de uma mãe pela maternidade. Começamos com poucos produtos, mas sempre priorizando a qualidade e segurança para os bebês. Hoje, somos referência em itens essenciais, crescendo com a confiança das famílias. Nosso compromisso é inabalável: cada peça passa por testes rigorosos para garantir o bem-estar do seu pequeno. 🛏️🍼
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-center">
            <div className="p-8 bg-white/50 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-4xl">🛁</span>
              <p className="font-bold mt-2">Toalhinhas</p>
            </div>
            <div className="p-8 bg-white/50 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-4xl">👟</span>
              <p className="font-bold mt-2">Sapatinhos</p>
            </div>
            <div className="p-8 bg-white/50 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-4xl">🎀</span>
              <p className="font-bold mt-2">Acessórios</p>
            </div>
            <div className="p-8 bg-white/50 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-4xl">🧸</span>
              <p className="font-bold mt-2">Naninhas</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOSSOS VALORES */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          Nossos Valores ❤️
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="p-8 bg-gradient-to-b from-pink-200 to-blue-200 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">👶</span>
            <h3 className="text-2xl font-bold mb-4">Qualidade Premium</h3>
            <p>Selecionamos apenas os melhores materiais hipoalergênicos para a pele sensível do bebê.</p>
          </div>
          <div className="p-8 bg-gradient-to-b from-blue-200 to-purple-200 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">🛡️</span>
            <h3 className="text-2xl font-bold mb-4">Segurança Garantida</h3>
            <p>Cada produto é testado e certificado para proteger seu pequeno em todos os momentos.</p>
          </div>
          <div className="p-8 bg-gradient-to-b from-pink-200 to-yellow-200 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">❤️</span>
            <h3 className="text-2xl font-bold mb-4">Amor em Cada Detalhe</h3>
            <p>Fazemos com o coração, pensando no conforto e na alegria da sua família.</p>
          </div>
          <div className="p-8 bg-gradient-to-b from-green-200 to-pink-200 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">🤝</span>
            <h3 className="text-2xl font-bold mb-4">Confiança Familiar</h3>
            <p>Construímos laços duradouros, sendo parceiros confiáveis dos pais modernos.</p>
          </div>
        </div>
      </section>

      {/* 4. NOSSA EQUIPE */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          Nossa Equipe 👨‍👩‍👧‍👦
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center hover:scale-105 transition-all duration-300">
            <img src="images/equipe/claudia.png" alt="Claudia" className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full shadow-2xl mb-6 object-cover" />
            <h3 className="text-2xl font-bold mb-2">Claudia Bardini</h3>
            <p className="text-gray-600 mb-4">Fundadora</p>
            <p>Mais de 15 anos cuidando de bebês, especialista em conforto infantil.</p>
          </div>
          <div className="text-center hover:scale-105 transition-all duration-300">
            <img src="images/equipe/paulo.png" alt="Paulo" className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full shadow-2xl mb-6 object-cover" />
            <h3 className="text-2xl font-bold mb-2">Paulo Scheffer</h3>
            <p className="text-gray-600 mb-4">Engenheiro de Materiais</p>
            <p>Pesquisando os melhores materiais para atender as suas crianças.</p>
          </div>
          <div className="text-center hover:scale-105 transition-all duration-300">
            <img src="images/equipe/tamiris.png" alt="Tamiris" className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full shadow-2xl mb-6 object-cover" />
            <h3 className="text-2xl font-bold mb-2">Tamiris Bardini</h3>
            <p className="text-gray-600 mb-4">Designer de Produtos</p>
            <p>Usa sua criatividade e dedicação para cria itens fofos e funcionais.</p>
          </div>
          <div className="text-center hover:scale-105 transition-all duration-300">
            <img src="images/equipe/lua.png" alt="Luã" className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full shadow-2xl mb-6 object-cover" />
            <h3 className="text-2xl font-bold mb-2">Luã Dyron</h3>
            <p className="text-gray-600 mb-4">Designer Gráfico</p>
            <p>Utiliza arte e tecnologia para criar soluções claras e atraentes</p>
          </div>
        </div>
      </section>

      {/* 5. POR QUE ESCOLHER A GENTE? */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          Por Que Escolher a Gente? 🍼✨
        </h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-pink-200">
            <span className="text-3xl block mb-4">🔍</span>
            <h3 className="font-bold text-xl mb-2">Seleção Rigorosa</h3>
            <p>Só os melhores produtos para a saúde do seu bebê.</p>
          </div>
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-200">
            <span className="text-3xl block mb-4">🛡️</span>
            <h3 className="font-bold text-xl mb-2">Segurança Certificada</h3>
            <p>Todos os itens com selos de aprovação para tranquilidade.</p>
          </div>
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-green-200">
            <span className="text-3xl block mb-4">💕</span>
            <h3 className="font-bold text-xl mb-2">Atendimento Amoroso</h3>
            <p>Equipe dedicada como se fosse para nossos próprios filhos.</p>
          </div>
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-yellow-200">
            <span className="text-3xl block mb-4">💰</span>
            <h3 className="font-bold text-xl mb-2">Preços Justos</h3>
            <p>Qualidade sem pesar no bolso da família.</p>
          </div>
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-purple-200">
            <span className="text-3xl block mb-4">🚚</span>
            <h3 className="font-bold text-xl mb-2">Entrega Segura</h3>
            <p>Embalagens protetoras para chegar impecável ao bebê.</p>
          </div>
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-pink-200">
            <span className="text-3xl block mb-4">🏠</span>
            <h3 className="font-bold text-xl mb-2">Confiança Familiar</h3>
            <p>Escolha de milhares de pais confiantes.</p>
          </div>
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-200">
            <span className="text-3xl block mb-4">💡</span>
            <h3 className="font-bold text-xl mb-2">Inovação Constante</h3>
            <p>Sempre atualizando com as novidades para bebês.</p>
          </div>
          <div className="p-6 bg-white/70 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-green-200">
            <span className="text-3xl block mb-4">👨‍👩‍👧‍👦</span>
            <h3 className="font-bold text-xl mb-2">Comunidade de Pais</h3>
            <p>Compartilhamos experiências e dicas com você.</p>
          </div>
        </div>
      </section>

      {/* 6. PARA OS PEQUENINOS */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          Para os Pequenos 👶🎀
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="p-8 bg-gradient-to-b from-pink-300 to-pink-100 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">👕</span>
            <h3 className="text-2xl font-bold mb-4">Roupinhas</h3>
            <p>Macias e confortáveis para brincar o dia todo, meu amorzinho.</p>
          </div>
          <div className="p-8 bg-gradient-to-b from-blue-300 to-blue-100 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">🛁</span>
            <h3 className="text-2xl font-bold mb-4">Toalhinhas</h3>
            <p>Super absorventes e fofinhas para banhozinhos divertidos.</p>
          </div>
          <div className="p-8 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">🎀</span>
            <h3 className="text-2xl font-bold mb-4">Acessórios</h3>
            <p>Pequenos mimos que fazem toda a diferença no dia a dia.</p>
          </div>
          <div className="p-8 bg-gradient-to-b from-green-300 to-green-100 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-5xl block mb-4">👟</span>
            <h3 className="text-2xl font-bold mb-4">Sapatinhos</h3>
            <p>Leveza e estilo para os primeiros passinhos do seu tesouro.</p>
          </div>
        </div>
      </section>

      {/* 7. DEPOIMENTOS */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent pb-4">
            Depoimentos de Mães Felizes
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Veja o que nossas clientes estão dizendo sobre nossos produtos orgânicos e confortáveis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - Rosa */}
            <div className="group relative rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 text-white hover:from-pink-500 hover:to-rose-500">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                ✓ Mãe Verificada
              </div>
              <div className="flex gap-1 mb-6 text-yellow-300 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic font-light mb-6 leading-relaxed relative quotes">
                “Os bodies são tão macios que minha bebê não quer tirar!”
              </blockquote>
              <p className="text-base sm:text-lg mb-6 opacity-95 leading-relaxed">
                Desde que comecei a usar os bodies de algodão orgânico da loja, a pele da Sophia ficou ainda mais saudável. Nada de irritações, e as cores são lindas e resistentes à lavagem. Recomendo para todas as mamães!
              </p>
              <div className="font-semibold text-lg sm:text-xl mb-4">Bodies de algodão orgânico</div>
              <div className="font-bold text-xl sm:text-2xl mb-1">Laura Mendes</div>
              <div className="text-lg opacity-90">Sophia, 8 meses</div>
            </div>

            {/* Card 2 - Azul */}
            <div className="group relative rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-500">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                ✓ Mãe Verificada
              </div>
              <div className="flex gap-1 mb-6 text-yellow-300 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic font-light mb-6 leading-relaxed relative">
                “Kits perfeitos, tudo que precisamos em um só lugar!”
              </blockquote>
              <p className="text-base sm:text-lg mb-6 opacity-95 leading-relaxed">
                Os kits de bodies e macacões são práticos e de ótima qualidade. Lucas fica super confortável e elegante. A entrega foi rápida e embalagem fofa.
              </p>
              <div className="font-semibold text-lg sm:text-xl mb-4">Kits de bodies e macacões</div>
              <div className="font-bold text-xl sm:text-2xl mb-1">Maria Silva</div>
              <div className="text-lg opacity-90">Lucas, 5 meses</div>
            </div>

            {/* Card 3 - Verde */}
            <div className="group relative rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 text-white hover:from-emerald-500 hover:to-teal-500">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                ✓ Mãe Verificada
              </div>
              <div className="flex gap-1 mb-6 text-yellow-300 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic font-light mb-6 leading-relaxed relative">
                “Ideal para gêmeos, qualidade impecável!”
              </blockquote>
              <p className="text-base sm:text-lg mb-6 opacity-95 leading-relaxed">
                Com gêmeos, precisamos de produtos duráveis. Os kits completos para recém-nascidos atendem perfeitamente, macios, bonitos e hipoalergênicos. Salvou minha sanidade!
              </p>
              <div className="font-semibold text-lg sm:text-xl mb-4">Kits completos para recém-nascidos</div>
              <div className="font-bold text-xl sm:text-2xl mb-1">Ana Paula Oliveira</div>
              <div className="text-lg opacity-90">Gêmeos Pedro e Sofia, 3 meses</div>
            </div>

            {/* Card 4 - Roxo */}
            <div className="group relative rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden bg-gradient-to-br from-purple-400 via-violet-400 to-purple-500 text-white hover:from-purple-500 hover:to-violet-500">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                ✓ Mãe Verificada
              </div>
              <div className="flex gap-1 mb-6 text-yellow-300 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic font-light mb-6 leading-relaxed relative">
                “Roupinhas que não irritam a pele sensível!”
              </blockquote>
              <p className="text-base sm:text-lg mb-6 opacity-95 leading-relaxed">
                Mateus tem pele atópica, mas as roupas orgânicas hipoalergênicas resolveram. Conforto total e design moderno. Já sou cliente fiel.
              </p>
              <div className="font-semibold text-lg sm:text-xl mb-4">Roupas orgânicas hipoalergênicas</div>
              <div className="font-bold text-xl sm:text-2xl mb-1">Patrícia Santos</div>
              <div className="text-lg opacity-90">Mateus, 10 meses</div>
            </div>

            {/* Card 5 - Amarelo */}
            <div className="group relative rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-white hover:from-amber-500 hover:to-orange-500">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                ✓ Mãe Verificada
              </div>
              <div className="flex gap-1 mb-6 text-yellow-300 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic font-light mb-6 leading-relaxed relative">
                “Perfeito para o recém-nascido, amor à primeira vista!”
              </blockquote>
              <p className="text-base sm:text-lg mb-6 opacity-95 leading-relaxed">
                Os conjuntos para recém-nascidos são fofos e práticos. Miguel parece um anjinho neles. Material premium, costura perfeita. Super indico!
              </p>
              <div className="font-semibold text-lg sm:text-xl mb-4">Conjuntos para recém-nascidos</div>
              <div className="font-bold text-xl sm:text-2xl mb-1">Fernanda Costa</div>
              <div className="text-lg opacity-90">Miguel, 1 mês</div>
            </div>

            {/* Card 6 - Lilás (ATUALIZADO) */}
            <div className="group relative rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden bg-gradient-to-br from-red-400 via-rose-400 to-pink-500 text-white hover:from-purple-500 hover:to-violet-500">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                ✓ Mãe Verificada
              </div>
              <div className="flex gap-1 mb-6 text-yellow-300 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic font-light mb-6 leading-relaxed relative">
                &quot;Segurança total e conforto perfeito para os primeiros passos!&quot;
              </blockquote>
              <p className="text-base sm:text-lg mb-6 opacity-95 leading-relaxed">
                Comprei os sapatinhos para primeiros passos para minha Isabela, de 11 meses. Eles foram essenciais nessa fase! Super macios, protegem os pezinhos delicados sem atrapalhar o contato natural com o chão, ajudando no equilíbrio e confiança dela. Isabela deu seus primeiros passos sorrindo e agora anda explorando tudo. Recomendo de olhos fechados!
              </p>
              <div className="font-semibold text-lg sm:text-xl mb-4">Sapatinhos para primeiros passos</div>
              <div className="font-bold text-xl sm:text-2xl mb-1">Juliana Rocha</div>
              <div className="text-lg opacity-90">Isabela, 11 meses</div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CTA WHATSAPP */}
      <section className="py-24 px-4 max-w-md mx-auto text-center">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-12 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">👶 Fale com a Gente pelo WhatsApp ❤️</h2>
          <p className="text-xl mb-8">Estamos aqui para ajudar com todo carinho no mundo! 🍼</p>
          <a
            href="https://wa.me/5548996915637?text=Olá! Gostaria de saber mais sobre os produtos do Cantinho do Bebê!"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-pink-100 transition-all duration-300 inline-block"
          >
            Chamar no Zap 👶💬
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
