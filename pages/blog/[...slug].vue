<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug[0];
const { data: page } = await useAsyncData(slug, () => {
    return queryCollection('content').path(`/${slug}`).first()
});
</script>


<template>
    <article class="prose prose-zinc dark:prose-invert max-w-none">
        <ContentRenderer v-if="page" :value="page">
        </ContentRenderer>
    </article>
</template>
