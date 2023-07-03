<script setup lang="ts">
function skew(index: number) {
    return index % 2 == 0 ? 'rotate-2' : '-rotate-2'
}
</script>

<template>
    <ul
        role="list"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 transition delay-150">
        <project-item v-for="n in 4" class="hover:rotate-0" :class="skew(n)" />
    </ul>
</template>
