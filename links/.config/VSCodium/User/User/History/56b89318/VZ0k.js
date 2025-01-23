import plugin from 'tailwindcss/plugin';
import { colors } from './project.config.js';

const radialGradientPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      // map to bg-radient-[*]
      'bg-radient': (value) => ({
        'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`
      })
    },
    { values: theme('radialGradients') }
  );
});

const hocusPlugin = plugin(function ({ addVariant }) {
  // Add hocus utility variant
  addVariant('hocus', ['&:hover', '&:focus']);
});

const textShadowPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'text-shadow': (value) => ({
        textShadow: value
      })
    },
    {
      values: theme('textShadow')
    }
  );
});

const textWrapPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.text-wrap-none': {
      textWrap: 'none'
    },
    '.text-wrap-balance': {
      textWrap: 'balance'
    }
  });
});

const ligaturesPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.ligatures-normal': {
      fontVariantLigatures: 'normal'
    },
    '.ligatures-none': {
      fontVariantLigatures: 'none'
    }
  });
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js,svelte,md,svx,mdx}', '!./node_modules/**'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'],
        mono: ['JetBrains Mono']
      },
      colors: {
        primary: colors.tailwindColors,
        'text-body': {
          DEFAULT: 'theme(colors.neutral.500)',
          dark: 'theme(colors.neutral.400)'
        },
        'text-heading': {
          DEFAULT: 'theme(colors.neutral.900)',
          dark: 'theme(colors.neutral.100)'
        },
        body: {
          DEFAULT: 'theme(colors.white)',
          dark: 'theme(colors.neutral.900)'
        }
      },
      textShadow: {
        code: '0 1px rgba(0, 0, 0, 0.3)',
        none: 'none'
      },
      borderColor: {
        main: {
          DEFAULT: 'theme(colors.neutral.300/50)',
          dark: 'theme(colors.neutral.800)'
        }
      }
    }
  },
  plugins: [
    radialGradientPlugin,
    hocusPlugin,
    textShadowPlugin,
    textWrapPlugin,
    ligaturesPlugin,
  ],
  darkMode: 'class',
};
