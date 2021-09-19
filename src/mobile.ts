import { createApp } from "vue";
import MobileApp from "./Mobile.vue";
import MaxScreenWidthSupportByMobile from "@/consts/MaxScreenWidthSupportByMobile";

document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 4.14 + "px";

if (document.documentElement.clientWidth >= MaxScreenWidthSupportByMobile) {
  window.location.href = "/";
} else {
  createApp(MobileApp).mount("#app");
}

