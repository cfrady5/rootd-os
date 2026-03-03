/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: { DEFAULT: '#4c5937', dark: '#3a4528', light: '#6b7a4e' },
        cream: { DEFAULT: '#F7F3EB', dark: '#ede7d9' },
        sage: { DEFAULT: '#e8eed8', dark: '#d4deba' },
        charcoal: { DEFAULT: '#1F1F1F', muted: '#4a4a4a' },
        body: '#f4f6f4',
      },
      fontFamily: {
        display: ['Clash Display', 'Space Grotesk', 'sans-serif'],
        body: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs: '4px', sm: '6px', md: '10px', lg: '14px', xl: '20px',
      },
      boxShadow: {
        xs: '0 1px 3px rgba(0,0,0,0.06)',
        sm: '0 2px 8px rgba(0,0,0,0.08)',
        md: '0 4px 16px rgba(0,0,0,0.10)',
        lg: '0 8px 32px rgba(0,0,0,0.12)',
        glow: '0 0 20px rgba(76,89,55,0.18)',
      },
    },
  },
  plugins: [],
}
