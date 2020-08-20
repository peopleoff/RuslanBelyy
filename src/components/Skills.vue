<template>
  <section class="code-info">
    <div class="card">
      <h3>Skill Set</h3>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(skill, index) in skills.languages"
                v-bind:key="index"
              >{{skill}}</li>
            </ul>
          </div>
          <div class="col-sm">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(skill, index) in skills.tools"
                v-bind:key="index"
              >{{skill}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["skills"],
};
</script>

<style scoped>
.card {
  padding: 1rem;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: -30px;
  min-height: 30vh;
  width: 90%;
  background-color: var(--color-bg);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.list-group-item {
  background-color: var(--color-bg);
}
</style>