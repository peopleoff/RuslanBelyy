<template>
  <section class="intro">
    <i class="fas fa-cloud"></i>
    <h1 class="head-line">Ruslan Belyy</h1>
    <h3 class="sub-header">Full Stack Developer</h3>
    <img class="avatar" src="images/avatars.svg" alt="Avatar image of Ruslan Belyy" />
    <div class="intro-footer">
      <div class="intro-hero">
        <img class="hero img-responsive" src="images/hero.png" alt />
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.intro {
  height: 95vh;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10vh;
}
.intro-footer {
  padding: 0rem 1.5rem;
}

.intro-hero {
  margin: 0 auto;
  position: relative;
}
.hero {
  height: auto;
  width: 50%;
}
</style>