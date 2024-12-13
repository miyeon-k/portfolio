<template>
  <div class="main">
    <div class="main-visual">
      <div class="content">
        <h2>내가 고른 콘텐츠들만<br />모아보는 즐거움! 하블</h2>
        <ul v-if="$device.mobile === true">
          <li v-if="$device.android === true">
            <a href="https://media.hiblocks.io/common/downapk/ARdfeE3"><img src="../../../assets/images/contents/main_app01.svg" alt="google play" title="google play"/></a>
          </li>
          <li v-if="$device.iphone === true" class="mv-mobile-ios">
            <a href="https://testflight.apple.com/join/hjgUn5zm" target="_blank"><img src="../../../assets/images/contents/main_app02.svg" alt="app store" title="app store"/></a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a href="https://media.hiblocks.io/common/downapk/ARdfeE3"><img src="../../../assets/images/contents/main_app01.svg" alt="google play" title="google play"/></a>
          </li>
          <li>
            <a href="https://testflight.apple.com/join/hjgUn5zm" target="_blank"><img src="../../../assets/images/contents/main_app02.svg" alt="app store" title="app store"/></a>
          </li>
        </ul>
      </div>
    </div>

    <div class="main-section">
      <dl class="content main-section-right">
        <dt>
          <h2>원하는 콘텐츠를 쉽게<br />모아보세요</h2>
          <h3>
            일상에서 만나는 수많은 콘텐츠들<br />
            내가 좋아하는 콘텐츠들만 쉽게 모아보고<br />
            하블에서 보상 받으세요.
          </h3>
          <ul>
            <li v-for="sns in sns" v-bind:key="sns.src">
              <img :src="sns.src" height="100%" :alt="sns.name" :title="sns.name" />
            </li>
          </ul>
        </dt>
        <dd>
          <p><img src="../../../assets/images/contents/main_img_section01.svg" height="100%" alt="phone image01" title="phone image01" /></p>
        </dd>
      </dl>
    </div>

    <div class="main-video">
      <iframe :src="iframe.src" :width="1200" :height="678" frameborder="0" allow="autoplay; autohide; nocontrols; fullscreen" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
    </div>

    <div class="main-section">
      <dl class="content main-section-left msl-double">
        <dt>
          <p><img src="../../../assets/images/contents/main_img_section02.svg" height="100%" alt="phone image02" title="phone image02" /></p>
        </dt>
        <dd>
          <h2>재밌는 콘텐츠를<br />쉽게 가져오세요</h2>
          <h3>
            유튜브, 틱톡, 인스타그램, 페이스북 등<br />
            다양한 소셜미디어의 콘텐츠를<br />
            링크 복사으로 손쉽게 큐레이션 할 수 있어요.
          </h3>
          <div>쉽게 콘텐츠 가져오는 방법은?</div>
        </dd>
      </dl>
    </div>

    <div class="main-section ms-border">
      <dl class="content main-section-right msr-cut">
        <dt>
          <h2>함께 모으면<br />즐거움도, 보상도 2배!</h2>
          <h3>
            관심사의 스페이스를 생성하고,<br />
            친구들과 함께 콘텐츠를 모아보세요.<br />
            주제별로 모으는 재미와 알찬 정보로 더 많은 보상을 받을 수 있어요.
          </h3>
          <div>하블 보상내역 어떻게 되나요?</div>
        </dt>
        <dd>
          <p><img src="../../../assets/images/contents/main_img_section03.svg" height="100%" alt="phone image03" title="phone image03" /></p>
        </dd>
      </dl>
    </div>

    <div class="main-section ms-border">
      <dl class="content main-section-left">
        <dt>
          <p><img src="../../../assets/images/contents/main_img_section04.svg" height="100%" alt="phone image04" title="phone image04" /></p>
        </dt>
        <dd>
          <p><img src="../../../assets/images/contents/main_section04_icn01.png" width="100%" alt="section04 icon" title="section04 icon" /></p>
          <h2>매일매일 챌린지에 도전하고<br />보상 받아가세요</h2>
          <h3>
            다양한 챌린지가 매일 업데이트 됩니다.<br />
            쉽게 참여하고 간편하게 보상 받으세요.<br />
          </h3>
        </dd>
      </dl>
    </div>

    <div class="main-lets">
      <p><img src="../../../assets/images/contents/main_lets_title.png" width="100%" alt="lets hiblocks title" title="lets hiblocks title" /></p>
      <h2>크리에이터 시대를 넘어서<br /><span>이제는 큐레이터 시대.</span></h2>
      <div>
        <p><img src="../../../assets/images/contents/main_lets_phone.svg" width="100%" alt="lets hiblocks phone" title="lets hiblocks phone" /></p>
        <infinite-slide-bar duration="30s">
          <p v-for="lets in lets" v-bind:key="lets.src">
            <img :src="lets.src" width="100%" :alt="lets.name" :title="lets.name" />
          </p>
        </infinite-slide-bar>
      </div>
    </div>

    <div class="main-media">
      <h2>하이블럭스 미디어룸</h2>
      <h3>최신뉴스와 다양한 콘텐츠를 통해 하이블럭스를 알아보세요</h3>
      <router-link to="/kr/media">미디어룸 더보기</router-link>
      <p><img src="../../../assets/images/contents/main_media_img01.png" width="100%" alt="hiblocks mediaroom" title="hiblocks mediaroom" /></p>
    </div>
  </div>
</template>

<script>
import InfiniteSlideBar from 'vue-infinite-slide-bar';

export default {
  components: {
    InfiniteSlideBar,
  },
  data() {
    return {
      sns: [
        { src: require('@/assets/images/contents/main_section01_icn01.png'), name: '인스타그램' },
        { src: require('@/assets/images/contents/main_section01_icn02.png'), name: '페이스북' },
        { src: require('@/assets/images/contents/main_section01_icn03.png'), name: '유튜브' },
        { src: require('@/assets/images/contents/main_section01_icn04.png'), name: '틱톡' },
        { src: require('@/assets/images/contents/main_section01_icn05.png'), name: '트위터' },
        { src: require('@/assets/images/contents/main_section01_icn06.png'), name: '링크드인' },
      ],
      iframe: { src: require('@/assets/images/contents/main_video02.mp4') },
      lets: [
        { src: require('@/assets/images/contents/main_lets_img01.jpg'), name: 'lets hiblock image01' },
        { src: require('@/assets/images/contents/main_lets_img02.jpg'), name: 'lets hiblock image02' },
        { src: require('@/assets/images/contents/main_lets_img03.jpg'), name: 'lets hiblock image03' },
        { src: require('@/assets/images/contents/main_lets_img04.jpg'), name: 'lets hiblock image04' },
        { src: require('@/assets/images/contents/main_lets_img05.jpg'), name: 'lets hiblock image05' },
        { src: require('@/assets/images/contents/main_lets_img06.jpg'), name: 'lets hiblock image06' },
        { src: require('@/assets/images/contents/main_lets_img01.jpg'), name: 'lets hiblock image01' },
        { src: require('@/assets/images/contents/main_lets_img02.jpg'), name: 'lets hiblock image02' },
        { src: require('@/assets/images/contents/main_lets_img03.jpg'), name: 'lets hiblock image03' },
        { src: require('@/assets/images/contents/main_lets_img04.jpg'), name: 'lets hiblock image04' },
        { src: require('@/assets/images/contents/main_lets_img05.jpg'), name: 'lets hiblock image05' },
        { src: require('@/assets/images/contents/main_lets_img06.jpg'), name: 'lets hiblock image06' },
      ],
    };
  },
};
</script>
