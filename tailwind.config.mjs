/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['IBM Plex Mono', 'monospace'],
        code: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brutal: {
          // Classic palette (default)
          'bg-classic': '#000000',
          'fg-classic': '#FFFFFF',
          'accent-classic': '#FFFFFF',

          // Hacker palette
          'bg-hacker': '#000000',
          'fg-hacker': '#FFFFFF',
          'accent-hacker': '#00FF00',

          // Industrial palette
          'bg-industrial': '#1A1A1A',
          'fg-industrial': '#FFFFFF',
          'accent-industrial': '#FFFF00',

          // Raw palette
          'bg-raw': '#FFFFFF',
          'fg-raw': '#000000',
          'accent-raw': '#FF0000',
        },
      },
      fontSize: {
        'hero': ['96px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h2': ['64px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h3': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'small': ['14px', { lineHeight: '1.5' }],
        'code': ['14px', { lineHeight: '1.6' }],
      },
      spacing: {
        'xs': '0.5rem',  // 8px
        'sm': '1rem',    // 16px
        'md': '2rem',    // 32px
        'lg': '4rem',    // 64px
        'xl': '8rem',    // 128px
      },
      borderWidth: {
        'thin': '2px',
        'medium': '5px',
        'thick': '10px',
      },
    },
  },
  plugins: [],
};
