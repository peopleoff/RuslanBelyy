<template>
  <div id="app">
    <TopNav/>
    <router-view/>
    <BottomNav/>
  </div>
</template>

<script>
  import TopNav from '@/components/Includes/TopNav'
  import BottomNav from '@/components/Includes/BottomNav'

export default {
  name: 'App',

  components: {
    TopNav,
    BottomNav
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
