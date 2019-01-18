<template>
  <div id="app">
    <TopNav/>
    <Index/>
    <BottomNav/>
  </div>
</template>

<script>
import Index from './components/Index.vue'
  import TopNav from '@/components/Includes/TopNav'
  import BottomNav from '@/components/Includes/BottomNav'

export default {
  name: 'app',
  components: {
    Index,
    TopNav,
    BottomNav
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
