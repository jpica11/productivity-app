import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    base: '/productivity-app/',
    test: {
        globals: true,
        environment: 'jsdom',
    },
    plugins: [
        svelte({
            compilerOptions: {
                hydratable: true,
            },
        }),
    ],
})
