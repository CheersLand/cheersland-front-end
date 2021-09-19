<template>
  <div class="main-logo" @click="onClickMainLogo">
    <img src="../../public/images/main_logo.png" class="main-img" />
  </div>
  <div class="main-btn" @click="onClickPlayBtn"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommonFixedPart",
  data() {
    return {};
  },
  methods: {
    onClickMainLogo() {
      window.location.href = "/";
    },
    onClickPlayBtn() {
      window.open("/game.html");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-logo {
  position: fixed;
  left: 10.6%;
  top: 14.3%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  height: calc(100vh * 0.17);
  width: calc(100vh * 0.17 * (816 / 593));
  cursor: pointer;

  .main-img {
    height: 100%;
    width: 100%;
  }
}

.main-btn {
  position: fixed;
  top: 8.2%;
  right: 10%;
  width: 453px;
  height: 117px;
  transform: translateX(50%) scale(0.53);
  background-image: url("../../public/images/play_btn.png");
  background-size: cover;
  z-index: 1000;
  cursor: pointer;
}
</style>
