<template>
  <common-fixed-part />
  <div class="page">
    <LeftMenu theme="dark" />
    <div class="top-banner">
      <div class="text-wrapper">
        <div style="height: 80px"></div>
        <div class="main-text">What is CHEERS?</div>
        <div class="sub-text">
          CHEERS is the native utility token of CheersLand GameFi Universe,
          which acts as the incentive and ticket for supporting the ecosystem.
          Holders can claim rewards it they stake the tokens, play the game,
          build the game, participate in IGO and governance votes.
        </div>
        <div
          class="link-text"
          @click="openUrl('https://docs.cheersland.org/cheers-tokenomics')"
        >
          Read More >
        </div>
      </div>
    </div>
    <div class="part-title">Use Cases</div>
    <div class="icon-row">
      <div
        class="icon-item"
        @mouseover="setIconIdx(1)"
        @mouseleave="setIconIdx(-1)"
      >
        <div class="hover-card" v-if="iconIdx === 1">
          CHEERS stakers, as an identity in the CheersLand ecosystem, will earn
          CHEERS rewards and farm multi-assets on CheersLand.
        </div>
        <img src="../public/images/token/icon_staking.png" />
        Staking
      </div>
      <div
        class="icon-item"
        @mouseover="setIconIdx(2)"
        @mouseleave="setIconIdx(-1)"
      >
        <div class="hover-card" v-if="iconIdx === 2">
          By governance voting, CHEERS holders will have an influence on the
          crucial aspects of CheersLand development such as staking yield,
          projects listing on IGO, games onboard, buyback & burn percentage
          etc..
        </div>
        <img src="../public/images/token/icon_governance.png" />
        Governance
      </div>
      <div
        class="icon-item"
        @mouseover="setIconIdx(3)"
        @mouseleave="setIconIdx(-1)"
      >
        <div class="hover-card" v-if="iconIdx === 3">
          CHEERS will act as the main incentive for gamers participating in
          Weekly Tournaments and Ranking List, as well as builders participating
          in the development of games based on CheersLand.
        </div>
        <img src="../public/images/token/icon_incentive.png" />
        Incentive
      </div>
      <div
        class="icon-item"
        @mouseover="setIconIdx(4)"
        @mouseleave="setIconIdx(-1)"
      >
        <div class="hover-card" v-if="iconIdx === 4">
          CHEERS will be used to determine eligibility for participation in
          Initial Gaming Offering (IGO) or certain sales/auctions conducted by
          the CheerLand team.
        </div>
        <img src="../public/images/token/icon_ticket.png" />
        Ticket
      </div>
      <div
        class="icon-item"
        @mouseover="setIconIdx(5)"
        @mouseleave="setIconIdx(-1)"
      >
        <div class="hover-card" v-if="iconIdx === 5">
          CHEERS will be accepted as universal currency within CheerLand NFT
          Market. Commodities in the ecosystem will be priced and traded with
          CHEERS as the unit.
        </div>
        <img src="../public/images/token/icon_payment.png" />
        Payment
      </div>
    </div>
    <div class="part-title">Allocation</div>
    <img
      src="../public/images/token/figure_circle.png"
      class="figure-circle"
      height="413"
    />
    <div class="part-title">Release Schedule</div>
    <img
      src="../public/images/token/figure_curve.png"
      class="figure-curve"
      height="228"
    />
    <div class="curve-text">
      <span>Day 0(TGE)</span>
      <span>Month 12</span>
      <span>Month 24</span>
      <span>Month 36</span>
      <span>Month 48</span>
      <span>Month 64</span>
    </div>
    <footer-with-subscribe></footer-with-subscribe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FooterWithSubscribe from "@/components/FooterWithSubscribe.vue";
import LeftMenu from "@/components/LeftMenu.vue";
import CommonFixedPart from "@/components/CommonFixedPart.vue";

export default defineComponent({
  name: "TokenApp",
  data() {
    return {
      iconIdx: -1,
    };
  },
  components: {
    FooterWithSubscribe,
    LeftMenu,
    CommonFixedPart,
  },
  methods: {
    openUrl(url: string) {
      window.open(url);
    },
    setIconIdx(idx: number) {
      this.iconIdx = idx;
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
  background-image: url("../public/images/token/top_banner_bg.png");
  color: white;

  .text-wrapper {
    text-align: left;
    width: 800px;
    margin: 0 auto;
  }

  .main-text {
    font-size: 34.24px;
    font-family: "Arial Black";
    margin-bottom: 24px;
  }

  .sub-text {
    font-size: 18.32px;
    font-family: Arial;
    margin-bottom: 24px;
  }

  .link-text {
    cursor: pointer;
    text-decoration: underline;
    font-size: 18.54px;
    font-family: "Arial Black";
  }
}
.part-title {
  font-size: 32px;
  color: #6d3c1f;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 40px;
}

.curve-text {
  margin: 20px auto 40px;
  width: 550px;
  font-size: 13px;
  color: #6d3c1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-row {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-item {
    position: relative;
    color: #6d3c1f;
    font-size: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 160px;

    .hover-card {
      position: absolute;
      bottom: calc(100% + 24px);
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 17px;
      color: #6d3c1f;
      background-color: #c9b88e;
      padding: 16px;
      width: 250px;
      text-align: left;
    }

    img {
      width: auto;
      height: 65.5px;
      margin-bottom: 20px;
    }
  }
}
</style>
