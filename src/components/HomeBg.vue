<template>
  <div class="main-bg" :style="{ filter: `blur(${blurPx}px)` }">
    <img class="flame flame-1" src="../../public/images/flame_01.png" />
    <img class="flame flame-2" src="../../public/images/flame_02.png" />
    <img class="flame flame-3" src="../../public/images/flame_03.png" />
    <img class="flame flame-4" src="../../public/images/flame_04.png" />
    <div class="flag flag-left">
      <img class="upper" src="../../public/images/flag_01_upper.png" />
      <img class="bottom" src="../../public/images/flag_01_bottom.png" />
    </div>
    <div class="flag flag-right">
      <img class="upper" src="../../public/images/flag_02_upper.png" />
      <img class="bottom" src="../../public/images/flag_02_bottom.png" />
    </div>
    <div class="wall-lamp-right">
      <img class="halo" src="../../public/images/wall_lamp_halo.png" />
      <img class="lamp" src="../../public/images/wall_lamp_right.png" />
    </div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeBg",
  props: ["blurPx"],
  data() {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/images/main_bg.png");
  background-size: 100vw 100vh;
  filter: blur(0);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;

  .flame {
    position: absolute;
    transform-origin: bottom center;
    animation-name: bump;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .flame-1 {
    top: 11%;
    left: 2.8%;
    width: calc(100vw * (36 / 1920));
    height: calc(100vh * (36 / 1080));
  }

  .flame-2 {
    top: 11.6%;
    left: 13.6%;
    width: calc(100vw * (40 / 1920));
    height: calc(100vh * (39 / 1080));
    animation-delay: 0.1s;
  }

  .flame-3 {
    top: 13.2%;
    left: 19%;
    width: calc(100vw * (39 / 1920));
    height: calc(100vh * (37 / 1080));
    animation-delay: 0.2s;
  }

  .flame-4 {
    top: 16%;
    left: 30.5%;
    width: calc(100vw * (40 / 1920));
    height: calc(100vh * (37 / 1080));
    animation-delay: 0.3s;
  }

  .flag {
    position: absolute;
  }

  .flag-left {
    top: 0;
    left: 37.4%;
    width: calc(100vw * (233 / 1920));
    height: calc(100vh * (216 / 1080));
    transform-origin: top center;
    animation-name: shake;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

    .upper,
    .bottom {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .bottom {
      top: -3%;
      animation-name: shake-minor;
      animation-duration: 5s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
  }

  .flag-right {
    top: 0;
    left: 74.9%;
    width: calc(100vw * (127 / 1920));
    height: calc(100vh * (264 / 1080));
    transform-origin: top center;
    animation-name: shake;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;

    .upper,
    .bottom {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .bottom {
      top: -3%;
      animation-name: shake-minor;
      animation-duration: 5s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
  }

  .wall-lamp-right {
    position: absolute;
    top: 33%;
    left: 90.6%;
    width: calc(100vw * (86 / 1920));
    height: calc(100vh * (107 / 1080));

    .halo,
    .lamp {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .halo {
      animation-name: shining;
      animation-duration: 5s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
  }
}
</style>
<style scoped lang="sass">
$quantity: 40
.firefly
  position: fixed
  left: 50%
  top: 50%
  width: 0.5vw
  height: 0.5vw
  margin: -0.2vw 0 0 9.8vw
  animation: ease 200s alternate infinite
  pointer-events: none

  &::before,
  &::after
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    transform-origin: -10vw

  &::before
    background: black
    opacity: 0.4
    animation: drift ease alternate infinite

  &::after
    background: white
    opacity: 0
    box-shadow: 0 0 0vw 0vw yellow
    animation: drift ease alternate infinite, flash ease infinite


// Randomize Fireflies Motion
@for $i from 1 through $quantity

  $steps: random(12) + 16
  $rotationSpeed: random(10) + 8s

  .firefly:nth-child(#{$i})
    animation-name: move#{$i}

    &::before
      animation-duration: #{$rotationSpeed}

    &::after
      animation-duration: #{$rotationSpeed}, random(6000) + 5000ms
      animation-delay: 0ms, random(8000) + 500ms

  @keyframes move#{$i}
    @for $step from 0 through $steps
      #{$step * (100 / $steps)}%
        transform: translateX(random(100) - 50vw) translateY(random(100) - 50vh) scale(random(75) / 100 + .25)

@keyframes drift
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

@keyframes flash
  0%, 30%, 100%
    opacity: 0
    box-shadow: 0 0 0vw 0vw yellow
  5%
    opacity: 1
    box-shadow: 0 0 2vw 0.4vw yellow
</style>
