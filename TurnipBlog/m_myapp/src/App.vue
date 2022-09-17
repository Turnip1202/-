<template>
  <div id="app">
    <van-nav-bar
      title="爸爸的专属页面"
      left-text="返回"
      right-text="主页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <Tip />
    <router-view></router-view>
  </div>
</template>

<script>
import router from "@/router";
import { Notify } from "vant";
import { Toast } from "vant";
import Tip from "./components/Tip.vue";

setTimeout(() => {
  Notify({ type: "primary", message: "爸，父亲节快乐" });
}, 2000);

export default {
  components: {
    Tip,
  },
  methods: {
    onClickLeft() {
      setTimeout(() => {
        Notify({ type: "primary", message: "爸，父亲节快乐" });
      }, 3000);
      router.push("/");
      Toast("爸，父亲节快乐");
    },
    onClickRight() {
      setTimeout(() => {
        Notify({ type: "primary", message: "爸，父亲节快乐" });
      }, 3000);
      router.push("/content");
      Toast("爸，父亲节快乐");
    },
  },
};
</script>

<style scoped>
#app {
  padding: 1rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>>


