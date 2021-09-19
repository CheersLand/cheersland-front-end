<template>
  <LoadingPage v-if="isLoading" @complete="isLoading = false"></LoadingPage>
  <div :hidden="isLoading" class="page" ref="scrollContainer">
    <!--  首页第一屏    -->
    <div class="home-bg">
      <img
        class="main-btn"
        src="../public/images/play_btn.png"
        :style="{
          transform: 'translateX(50%)',
          bottom: '10%',
          right: '50%',
        }"
        @click="onClickPlayBtn"
      />
    </div>
  </div>
  <img class="snap-img" src="../public/images/snap_home.png" />
  <img class="snap-img" src="../public/images/snap_desk.png" />
  <img class="snap-img" src="../public/images/snap_features.png" />
  <img class="snap-img" src="../public/images/snap_logo.png" />
  <img class="snap-img" src="../public/images/snap_scroll.png" />
  <img class="snap-img" src="../public/images/snap_map.png" />
  <img class="snap-img" src="../public/images/snap_footer.png" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingPage from "@/components/LoadingPage.vue";

export default defineComponent({
  name: "MobileApp",
  data() {
    return {
      isLoading: true,
      lampTextPopup: "",
      treasureMapTitle: "",
      treasureMapText: "",
    };
  },
  components: {
    LoadingPage,
  },
  methods: {
    onClickPlayBtn() {
      window.open("/game.html", "_blank");
    },
  },
});
</script>

<style lang="less">
html {
  scroll-behavior: smooth;
}

div {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 0;
  -webkit-overflow-scrolling: touch;
}

.top-scroll-container {
}

.home-bg {
  position: absolute;
  width: 100vw;
  height: calc(100vw * (1080 / 1920));

  .main-btn {
    position: absolute;
    bottom: 10%;
    right: 50%;
    width: calc(100vw * 453 / 1920);
    height: auto;
    transform: translateX(50%);
    z-index: 1000;
    cursor: pointer;
  }
}

.snap-img {
  display: block;
  width: 100vw;
  height: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
</style>
