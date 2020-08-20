<template>
  <nav class="navbar navbar-expand-lg d-flex justify-content-between shadow">
    <div class="logo">
      Ruslan
      <span class="primary">Belyy</span>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <ThemeToggle />
      <button class="btn btn-outline-primary my-2 my-sm-0" v-on:click="scrollDown()">Contact Me</button>
    </div>
  </nav>
</template>

<script>
import ThemeToggle from "@/components/ThemeToggle.vue";
export default {
  name: "top-nav",
  components: {
    ThemeToggle,
  },
  data() {
    return {};
  },
  methods: {
    scrollDown: function () {
      window.scroll({
        top: 100000,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
nav {
  position: fixed;
  width: 100%;
  background-color: var(--color-bg);
}

.right-side{
    display: flex;
    justify-content: center;
    align-items: center;
}

.shadow {
  z-index: 10000;
  box-shadow: 0 6px 2px -2px #eee;
}

.logo {
  font-size: 2rem;
}

.navbar {
  padding: 0.5rem 2rem;
}

a {
  color: #8c43ff;
}

a:hover {
  color: white;
}
</style>