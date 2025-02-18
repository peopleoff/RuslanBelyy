<script setup lang="ts"></script>

<template>
    <div class="">
        <div class="mx-auto max-w-7xl">
            <div class="relative">
                <div class="mx-auto max-w-2xl lg:max-w-5xl">
                    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                        <div class="lg:pl-20">
                            <div class="max-w-xs px-2.5 lg:max-w-none">
                                <nuxt-img alt="" loading="lazy" width="800" height="800" decoding="async"
                                    src="/images/profile.jpg"
                                    class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                                    style="color: transparent" />
                            </div>
                        </div>
                        <div class="lg:order-first lg:row-span-2">
                            <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                🤙 I’m Ruslan Belyy.
                                <br> I just like to build cool stuff.
                            </h1>
                            <div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                                <p>
                                    Ever since I was a kid, I've been the go-to
                                    tech guy in my family. Growing up playing
                                    games, building computers, and helping
                                    family members with every computer problem
                                    they could find led me into a passionate
                                    career in IT.
                                </p>
                                <p>
                                    Over the years, I've dedicated myself to
                                    honing my skills across various programming
                                    languages and frameworks. From web
                                    development to mobile applications, I've
                                    immersed myself in different domains, always
                                    seeking opportunities for growth and
                                    expanding my knowledge. Technology is a
                                    rapidly evolving field, and I find it
                                    exhilarating to stay ahead of the latest
                                    advancements and tackle new challenges along
                                    the way.
                                </p>
                            </div>
                        </div>
                        <div class="lg:pl-20">
                            <!-- <resume/> -->
                            <ul role="list">
                                <li class="mt-4 flex">
                                    <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="https://github.com/peopleoff">
                                        <icons-github />
                                        <span class="ml-4">
                                            Follow on GitHub
                                        </span>
                                    </a>
                                </li>
                                <li class="mt-4 flex">
                                    <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="https://www.linkedin.com/in/ruslan-belyy/">
                                        <icons-linkedin />
                                        <span class="ml-4">
                                            Follow on LinkedIn
                                        </span>
                                    </a>
                                </li>
                                <li class="mt-4 flex">
                                    <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="https://pixeldevs.digital/">
                                        <icons-pixeldevs />
                                        <span class="ml-4">
                                            Checkout PixelDevs
                                        </span>
                                    </a>
                                </li>
                                <li class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
                                    <a class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="mailto:ruslan@ruslanbelyy.com">
                                        <icons-email />
                                        <span class="ml-4">
                                            ruslan@ruslanbelyy.com
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
