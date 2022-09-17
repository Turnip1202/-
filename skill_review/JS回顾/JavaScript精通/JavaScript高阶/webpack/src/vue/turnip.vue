<template>
  <div>
    <p>{{ message }}</p>
    <h1 class="title">萝卜</h1>
    <kang></kang>
  </div>
</template>

<script>
import kang from "./kang.vue";
export default {
  name: "App",
  components: {
    kang,
  },
  data() {
    return {
      message: "萝卜",
    };
  },
};
</script>

<style scoped>
.title {
  color: aqua;
}
</style>