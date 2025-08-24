import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: {
          bg: 'rgba(255,255,255,0.03)',
          card: 'rgba(255,255,255,0.03)',
          border: 'rgba(255,255,255,0.08)',
          input: 'rgba(255,255,255,0.04)',
        },
      },
      backdropBlur: {
        glass: '16px',
      },
      keyframes: {
        fadeIn: { to: { opacity: '1' } },
        slideUp: { to: { opacity: '1', transform: 'translateY(0)' } },
        slideLeft: { to: { opacity: '1', transform: 'translateX(0)' } },
        slideRight: { to: { opacity: '1', transform: 'translateX(0)' } },
        blurIn: { to: { opacity: '1', filter: 'blur(0)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideUp: 'slideUp 0.8s ease-out forwards',
        slideLeft: 'slideLeft 0.8s ease-out forwards',
        slideRight: 'slideRight 0.8s ease-out forwards',
        blurIn: 'blurIn 0.8s ease-out forwards',
      },
    },
  },
} satisfies Config;



