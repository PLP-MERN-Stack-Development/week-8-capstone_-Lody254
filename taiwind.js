/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          primary: '#dc2626',
          secondary: '#fef2f2',
          accent: '#fee2e2'
        },
        finance: {
          primary: '#059669',
          secondary: '#f0fdf4',
          accent: '#dcfce7'
        },
        chatbot: {
          primary: '#3b82f6',
          secondary: '#eff6ff',
          accent: '#dbeafe'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      fontFamily: {
        'medical': ['Inter', 'system-ui', 'sans-serif'],
        'finance': ['Roboto', 'system-ui', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      maxWidth: {
        '8xl': '88rem'
      },
      boxShadow: {
        'chatbot': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'message': '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  safelist: [
    'animate-bounce',
    'animate-pulse',
    'animate-spin',
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'text-red-500',
    'text-green-500',
    'text-blue-500',
    'text-yellow-500'
  ]
};