<template>
  <common-fixed-part />
  <div class="page">
    <div class="top-banner">
      <div class="text-wrapper">
        <div style="height: 80px"></div>
        <div class="main-text">
          Stake diverse tokens to earn <br />Health Points
          <span style="text-decoration: underline"> (HP) </span>
          for the game!
        </div>
        <div class="sub-text">
          Multi-asset Staking Live on:
          <img src="../public/images/staking/binance_logo.png" />
        </div>
        <div
          class="link-text"
          @click="openUrl('https://docs.cheersland.org/cheers-tokenomics')"
        >
          <span>Audit Report ></span>
          |
          <span>Play Now ></span>
        </div>
      </div>
    </div>
    <div class="card-wrapper">
      <div class="card" v-for="token in tokenList" :key="token.name">
        <div class="header">
          <div>
            <div class="title">Stake {{ token.name }}</div>
            <div class="sub-title">To earn HP</div>
          </div>
          <div
            class="coin-logo"
            :style="{
              backgroundImage: `url(\'public/images/staking/${token.iconName})`,
            }"
          ></div>
        </div>
        <div class="line"></div>
        <div class="main-part">
          <div class="row">
            <div>Staking Duration</div>
            <div>24 Hours</div>
          </div>
          <div class="row">
            <div>Staking Minimum</div>
            <div>{{ token.minUnit }} {{ token.name }}</div>
          </div>
          <div class="row">
            <div>HP Earned</div>
            <div>{{ token.hpEarned }}</div>
          </div>
          <div class="row">
            <div>{{ token.name }} Staked</div>
            <div>{{ token.amountInStake }}</div>
          </div>
          <div class="row" style="justify-content: center">
            <div class="main-btn" v-if="!userAddress" @click="connectToWallet">
              Connect Wallet
            </div>
            <template v-else> </template>
          </div>
        </div>
        <div class="line"></div>
        <div class="extend-part">
          <div class="row">Claim tokens in: 20hrs 20min 20s</div>
          <div class="link" @click="openUrl(token.projectSiteUrl)">
            View Project Site
            <img src="../public/images/staking/detail_icon.png" />
          </div>
          <div class="link" @click="openUrl(token.contractUrl)">
            View Contract
            <img src="../public/images/staking/detail_icon.png" />
          </div>
          <div class="link" @click="openUrl(token.buyUrl)">
            Buy Now
            <img src="../public/images/staking/detail_icon.png" />
          </div>
        </div>
        <div class="bottom-part">Hide ^</div>
      </div>
    </div>
    <footer-with-subscribe></footer-with-subscribe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FooterWithSubscribe from "@/components/FooterWithSubscribe.vue";
import CommonFixedPart from "@/components/CommonFixedPart.vue";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

let web3;

enum TokenStatus {
  NeedApproval = -1,
  NoStake = 0,
  Staking = 1,
  StakingEnd = 2,
}

interface TokenDetail {
  name: string;
  iconName: string;
  minUnit: number;
  hpEarned: number;
  amountInStake: string;
  currentStatus: TokenStatus;
  showDetail: boolean;
  projectSiteUrl: string;
  contractUrl: string;
  buyUrl: string;
  stakingEndTime?: number;
}

export default defineComponent({
  name: "StakingApp",
  data() {
    return {
      userAddress: "",
      tokenList: [] as TokenDetail[],
    };
  },
  components: {
    FooterWithSubscribe,
    CommonFixedPart,
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
    async approveContract() {
      // do approve
    },
    openUrl(url: string) {
      window.open(url);
    },
  },
});
</script>

<style lang="less">
@font-face {
  font-family: HoboStd;
  src: url("../public/fonts/HoboStd.otf");
}
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

#app {
  font-family: Kefa, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.page {
  text-align: center;
  background-size: cover;
  background-image: url("../public/images/token/whole_bg.png");
}

.top-banner {
  width: 100vw;
  height: 337px;
  background-size: 100vw 337px;
  background-image: url("../public/images/staking/banner.png");
  color: white;

  .text-wrapper {
    text-align: left;
    width: 800px;
    margin: 0 auto;
  }

  .main-text {
    font-size: 35.7px;
    font-family: "Arial Black";
    margin-bottom: 24px;
  }

  .sub-text {
    font-size: 21.37px;
    font-family: Arial;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    img {
    }
  }

  .link-text {
    cursor: pointer;
    font-size: 16.17px;
    font-family: "Arial Black";

    span {
      text-decoration: underline;
    }
  }
}

.card-wrapper {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    width: 300px;
    background-color: #fff7e6;
    border-radius: 16px;

    .line {
      width: 100%;
      height: 2px;
      background-color: #86663c;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 12px;
      text-align: left;

      .title {
        color: #6d3c1f;
        font-size: 20.17px;
        font-weight: bold;
      }

      .sub-title {
        color: #86663c;
        font-size: 12.1px;
      }

      .coin-logo {
        border-radius: 50%;
        overflow: hidden;
        background-image: url("../public/images/staking/bnb.png");
        background-size: cover;
        width: 64px;
        height: 64px;
        border: solid 5px #cdbc96;
      }
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13.4px;
      color: #86663c;
      padding: 6px 0;
    }

    .main-part {
      padding: 24px 12px;

      .main-btn {
        font-size: 10.21px;
        color: #6d3c1f;
        background-color: #cdbc96;
        padding: 8px;
        border-radius: 16px;
      }
    }

    .extend-part {
      padding: 24px 12px;
      text-align: left;

      .link {
        font-size: 12px;
        color: rgba(#86663c, 0.7);
        display: flex;
        align-items: center;

        img {
          margin-left: 6px;
          width: 10px;
          height: 10px;
        }
      }
    }

    .bottom-part {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      background-color: #f5e6c7;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      height: 48px;
      color: #86663c;
    }
  }
}
</style>
