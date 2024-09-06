// uno.config.ts
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  presetWind,
  presetIcons
} from 'unocss'
// import presetWind from '@unocss/preset-wind'

export default defineConfig({
  rules: [
    [
      'm-safe',
      {
        'margin-top': 'env(safe-area-inset-top)',
        'margin-right': 'env(safe-area-inset-right)',
        'margin-bottom': 'env(safe-area-inset-bottom)',
        'margin-left': 'env(safe-area-inset-left)'
      }
    ]
  ],
  presets: [
    presetWind(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xl2: '1440px',
      '2xl': '1536px'
    }
  },
  safelist: ['i-ep:full-screen', 'i-ri:fullscreen-exit-fill'],
  transformers: [transformerDirectives()]
})
