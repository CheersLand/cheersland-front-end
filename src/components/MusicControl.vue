<template>
  <div
    class="music-control"
    @click="toggleMusicPlay"
    :style="{ transform: `rotate(${rotatingDegree}deg)` }"
  >
    <iframe
      src="/music/silence.mp3"
      allow="autoplay"
      id="audio"
      style="display: none"
    ></iframe>
    <audio src="/music/main_page_bgm.mp3" autoplay loop ref="audioNode"></audio>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

let shouldAutoResumePlay = true;

export default defineComponent({
  name: "MusicControl",
  data() {
    return {
      isPlaying: true,
      rotatingDegree: 0,
    };
  },
  mounted() {
    this.rotating();
    document.addEventListener("visibilitychange", this.visibilityWatcher);
  },
  beforeUnmount() {
    document.removeEventListener("visibilitychange", this.visibilityWatcher);
  },
  methods: {
    visibilityWatcher() {
      const audioNode = this.$refs.audioNode as HTMLAudioElement;
      if (!audioNode) {
        return;
      }
      if (document.visibilityState === "visible") {
        if (shouldAutoResumePlay) {
          audioNode.play();
        }
      } else {
        audioNode.pause();
      }
    },
    rotating() {
      if (this.isPlaying) {
        this.rotatingDegree += 0.3;
      }
      if (this.rotatingDegree > 360) {
        this.rotatingDegree -= 360;
      }
      window.requestAnimationFrame(this.rotating);
    },
    toggleMusicPlay() {
      const audioNode = this.$refs.audioNode as HTMLAudioElement;
      if (!audioNode) {
        return;
      }
      if (this.isPlaying) {
        audioNode.pause();
        this.isPlaying = false;
        shouldAutoResumePlay = false;
      } else {
        audioNode.play();
        this.isPlaying = true;
        shouldAutoResumePlay = true;
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.music-control {
  position: fixed;
  top: 8%;
  right: 5%;
  z-index: 10000;
  width: 74px;
  height: 62px;
  background-image: url("../../public/images/icon_music.png");
  cursor: pointer;
}
</style>
