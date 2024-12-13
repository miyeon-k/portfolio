<template>
  <div class="media">
    <div class="media-title">
      <h2>하이블럭스 <span>미디어룸</span></h2>
      <h3>최신 뉴스와 다양한 콘텐츠를 통해 하이블럭스를 알아보세요</h3>
    </div>

    <div class="content media-news">
      <div class="media-news-title">
        <h2>보도자료<span></span></h2>
        <h3>모든 유저를 위한 블록체인 기반 소셜미디어 큐레이션 플랫폼</h3>
        <div>
          <span><font-awesome-icon :icon="['fab','youtube']" /></span>
          <span><font-awesome-icon :icon="['fab','instagram']" /></span>
        </div>
      </div>
      <dl>
        <dt>
          <span v-for="tab in tabs" v-bind:class="{ active: tab.isActive }" v-bind:key="tab.value" v-on:click="selectTag(tab.value)">{{tab.title}}</span>
        </dt>
        <dd>
          <span class="swiper-button-prev" slot="button-prev"></span>
          <span class="swiper-button-next" slot="button-next"></span>
        </dd>
      </dl>
      <swiper ref="mySwiper" :options="newsOptions">
        <a v-for="news in searchTag"  v-bind:key="news.src" :href="news.link" target="_blank" class="swiper-slide">
          <!-- <p><img :src="news.src" width="100%" :alt="news.title" :title="news.title" /></p> -->
          <p v-bind:style="{background:'url(' + news.src + ') center / cover'}"></p>
          <div>
            <span>{{news.tag}}</span>
            <h2>{{news.title}}</h2>
            <h3>{{news.description}}</h3>
          </div>
        </a>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="media-vedio">
      <div class="content">
        <dl>
          <dt>
            <h2>제2회 밋업 [하이파이브]</h2>
            <h3>제2회 하이파이브 밋업 하이라이트</h3>
          </dt>
          <dd>2020-02<span>28</span></dd>
        </dl>
        <div><iframe src="https://www.youtube.com/embed/K4PTe7VqNU0?feature=oembed&start&end&wmode=opaque&autoplay=0&loop=0&controls=0&mute=0&rel=0&modestbranding=0" width="100%" height="100%"></iframe></div>
        <ul>
          <li>
            <div><iframe src="https://www.youtube.com/embed/xflmHJsrxfo?feature=oembed&start&end&wmode=opaque&autoplay=0&loop=0&controls=0&mute=0&rel=0&modestbranding=0" width="100%" height="100%"></iframe></div>
            <p>큐레이터를 위한 소셜미디어, 하이블럭스</p>
          </li>
          <li>
            <div><iframe src="https://www.youtube.com/embed/0j11Es5FEj8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="100%" height="100%" allowfullscreen></iframe></div>
            <p>하이블럭스 첫 워크샵 영상</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="media-youtube">
      <div class="content">
        <p></p>
        <h2>하이블럭스 유튜브</h2>
        <ul>
          <li v-for="youtube in youtube" v-bind:key="youtube.id">
            <div><a :href="youtube.link" target="_blank"><img :src="youtube.src" width="100%" :alt="youtube.title" :title="youtube.title" /></a></div>
            <p v-html="youtube.title"></p>
          </li>
        </ul>
        <div v-on:click="getYoutubeMedia" v-if="viewYoutube">더보기</div>
      </div>
    </div>

    <div class="media-instagram">
      <div class="content">
        <p></p>
        <h2>하이블럭스 공식 인스타그램</h2>
        <ul>
          <li v-for="instagram in instagram" v-bind:key="instagram.src">
            <div><a :href="instagram.link" target="_blank"><img :src="instagram.src" width="100%" :alt="instagram.title" :title="instagram.title" /></a></div>
            <!-- <dl>
              <dt><img src="../../../assets/images/contents/media_instagram_icn01.png" width="100%" alt="instagram icon" title="instagram icon" /></dt>
              <dd>{{instagram.title}}</dd>
            </dl> -->
          </li>
        </ul>
        <div v-on:click="getInstagramMedia">더보기</div>
      </div>
    </div>

    <div class="media-contact">
      <div class="content">
        <h2>Contact Us<span></span></h2>
        <h3>비지니스 및 제휴문의는 아래 이메일로 보내주세요</h3>
        <h4>partnership@hiblocks.io</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        tabs: [
          { title: "전체" , value:'A' ,isActive:true},
          { title: "#언론보도", value:'언론보도' ,isActive: false},
          { title: "#하이블럭스 소식", value:'하이블럭스 소식',isActive: false},
          { title: "#생생인터뷰", value:'생생인터뷰',isActive: false},
        ],
        isMobile: true,
        newsOptions: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 75,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          breakpoints: {
            // when window width is >= 320px
            320: { slidesPerView: 2, spaceBetween: 20 },
            // when window width is >= 768px
            768: { spaceBetween: 30 },
            // when window width is >= 992px
            992: { spaceBetween: 50 },
          }
        },
        news: [{
          src: require("@/assets/images/contents/media_news_img01.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "소셜미디어 큐레이션 플랫폼 하이블럭스, ‘기생충 주가 효과’ 바른손과 MOU",
          description: "소셜미디어 큐레이션 플랫폼 하이블럭스(Hiblocks)와 영화 기생충 제작사 바른손이앤에이의 자회사 바른손이 지난 12일 전략적 업무협약(MOU)을 체결했다고 밝혔다. 이번 업무협약은 플랫폼 서비스 활성화를 위한 것으로, 기생충의 아카데미 4관왕 달성에 바른손이앤에이와 바른손의 주가가 상한가를 기록 중인 터라 더욱 주목을 받고 있다.",
          link:'https://news.joins.com/article/23705341',
        },{
          src: require("@/assets/images/contents/media_news_img02.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "카카오 그라운드X, 서비스 파트너에 '하이블럭스ㆍ 피어테크' 등 합류",
          description: "카카오의 블록체인 기술 계열사 그라운드X가 자체 개발한 블록체인 플랫폼 클레이튼(Klaytn)에 하이블럭스와 피어테크가 합류했다. ‘하이블럭스(hiblocks)’는 큐레이션 중심의 블록체인 기반 소셜미디어 플랫폼으로, 누구나 손쉽게 기존 소셜미디어 계정을 하이블럭스와 연동하여 콘텐츠를 수집 및 공유할 수 있다.",
          link:'http://www.etoday.co.kr/news/view/1858827',
        },{
          src: require("@/assets/images/contents/media_news_img03.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "바른손과 하이블럭스, 공동으로 영화문화 콘텐츠 플랫폼 만든다",
          description: "전세계를 강타한 영화 ‘기생충’의 투자사 바른손과 하이블럭스가 함께 영화 문화 콘텐츠 플랫폼을 만든다는 계획을 밝혔다. 하이블럭스의 소셜미디어 플랫폼으로 홍보, 광고, 마케팅, 작품 리뷰, 보팅 등 플랫폼 내 서비스를 활용해 영화/문화 시장의 활성화 계획 중이라고 한다. 양사는 지난 12일 전략적 업무협약(MOU)을 체결했으며, 이번 업무협약은 플랫폼 서비스 활성화와 함께 공동으로 개발계획 중인 영화/문화 콘텐츠 플랫폼 개발을 위한 것이라 밝혔다.",
          link:'https://kr.cointelegraph.com/press-releases/parasite',
        },{
          src: require("@/assets/images/contents/media_news_img04.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "양질의 콘텐츠를 한 번에…콘텐츠 허브 플랫폼 '하이블럭스'",
          description: "하이블럭스는 ‘하이블럭스 플랫폼에서는 누구나 큐레이팅을 하는 행위 자체가 크리에이팅이 된다’고 말한다. 하이블럭스 측은 광고 수익을 창출해 수익을 힙스토큰으로 나눠줄 예정이며, 이를 통해 콘텐츠 큐레이터라는 새로운 직업을 더욱 확고히 하겠다는 계획이다.",
          link:'https://www.edaily.co.kr/news/read?newsId=03276726625667896&mediaCodeNo=257&OutLnkChk=Y',
        },{
          src: require("@/assets/images/contents/media_news_img05.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "생활스포츠 통합 플랫폼 아타클럽",
          description: "블록체인 기반의 생활 스포츠 통합 플랫폼 아타클럽(ATACLUB.io)과 큐레이터를 위한 소셜미디어 플랫폼 블록체인 허브 소셜 미디어 서비스인 '하이블럭스'(hiblocks.io)가 파트너십을 체결했다.",
          link:'http://www.blockchaintoday.co.kr/news/articleView.html?idxno=12023',
        },{
          src: require("@/assets/images/contents/media_news_img06.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "블록체인 소셜미디어 ‘하이블럭스’, 투자사 ‘뱅크투더퓨처’ 손잡아…향후 계획은?",
          description: "블록체인 기반의 소셜미디어 플랫폼과 온라인 투자 플랫폼이 손을 잡았다. 사용자에게 보상을 지급하는 콘텐츠 큐레이션 서비스 ‘하이블럭스(hiblocks)’와 블록체인 암호화폐·주식 투자사 ‘뱅크투더퓨처(BNK TO THE FUTURE)’의 이야기다.",
          link:'https://blockinpress.com/archives/25990',
        },{
          src: require("@/assets/images/contents/media_news_img07.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "Korean Startup HiBlocks a Social Media Curation Platform",
          description: "Founded in 2019, Korean Blockchain social media startup HiBlock’s founders felt Blockchain technology could provide a way to reward not only content creators but content curators.",
          link:'https://seoulz.com/korean-startup-hiblocks-a-social-media-curation-platfrom/',
        },{
          src: require("@/assets/images/contents/media_news_img08.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "소셜미디어 유저들의 수익창출을 돕습니다",
          description: "누구나 기존 소셜미디어 계정을 연동해 수익을 창출할 수 있는 블록체인 기반 소셜미디어 큐레이션 플랫폼이 탄생했다. 바로 콘텐츠 수익의 탈중앙화를 지향하는 하이블럭스(대표이사 김영)가 그 주인공이다.",
          link:'http://www.hkbs.co.kr/news/articleView.html?idxno=521584',
        },{
          src: require("@/assets/images/contents/media_news_img09.png"),
          tag: "언론보도",
          tagTitle: "[언론보도]",
          title: "아타클럽-하이블럭스, 파트너십 계약 체결",
          description: "블록체인 기반의 생활 스포츠 통합 플랫폼 아타클럽(ATA Club)과 큐레이터를 위한 소셜미디어 플랫폼 블록체인 허브 소셜 미디어 서비스인 하이블럭스(Hiblocks)가 파트너십을 체결했다고 19일 밝혔다.",
          link:'http://www.nbnnews.co.kr/news/articleView.html?idxno=342791',
        }],
      youtube: [],
        youtubePageToken : '',
        viewYoutube :true,
        youtubeApiKey:'AIzaSyAiHmXCw1M_UJEhq40H36yAnH0a1xiOQLc',
        youtubePageSize:3,
      instagram: [],
      instagramEndPoint : '',
        instagramPageSize:9,
        newsSelectTag:[],
      }
    },
    created () {
      this.getYoutubeMedia()
      this.getInstagramMedia()
    },
    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResize)
    },
    computed: {
      searchTag: function () {
        const newsSelectTag= this.newsSelectTag;
        return this.news.filter(function (item) {
          if(newsSelectTag.length === 0){
            return true;
          }else{
            return  newsSelectTag.indexOf(item.tag) > -1;
          }
        })
      }
    },
    methods: {
      selectTag(tag){
        this.tabs=this.tabs.map(tab=>{
          if(tag!='A'){
            if(tab.value==='A') tab.isActive=false;
            if(tab.value===tag){
              tab.isActive=tab.isActive?false:true
            }
          }else{
            tab.value==='A'?tab.isActive=true:tab.isActive=false
          }
          return tab
        })


        if(tag === 'A'){
          this.newsSelectTag=[];
        }else{
          this.newsSelectTag.length ===0?this.newsSelectTag.push(tag)
                  :
          this.newsSelectTag.indexOf(tag)> -1?
                  this.newsSelectTag= this.newsSelectTag.map(selectTag=>{
                    return selectTag != tag
                  }):this.newsSelectTag.push(tag)

        }


      },
      onResize() {
        this.isMobile = window.innerWidth <= 767
        this.youtubePageSize = this.isMobile?2:3;
        // this.instagramPageSize =this.isMobile?2:3;
        this.instagramPageSize = 9;
      },
      getYoutubeMedia() {
        let param = '?key='+this.youtubeApiKey
                +'&part=id,snippet'
                +'&order=date'
                +'&maxResults='+this.youtubePageSize
                +'&type=video'
                +'&channelId=UC3RUQWEePShsn7tSmCGeuOw'
        if(this.youtubePageToken){
          param+='&pageToken='+this.youtubePageToken;
        }
        if(this.viewYoutube){
          fetch('https://www.googleapis.com/youtube/v3/search'+param)
            .then((response)=>{
              if(response.ok){
                return response.json();
              }
            })
            .then((json)=>{
              console.debug('youtube',json)
              const data = json.items;
              if(json.nextPageToken){
                this.youtubePageToken = json.nextPageToken;
                this.viewYoutube= true;
              }else{
                this.viewYoutube= false;
              }

              data.map((e) => {
                this.youtube.push({
                  src:e.snippet.thumbnails.high.url,
                  title: e.snippet.title,
                  id : e.id.videoId,
                  link : 'https://www.youtube.com/watch?v='+e.id.videoId
                });
              })
            })
            .catch((error)=>{

              console.debug('error',error);
            });
        }


      },
      getInstagramMedia() {
        let url="https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44";
        url+="&variables=";
        url+='{';
        url+='"id":"12067829475"'
        url+=',"first":'+this.instagramPageSize
        if(this.instagramEndPoint){
          url+=',"after":"'+this.instagramEndPoint+'"';
        }
        url+='}';
        fetch(url)
        .then((response)=>{
          if(response.ok){
            return response.json();
          }
        })
        .then((json)=>{
          const instaDataList = json.data.user.edge_owner_to_timeline_media.edges;
          this.instagramEndPoint =json.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
          instaDataList.map((e, i) => {
            this.instagram.push({
              src: e.node.display_url,
              title: e.node.edge_media_to_caption.edges[0].node.text,
              id : 'instagram'+i,
              link : 'https://www.instagram.com/p/'+e.node.shortcode+'/',
            });
          })
        })
        .catch((error)=>{
          console.debug('error',error);
        });
      },
    },

  }
</script>