import { createApp } from "vue";
import MaxScreenWidthSupportByMobile from "@/consts/MaxScreenWidthSupportByMobile";
import MobileRankingList from "@/MobileRankingList.vue";

document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 4.14 + "px";

if (document.documentElement.clientWidth >= MaxScreenWidthSupportByMobile) {
  window.location.href = "/ranking_list.html";
} else {
  createApp(MobileRankingList).mount("#app");
}

