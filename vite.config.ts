import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],

    server: {
        port: 9092,
        strictPort: true,
        open: true,
    },

    build: {
        outDir: 'build',
        sourcemap: true,
    },
});
