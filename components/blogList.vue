<script setup lang="ts">
const { data } = useAsyncData('blogList', () => {
    return queryContent('/blog').sort({ date: -1 }).find()
})
</script>

<template>
    <div class="flex flex-col gap-16">
        <blog-item v-for="blog in data" :blog="blog" />
    </div>
</template>
