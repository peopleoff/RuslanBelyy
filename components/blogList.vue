<script setup lang="ts">
const { data } = useAsyncData('blog-list', async () => {
    return queryCollection('content')
    .order('meta', 'DESC')
    .all()
})

console.log(data.value)
</script>

<template>
    <div class="flex flex-col gap-16">
        <blog-item v-for="blog in data" :blog="blog" />
    </div>
</template>
