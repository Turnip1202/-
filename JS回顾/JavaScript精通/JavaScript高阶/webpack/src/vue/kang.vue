<template>
  <div>
    <p>{{ message }}</p>
    <h1 class="title">乔曼奇</h1>
    <h1 class="title">唐伟康turnip</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "乔曼奇",
    };
  },
};
</script>

<style scoped>
.title {
  color: coral;
}
</style>