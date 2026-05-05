'use client';

import { useState } from 'react';
import { FiInstagram, FiFacebook, FiMessageCircle, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    if (!email || !email.trim()) {
      setMessage('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setSubscribed(true);
        setMessage('Você foi inscrito com sucesso na nossa newsletter!');
        setEmail('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setMessage(errorData.error || 'Erro ao processar a inscrição.');
      }
    } catch (error) {
      setMessage('Erro de conexão. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-t-4 border-pink-200 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Sobre */}
          <div>
            <h3 className="text-2xl font-bold text-pink-500 mb-4">Cantinho do Bebê</h3>
            <p className="text-gray-600 leading-relaxed">
              Tudo para o seu bebê com carinho, qualidade e amor. Sua loja de confiança em Santa Catarina.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">Início</a></li>
              <li><a href="#products" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">Produtos</a></li>
              <li><a href="/categorias" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">Categorias</a></li>
              <li><a href="/contato" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">Contato</a></li>
              <li><a href="/admin/login" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">🔒 Admin</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiMail className="text-pink-500 text-xl flex-shrink-0" />
                <a href="mailto:atendimento.cantinhobebe@gmail.com" className="text-gray-600 hover:text-pink-500 transition-colors break-all">
                  atendimento.cantinhobebe@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-blue-500 text-xl flex-shrink-0" />
                <a href="tel:+5548996915637" className="text-gray-600 hover:text-blue-500 transition-colors">
                  (48) 99691-5637
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-purple-500 text-xl flex-shrink-0" />
                <span className="text-gray-600">Santa Catarina, Brasil</span>
              </div>
            </div>
          </div>

          {/* Redes Sociais e Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Redes Sociais</h4>
            <div className="flex gap-4 mb-8">
              <a 
                href="https://www.instagram.com/cantinhodobebesc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 hover:scale-110 transition-transform p-2 bg-pink-100 rounded-full"
                aria-label="Instagram"
              >
                <FiInstagram size={24} />
              </a>
              <a 
                href="https://www.facebook.com/cantinhobebesc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-transform p-2 bg-blue-100 rounded-full"
                aria-label="Facebook"
              >
                <FiFacebook size={24} />
              </a>
              <a 
                href="https://wa.me/5548996915637?text=Olá! Gostaria de mais informações sobre os produtos do Cantinho do Bebê." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 hover:scale-110 transition-transform p-2 bg-green-100 rounded-full"
                aria-label="WhatsApp"
              >
                <FiMessageCircle size={24} />
            </a>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-base font-bold text-gray-900 mb-4">Newsletter</h5>
{subscribed ? (
  <p className="newsletter-success">Obrigado! Você está inscrito na nossa newsletter. 🎉</p>
) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                disabled={loading}
                required
              />
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Inscrever-se'}
              </button>
              {message && (
                <p className={`text-xs font-medium ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
            </form>
          )}
            </div>
          </div>
        </div>

        {/* Políticas */}
        <div className="border-t border-gray-200 pt-8 flex flex-wrap justify-center gap-6 mb-8">
          <a href="/privacidade" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">Privacidade</a>
          <a href="/termos" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">Termos de Uso</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          © 2026 Cantinho do Bebê. Todos os direitos reservados. 💕
        </div>
      </div>
    </footer>
  );
}