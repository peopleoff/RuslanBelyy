// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        head: {
            titleTemplate: 'Ruslan Belyy - Software Developer',
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@nuxt/content',
    ],
    content: {
        highlight: {
            theme: 'github-light',
        },
    },
    googleFonts: {
        families: {
            Inter: [400, 700],
            Montserrat: [700],
        },
    },
})
