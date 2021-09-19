<template>
  <div class="modal" @click="close">
    <div class="wrapper" @click.stop="">
      <div class="text-area">
        <div class="override-text">
          Congratulations!<br />
          Both your friend {{ shortenFriendAddress }}and you will get extra 1 HP
          once you confirm it!
        </div>
        <div class="button" @click="callContractMethod">Confirm</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import contractConfig from "../assets/contractConfig";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

let web3;

export default defineComponent({
  name: "ConfirmInvitationPopup",
  props: ["friendAddress", "userAddress", "shortenFriendAddress"],
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
    async callContractMethod() {
      this.close();
      if (!web3) return;
      const contract = new web3.eth.Contract(
        // @ts-ignore
        contractConfig.abiConfig,
        contractConfig.contractMainNetAddress
      );
      try {
        const res = await contract.methods.bindParent(this.friendAddress).send({
          from: this.userAddress,
        });
        console.log("call contract res", res);
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

  .wrapper {
    position: relative;
    width: calc(50vw * (1557 / 1920));
    height: calc(50vh * (873 / 1080));
    background-size: cover;
    background-image: url("../../public/images/popup_bg.png");
    display: flex;
    align-items: center;
    justify-content: center;

    .text-area {
      position: absolute;
      top: 45%;
      left: 10%;
      width: 80%;
      height: 35%;
      font-size: 0.48rem;
      font-family: Righteous;
      color: rgba(255, 255, 255, 0.9);
      text-align: center;

      .override-text {
        font-size: 0.3rem;
      }

      .button {
        width: 50%;
        margin: 0.16rem auto;
        border: 0;
        box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
        font-weight: 600;
        letter-spacing: 0.03em;
        line-height: 1;
        opacity: 1;
        outline: 0;
        transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
        height: 32px;
        background-color: rgb(232, 157, 57);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.24rem 0.12rem;
        font-size: 0.32rem;
        font-family: Righteous;
        border-radius: 0.16rem;
        cursor: pointer;
      }
    }
  }
}
</style>
