<script setup lang="ts">
const { data } = useAsyncData('blogList', () => {
    return queryCollection('content').all()
})

console.log(data.value)
</script>

<template>
    <div class="flex flex-col gap-16">
        <blog-item v-for="blog in data" :blog="blog" />
    </div>
</template>
