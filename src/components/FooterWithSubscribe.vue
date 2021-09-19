<template>
  <div class="footer-wrapper">
    <div style="width: 360px">
      <div class="link-area">
        <div>
          <div @click="openUrl('https://forms.gle/nKbpLBrDYqbS3GW89')">
            Apply for IGO >
          </div>
          <div @click="openUrl('https://docs.cheersland.org/')">
            Whitepaper >
          </div>
        </div>
        <div>
          <div
            @click="openUrl('https://medium.com/cheersland/tagged/gameplay')"
          >
            Gameplay >
          </div>
          <div
            @click="
              openUrl(
                'https://docs.cheersland.org/cheers-tokenomics/allocation'
              )
            "
          >
            Token Metrics >
          </div>
        </div>
        <div>
          <div @click="openUrl('https://docs.cheersland.org/technology')">
            Technology >
          </div>
          <div @click="openUrl('https://docs.cheersland.org/disclaimer')">
            Disclaimer >
          </div>
        </div>
      </div>
      <div class="icon-panel">
        <img
          src="../../public/images/rankingList/ranking_icon_telegram.png"
          @click="openUrl('https://t.me/cheersland_news')"
        />
        <img
          src="../../public/images/rankingList/ranking_icon_twitter.png"
          @click="openUrl('https://twitter.com/cheers_land')"
        />
        <img
          src="../../public/images/rankingList/ranking_icon_email.png"
          @click="showCopyEmailPopup = true"
        />
        <img
          width="81"
          src="../../public/images/rankingList/ranking_icon_doc.png"
          @click="openUrl('https://medium.com/cheersland')"
        />
        <img
          width="74"
          src="../../public/images/rankingList/ranking_icon_linkedin.png"
          @click="openUrl('https://www.linkedin.com/company/cheersland-gamefi')"
        />
      </div>
    </div>
    <div class="subscribe-area">
      <input
        class="email-input"
        v-model="emailAddress"
        placeholder="Your Email"
        @keyup.enter="doSubscribe"
      />
      <div class="sub-btn" @click="doSubscribe"></div>
      <div v-if="emailAddressError" class="error-text">
        Please check your email and try again.
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
import Axios from "axios";

const axios = Axios.create({ baseURL: "https://cheersland.org/" });

export default defineComponent({
  name: "FooterWithSubscribe",
  components: {
    CopyEmailPopup,
  },
  data() {
    return {
      stars: [],
      showCopyEmailPopup: false,
      emailAddress: "",
      emailAddressError: false,
    };
  },
  watch: {
    emailAddress() {
      if (this.emailAddressError) this.emailAddressError = false;
    },
  },
  methods: {
    openUrl(url: string) {
      window.open(url);
    },
    onClickGoDiscardPage() {
      window.open("https://discord.gg/H3fjxhFA7T");
    },
    onClickGoTwitterPage() {
      window.open("https://twitter.com/cheers_land");
    },
    onClickGoTelegramPage() {
      window.open("https://t.me/cheersland");
    },
    onClickGoMediumPage() {
      window.open("https://medium.com/cheersland");
    },
    onClickEmailIcon() {
      this.showCopyEmailPopup = true;
    },
    async doSubscribe() {
      if (!this.emailAddress) return;
      const subRet = await axios.post("userSubscribe", {
        address: this.emailAddress,
      });
      if (String(subRet.data.success) === "false") {
        this.emailAddressError = true;
        return;
      }
      window.alert("Email was successfully subscribed");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer-wrapper {
  width: 100vw;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(#2e150b, 0.33);

  .link-area {
    color: #6d3c1f;
    font-size: 19px;
    margin-bottom: 40px;

    div {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        cursor: pointer;
        width: 40%;
        text-decoration: underline;
      }
    }
  }

  .icon-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 38.5px;
      cursor: pointer;
    }
  }

  .subscribe-area {
    position: relative;
    margin-left: 24px;
    width: 367.5px;
    height: 314px;
    background-size: cover;
    background-image: url("../../public/images/rankingList/ranking_subscribe.png");

    .error-text {
      position: absolute;
      color: #6d3c1f;
      top: 45%;
      left: 24.5%;
      width: 160px;
      font-family: HoboStd;
      font-size: 16px;
      text-align: left;
    }

    .email-input {
      position: absolute;
      top: 61.9%;
      left: 24.5%;
      width: 120px;
      background-color: transparent;
      border: none;
      text-align: center;
      font-family: HoboStd;
      color: #6d3c1f;
    }

    input::placeholder {
      color: #6d3c1f;
      font-family: HoboStd;
    }

    .sub-btn {
      cursor: pointer;
      position: absolute;
      top: 58.9%;
      left: 59.5%;
      width: 40px;
      height: 30px;
    }

    .email-input:focus {
      border: none;
      outline: none;
    }
  }
}
</style>
