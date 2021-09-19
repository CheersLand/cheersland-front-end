<template>
  <div class="game-wrapper">
    <div class="nav-bar">
      <img
        class="hvr-glow contact-icon"
        src="../public/images/connect_icon_telegram.png"
        @click="onClickGoTelegramPage"
      />
      <img
        class="hvr-glow contact-icon"
        src="../public/images/connect_icon_twitter.png"
        @click="onClickGoTwitterPage"
      />
      <img
        class="hvr-glow contact-icon"
        src="../public/images/connect_icon_medium.png"
        @click="onClickGoMediumPage"
      />
      <img
        class="hvr-glow contact-icon"
        src="../public/images/connect_icon_email.png"
        @click="onClickEmailIcon"
      />
      <img
        class="hvr-glow contact-icon"
        src="../public/images/connect_icon_discord.png"
        @click="onClickGoDiscardPage"
      />
    </div>
    <div class="game-middle-bg" />
    <div class="game-front-bg" />
    <div
      class="main-logo"
      :style="{
        left: '10.6%',
        top: '14.3%',
      }"
      @click="goHomePage"
    >
      <img src="../public/images/main_logo.png" class="main-img" />
    </div>
    <div class="game-border-bg">
      <iframe
        src="/laya.html"
        :width="iframeWidth"
        :height="iframeHeight"
        name="childIframe"
        class="laya-wrapper"
      ></iframe>
      <img
        v-if="!userAddress || !userToken"
        src="../public/images/game_not_connect.png"
        :width="Math.ceil(iframeWidth) + 3"
        :height="Math.ceil(iframeHeight) + 3"
        class="laya-wrapper"
      />
    </div>
    <div
      :class="['connect-btn', { 'address-text': !!userAddress }]"
      @click="connectToWallet"
    >
      {{ userAddress ? shortenUserAddress : "Connect" }}
      <img
        class="net-icon"
        src="../public/images/bsc_net_icon.png"
        @click.stop=""
      />
    </div>
    <div class="user-life-text" v-if="userAddress">
      Your HP: {{ userLifeAmount }}
    </div>
    <div
      v-if="userAddress"
      class="connect-btn"
      :style="{ top: 'calc(5% + 120px)' }"
      @click="showActionPanel = !showActionPanel"
    >
      Earn HP
    </div>
    <template v-if="showActionPanel">
      <div
        class="connect-btn"
        :style="{ top: 'calc(5% + 152px)' }"
        @click="showComingSoonPopup = true"
      >
        Stake
      </div>
      <div
        class="connect-btn"
        :style="{ top: 'calc(5% + 184px)' }"
        @click="showInviteFriendPopup = true"
      >
        Invite Friends
      </div>
    </template>
    <teleport to="body">
      <transition name="fade">
        <ConfirmInvitationPopup
          :user-address="this.userAddress"
          :friend-address="this.friendAddress"
          :shorten-friend-address="this.shortenFriendAddress"
          v-if="showInvitationPopup"
          @close="showInvitationPopup = false"
        ></ConfirmInvitationPopup>
      </transition>
    </teleport>
    <teleport to="body">
      <transition name="fade">
        <CopyEmailPopup
          v-if="showCopyEmailPopup"
          @close="showCopyEmailPopup = false"
        ></CopyEmailPopup>
      </transition>
    </teleport>
    <teleport to="body">
      <transition name="fade">
        <ComingSoonPopup
          v-if="showComingSoonPopup"
          @close="showComingSoonPopup = false"
        ></ComingSoonPopup>
      </transition>
    </teleport>
    <teleport to="body">
      <transition name="fade">
        <InviteFriendsPopup
          v-if="showInviteFriendPopup"
          :user-address="userAddress"
          @close="showInviteFriendPopup = false"
        ></InviteFriendsPopup>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Axios from "axios";
import ConfirmInvitationPopup from "@/components/ConfirmInvitationPopup.vue";
import CopyEmailPopup from "@/components/CopyEmailPopup.vue";
import ComingSoonPopup from "@/components/ComingSoonPopup.vue";
import InviteFriendsPopup from "@/components/InviteFriendsPopup.vue";

const clientHeight = document.documentElement.clientHeight;
const axios = Axios.create({ baseURL: "https://cheersland.org/api/" });

export default defineComponent({
  name: "Game",
  components: {
    ConfirmInvitationPopup,
    CopyEmailPopup,
    ComingSoonPopup,
    InviteFriendsPopup,
  },
  data() {
    return {
      userLifeAmount: 0,
      userToken: "",
      userAddress: "",
      friendAddress: "",
      iframeWidth: clientHeight * 0.8 * (750 / 1480),
      iframeHeight: clientHeight * 0.8,
      showInvitationPopup: false,
      showCopyEmailPopup: false,
      showComingSoonPopup: false,
      showInviteFriendPopup: false,
      showActionPanel: false,
    };
  },
  watch: {
    async userAddress(val) {
      console.log("user address change", val);
      if (!val) return;
      await this.getUserToken();
      // @ts-ignore
      if (window.childIframe.document.readyState === "complete") {
        // @ts-ignore
        window.childIframe.window.setParams(this.userAddress, this.userToken);
      } else {
        // @ts-ignore
        window.childIframe.onload = () => {
          console.log("onload", this.userAddress, this.userToken);
          // @ts-ignore
          window.childIframe.window.setParams(this.userAddress, this.userToken);
        };
      }
    },
  },
  computed: {
    shortenUserAddress: function () {
      if (!this.userAddress) return "";
      return [
        // @ts-ignore
        this.userAddress.slice(0, 4),
        "...",
        // @ts-ignore
        this.userAddress.slice(-4),
      ].join("");
    },
    shortenFriendAddress: function () {
      if (!this.friendAddress) return "";
      return [
        // @ts-ignore
        this.friendAddress.slice(0, 4),
        "...",
        // @ts-ignore
        this.friendAddress.slice(-4),
      ].join("");
    },
  },
  async mounted() {
    document.addEventListener("keydown", this.onPressKey, true);
    document.documentElement.style.fontSize = `${
      (100 * clientHeight) / 1080
    }px`;
    const location = window.location.href.split("/");
    const possibleAddress = location.pop();
    if (possibleAddress && !possibleAddress.includes(".html")) {
      try {
        const decodeRet = await axios.get(
          `https://cheersland.org/decodeInvitedCode?code=${possibleAddress}`,
          {
            baseURL: "",
          }
        );
        if (decodeRet.data.address) {
          this.friendAddress = decodeRet.data.address;
          if (!this.userAddress) {
            await this.connectToWallet();
          }
          if (this.userAddress && this.userAddress !== this.friendAddress) {
            this.showInvitationPopup = true;
          }
        }
      } catch (e) {
        // do nothing
      }
    }
    // update user life
    this.updateUserLifeAmount();
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.onPressKey);
  },
  methods: {
    onPressKey(event: any) {
      // @ts-ignore
      if (window.childIframe.window.keydown) {
        console.log("key down", event.keyCode);
        // @ts-ignore
        window.childIframe.window.keydown(event.keyCode);
      }
    },
    goHomePage() {
      window.location.href = "/";
    },
    async connectToWallet() {
      if (this.userAddress) return;
      let ethereum = window.ethereum;
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log("Please connect to MetaMask.");
        } else if (accounts[0] !== this.userAddress) {
          this.userAddress = accounts[0];
        }
      };
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccountsChanged)
        .catch((err: any) => {
          if (err.code === 4001) {
            // If this happens, the user rejected the connection request.
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
      ethereum.on("accountsChanged", handleAccountsChanged);

      // handle chainId
      const handleChainChanged = (_chainId: string) => {
        console.log("current chain id", _chainId);
        // We recommend reloading the page, unless you must do otherwise
        // window.location.reload();
      };
      const chainId = await ethereum.request({ method: "eth_chainId" });
      handleChainChanged(chainId);
      ethereum.on("chainChanged", handleChainChanged);

      if (chainId !== "0x38") {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "Binance Smart Chain",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });
            } catch (addError) {
              // handle "add" error
              console.error("add bsc chain error");
            }
          }
          // handle other "switch" errors
          console.error("switch to bsc chain error");
        }
      }
    },
    async updateUserLifeAmount() {
      if (this.userAddress) {
        try {
          const ret = await axios.post("getUserLife", {
            address: this.userAddress,
          });
          this.userLifeAmount = Number(ret.data.data.life) || 0;
        } catch (e) {
          // do nothing
        }
      }
      setTimeout(() => {
        this.updateUserLifeAmount();
      }, 2000);
    },
    async getUserToken() {
      const ret = await axios.post("setUserToken", {
        address: this.userAddress,
      });
      this.userToken = ret.data.data.token;
    },
    onClickGoDiscardPage() {
      window.open("https://discord.gg/H3fjxhFA7T");
    },
    onClickGoTwitterPage() {
      window.open("https://twitter.com/cheers_land");
    },
    onClickGoTelegramPage() {
      window.open("https://t.me/cheersland");
    },
    onClickGoMediumPage() {
      window.open("https://medium.com/cheersland");
    },
    onClickEmailIcon() {
      this.showCopyEmailPopup = true;
    },
  },
});
</script>

<style lang="less">
div {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 0;
}

@font-face {
  font-family: Righteous;
  src: url("../public/fonts/Righteous-Regular.ttf");
}

@font-face {
  font-family: Kanit;
  src: url("../public/fonts/Kanit-Black.ttf");
}

.game-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: 100vw 100vh;
  background-image: url("../public/images/bg_game.png");
  display: flex;
  align-items: center;
  justify-content: center;

  .game-front-bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-image: url("../public/images/bg_game_front.png");
  }

  .game-middle-bg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: calc(100vh * 0.92);
    width: calc(100vh * 0.92 * (986 / 1016));
    background-size: cover;
    background-image: url("../public/images/game_border_bg.png");
  }

  .main-logo {
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    height: calc(100vh * 0.17);
    width: calc(100vh * 0.17 * (816 / 593));
    cursor: pointer;

    .main-img {
      height: 100%;
      width: 100%;
    }

    .main-logo-banner {
      position: absolute;
      top: 75%;
      transform: translateX(-50%);
      left: 50%;
      height: calc(100% * 139 / 593);
      width: auto;
    }
  }

  .game-border-bg {
    position: relative;
    height: calc(100vh * 0.92);
    width: calc(100vh * 0.92 * (986 / 1016));
  }

  .laya-wrapper {
    position: absolute;
    top: 8%;
    left: 27%;
  }

  .user-life-text {
    position: absolute;
    right: 8%;
    top: calc(5% + 60px);
    font-size: 0.32rem;
    color: white;
    font-family: Kanit;
  }

  .connect-btn {
    position: absolute;
    right: 8%;
    top: 5%;
    align-items: center;
    border: 0;
    border-radius: 16px;
    box-shadow: rgba(14, 14, 44, 40%) 0px -1px 0px 0px inset;
    cursor: pointer;
    display: inline-flex;
    font-family: Kanit;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 32px;
    padding: 0 16px;
    background-color: rgb(232, 157, 57);
    color: white;
    -webkit-font-smoothing: antialiased;

    .net-icon {
      display: block;
      position: absolute;
      width: 32px;
      height: 32px;
      left: -40px;
    }
  }

  .address-text {
    background-color: rgb(245, 251, 255);
    box-shadow: none;
    color: rgb(232, 157, 57);
  }

  .nav-bar {
    position: absolute;
    bottom: 5%;
    left: 2%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 10;

    .contact-icon {
      width: 50px;
      height: 50px;
      margin-left: 16px;
      cursor: pointer;
    }

    .contact-icon:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
