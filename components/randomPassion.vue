<script setup lang="ts">
const word = ref('')
const letters = 'abcdefghijklmnopqrstuvwxyz'
const passions = ['wood worker', 'poker player', 'gamer']
const lastPassionIndex = ref(0)

function showNextPassion(): string {
    const passion = passions[lastPassionIndex.value]
    //Increment passion index by 1 until reaches length, then reset
    if (lastPassionIndex.value >= passions.length - 1) {
        lastPassionIndex.value = 0
    } else {
        lastPassionIndex.value++
    }
    return passion
}
function changePassion() {
    let interval: string | number | NodeJS.Timeout | undefined
    let iteration = 0
    clearInterval(interval)
    const passion = showNextPassion()

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
    <span class="passion" @mouseenter="changePassion">{{ word }}</span>
</template>
