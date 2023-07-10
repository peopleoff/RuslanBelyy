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
    <li class="project-item group relative flex flex-col gap-6 px-2 py-4 h-max rounded-2xl bg-zinc-900 shadow-zinc-800/5 ring-1 ring-zinc-900/5">
        <!-- <div
            class="project-cover z-10 absolute h-full w-full scale-105 rounded-2xl shadow-zinc-800/5 ring-1 ring-zinc-900/5 bg-zinc-50 transition bg-transparent hover:dark:bg-zinc-800/50"></div> -->
        <h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {{ project.title }}
        </h2>
        <p class="relative text-sm text-zinc-600 dark:text-zinc-400">
            {{ project.description }}
        </p>
        <a
            :href="project.link"
            target="_blank"
            class="relative z-10 flex align-center gap-x-1 text-sm font-medium text-teal-500">
            <span>Check it out</span>
            <icons-arrow class="text-teal-500 w-4" />
        </a>
    </li>
</template>
