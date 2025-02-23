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
