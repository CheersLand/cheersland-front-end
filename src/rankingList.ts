import { createApp } from "vue";
import App from "./RankingList.vue";
import MaxScreenWidthSupportByMobile from "@/consts/MaxScreenWidthSupportByMobile";

if (document.documentElement.clientWidth < MaxScreenWidthSupportByMobile) {
  window.location.href = "/mobile_ranking_list.html";
} else {
  createApp(App).mount("#app");
}

