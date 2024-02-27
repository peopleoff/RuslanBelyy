<script setup lang="ts">
const { x, y } = useMouse()
useHead({
    bodyAttrs: {
        class: 'flex h-full flex-col bg-zinc-50 dark:bg-black',
    },
})


const lightStyle = computed(() => {
    return {
        top: `${y.value}px`,
        left: `${x.value}px`,
    }
})
</script>

<template>
    <div class="inset-0 flex justify-center sm:px-8 z-30">
        <div
            id="light"
            class="pointer-events-none"
            :data-y="y"
            :style="lightStyle"></div>
        <div id="blur" class="pointer-events-none"></div>
        <div class="flex w-full max-w-7xl lg:px-8">
            <div
                class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
                <Header />
                <main class="my-16 sm:my-32 px-4 md:px-20">
                    <NuxtPage />
                </main>
            </div>
        </div>
    </div>
</template>

<style scoped>
#light {
    height: 25vmax;
    aspect-ratio: 1;
    position: absolute;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(to right, aquamarine, mediumpurple);
    filter: blur(70px);
    opacity: 0.3;
}
</style>
