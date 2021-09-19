<template>
  <div
    class="part-wrapper main-desk-bg"
    :style="{ transform: `translateY(${deskPos}px)` }"
  >
    <img class="pen" src="../../public/images/pen.png" />
    <img class="left-halo" src="../../public/images/desk_left_halo.png" />
    <img class="left-candle" src="../../public/images/desk_left_candle.png" />
    <img class="right-halo" src="../../public/images/desk_right_halo.png" />
    <img class="right-candle" src="../../public/images/desk_right_candle.png" />
    <div class="title">What is CheersLand?</div>
    <div class="text">
      CheersLand is an expandable GameFi universe where anyone can monetize
      their gaming experiences and social networks. In CheersLand, gamers can
      earn diversified rewards through skilled gameplay and contributions to the
      ecosystem.
      <br />
      <br />
      CheersLand is dual-driven in
      <span style="font-style: italic">Play to Earn</span> mode and
      <span style="font-style: italic">Build to Earn</span> mode, with the
      product portfolio of Gamified Launchpad, Multi-game Universe, Multi-asset
      Staking Platform and NFT Market, and powered developing new users by the
      invitation mechanism, which builds a unique and diversified GameFi
      ecosystem.
      <br />
      <br />
      CheersLand is owned and governed by <b>CHEERS</b> holders.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainDesk",
  props: ["deskPos"],
  data() {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-desk-bg {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("../../public/images/main_desk.png");

  .pen {
    position: absolute;
    top: 53.2%;
    left: 8%;
    width: calc(100vw * (216 / 1920));
    height: calc(100vh * (351 / 1080));
    transform-origin: bottom center;
    animation-name: shake-minor;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
  }

  .left-halo {
    position: absolute;
    top: 41%;
    left: 13%;
    width: calc(100vw * (326 / 1920));
    height: calc(100vh * (302 / 1080));
    filter: blur(10px);
    animation-name: shinning-minor;
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  .left-candle {
    position: absolute;
    top: 52.3%;
    left: 19%;
    width: calc(100vw * (95 / 1920));
    height: calc(100vh * (113 / 1080));
    animation-name: bump;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    transform-origin: bottom center;
  }

  .right-halo {
    position: absolute;
    top: 40%;
    left: 75.6%;
    width: calc(100vw * (364 / 1920));
    height: calc(100vh * (326 / 1080));
    filter: blur(10px);
    animation-name: shinning-minor;
    animation-duration: 3.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-delay: 0.8s;
  }

  .right-candle {
    position: absolute;
    top: 53%;
    left: 83%;
    width: calc(100vw * (101 / 1920));
    height: calc(100vh * (98 / 1080));
    animation-name: bump;
    animation-duration: 3.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    transform-origin: bottom center;
    animation-delay: 0.8s;
  }

  .title {
    position: absolute;
    top: 29.25%;
    left: 30%;
    width: 37%;
    font-family: Righteous;
    font-style: normal;
    font-weight: normal;
    font-size: 0.5rem;
    line-height: 1.2;
    color: #885a00;
  }

  .text {
    position: absolute;
    top: 37.44%;
    left: 30%;
    width: 37%;
    font-family: Righteous;
    font-style: normal;
    font-weight: normal;
    font-size: 0.24rem;
    line-height: 1.25;
    color: #885a00;
  }

  .blue-text {
    color: #4d85d8;
  }
}
</style>
