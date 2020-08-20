<template>
  <section id="personal-info" class="d-flex align-items-center justify-content-center">
    <p>
      As a developer I strive
      for efficiency.
      But, in today's online world, being fast and responsive just doesn't cut it.
      Being effective today requires a keen balance between passion, optimization, and aesthetics.
    </p>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
#personal-info {
  padding: 1rem;
  color: #fff;
  min-height: 30vh;
  background-color: #8c43ff;
  text-align: center;
  font-size: 1.5em;
}

#personal-info p {
  width: 50%;
}

@media (max-width: 991.98px) {
  #personal-info {
    min-height: 25vh;
  }
  #personal-info p {
    width: 75%;
  }
}

@media (max-width: 767.98px) {
  #personal-info {
    min-height: 25vh;
  }
  #personal-info p {
    width: 100%;
    font-size: 1rem;
  }
}
</style>