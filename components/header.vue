<script setup lang="ts">
const router = useRouter()
const { currentRoute } = router
const navigation = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About',
        url: '/about',
    },
    {
        name: 'Blogs',
        url: '/blogs',
    },
    {
        name: 'Projects',
        url: '/projects',
    },
]

// const currentRoute = computed(() => {
//     return true
// })
</script>

<template>
    <header class="flex justify-center items-center mt-8">
        <nav class="pointer-events-auto">
            <ul
                class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                <li v-for="item in navigation">
                    <NuxtLink
                        class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                        :class="{
                            'text-teal-500 dark:text-teal-400':
                                currentRoute.path === item.url,
                        }"
                        :to="item.url"
                        >{{ item.name }}
                        <span
                            v-if="currentRoute.path === item.url"
                            class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0">
                        </span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>
