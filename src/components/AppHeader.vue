<script>
export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      name: "Главная",
      routes: [{}],
    };
  },
  methods: {
    checkRoute() {
      try {
        console.log(this.name);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <header class="header">
    <span>{{ name }}</span>
  </header>
</template>
<style scoped>
.header {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 73px;
}
</style>
