<template>
  <div class="hello">
    <van-uploader :after-read="afterRead" />
    <!-- 可以使用 CellGroup 作为容器 -->
    <van-cell-group inset>
      <van-field v-model="value" label="文件名" placeholder="请输入文件名" />
    </van-cell-group>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const value = ref("");
    const afterRead = (file) => {
      axios({
        url: "http://127.0.0.1/Yutest",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: {
          name: value._value,
          data: file,
        },
      }).then((res) => {
        console.log(res);
      });

      // 此时可以自行将文件上传至服务器
    };

    return {
      afterRead,
      value,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
