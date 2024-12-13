<template>
  <div class="footer">
    <dl>
      <dt>
        <div>
          <router-link to="/kr/company">회사소개</router-link>
          <span></span>
          <a href="/documents/hiblocks_whitepaper_kr.pdf" target="_blank">백서</a>
          <span></span>
          <a href="/documents/hiblocks_technical_kr.pdf" target="_blank">테크니컬 메모</a>
          <span></span>
          <router-link to="/kr/terms">이용약관</router-link>
          <span></span>
          <router-link to="/kr/privacy">개인정보처리방침</router-link>
        </div>
        <p>
          <!-- 26, Dosan-daero 37-gil, Gangnam-gu, Seoul, Korea, 06024 <span>|</span> 대표 김영 <span>|</span> 대표전화 02-1111-1111, 해외 82-1-1111-1111<br/> -->
          COPYRIGHT© 2020 HIBLOCKS. ALL RIGHTS RESERVED.
        </p>
      </dt>
      <dd>
        <a href="#none">
          <font-awesome-icon :icon="['fab', 'facebook-f']" />
        </a>
        <a href="#none">
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>
        <a href="#none">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a href="#none">
          <font-awesome-icon :icon="['fab', 'youtube']" />
        </a>
      </dd>
    </dl>
  </div>
</template>

<script>
//import pdf from 'vue-pdf';

export default {
  components: {
    //pdf,
  }
};
</script>
