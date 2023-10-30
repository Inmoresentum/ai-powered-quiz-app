import react from '@vitejs/plugin-react';
import type { UserConfigFn } from 'vite';
import { overrideVaadinConfig } from './vite.generated';
import path from "path";

const customConfig: UserConfigFn = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend/"),
    },
  },
});

export default overrideVaadinConfig(customConfig);
