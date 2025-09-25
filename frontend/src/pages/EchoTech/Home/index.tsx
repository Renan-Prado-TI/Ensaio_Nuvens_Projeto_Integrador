import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
// Importações do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Configuração dos módulos do Swiper
export const swiperModules = [EffectCoverflow, Pagination, Navigation, Autoplay];

// Components
import MissionVision from '../../../components/EchoTech/MissionVision';
import Values from '../../../components/EchoTech/Values';
import TeamMember from '../../../components/EchoTech/TeamMember';

// Team Members Data
const teamMembers = [
  {
    name: 'Renan Prado',
    role: 'Product Owner',
    description: 'Responsável por definir a visão do produto, priorizar funcionalidades e garantir que o time esteja alinhado com os objetivos do negócio.',
    email: 'renan@echotech.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    name: 'Mariana Pedro',
    role: 'Quality Assurance',
    description: 'Garante a qualidade do software através de testes rigorosos, identificando e relatando problemas para melhorar a experiência do usuário.',
    email: 'mariana@echotech.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    name: 'Murilo Augusto',
    role: 'Front-End Developer',
    description: 'Desenvolve a interface do usuário, transformando designs em código para criar experiências interativas e responsivas.',
    email: 'murilo@echotech.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    name: 'Vinicius Lima',
    role: 'Back-End Developer',
    description: 'Responsável pela lógica do servidor, banco de dados e integrações, garantindo que tudo funcione perfeitamente nos bastidores.',
    email: 'vinicius@echotech.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    name: 'Marianny Souza',
    role: 'Design e UX/UI',
    description: 'Cria interfaces bonitas e intuitivas, garantindo que os usuários tenham uma experiência agradável e eficiente ao usar nossos produtos.',
    email: 'marianny@echotech.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  }
];

const EchoTechHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div id="top" className="relative bg-gradient-to-r from-[#6A0DAD] to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 py-24 sm:py-32 lg:py-40">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Bem-vindo à EchoTech</span>
                <span className="block text-[#C0C0C0]">Inovação em Soluções Digitais</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-lg text-purple-100 sm:text-xl md:mt-8 md:max-w-3xl">
                Transformando ideias em realidade através de tecnologia de ponta e desenvolvimento criativo.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/ensaionuvens"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6A0DAD] hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Conheça o Projeto Ensaio Nuvens
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#contato"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#6A0DAD] bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Fale Conosco
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quem Somos */}
      <div id="quem-somos" className="py-16 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Quem Somos
            </h2>
            <div className="mt-6 max-w-4xl mx-auto text-lg text-gray-600 text-left">
              <p className="mb-4">
                Somos a EchoTech, um grupo formado por cinco estudantes do curso de Gestão da Tecnologia da Informação da FATEC Guaratinguetá. 
                Acreditamos que a tecnologia tem um papel importante na vida das pessoas quando é usada para ouvir, entender e melhorar a rotina de quem está do outro lado.
              </p>
              <p>
                Nosso propósito é criar soluções simples e inovadoras, que acompanhem a evolução do dia a dia e facilitem a vida de quem usa. 
                Foi com esse pensamento que desenvolvemos nosso primeiro projeto: Ensaio nas Nuvens, uma plataforma moderna que ajuda gestores e 
                maestros a organizarem os ensaios de forma prática e conectada, deixando o papel de lado e trazendo mais agilidade e organização para o ambiente musical.
              </p>
            </div>
          </div>

          {/* Missão e Visão */}
          <div id="missao-visao" className="mb-16 scroll-mt-16">
            <MissionVision />
          </div>

          {/* Valores */}
          <div className="mb-16">
            <Values />
          </div>
        </div>
      </div>

      {/* Nossa Equipe */}
      <div id="nossa-equipe" className="py-16 bg-gray-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nossa Equipe
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Conheça o time por trás da EchoTech
            </p>
          </div>

          <div className="relative">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="mySwiper"
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40
                }
              }}
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={index} className="py-10">
                  <TeamMember {...member} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Contato */}
      <div id="contato" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Entre em Contato
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Tem alguma dúvida ou sugestão? Fale conosco!
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Assunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#6A0DAD] to-[#8A2BE2] hover:from-[#5A0B9C] hover:to-[#7A22D8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
            
            {/* Informações de Contato - Agora abaixo do formulário */}
            <div className="bg-gradient-to-b from-[#6A0DAD] to-black p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Informações de Contato</h3>
              <p className="mb-6">Estamos ansiosos para ouvir de você!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-purple-600 rounded-full mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-purple-100">contato@echotech.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-purple-600 rounded-full mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-purple-100">+55 (12) 3456-7890</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-purple-600 rounded-full mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-purple-100">FATEC Guaratinguetá<br />Guaratinguetá - SP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EchoTechHome;
