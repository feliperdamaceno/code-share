import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/types/assets.ts',
    'src/types/ecomm.ts',
    'src/types/product.ts'
  ],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  dts: true,
  clean: true
})
