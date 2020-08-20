<template>
  <!-- <section id="cd-timeline" class="cd-container">
    <div class="cd-timeline-block" v-for="items in projects" v-bind:key="items.fields.name">
      <div class="cd-timeline-img cd-picture" :style="'background-color: ' + items.fields.color">
        <img :src="items.fields.image" :alt="items.fields.name + ' Image'" />
      </div>
      <div class="cd-timeline-content">
        <h2>{{items.fields.name}}</h2>
        <p v-html="items.fields.description"></p>
        <div class="cd-built-with flex-left">
          <span v-for="(tech,index) in items.fields.frontEnd" v-bind:key="index">{{tech}}</span>
        </div>
        <a :href="items.fields.projectLink" class="cd-read-more">View Project</a>
      </div>
    </div>
  </section>-->
  <section id="projects">
    <div
      class="project d-flex align-items-center justify-content-center"
      v-for="(item, index) in projects"
      v-bind:key="item.fields.name"
    >
      <div
        :class="isEven(index)"
        class="d-flex flex-column align-items-start justify-content-around"
      >
        <h3>{{item.fields.name}}</h3>
        <p v-html="item.fields.description"></p>
        <div>
          <span
            v-for="(tech,index) in item.fields.frontEnd"
            v-bind:key="index"
            class="badge badge-pill badge-outline-primary"
          >{{tech}}</span>
        </div>
        <a
          class="btn btn-outline-primary"
          :href="item.fields.projectLink"
          target="_blank"
          rel="nofollow"
        >View Project</a>
      </div>
      <Deviceful
        class="d-none d-lg-block"
        :options="{'image': item.fields.name, 'size': item.fields.imageSize}"
      />
    </div>
  </section>
</template>

<script>
import Deviceful from "@/components/Deviceful";
export default {
  props: ["projects"],
  components: {
    Deviceful,
  },
  mounted() {
    window.addEventListener("scroll", function () {
      const projectsContainer = document.querySelector("#projects");
      const projectsTop = projectsContainer.offsetTop;
      if (window.scrollY > projectsTop) {
        // device.scroll({
        //   direction: "down", // 'up' or 'down'
        //   duration: 2000, // in milliseconds
        //   easing: "easeOutQuad", // default
        // });
      }
    });
  },
  methods: {
    isEven(value) {
      if (value % 2 == 0) {
        return "order-1";
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
#projects > div {
  height: 400px;
  width: 100%;
}

.project {
  padding: 4rem;
}

.project > div {
  height: 100%;
  width: 50%;
}

.project p {
  text-align: left;
}
.badge-outline-primary {
  color: #fff;
  background-color: #8c43ff;
  padding: 12px;
  margin: 5px;
}
.cd-built-with span {
  border-radius: 5px;
  border: 2px solid #8c43ff;
  padding: 8px;
  margin: 5px;
  font-size: 0.85em;
}

@media (max-width: 991.98px) {
  .project > div {
    height: 100%;
    width: 100%;
  }
}
</style>