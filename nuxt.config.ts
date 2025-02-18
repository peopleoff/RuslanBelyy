// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    compatibilityDate: '2025-01-01',
    app: {
        head: {
            titleTemplate: 'Ruslan Belyy - Software Developer',
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                {
                    name: 'description',
                    content: '👋 Hey I’m Ruslan and I love to build things for the web.'
                }
            ]
        },
    },
    content: {
        build: {
            markdown: {
                highlight: {
                    theme: 'nord',
                    langs: ['json', 'js', 'javascript', 'jsx', 'ts', 'typescript', 'tsx'],
                }
            }
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@nuxt/content',
    ],
    googleFonts: {
        families: {
            Inter: [400, 700],
            Montserrat: [700],
        },
    },
})