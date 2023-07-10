<script setup lang="ts">
const projects = [
    {
        title: 'BillView',
        description:
            'Unlike traditional budgeting tools, BillView offers a fresh and innovative approach, empowering you to manage your finances with ease and efficiency.',
        link: 'https://billview.io',
    },
    {
        title: 'Floob',
        description:
            'Say goodbye to the frustration of trying to synchronize videos across different devices and start times. With Floob, you can now watch your favorite videos with your friends in real time, no matter where they are.',
        link: 'https://floob.gg',
    },
    {
        title: 'Readit',
        description:
            'Readit is a powerful Discord bot designed to bring the most popular and engaging content from any subreddit right to your server. With Readit, you and your community can stay up-to-date with the hottest posts, discussions, and memes from your favorite subreddits, all without leaving Discord.',
        link: 'https://github.com/peopleoff/readit',
    },
    {
        title: 'Ubiquiti Checker',
        description:
            "A game-changing bot designed to help you secure those hard-to-find items by automatically checking their availability and notifying you as soon as they're back in stock. Say goodbye to missing out on limited releases",
        link: '/blog/ubiquti-checker',
    },
]
function skew(index: number) {
    return index % 2 == 0 ? 'rotate-2' : '-rotate-2'
}
</script>

<template>
    <ul
        role="list"
        class="project-list grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16 transition delay-150">
        <project-item
            v-for="(project, index) in projects"
            class="hover:rotate-0"
            :project="project" />
    </ul>
</template>

<style>
.project-list:hover > .project-item {
    opacity: 50%;
}

.project-item:hover {
    opacity: 100% !important;
}
.project-cover:hover {
    opacity: 100% !important;
}
</style>
