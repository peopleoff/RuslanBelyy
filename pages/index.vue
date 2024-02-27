<script setup lang="ts"></script>

<template>
    <div>
        <div class="mx-auto max-w-7xl">
            <div class="relative">
                <div class="mx-auto">
                    <div class="max-w-2xl">
                        <h1
                            class="text-4xl py-4 font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                            Software engineer, founder, and aspiring
                            <random-passion />.
                        </h1>
                        <p
                            class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                            👋 Hey I’m Ruslan and I love to build things for the
                            web. Currently working as the COO of
                            <a
                                href="https://intruity.com/"
                                target="_blank"
                                class="underline"
                                >Intruity</a
                            >, and co-founder of
                            <a
                                href="https://pixeldevs.digital"
                                target="_blank"
                                class="underline"
                                >PixelDevs</a
                            >. My driving passion is building intuitive and
                            scalable web apps from server architecture to
                            development
                        </p>
                        <div class="mt-6 flex gap-6">
                            <a
                                class="group -m-1 p-1"
                                aria-label="Follow on GitHub"
                                href="https://github.com/peopleoff">
                                <icons-github />
                            </a>
                            <a
                                class="group -m-1 p-1"
                                aria-label="Follow on LinkedIn"
                                href="https://www.linkedin.com/in/ruslan-belyy-56052a134">
                                <icons-linkedin />
                            </a>
                            <a
                                class="group -m-1 p-1"
                                aria-label="Follow on codepen"
                                href="https://codepen.io/peopleoff">
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
                <p class="my-4 text-base text-zinc-600 dark:text-zinc-400">
                    To see some of my client work, check me out at <a href="https://pixeldevs.digital" class="underline cursor-pointer">PixelDevs</a>
                </p>
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
