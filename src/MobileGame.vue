<template>
  <div class="game-wrapper">
    <div class="game-border-bg">
      <iframe
        src="/laya.html"
        name="childIframe"
        class="laya-wrapper"
        :width="iframeWidth"
        :height="iframeHeight"
      ></iframe>
      <img
        v-if="!userAddress || !userToken"
        src="../public/images/game_not_connect.png"
        :width="Math.ceil(iframeWidth) + 3"
        :height="Math.ceil(iframeHeight) + 3"
        class="laya-wrapper"
      />
    </div>
    <div class="top-bar">
      <div class="user-life-text" v-if="userAddress">
        Your HP: {{ userLifeAmount }}
      </div>
      <div v-else></div>
      <div>
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
        <div
          v-if="userAddress"
          class="connect-btn"
          @click="showActionPanel = !showActionPanel"
        >
          Earn HP
          <template v-if="showActionPanel">
            <div
              class="connect-btn"
              :style="{
                position: 'absolute',
                top: '100%',
                right: '0',
                whiteSpace: 'nowrap',
              }"
              @click="showComingSoonPopup = true"
            >
              Stake
            </div>
            <div
              class="connect-btn"
              :style="{
                position: 'absolute',
                top: '200%',
                right: '0',
                whiteSpace: 'nowrap',
              }"
              @click="showInviteFriendPopup = true"
            >
              Invite Friends
            </div>
          </template>
        </div>
      </div>
    </div>

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
import ComingSoonPopup from "@/components/ComingSoonPopup.vue";
import InviteFriendsPopup from "@/components/InviteFriendsPopup.vue";

const clientHeight = document.documentElement.clientHeight;
const axios = Axios.create({ baseURL: "https://cheersland.org/api/" });

export default defineComponent({
  name: "MobileGame",
  components: {
    ConfirmInvitationPopup,
    ComingSoonPopup,
    InviteFriendsPopup,
  },
  data() {
    return {
      userLifeAmount: 0,
      userToken: "",
      userAddress: "",
      friendAddress: "",
      iframeWidth: clientHeight * 0.87 * (750 / 1480),
      iframeHeight: clientHeight * 0.87,
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
      console.log("start get token");
      const ret = await axios.post("setUserToken", {
        address: this.userAddress,
      });
      this.userToken = ret.data.data.token;
      console.log("got token", this.userToken);
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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #a2553e;

  .game-border-bg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100vh * (986 / 1016));
    height: calc(100vh);
    background-image: url("../public/images/game_border_bg.png");
    background-size: cover;
  }

  .laya-wrapper {
    position: absolute;
    top: 8%;
    left: 26.7%;
  }

  .top-bar {
    position: absolute;
    top: 3%;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.12rem;
  }

  .user-life-text {
    font-size: 0.16rem;
    color: white;
    font-family: Kanit;
  }

  .connect-btn {
    margin-left: 0.12rem;
    position: relative;
    align-items: center;
    border: 0;
    border-radius: 16px;
    box-shadow: rgba(14, 14, 44, 40%) 0px -1px 0px 0px inset;
    cursor: pointer;
    display: inline-flex;
    font-family: Kanit;
    font-size: 0.16rem;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 0.32rem;
    padding: 0 0.16rem;
    background-color: rgb(232, 157, 57);
    color: white;
    -webkit-font-smoothing: antialiased;

    .net-icon {
      display: block;
      position: absolute;
      width: 0.32rem;
      height: 0.32rem;
      left: -0.4rem;
    }
  }

  .address-text {
    background-color: rgb(245, 251, 255);
    box-shadow: none;
    color: rgb(232, 157, 57);
  }
}
</style>
