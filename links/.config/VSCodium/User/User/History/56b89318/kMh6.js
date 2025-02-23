import { colors } from './project.config.js';
import {
  radialGradientPlugin,
  hocusPlugin,
  textShadowPlugin,
  textWrapPlugin,
  ligaturesPlugin
} from './plugins.tailwind.js';

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
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-in': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
    }
  },
  plugins: [radialGradientPlugin, hocusPlugin, textShadowPlugin, textWrapPlugin, ligaturesPlugin],
  darkMode: 'class'
};
