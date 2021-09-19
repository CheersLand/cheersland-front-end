import { createApp } from "vue";
import App from "./App.vue";
import MaxScreenWidthSupportByMobile from "@/consts/MaxScreenWidthSupportByMobile";

if (document.documentElement.clientWidth < MaxScreenWidthSupportByMobile) {
  window.location.href = "/mobile.html";
} else {
  createApp(App).mount("#app");
}

