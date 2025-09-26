import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  UserGroupIcon, 
  MusicalNoteIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  UserCircleIcon,
  CheckCircleIcon
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
        {/*Destaque central */}
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
      
      {/* Seção de Recursos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
              Recursos
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Tudo que você precisa</span>
              <span className="block text-purple-700">em um só lugar</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Uma plataforma completa para gerenciar todas as necessidades do seu grupo musical.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <DocumentTextIcon className="h-8 w-8 text-purple-600" />,
                title: 'Partituras Digitais',
                description: 'Armazene e compartilhe partituras com sua banda de forma segura e organizada.'
              },
              {
                icon: <UserGroupIcon className="h-8 w-8 text-purple-600" />,
                title: 'Gestão de Membros',
                description: 'Mantenha o controle dos integrantes da sua banda e suas respectivas funções.'
              },
              {
                icon: <MusicalNoteIcon className="h-8 w-8 text-purple-600" />,
                title: 'Repositório Musical',
                description: 'Acesse todo o repertório da sua banda em qualquer lugar, a qualquer momento.'
              },
              {
                icon: <CloudArrowUpIcon className="h-8 w-8 text-purple-600" />,
                title: 'Upload em Lote',
                description: 'Faça upload de várias partituras de uma vez e economize tempo.'
              },
              {
                icon: <UserCircleIcon className="h-8 w-8 text-purple-600" />,
                title: 'Perfis Personalizados',
                description: 'Cada músico tem seu próprio perfil com acesso personalizado.'
              },
              {
                icon: <CheckCircleIcon className="h-8 w-8 text-purple-600" />,
                title: 'Controle de Versões',
                description: 'Acompanhe as alterações nas partituras e mantenha o histórico de versões.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de CTA */}
      {/* Seção de Depoimentos */}
      <section className="py-16 bg-white">
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
                    <div key={i} className="text-yellow-400">
                      ★
                    </div>
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
      </section>
      
      {/* Seção de Preços */}
      <section className="py-16 bg-gray-50">
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
            {/* Plano Grátis */}
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
              
              <Link
                to="/cadastro"
                className="mt-8 block w-full text-center bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Começar agora
              </Link>
            </div>
            
            {/* Plano Básico */}
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
              
              <Link
                to="/cadastro?plano=basico"
                className="mt-8 block w-full text-center bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Assinar agora
              </Link>
            </div>
            
            {/* Plano Completo */}
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
              
              <Link
                to="/contato"
                className="mt-8 block w-full text-center bg-purple-100 text-purple-700 py-3 px-6 rounded-lg hover:bg-purple-200 transition-colors"
              >
                Falar com vendas
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="relative bg-gradient-to-r from-purple-900 to-black overflow-hidden py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Pronto para transformar</span>
            <span className="block text-purple-300">sua gestão musical?</span>
          </h2>
          <p className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto">
            Junte-se a centenas de músicos que já estão otimizando seus ensaios e apresentações com nossa plataforma.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/cadastro"
              className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-purple-900 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Comece agora gratuitamente
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/planos"
              className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Ver planos completos
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Nossos Números</span>
              <span className="block text-purple-700">Impacto Real</span>
            </h2>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: '500+', label: 'Músicos Atendidos' },
              { number: '85%', label: 'Aumento na Produtividade' },
              { number: '10k+', label: 'Partituras Distribuídas' },
              { number: '4.9', label: 'Avaliação Média (5.0)' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-purple-700">{stat.number}</p>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Perguntas Frequentes
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Encontre respostas para as dúvidas mais comuns sobre nossa plataforma.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                question: "Como faço para começar a usar a plataforma?",
                answer: "Basta criar uma conta gratuita, fazer login e você terá acesso imediato aos recursos básicos. Para recursos avançados, você pode fazer upgrade a qualquer momento."
              },
              {
                question: "Posso testar antes de assinar?",
                answer: "Sim! Oferecemos um período de teste gratuito de 14 dias para todos os planos pagos, sem necessidade de cartão de crédito."
              },
              {
                question: "Como funciona o cancelamento?",
                answer: "Você pode cancelar sua assinatura a qualquer momento. Seu acesso continuará até o final do período já pago."
              },
              {
                question: "Quais são os métodos de pagamento aceitos?",
                answer: "Aceitamos todos os principais cartões de crédito, PIX e boleto bancário."
              },
              {
                question: "Preciso instalar algum software?",
                answer: "Não, nossa plataforma é 100% baseada na web e funciona diretamente no seu navegador. Não é necessário instalar nada."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Afiliados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl p-8 md:p-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Seja um Afiliado
                </h2>
                <p className="mt-4 text-lg text-purple-100">
                  Indique a plataforma Ensaio nas Nuvens e ganhe comissão por cada assinatura ativa. 
                  Programa perfeito para maestros, professores de música e influenciadores musicais.
                </p>
                <div className="mt-6">
                  <Link
                    to="/afiliados"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-gray-100"
                  >
                    Quero ser um afiliado
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="mt-8 md:mt-0 md:ml-8">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">Até 30% de comissão</p>
                  <p className="mt-2 text-purple-100">por indicação bem-sucedida</p>
                  <ul className="mt-4 space-y-2 text-purple-100">
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                      Pagamentos mensais
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                      Materiais de divulgação
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                      Suporte dedicado
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnsaioNuvensHome;
