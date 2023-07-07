<script setup lang="ts">
const { data } = useAsyncData('projectList', () => {
    return queryContent('/project').sort({ date: -1 }).find()
})
function skew(index: number) {
    return index % 2 == 0 ? 'rotate-2' : '-rotate-2'
}
</script>

<template>
    <ul
        role="list"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 transition delay-150">
        <project-item
            v-for="(project, index) in data"
            class="hover:rotate-0"
            :class="skew(index)"
            :project="project" />
    </ul>
</template>
