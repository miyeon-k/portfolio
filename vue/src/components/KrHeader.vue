<template>
  <div
    class="header"
    :class="{'hidden-header':!showHeader, 'header-scroll':showHeader, 'header-scroll':lastScrollPosition != 0}"
  >
    <dl>
      <dt class="headerLogo">
        <router-link to="/kr">
          <img
            src="../assets/images/common/logo_beta.svg"
            width="100%"
            alt="hiblocks logo"
            title="hiblocks logo"
          />
        </router-link>
      </dt>
      <dd v-if="isMobile">
        <transition name="slide-fade">
          <a v-if="show" key="on" @click="show = false" class="mobile">
            <font-awesome-icon :icon="['far','times']" />
          </a>
          <a v-else key="off" @click="show = true" class="mobile">
            <font-awesome-icon :icon="['far','bars']" />
          </a>
        </transition>
      </dd>
      <dd v-else>
        <router-link to="/kr">홈</router-link>
        <router-link to="/kr/company">회사소개</router-link>
        <router-link to="/kr/media">미디어</router-link>
        <router-link to="/kr/doc">독스</router-link>
        <!-- <router-link to="/en" class="eng"><font-awesome-icon :icon="['far','globe']" />ENG</router-link> -->
        <a v-on:click="enIng">
          <font-awesome-icon :icon="['fal','globe']" />영문
        </a>
      </dd>
    </dl>
    <transition name="dropdown">
      <div v-bind:class="{ active: show }" v-if="show" @click="show = false">
        <router-link to="/kr">홈</router-link>
        <router-link to="/kr/company">회사소개</router-link>
        <router-link to="/kr/media">미디어</router-link>
        <router-link to="/kr/doc">독스</router-link>
        <a v-on:click="enIng">
          <font-awesome-icon :icon="['fal','globe']" />영문
        </a>
      </div>
    </transition>
    <div class="mh-drop-bg" v-if="show" @click="show = false"></div>
  </div>
</template>

<script>
const OFFSET = 0;

export default {
  data() {
    return {
      showHeader: true,
      lastScrollPosition: 0,
      scrollValue: 0,
      isMobile: true,
      show: false
    };
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);

    this.onResize();
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onScroll() {
      if (window.pageYOffset < 0) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return;
      }
      this.showHeader = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;

      // if (this.lastScrollPosition != 0) {
      //   document.querySelector(".headerLogo").innerHTML='<a href="/kr"><img src="'+require("@/assets/images/common/logo_black.png")+'" width="100%" alt="hiblocks logo" title="hiblocks logo" /></a>'
      // } else {
      //   document.querySelector(".headerLogo").innerHTML='<a href="/kr"><img src="'+require("@/assets/images/common/logo_white02.png")+'" width="100%" alt="hiblocks logo" title="hiblocks logo" /></a>'
      // }
    },

    onResize() {
      this.isMobile = window.innerWidth <= 767;
    },

    enIng() {
      alert("준비중입니다.");
    }
  }
};
</script>