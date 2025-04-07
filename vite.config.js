// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/online-web-tools/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                passGenerator: resolve(__dirname, 'pages/gerador-de-senhas/index.html'),
                raffle: resolve(__dirname, 'pages/sorteador/index.html'),
                textConverter: resolve(__dirname, 'pages/conversor-de-texto/index.html'),
                characterCounter: resolve(__dirname, 'pages/contador-de-caracteres/index.html'),
                textComparator: resolve(__dirname, 'pages/comparador-de-texto/index.html'),
            },
        },
        cssMinify: 'lightningcss',
    },
    css: {
        extract: true,
    },
})