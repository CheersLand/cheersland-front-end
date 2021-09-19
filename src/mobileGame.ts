import { createApp } from "vue";
import MobileGame from "./MobileGame.vue";
import MaxScreenWidthSupportByMobile from "@/consts/MaxScreenWidthSupportByMobile";

document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 4.14 + "px";

if (document.documentElement.clientWidth >= MaxScreenWidthSupportByMobile) {
  window.location.href = "/game.html";
} else {
  createApp(MobileGame).mount("#app");
}

