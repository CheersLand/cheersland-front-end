import { createApp } from "vue";
import Game from "./Game.vue";
import MaxScreenWidthSupportByMobile from "@/consts/MaxScreenWidthSupportByMobile";

if (document.documentElement.clientWidth < MaxScreenWidthSupportByMobile) {
  window.location.href = "/mobile_game.html";
} else {
  createApp(Game).mount("#app");
}

