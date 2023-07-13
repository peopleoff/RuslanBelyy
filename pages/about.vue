<script setup lang="ts"></script>

<template>
    <div class="">
        <div class="mx-auto max-w-7xl">
            <div class="relative">
                <div class="mx-auto max-w-2xl lg:max-w-5xl">
                    <div
                        class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                        <div class="lg:pl-20">
                            <div class="max-w-xs px-2.5 lg:max-w-none">
                                <nuxt-img
                                    alt=""
                                    loading="lazy"
                                    width="800"
                                    height="800"
                                    decoding="async"
                                    src="/images/profile.jpg"
                                    class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                                    style="color: transparent" />
                            </div>
                        </div>
                        <div class="lg:order-first lg:row-span-2">
                            <h1
                                class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                🤙 I’m Ruslan Belyy. Currently working on beating
                                Elon to the moon.
                            </h1>
                            <div
                                class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
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
                                <p>
                                    Nowadays you'll find me as the CTO of
                                    Intruity, where I help arcitect and enginner
                                    the soltuoins that enable our developers and
                                    technology to scale. I'm also a co-founder
                                    of PixelDevs, our ambition is to transform
                                    your concepts into tangible realities,
                                    making it easier to place your vision
                                    directly into your clients' hands. Feel free
                                    to take a look around my portfolio to see
                                    what I've been up to.
                                </p>
                            </div>
                        </div>
                        <div class="lg:pl-20">
                            <!-- <resume/> -->
                            <ul role="list">
                                <li class="mt-4 flex">
                                    <a
                                        class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="/about#">
                                        <icons-github />
                                        <span class="ml-4">
                                            Follow on GitHub
                                        </span>
                                    </a>
                                </li>
                                <li class="mt-4 flex">
                                    <a
                                        class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="/about#">
                                        <icons-linkedin />
                                        <span class="ml-4">
                                            Follow on LinkedIn
                                        </span>
                                    </a>
                                </li>
                                <li class="mt-4 flex">
                                    <a
                                        class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="/about#">
                                        <icons-codepen />
                                        <span class="ml-4">
                                            Follow on Codepen
                                        </span>
                                    </a>
                                </li>
                                <li
                                    class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
                                    <a
                                        class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                                        href="mailto:spencer@planetaria.tech">
                                        <icons-email />
                                        <span class="ml-4">
                                            ruslan@pixeldevs.digital
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
