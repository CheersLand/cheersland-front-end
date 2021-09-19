<template>
  <div class="part-wrapper footer-bg">
    <div style="transform: scaleY(-1)">
      <img class="fog-bg" src="../../public/images/fog_01.png" />
      <img class="fog-bg fog-bg-second" src="../../public/images/fog_01.png" />
    </div>
    <div class="treasure-box-bg" ref="box">
      <div
        v-for="star in stars"
        class="treasure-star"
        :style="star"
        :key="star.left"
      ></div>
      <div>
        <img
          class="logo"
          src="../../public/images/treasure_icon_linkedin.png"
          @click="onClickGoLinkedInPage"
        />
        <img
          class="logo"
          src="../../public/images/treasure_icon_email.png"
          @click="onClickEmailIcon"
        />
        <img
          class="logo"
          src="../../public/images/treasure_icon_telegram.png"
          @click="onClickGoTelegramPage"
        />
        <img
          class="logo"
          src="../../public/images/treasure_icon_twitter.png"
          @click="onClickGoTwitterPage"
        />
        <img
          class="logo"
          src="../../public/images/treasure_icon_medium.png"
          @click="onClickGoMediumPage"
        />
      </div>
    </div>
    <div class="bottom-text">
      <div>© 2021 CheersLand</div>
      <div style="margin-left: 5vw">
        <a href="">Privacy</a> — <a href="">Terms</a>
      </div>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <CopyEmailPopup
        v-if="showCopyEmailPopup"
        @close="showCopyEmailPopup = false"
      ></CopyEmailPopup>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CopyEmailPopup from "@/components/CopyEmailPopup.vue";

interface Star {
  [key: string]: string;
}

export default defineComponent({
  name: "Footer",
  components: {
    CopyEmailPopup,
  },
  data() {
    return {
      stars: [],
      showCopyEmailPopup: false,
    };
  },
  mounted() {
    for (let i = 0; i < 4; i++) {
      const star: Star = {};

      //位置随机
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      star.left = x + "%";
      star.top = y + "%";

      //大小随机
      const scale = Math.random() * 0.8 + 0.5;
      star.transform = "scale(" + scale + ", " + scale + ")";

      //频率随机
      const rate = Math.random() * 1.5;
      star.animationDelay = rate + "s";
      // @ts-ignore
      this.stars.push(star);
    }
  },
  methods: {
    onClickGoDiscardPage() {
      window.open("https://discord.gg/H3fjxhFA7T");
    },
    onClickGoLinkedInPage() {
      window.open("https://www.linkedin.com/company/cheersland-gamefi");
    },
    onClickGoTwitterPage() {
      window.open("https://twitter.com/cheers_land");
    },
    onClickGoTelegramPage() {
      window.open("https://t.me/cheersland_news");
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer-bg {
  background-image: url("../../public/images/shlef_bg_2.png");

  .treasure-box-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100vw * (830 / 1920));
    height: calc(100vh * (702 / 1080));
    background-image: url("../../public/images/treasure_box.png");
    background-size: calc(100vw * (830 / 1920)) calc(100vh * (702 / 1080));

    @keyframes flash {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .treasure-star {
      position: absolute;
      top: 10%;
      left: -20%;
      width: calc(100vw * 103 / 1920);
      height: calc(100vh * 90 / 1080);
      background-size: calc(100vw * 103 / 1920) calc(100vh * 90 / 1080);
      animation: flash 1s alternate infinite;
      background-image: url("../../public/images/treasure_star.png");
    }

    /*.treasure-star:nth-child(1) {*/
    /*  top: 45%;*/
    /*  left: 8%;*/
    /*}*/

    /*.treasure-star:nth-child(2) {*/
    /*  top: 24%;*/
    /*  left: 45%;*/
    /*}*/

    /*.treasure-star:nth-child(3) {*/
    /*  top: 35%;*/
    /*  left: 75%;*/
    /*}*/

    .logo {
      cursor: pointer;
      position: absolute;
      transform-origin: bottom center;
      height: calc(100vh * (75 / 1080));
    }
    .logo:nth-of-type(1) {
      top: 34%;
      left: 35%;
      animation: balloon1 6s ease-in-out infinite;
    }
    .logo:nth-of-type(2) {
      top: 49%;
      left: 33%;
      animation: balloon2 6s ease-in-out infinite;
    }
    .logo:nth-of-type(3) {
      top: 34%;
      left: 47%;
      animation: balloon4 6s ease-in-out infinite;
    }
    .logo:nth-of-type(4) {
      top: 48%;
      left: 52%;
      animation: balloon1 5s ease-in-out infinite;
    }
    .logo:nth-of-type(5) {
      top: 26%;
      left: 63%;
      animation: balloon3 5s ease-in-out infinite;
    }

    @keyframes balloon1 {
      0%,
      100% {
        transform: translateY(0) rotate(-6deg);
      }
      50% {
        transform: translateY(-20px) rotate(8deg);
      }
    }
    @keyframes balloon2 {
      0%,
      100% {
        transform: translateY(0) rotate(6deg);
      }
      50% {
        transform: translateY(-30px) rotate(-8deg);
      }
    }
    @keyframes balloon3 {
      0%,
      100% {
        transform: translate(0, -10px) rotate(6eg);
      }
      50% {
        transform: translate(-20px, 30px) rotate(-8deg);
      }
    }
    @keyframes balloon4 {
      0%,
      100% {
        transform: translate(10px, -10px) rotate(-8eg);
      }
      50% {
        transform: translate(-15px, 10px) rotate(10deg);
      }
    }
  }

  .bottom-text {
    position: absolute;
    width: 55%;
    height: 20px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Righteous;
    font-style: normal;
    font-weight: 300;
    font-size: 0.2rem;
    line-height: 140.62%;
    opacity: 0.5;
    color: white;

    a {
      color: white;
    }
  }
}
</style>
