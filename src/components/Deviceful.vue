<template>
  <div :id="options.image"></div>
</template>

<script>
import Deviceful from "deviceful";
export default {
  props: ["options"],
  data() {
    return {
      device: null,
    };
  },
  methods: {
    test() {
      const device = new Deviceful({
        parent: `#${this.options.image}`,
        device: "laptop",
        screenshot: `images/deviceful/${this.options.image}.png`,
        screenshotHeight: this.options.size,
      });

      device.swivel({
        to: -15, // Degrees to swivel to
        duration: 600, // in milliseconds
        easing: "swingTo", // A full list of available easing options is found in the Advanced Animations section below
      });

      device.mount();
      this.device = device;
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      const projectsContainer = document.querySelector(
        `#${this.options.image}`
      );
      const projectsTop = projectsContainer.offsetTop;
      if (window.scrollY > projectsTop - 300) {
        this.device.scroll({
          direction: "down", // 'up' or 'down'
          duration: 4000, // in milliseconds
          easing: "easeOutQuad", // default
        });
        this.device.swivel({
          to: 0, // Degrees to swivel to
          duration: 600, // in milliseconds
          easing: "swingTo", // A full list of available easing options is found in the Advanced Animations section below
        });
      }
      if (window.scrollY < projectsTop - 300) {
        this.device.scroll({
          direction: "up", // 'up' or 'down'
          duration: 3000, // in milliseconds
          easing: "easeOutQuad", // default
        });
        this.device.swivel({
          to: -15, // Degrees to swivel to
          duration: 600, // in milliseconds
          easing: "swingTo", // A full list of available easing options is found in the Advanced Animations section below
        });
      }
    });
    this.test();
  },
};
</script>

<style>
</style>