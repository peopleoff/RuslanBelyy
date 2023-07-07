<script setup lang="ts">
defineProps<{
    project: {
        title: string
        description: string
        date: string
        slug: string
        _path: string
        link: string
    }
}>()
</script>

<template>
    <li
        class="group relative flex flex-col gap-6 px-2 py-4 rounded-2xl shadow-zinc-800/5 ring-1 ring-zinc-900/5 bg-zinc-50 transition dark:bg-zinc-800/50">
        <h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {{ project.title }}
        </h2>
        <p class="relative text-sm text-zinc-600 dark:text-zinc-400">
            {{ project.description }}
        </p>
        <a
            :href="project.link"
            class="relative z-10 flex text-sm font-medium text-teal-500">
            <icons-github class="text-teal-500" />
            <span class="ml-2">Check it out</span>
        </a>
    </li>
</template>
