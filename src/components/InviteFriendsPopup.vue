<template>
  <div class="modal" @click="close">
    <div class="wrapper" @click.stop="">
      <div class="close-btn" @click="close" />
      <img
        v-if="!copied"
        class="action-btn"
        src="../../public/images/popup_invite_friend_btn_copy.png"
        @click="copyShareAddress"
      />
      <img
        v-else
        class="action-btn"
        src="../../public/images/popup_invite_friend_btn_copyed.png"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Axios from "axios";

const axios = Axios.create({ baseURL: "https://cheersland.org/api/" });

export default defineComponent({
  name: "InviteFriendsPopup",
  props: ["userAddress"],
  data() {
    return {
      copied: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async copyShareAddress() {
      const encodeRet = await axios.get(
        `https://cheersland.org/encodeInvitedCode?address=${this.userAddress}`
      );
      const content = `https://cheersland.org/share/${encodeRet.data.code}`;
      navigator.clipboard.writeText(content).catch();
      this.copied = true;
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
    width: 50vh;
    height: 50vh;
    background-size: cover;
    background-image: url("../../public/images/popup_invite_friend_bg.png");
    display: flex;
    align-items: center;
    justify-content: center;

    .action-btn {
      cursor: pointer;
      position: absolute;
      top: 63%;
      width: auto;
      height: calc(100vh * 74 / 1480);
    }

    .close-btn {
      position: absolute;
      right: 5%;
      top: 5%;
      width: calc(100vh * 88 / 1480);
      height: calc(100vh * 88 / 1480);
      background-size: cover;
      background-image: url("../../public/images/popup_invite_friend_btn_close.png");
      cursor: pointer;
    }
  }
}
</style>
