import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Optimallashtirish sozlamalari
      png: {
        quality: 75, // PNG sifati (0-100)
      },
      jpeg: {
        quality: 75, // JPEG sifati (0-100)
      },
      webp: {
        quality: 75, // WebP sifati (0-100)
      },
      // Qo‘llaniladigan fayl turlari
      include: /\.(png|jpe?g|gif)$/,
      // Istisno qilinadigan papkalar (masalan, node_modules)
      exclude: /node_modules/,
    }),
  ],
});
