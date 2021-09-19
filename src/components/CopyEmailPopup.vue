<template>
  <div class="modal" @click="close">
    <div class="wrapper" @click.stop="">
      <div class="close-btn" @click="close" />
      <img
        class="confirm-btn"
        @click="copyEmailAddress"
        src="../../public/images/popup_email_copy.png"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CopyEmailPopup",
  methods: {
    close() {
      this.$emit("close");
    },
    copyEmailAddress() {
      navigator.clipboard.writeText("info@cheersland.org");
      this.close();
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
    width: calc(100vw * (480 / 1920));
    height: calc(100vh * (320 / 1080));
    background-size: calc(100vw * (480 / 1920)) calc(100vh * (320 / 1080));
    background-image: url("../../public/images/popup_email_bg.png");
    display: flex;
    align-items: center;
    justify-content: center;

    .close-btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 66px;
      height: 66px;
      background-size: cover;
      background-image: url("../../public/images/popup_email_close.png");
      cursor: pointer;
    }

    .confirm-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100vw * (189 / 1920));
      height: calc(100vh * (56 / 1080));
      cursor: pointer;
    }
  }
}
</style>
