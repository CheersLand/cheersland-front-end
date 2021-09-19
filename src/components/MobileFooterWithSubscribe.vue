<template>
  <div class="footer-wrapper">
    <div class="link-area">
      <div>
        <div @click="openUrl('https://forms.gle/nKbpLBrDYqbS3GW89')">
          Apply for IGO >
        </div>
        <div @click="openUrl('https://docs.cheersland.org/')">Whitepaper ></div>
      </div>
      <div>
        <div @click="openUrl('https://medium.com/cheersland/tagged/gameplay')">
          Gameplay >
        </div>
        <div
          @click="
            openUrl('https://docs.cheersland.org/cheers-tokenomics/allocation')
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Axios from "axios";

const axios = Axios.create({ baseURL: "https://cheersland.org/" });

export default defineComponent({
  name: "MobileFooterWithSubscribe",
  components: {},
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
  background-color: rgba(#2e150b, 0.33);

  .link-area {
    color: #6d3c1f;
    font-size: 0.19rem;
    padding-top: 0.3rem;
    margin-bottom: 0.3rem;

    div {
      width: 90vw;
      margin: 0 auto;
      height: 0.5rem;
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
    width: 80%;
    margin: 0 auto 0.24rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 0.38rem;
      cursor: pointer;
    }
  }

  .subscribe-area {
    position: relative;
    width: 3.67rem;
    height: 3.14rem;
    margin: 0 auto;
    background-size: cover;
    background-image: url("../../public/images/rankingList/ranking_subscribe.png");

    .error-text {
      position: absolute;
      color: #6d3c1f;
      top: 45%;
      left: 24.5%;
      width: 1.6rem;
      font-family: HoboStd;
      font-size: 0.16rem;
      text-align: left;
    }

    .email-input {
      position: absolute;
      top: 61.9%;
      left: 24.5%;
      width: 1.2rem;
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
      width: 0.4rem;
      height: 0.3rem;
    }

    .email-input:focus {
      border: none;
      outline: none;
    }
  }
}
</style>
