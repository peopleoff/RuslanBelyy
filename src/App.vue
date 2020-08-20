<template>
  <div id="app">
    <TopNav />
    <Index />
    <BottomNav />
  </div>
</template>

<script>
import Index from "@/pages/Index.vue";
import TopNav from "@/components/Includes/TopNav";
import BottomNav from "@/components/Includes/BottomNav";

export default {
  name: "app",
  components: {
    Index,
    TopNav,
    BottomNav,
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "/css/main.css";
</style>
