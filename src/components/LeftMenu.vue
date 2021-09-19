<template>
  <div
    class="menu-wrapper"
    :style="{
      color: theme === 'dark' ? '#787878' : 'rgba(255, 255, 255, 0.5)',
    }"
  >
    <div class="menu-item" @click="goTop">Home</div>
    <div class="menu-item" @click="showPopup">IGO</div>
    <div class="menu-item" @click="showPopup">NFT Market</div>
    <div class="menu-item" @click="openWindow('/token.html')">Tokenomics</div>
    <!--    <div class="menu-item" @click="showPopup">Rankings</div>-->
    <div class="menu-item" @click="openWindow('/ranking_list.html')">
      Rankings
    </div>
    <div class="menu-item" @click="openWindow('https://docs.cheersland.org/')">
      Document
    </div>
    <div class="menu-item" @click="goBottom">Contact</div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <ComingSoonPopup
        v-if="showComingSoonPopup"
        @close="showComingSoonPopup = false"
      ></ComingSoonPopup>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComingSoonPopup from "@/components/ComingSoonPopup.vue";

export default defineComponent({
  name: "LeftMenu",
  props: ["theme"],
  components: { ComingSoonPopup },
  data() {
    return {
      showComingSoonPopup: false,
    };
  },
  methods: {
    goTop() {
      if (window.location.pathname.endsWith("html")) {
        window.open("/");
        return;
      }
      window.scrollTo(0, 0);
    },
    showPopup() {
      this.showComingSoonPopup = true;
    },
    openWindow(url: string) {
      window.open(url);
    },
    goBottom() {
      window.scrollTo(
        0,
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      );
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@font-face {
  font-family: Righteous;
  src: url("../../public/fonts/Righteous-Regular.ttf");
}

.menu-wrapper {
  position: fixed;
  top: 50%;
  left: 5%;
  z-index: 10000;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);

  .menu-item {
    font-family: Righteous;
    margin-bottom: 24px;
    font-size: 24px;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
