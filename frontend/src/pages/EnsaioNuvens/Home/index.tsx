import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  UserGroupIcon, 
  MusicalNoteIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  UserCircleIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const EnsaioNuvensHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section - Full Width */}
      <div id="top" className="relative w-full overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900"
        style={{
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)'
        }}>
        {/* Brilho sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        {/* Destaque central */}
        <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(106,13,173,0.3), transparent 70%)"></div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Ensaio nas Nuvens</span>
                <span className="block mt-4 text-purple-100">
                  Modernize a gestão da sua banda ou orquestra
                </span>
              </h1>
              <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-200 sm:text-xl md:mt-8">
                Centralize a distribuição de partituras, facilite o acesso individualizado e torne a comunicação mais fluida entre os integrantes da banda.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cadastro"
                  className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Comece agora
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center px-8 py-4 border-2 border-white/20 text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm md:text-lg md:px-10 transition-all duration-200 hover:border-white/30"
                >
                  Entrar
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Teste com Imagem */}
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-10 lg:mb-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Experimente Agora</span>
                <span className="block text-purple-700">Veja como é fácil começar</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Nossa plataforma foi projetada para simplificar a gestão musical. 
                Experimente gratuitamente e descubra como podemos ajudar você e sua banda.
              </p>
              <div className="mt-8">
                <Link
                  to="/cadastro"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Testar Grátis
                  <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-auto"
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Demonstração da plataforma"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
              Nosso Propósito
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Modernizando a gestão</span>
              <span className="block text-purple-700">musical</span>
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-500">
              O projeto Ensaio nas Nuvens tem como principal objetivo modernizar a forma como maestros e gestores organizam os ensaios de suas corporações musicais.
            </p>
          </div>
          
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <CloudArrowUpIcon className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Distribuição Simplificada</h3>
              <p className="mt-2 text-base text-gray-500">
                Envie partituras para todos os músicos da sua banda ou orquestra com apenas alguns cliques.
              </p>
            </div>
            
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <DocumentTextIcon className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Banco de Partituras</h3>
              <p className="mt-2 text-base text-gray-500">
                Acesso a um acervo digital de partituras que pode ser acessado de qualquer lugar, a qualquer momento.
              </p>
            </div>
            
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <UserGroupIcon className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comunicação Eficiente</h3>
              <p className="mt-2 text-base text-gray-500">
                Mantenha todos os músicos alinhados com atualizações em tempo real e comunicação centralizada.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Para quem é</span>
              <span className="block text-purple-700">o Ensaio nas Nuvens?</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Uma solução completa para diferentes necessidades no mundo musical.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Gestores',
                description: 'Que têm dificuldades na distribuição e atualização de partituras',
                icon: UserCircleIcon,
                color: 'bg-purple-100 text-purple-700'
              },
              {
                title: 'Grupos Musicais',
                description: 'Que ainda utilizam métodos tradicionais baseados em papel',
                icon: UserGroupIcon,
                color: 'bg-blue-100 text-blue-700'
              },
              {
                title: 'Instituições',
                description: 'De ensino musical que desejam otimizar a gestão de ensaios',
                icon: MusicalNoteIcon,
                color: 'bg-indigo-100 text-indigo-700'
              },
              {
                title: 'Músicos',
                description: 'Que desejam ter acesso fácil às suas partituras e materiais de estudo',
                icon: StarIcon,
                color: 'bg-pink-100 text-pink-700'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
              Depoimentos
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">O que estão dizendo</span>
              <span className="block text-purple-700">sobre nós</span>
            </h2>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "A plataforma revolucionou a forma como gerencio minha orquestra. Agora consigo enviar partituras para todos os músicos em segundos!",
                name: "Maestro Roberto",
                role: "Maestro da Orquestra Sinfônica Jovem",
                stars: 5
              },
              {
                quote: "Como músico, ter acesso às partituras no meu celular mudou completamente meus ensaios. Consigo estudar em qualquer lugar!",
                name: "Carlos Eduardo",
                role: "Violinista",
                stars: 5
              },
              {
                quote: "A economia de tempo e papel foi significativa. Recomendo para todos os meus colegas maestros e gestores musicais.",
                name: "Ana Clara",
                role: "Regente de Coral",
                stars: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-5 w-5 ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-lg text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Planos e Preços</span>
              <span className="block text-purple-700">Acessíveis para todos</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Escolha o plano que melhor atende às necessidades do seu grupo musical.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-purple-100 transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold text-gray-900">Músico</h3>
              <p className="mt-4 text-gray-600">Perfeito para músicos individuais</p>
              
              <div className="mt-8">
                <p className="text-4xl font-extrabold text-gray-900">Grátis</p>
                <p className="mt-2 text-gray-500">para sempre</p>
              </div>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Acesso ao banco de partituras</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Visualização de partituras online</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Download de partituras públicas</span>
                </li>
              </ul>
              
              <button className="mt-8 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors">
                Começar agora
              </button>
            </div>
            
            {/* Gestor Básico */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-500 transform hover:scale-105 transition-transform">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Gestor Básico</h3>
                  <p className="mt-1 text-purple-600 font-medium">Até 5 músicos</p>
                </div>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">Popular</span>
              </div>
              
              <div className="mt-6">
                <p className="text-4xl font-extrabold text-gray-900">R$30</p>
                <p className="mt-1 text-gray-500">por mês</p>
              </div>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Todos os recursos do plano Músico</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Até 5 músicos na equipe</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Distribuição de partituras</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Agendamento de ensaios</span>
                </li>
              </ul>
              
              <button className="mt-8 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors">
                Assinar agora
              </button>
            </div>
            
            {/* Gestor Avançado */}
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-purple-100 transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold text-gray-900">Gestor Completo</h3>
              <p className="mt-1 text-gray-600">Para grandes grupos e orquestras</p>
              
              <div className="mt-6">
                <p className="text-4xl font-extrabold text-gray-900">R$50-80</p>
                <p className="mt-1 text-gray-500">por mês</p>
                <p className="text-sm text-gray-500 mt-1">(varia conforme o número de músicos)</p>
              </div>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Todos os recursos do plano Básico</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Até 10 músicos por R$50/mês</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Acima de 16 músicos por R$80/mês</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              
              <button className="mt-8 w-full bg-purple-100 text-purple-700 py-3 px-6 rounded-lg hover:bg-purple-200 transition-colors">
                Falar com vendas
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final CTA Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Pronto para transformar</span>
            <span className="block text-purple-300">sua gestão musical?</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Junte-se a bandas e orquestras que já estão revolucionando a forma como gerenciam seus ensaios e partituras.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/cadastro"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-900 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Comece agora gratuitamente
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/planos"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Ver planos completos
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnsaioNuvensHome;
