<template>
  <div class="whole">
    <el-button type="primary" round @click="get">get</el-button>
    <pre v-text="algorithm" class="codes"></pre>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Fintech",
  props: {
    codeNo: String,
  },
  data: function () {
    return {
      codeNo2: "",
      algorithm: "",
    };
  },
  mounted() {},
  methods: {
    get: function () {
      axios.get(`http://127.0.0.1:5000/api/codes/?pkg=${this.codeNo2}`).then(
        (response) => {
          if (response.data.error == "error") {
            console.log("bakend error");
          } else {
            this.algorithm = response.data.result;
          }
        },
        (err) => {
          console.log("frontend error", err);
        }
      );
    },
  },
  // 动态props
  watch: {
    codeNo: function (newVal) {
      this.codeNo2 = newVal; //newVal即是codeNo
    },
  },
};
</script>

<style scoped>
.whole {
  overflow: hidden;
  height: 100vh;
}
.codes {
  overflow: scroll;
  height: 100vh;
}
</style>