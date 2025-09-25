/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Cores do tema
        primary: {
          DEFAULT: '#6A0DAD', // Roxo principal
          50: '#F5F0FF',
          100: '#E6D6FF',
          200: '#D1B3FF',
          300: '#B388FF',
          400: '#8C4DFF',
          500: '#6A0DAD', // Roxo principal
          600: '#5A0B94',
          700: '#4A097A',
          800: '#3A0761',
          900: '#2A0547',
        },
        black: '#000000',
        white: '#FFFFFF',
        silver: {
          DEFAULT: '#C0C0C0',
          light: '#E0E0E0',
          dark: '#A0A0A0',
        },
        // Cores de gradiente
        gradient: {
          purple: 'linear-gradient(135deg, #6A0DAD 0%, #8C4DFF 100%)',
          'purple-silver': 'linear-gradient(135deg, #6A0DAD 0%, #C0C0C0 100%)',
          'black-silver': 'linear-gradient(135deg, #000000 0%, #C0C0C0 100%)',
        },
        // Cores de suporte
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // Cores de fundo e texto
        background: '#FFFFFF',
        foreground: '#1F2937',
        muted: {
          DEFAULT: '#6B7280',
          foreground: '#9CA3AF',
        },
        // Cores de borda
        border: '#E5E7EB',
        input: '#F3F4F6',
        ring: '#6A0DAD',
        accent: {
          DEFAULT: '#F3F4F6',
          foreground: '#1F2937',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1F2937',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'blob': 'blob 7s infinite',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      // Adiciona suporte para backdrop-filter
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(8px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
