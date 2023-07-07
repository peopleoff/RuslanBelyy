<script setup lang="ts">
const word = ref('')
const letters = 'abcdefghijklmnopqrstuvwxyz'
const passions = ['poker player', 'wood worker', 'gamer']

function getRandomWord(): string {
    //save the index of the word we return so we don't return the same word twice
    const randomIndex = Math.floor(Math.random() * passions.length)

    return passions[randomIndex]
}
function changePassion() {
    let interval: string | number | NodeJS.Timeout | undefined
    let iteration = 0
    clearInterval(interval)
    const passion = getRandomWord()

    interval = setInterval(() => {
        word.value = passion
            .split('')
            .map((letter: any, index: number) => {
                if (index < iteration) {
                    return passion[index]
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join('')

        if (iteration >= word.value.length) {
            clearInterval(interval)
        }

        iteration += 1 / 3
    }, 30)
}

onMounted(() => {
    changePassion()
})
</script>

<template>
    <div>
        <div class="mx-auto max-w-7xl">
            <div class="relative">
                <div class="mx-auto">
                    <div class="max-w-2xl">
                        <h1
                            class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                            Software designer, founder, and amateur
                            <span class="passion" @mouseenter="changePassion">{{
                                word
                            }}</span
                            >.
                        </h1>
                        <p
                            class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                            I’m Spencer, a software designer and entrepreneur
                            based in New York City. I’m the founder and CEO of
                            Planetaria, where we develop technologies that
                            empower regular people to explore space on their own
                            terms.
                        </p>
                        <div class="mt-6 flex gap-6">
                            <a
                                class="group -m-1 p-1"
                                aria-label="Follow on GitHub"
                                href="https://github.com">
                                <icons-github />
                            </a>
                            <a
                                class="group -m-1 p-1"
                                aria-label="Follow on LinkedIn"
                                href="https://linkedin.com">
                                <icons-linkedin />
                            </a>
                            <a
                                class="group -m-1 p-1"
                                aria-label="Follow on LinkedIn"
                                href="https://linkedin.com">
                                <icons-codepen />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-24 md:mt-28">
        <div class="grid grid-cols-1 md:gap-x-20 gap-y-20 lg:grid-cols-3">
            <div class="col-span-2">
                <h2
                    class="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl mb-10">
                    Projects
                </h2>
                <project-list />
            </div>
            <div>
                <h2
                    class="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl mb-10">
                    Blogs
                </h2>
                <div
                    class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                    <blog-list />
                </div>
            </div>
        </div>
    </div>
</template>
