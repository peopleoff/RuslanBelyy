<template>
  <div class="main">
    <Alert :alert="alert" />
    <Hero />
    <PersonalInfo />
    <Skills :skills="skills" />
    <header>
      <h1>Recent Projects</h1>
    </header>
    <Projects :projects="projects" />
    <ContactForm />
  </div>
</template>

<script>
import Projects from "@/components/Projects.vue";
import Skills from "@/components/Skills.vue";
import PersonalInfo from "@/components/PersonalInfo.vue";
import ContactForm from "@/components/ContactForm.vue";
import Alert from "@/components/Alert.vue";
import Hero from "@/components/Hero.vue";

export default {
  name: "Index",
  components: {
    Projects,
    Skills,
    PersonalInfo,
    ContactForm,
    Alert,
    Hero,
  },
  data() {
    return {
      projects: [],
      skills: [],
      description: null,
      alert: {
        show: false,
        message: "",
        type: "",
      },
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects: function () {
      this.$contentful
        .getEntries("Projects")
        .then((res) => {
          res.items.forEach((element) => {
            let type = element.sys.contentType.sys.id;
            if (type == "projects") {
              this.projects.push(element);
            }
            if (type == "skills") {
              this.skills = element.fields;
            }
            if (type == "description") {
              this.description = element.fields.description;
            }
          });
        })
        .catch(() => {
          this.alert.show = true;
          this.alert.message =
            "There was an error retrieving the projects. Please refresh the page.";
        });
    },
    close: function () {
      this.alert.show = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>