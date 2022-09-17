<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-notice-bar
      left-icon="volume-o"
      text="爸，这是我用代码为您做的的一个网站"
    />
    <van-notice-bar left-icon="volume-o" text="爸，父亲节快乐！我爱您。" />
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
    },
  },
};
</script>
