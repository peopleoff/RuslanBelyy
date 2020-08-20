<template>
  <div @click="toggleTheme">
    <img :src="require('@/assets/sun.png')" v-if="theme !== 'dark'" />
    <img :src="require('@/assets/moon.png')" v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light",
    };
  },
  beforeMount() {
    if ( window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.theme = "dark";
      document.body.setAttribute("data-theme", "dark");
    } else {
      this.theme = "light";
      document.body.setAttribute("data-theme", "light");
    }
  },
  methods: {
    toggleTheme() {
      if (this.theme == "dark") {
        this.theme = "light";
        document.body.setAttribute("data-theme", "light");
      } else {
        this.theme = "dark";
        document.body.setAttribute("data-theme", "dark");
      }
    },
  },
};
</script>

<style scoped>
div {
  padding: 0 20px;
  cursor: pointer;
}
img {
  height: 32px;
  width: 32px;
}
</style>