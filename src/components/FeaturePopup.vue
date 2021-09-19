<template>
  <div class="modal" @click="close">
    <div class="wrapper" @click.stop="">
      <div class="close-btn" @click="close" />
      <div class="text-area">
        {{ overrideText }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FeaturePopup",
  props: ["overrideText"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
});
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100000;

  .wrapper {
    position: relative;
    width: calc(100vw * (1222 / 1920));
    height: calc(100vh * (620 / 1080));
    background-size: calc(100vw * (1222 / 1920)) calc(100vh * (620 / 1080));
    background-image: url("../../public/images/popup_bg_feature.png");
    display: flex;
    align-items: center;
    justify-content: center;

    .close-btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 68px;
      height: 68px;
      background-size: cover;
      background-image: url("../../public/images/close_icon.png");
      cursor: pointer;
    }

    .text-area {
      position: absolute;
      top: 35%;
      left: 12%;
      width: 74%;
      height: 35%;
      font-size: 0.42rem;
      font-family: Righteous;
      color: #b57008;
      text-align: center;

      .override-text {
        font-size: 0.3rem;
      }
    }
  }
}
</style>
