<template>
  <div class="modal">
    <div class="loading-area">
      <div
        class="left-cup"
        :style="{
          transform: `translateX(calc((-25vw + 100%) * (1 - ${
            percent / 100
          })))`,
        }"
      />
      <div
        class="right-cup"
        :style="{
          transform: `translateX(calc((25vw - 100%) * (1 - ${percent / 100})))`,
        }"
      />
      <div class="progress-bar">
        <div class="filler" :style="{ width: `${percent}%` }"></div>
        <div class="text" :style="{ color: percent > 50 ? 'white' : 'black' }">
          {{ percent }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingPage",
  data() {
    return {
      percent: 0,
    };
  },
  watch: {
    percent(val) {
      if (val >= 100) {
        setTimeout(() => {
          this.$emit("complete");
        }, 1000);
      }
    },
  },
  mounted() {
    const imgList = document.getElementsByTagName("img");
    const total = imgList.length;
    let finished = 0;
    imgList.forEach((img) => {
      if (img.complete) {
        finished++;
        this.percent = Math.floor((finished / total) * 100);
      } else {
        img.onload = () => {
          finished++;
          this.percent = Math.floor((finished / total) * 100);
        };
      }
    });
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fdf5d8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100000;

  .loading-area {
    position: relative;
    width: 50vw;
    height: 160px;

    .left-cup {
      position: absolute;
      right: 50%;
      width: 94px;
      height: 104px;
      transform: translateX(calc(-25vw + 100%));
      background-image: url("data:image/png;base64,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");
    }

    .right-cup {
      position: absolute;
      left: 50%;
      width: 90px;
      height: 108px;
      transform: translateX(calc(25vw - 100%));
      background-image: url("data:image/png;base64,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");
    }

    .progress-bar {
      position: absolute;
      top: 120px;
      width: 100%;
      height: 20px;
      border: solid 1px #3e3a39;

      .filler {
        width: 30%;
        height: 100%;
        background-color: #3e3a39;
        transition: width 0.2s ease-out;
      }

      .text {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 0.16rem;
        color: black;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
