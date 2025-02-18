<script setup lang="ts">
defineProps<{
    project: {
        title: string
        description: string
        link: string
    }
}>()
</script>

<template>
    <li class="project-item group relative flex flex-col gap-6 px-2 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 shadow-zinc-800/5 ring-1 ring-zinc-900/5 border border-zinc-800 h-full">
        <h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {{ project.title }}
        </h2>
        <p class="relative text-sm text-zinc-600 dark:text-zinc-400 flex-grow">
            {{ project.description }}
        </p>
        <a
            :href="project.link"
            target="_blank"
            class="relative z-10 flex align-center gap-x-1 text-sm font-medium text-teal-500 mt-auto">
            <span>Check it out</span>
            <icons-arrow class="text-teal-500 w-4" />
        </a>
    </li>
</template>
