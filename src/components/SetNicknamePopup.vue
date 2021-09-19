<template>
  <div class="modal" @click="close">
    <div :class="['wrapper', { 'mobile-wrapper': isMobile }]" @click.stop="">
      <img
        @click="onConfirm"
        :class="['confirm-btn', { 'mobile-confirm-btn': isMobile }]"
        class=""
        src="../../public/images/rankingList/popup_set_nickname_confirm.png"
      />
      <input
        v-model="updatedNickname"
        class="nickname-input"
        placeholder="no more than 14 letters"
        maxlength="14"
        :style="{ fontSize: isMobile ? '0.18rem' : '24px' }"
      />
      <div
        :class="['close-btn', { 'mobile-close-btn': isMobile }]"
        @click="close"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import contractConfig from "@/assets/contractConfig";
import MaxScreenWidthSupportByMobile from "@/consts/MaxScreenWidthSupportByMobile";

let web3;

export default defineComponent({
  name: "SetNicknamePopup",
  props: ["userAddress"],
  data() {
    return {
      updatedNickname: "",
      isMobile:
        document.documentElement.clientWidth < MaxScreenWidthSupportByMobile,
    };
  },
  mounted() {
    const detectProvider = async () => {
      const provider = await detectEthereumProvider();
      if (!provider) {
        console.error("Please install MetaMask!");
        return;
      }
      // @ts-ignore
      web3 = new Web3(provider);
    };

    detectProvider().catch();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async onConfirm() {
      this.close();
      if (!web3) return;
      const contract = new web3.eth.Contract(
        // @ts-ignore
        contractConfig.nicknameAbiConfig,
        contractConfig.nicknameContractMainNetAddress
      );
      try {
        const res = await contract.methods.setName(this.updatedNickname).send({
          from: this.userAddress,
        });
        window.alert("Your nickname has been successfully updated");
        console.log("call contract res", res);
        this.$emit("update-nickname", this.updatedNickname);
      } catch (e) {
        console.log("call contract error", e);
      }
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

  .mobile-wrapper {
    width: 100vw !important;
    height: calc(100vw * (1040 / 640)) !important;
  }

  .wrapper {
    position: relative;
    width: calc(100vh * (640 / 1040));
    height: 100vh;
    background-size: cover;
    background-image: url("../../public/images/rankingList/popup_set_nickname_bg.png");
    display: flex;
    align-items: center;
    justify-content: center;

    .confirm-btn {
      position: absolute;
      top: 56%;
      height: calc(100vh * (67 / 1040));
      width: auto;
      cursor: pointer;
    }

    .mobile-confirm-btn {
      width: calc(100vw * (173 / 640)) !important;
      height: auto !important;
    }

    .nickname-input {
      position: absolute;
      top: 47%;
      font-size: 0.18rem;
      background-color: transparent;
      color: white;
      text-align: center;
      border: none;
      outline: none;
    }

    input::placeholder {
      color: white;
    }

    .close-btn {
      position: absolute;
      right: 6%;
      top: 28%;
      width: 68px;
      height: 68px;
      background-size: cover;
      background-image: url("../../public/images/popup_email_close.png");
      cursor: pointer;
    }

    .mobile-close-btn {
      width: 0.4rem !important;
      height: 0.4rem !important;
    }
  }
}
</style>
