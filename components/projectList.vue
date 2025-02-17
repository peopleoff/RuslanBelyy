<script setup lang="ts">
const projects = [
    {
        title: 'RequestView',
        description:
            'A tool that allows users to generate a unique URL for testing their requests, enabling them to send requests and view them with certainty, eliminating guesswork about request dispatch and appearance.',
        link: 'https://requestview.io/',
    },
    {
        title: 'AstroView',
        description:
            'Astro is an AI-powered astrology website offering daily horoscopes and insightful guidance on life\'s questions, delivering the wisdom of the stars with precision and empathy.',
        link: 'https://astroview.io/',
    },
    {
        title: 'BillView',
        description:
            'Unlike traditional budgeting tools, BillView offers a fresh and innovative approach, empowering you to manage your finances with ease and efficiency.',
        link: 'https://billview.io',
    },
    {
        title: 'TCGView',
        description:
            'TCGView is a tool that allows users to view and manage their TCG collections, enabling them to track their collections and share them with others.',
        link: 'https://tcgview.app/',
    },
    {
        title: 'Readit',
        description:
            'Readit is a powerful Discord bot designed to bring the most popular and engaging content from any subreddit right to your server. With Readit, you and your community can stay up-to-date with the hottest posts, discussions, and memes from your favorite subreddits, all without leaving Discord.',
        link: 'https://github.com/peopleoff/readit',
    },
    {
        title: 'Alertifi',
        description:
            "A game-changing site designed to help you secure those hard-to-find items by automatically checking their availability and notifying you as soon as they're back in stock. Say goodbye to missing out on limited releases",
        link: 'https://alertifi.io/',
    },
]

</script>

<template>
    <ul
        role="list"
        class="project-list grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16 transition delay-150">
        <project-item
            v-for="project in projects"
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
