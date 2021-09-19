<template>
  <div class="page">
    <div class="top-banner"></div>
    <div class="top-bar">
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
      <div class="link-text" @click="openSetNicknamePopup">SET YOUR NAME ></div>
    </div>
    <div class="ranking-table">
      <img
        class="list-title"
        src="../public/images/rankingList/ranking_list_title.png"
      />
      <div class="table-header">
        <div>Ranking</div>
        <div>Address</div>
        <div>Name</div>
        <div>Scores</div>
      </div>
      <div style="min-height: 500px; width: 100%">
        <div
          class="table-row"
          v-for="record in displayList"
          :key="record.rank"
          :style="{ color: record.rank === myPos ? '#FAFF00' : '#584324' }"
        >
          <div>
            <img
              v-if="record.rank === 1"
              src="../public/images/rankingList/ranking_first_bg.png"
            />
            <img
              v-if="record.rank === 2"
              src="../public/images/rankingList/ranking_second_bg.png"
            />
            <img
              v-if="record.rank === 3"
              src="../public/images/rankingList/ranking_third_bg.png"
            />
            <div class="index-cell">
              {{ record.rank }}
            </div>
          </div>
          <div>
            {{ record.address.slice(0, 4) }}****{{ record.address.slice(-4) }}
          </div>
          <div>{{ record.nickname }}</div>
          <div>{{ record.score }}</div>
        </div>
      </div>
      <div class="action-panel">
        <img
          class="prev-btn"
          src="../public/images/rankingList/ranking_prev_page.png"
          @click="loadPrevPage"
        />
        {{ curPage }}/10
        <img
          class="next-btn"
          src="../public/images/rankingList/ranking_next_page.png"
          @click="loadNextPage"
        />
      </div>
    </div>
    <mobile-footer-with-subscribe />
  </div>
  <teleport to="body">
    <transition name="fade">
      <SetNicknamePopup
        v-if="showSetNicknamePopup"
        :user-address="userAddress"
        @close="showSetNicknamePopup = false"
        @update-nickname="updateMyNickname"
      ></SetNicknamePopup>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Axios from "axios";
import SetNicknamePopup from "@/components/SetNicknamePopup.vue";
import MobileFooterWithSubscribe from "@/components/MobileFooterWithSubscribe.vue";

interface Rank {
  rank: number;
  address: string;
  nickname: string;
  score: number;
}
const axios = Axios.create({ baseURL: "https://cheersland.org/" });
const RecordPerPage = 10;
const regExp = new RegExp(/^([0-9a-zA-Z]+)\*+([0-9a-zA-Z]+)$/);

export default defineComponent({
  name: "MobileRankingListApp",
  data() {
    return {
      rankingList: [] as Array<Rank>,
      curPage: 0,
      hasMorePage: true,
      isLoading: false,
      newNickname: "",
      userAddress: "",
      userToken: "",
      showComingSoonPopup: false,
      showInviteFriendPopup: false,
      showSetNicknamePopup: false,
      myPos: -1,
    };
  },
  components: {
    SetNicknamePopup,
    MobileFooterWithSubscribe,
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
    displayList: function () {
      // @ts-ignore
      return this.rankingList.slice(
        // @ts-ignore
        (this.curPage - 1) * RecordPerPage,
        // @ts-ignore
        this.curPage * RecordPerPage
      );
    },
  },
  watch: {
    userAddress() {
      this.myPos = this.calcMyPos();
    },
    rankingList() {
      this.myPos = this.calcMyPos();
    },
  },
  mounted() {
    this.loadNextPage();
  },
  methods: {
    calcMyPos() {
      if (!this.userAddress || this.rankingList.length === 0) return -1;
      const [beginStr, endStr] = regExp
        .exec(this.rankingList[0].address)!
        .slice(-2);
      const [myBeginStr, myEndStr] = [
        this.userAddress.slice(0, beginStr.length).toLowerCase(),
        this.userAddress.slice(-1 * endStr.length).toLowerCase(),
      ];
      for (let i = 0; i < this.rankingList.length; i++) {
        const [begin, end] = regExp
          .exec(this.rankingList[i].address)!
          .slice(-2);
        if (begin === myBeginStr && end === myEndStr) {
          // @ts-ignore
          return this.rankingList[i].rank;
        }
      }
      return -1;
    },
    openSetNicknamePopup() {
      if (!this.userAddress) {
        alert("please connect to wallet first");
        return;
      }
      this.showSetNicknamePopup = true;
    },
    updateMyNickname(updatedNickname: string) {
      console.log("new nickname", updatedNickname);
      if (this.myPos < 0) return;
      this.rankingList[this.myPos].nickname = updatedNickname;
    },
    async getUserToken() {
      const ret = await axios.post("setUserToken", {
        address: this.userAddress,
      });
      this.userToken = ret.data.data.token;
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
    goHomePage() {
      window.location.href = "/";
    },
    async loadSinglePageRankList(pageIndex: number) {
      if (this.isLoading || !this.hasMorePage) return;
      this.isLoading = true;
      const ret = await axios.post("develop/rank", {
        game_id: 0,
        index: pageIndex,
      });
      const nextPageRankingList = ret?.data?.data ?? [];
      this.rankingList = [...this.rankingList, ...nextPageRankingList];
      this.isLoading = false;
      this.hasMorePage = nextPageRankingList.length === RecordPerPage;
    },
    loadPrevPage() {
      if (this.curPage === 1) return;
      this.curPage -= 1;
    },
    async loadNextPage() {
      if (this.isLoading || this.curPage >= 10) return;
      this.curPage += 1;
      if (this.curPage * RecordPerPage > this.rankingList.length) {
        await this.loadSinglePageRankList(this.curPage);
      }
    },
  },
});
</script>

<style lang="less">
@font-face {
  font-family: Kanit;
  src: url("../public/fonts/Kanit-Black.ttf");
}

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
  font-family: HoboStd, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.page {
  position: relative;
  background-size: cover;
  background-image: url("../public/images/rankingList/ranking_bg.png");
}

.top-bar {
  position: absolute;
  top: calc(100vh * (76.5 / 1080) + 0.2rem);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.12rem;
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
}

.top-banner {
  width: 100vw;
  height: calc(100vh * (76.5 / 1080));
  background-size: 100vw calc(100vh * (76.5 / 1080));
  background-image: url("../public/images/rankingList/ranking_header.png");
  margin-bottom: 1rem;
}

.connect-btn {
  margin-left: 0.4rem;
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

.link-text {
  color: #6f4a2e;
  font-size: 0.13rem;
  text-decoration: underline;
  cursor: pointer;
}

.address-text {
  background-color: rgb(245, 251, 255);
  box-shadow: none;
  color: rgb(232, 157, 57);
}

.ranking-table {
  position: relative;
  margin: 0 auto;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .list-title {
    width: 2.29rem;
    height: auto;
    margin-bottom: 0.3rem;
  }

  .table-header {
    width: 100%;
    height: 0.8rem;
    display: flex;
    align-items: center;
    font-size: 0.2rem;
    color: #704329;
    border: solid 3px #f4ddc2;
    border-radius: 8px;
    margin-bottom: 0.24rem;

    div {
      width: 25%;
      text-align: center;
    }
  }

  .table-row {
    width: 100%;
    height: 50px;
    font-size: 0.16rem;
    color: #584324;
    display: flex;
    align-items: center;

    div {
      position: relative;
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      position: absolute;
      height: 0.3rem;
      left: 0;
      top: 0;
    }

    .index-cell {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.36rem;
      height: 0.37rem;
      background-size: cover;
      background-image: url("../public/images/rankingList/ranking_pos_bg.png");
      font-size: 0.16rem;
      color: #ffc878;
    }
  }

  .action-panel {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.19rem;
    color: #5f4335;
    margin-top: 0.8rem;
    margin-bottom: 0.48rem;

    img {
      cursor: pointer;
      height: 0.34rem;
      width: 0.34rem;
      margin: 0 0.12rem;
    }
  }
}
</style>
