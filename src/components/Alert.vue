<template>
  <div :class="'alert alert-' + alert.type" v-if="alert.show">
    <a href="#" class="close" data-dismiss="alert" aria-label="close" v-on:click="close">&times;</a>
    {{alert.message}}
  </div>
</template>

<script>
export default {
  props: ["alert"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 5rem;
  right: 5%;
  z-index: 200;
  opacity: 1;
  padding: 25px;
  border: 1px solid #8c43ff;
  background: white;
  color: #8c43ff;
}
</style>