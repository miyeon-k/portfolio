<template>
  <div class="company">
    <div class="company-title">
      <div>하이블럭스 소개</div>
      <h2>소셜 미디어에 <span>가치를 더하다</span></h2>
      <h3>
        콘텐츠 수익의 탈중앙화를 지향하는 블록체인 기반<br/>
        소셜미디어 큐레이션 플랫폼
      </h3>
    </div>

    <div class="company-about">
      <div class="content">
        <h2>ABOUT US<span></span></h2>
        <h3>모든 유저를 위한 블록체인 기반 소셜미디어 큐레이션 플랫폼</h3>
        <div class="company-about-summary">
          <span>회사개요</span>
          <div>
            <dl>
              <dt>회사명</dt>
              <dd>주식회사 하이블럭스</dd>
            </dl>
            <dl>
              <dt>운영 서비스</dt>
              <dd>
                <ul>
                  <li>
                    블록체인 비즈니스
                    <div>
                      - 자체 블록체인 하이체인(hiChain) 개발<br/>
                      - 블록체인 개발 대행 서비스
                    </div>
                  </li>
                  <li>
                    소셜미디어플랫폼 비즈니스
                    <div>
                      - 개인 및 커뮤니티 소셜미디어 플랫폼 서비스 제공
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>
            <dl>
              <dt>대표자</dt>
              <dd>김 영</dd>
            </dl>
            <dl>
              <dt>소재지</dt>
              <dd>서울 강남구 도산대로 37길 26</dd>
            </dl>
            <dl>
              <dt>직원수</dt>
              <dd>총 24명 (주요경영진 3명, 마케팅 9명, 엔지니어 8명, 자문/고문 3명)</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="company-icon">
      <ul class="content">
        <li>
          <p><img src="../../../assets/images/contents/company_icn01.png" width="100%" alt="company icon01" title="company icon01" /></p>
          <h2>하이체인</h2>
          <h3>
            자체 블록체인<br/>
            하이체인(hiChain)의 개발
          </h3>
        </li>
        <li>
          <p><img src="../../../assets/images/contents/company_icn02.png" width="100%" alt="company icon02" title="company icon02" /></p>
          <h2>하이블럭스</h2>
          <h3>
            자체 소셜 미디어 플랫폼<br/>
            하이블럭스(hiblocks) 개발
          </h3>
        </li>
        <li>
          <p><img src="../../../assets/images/contents/company_icn03.png" width="100%" alt="company icon03" title="company icon03" /></p>
          <h2>블록체인개발</h2>
          <h3>블록체인 개발 대행 서비스</h3>
        </li>
      </ul>
    </div>

    <div class="company-service">
      <div class="content company-service-title">
        <h2>Service<span></span></h2>
        <h3>하이블럭스는 블록체인 기술을 활용해 다양한 서비스를 제공합니다</h3>
      </div>
      <div class="company-service-section cs-section01">
        <dl class="content">
          <dd>
            <h2><span>하이블럭스</span> 서비스</h2>
            <h3>블록체인 기반 소셜미디어 큐레이션 플랫폼</h3>
            <div>
              하이블럭스는 블록체인기반 보상형 소셜미디어 큐레이션 플랫폼입니다.<br/>
              공유절차를 최소화하여 사용자들이 보다 간편하게 콘텐츠 공유를 통한 큐레이션이 가능 합니다. 플랫폼내에서의 다양한 활동을 통해 하이토큰을 획득 할 수 있습니다.
            </div>
          </dd>
        </dl>
      </div>
      <div class="company-service-section cs-section02">
        <dl class="content">
          <dt>
            <h2><span>하이랩스</span><br/>블록체인 및 플랫폼 개발</h2>
            <h3>블록체인 기반 소셜미디어 큐레이션 플랫폼</h3>
            <div>
              하이블럭스는 블록체인기반 보상형 소셜미디어 큐레이션 플랫폼입니다.<br/>
              공유절차를 최소화하여 사용자들이 보다 간편하게 콘텐츠 공유를 통한 큐레이션이 가능 합니다. 플랫폼내에서의 다양한 활동을 통해 하이토큰을 획득 할 수 있습니다.
            </div>
          </dt>
        </dl>
      </div>
    </div>

    <div class="company-team">
      <div class="content">
        <h2>Our Team<span></span></h2>
        <h3>하이블럭스는 각 분야 최고수준의 역량을 갖춘 인재들로 구성되어 있습니다</h3>
        <h4>최고의 서비스를 제공하기위해 많은 경험을 보유한 각 분야의 전문가들이 함께하고 있는 팀입니다</h4>
        <p><img src="../../../assets/images/contents/company_team_img01.jpg" width="100%" alt="hiblocks team" title="hiblocks team" /></p>
        <div class="ct-board">
          <h2>Board</h2>
          <ul>
            <li v-for="board in board" v-bind:key="board.name">
              <p><img :src="board.src" width="100%" :alt="board.name" :title="board.name" /></p>
              <h2>{{board.name}}</h2>
              <h3>{{board.position}}</h3>
            </li>
          </ul>
        </div>
        <div class="ct-team">
          <h2>Team</h2>
          <ul>
            <li v-for="team in team" v-bind:key="team.name">
              <p><img :src="team.src" width="100%" :alt="team.name" :title="team.name" /></p>
              <h2>{{team.name}}</h2>
              <h3>{{team.position}}</h3>
            </li>
          </ul>
        </div>
        <div class="ct-adviser">
          <h2>Adviser</h2>
          <ul>
            <li v-for="adviser in adviser" v-bind:key="adviser.name">
              <p><img :src="adviser.src" width="100%" :alt="adviser.name" :title="adviser.name" /></p>
              <h2>{{adviser.name}}</h2>
              <h3>{{adviser.position}}</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="company-partner">
      <div class="content">
        <h2>Partner<span></span></h2>
        <h3>하이블럭스는 블록체인 기술을 활용해 다양한 서비스를 제공합니다</h3>
        <ul>
          <li v-for="partner in partners" v-bind:key="partner.src">
            <a :href="partner.url" target="_blank"><img :src="partner.src" width="100%" :alt="partner.name" :title="partner.name" /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        board: [{
           src: require("@/assets/images/contents/company_profile_img01.jpg"),
            name: "Young Kim",
            position: "CEO"
          },{
            src: require("@/assets/images/contents/company_profile_img02.jpg"),
            name: "Sanghoon Kil",
            position: "COO , Co-Founder"
          },{
            src: require("@/assets/images/contents/company_profile_img03.jpg"),
            name: "Jiwon Shu",
            position: "Co-Founder"
          },{
            src: require("@/assets/images/contents/company_profile_img04.jpg"),
            name: "Joseph Lee",
            position: "Co-Founder"
        }],
        team: [{
            src: require("@/assets/images/contents/company_profile_img05.jpg"),
            name: "Lisa Wang",
            position: "Senior Marketing Manager"
          },{
            src: require("@/assets/images/contents/company_profile_img06.jpg"),
            name: "Hanjun Kim",
            position: "Project Manager Of IDN"
          },{
            src: require("@/assets/images/contents/company_profile_img07.jpg"),
            name: "Heechul Jeon",
            position: "Senior Strategy Manager"
          },{
            src: require("@/assets/images/contents/company_profile_img08.jpg"),
            name: "Jiho Jung",
            position: "Strategy Specialist"
          },{
            src: require("@/assets/images/contents/company_profile_img09.jpg"),
            name: "Junmo So",
            position: "PRC Manager"
          },{
            src: require("@/assets/images/contents/company_profile_img10.jpg"),
            name: "Fedelia Pheny",
            position: "Global Marketing Specialist"
          // },{
          //   src: require("@/assets/images/contents/company_profile_img11.jpg"),
          //   name: "Nguyen Sue",
          //   position: "Media Marketing Specialist"
          },{
            src: require("@/assets/images/contents/company_profile_img12.jpg"),
            name: "Jungwon Shu",
            position: "Marketing Associate"
          },{
            src: require("@/assets/images/contents/company_profile_img13.jpg"),
            name: "Sanghoon Han",
            position: "Head Of Software Designer"
          },{
            src: require("@/assets/images/contents/company_profile_img14.jpg"),
            name: "Youngjoo Choi",
            position: "Head Of Developer"
          },{
            src: require("@/assets/images/contents/company_profile_img15.jpg"),
            name: "Jeeyoung Yoon",
            position: "Senior Developer"
          },{
            src: require("@/assets/images/contents/company_profile_img16.jpg"),
            name: "Jaeheon Jung",
            position: "Software Engineer"
          },{
            src: require("@/assets/images/contents/company_profile_img17.jpg"),
            name: "Min Namgoong",
            position: "Software Engineer"
          // },{
          //   src: require("@/assets/images/contents/company_profile_img18.jpg"),
          //   name: "Miyeon Kim",
          //   position: "Software Engineer"
          },{
            src: require("@/assets/images/contents/company_profile_img19.jpg"),
            name: "Dongwoo Lee",
            position: "Software Engineer"
          },{
            src: require("@/assets/images/contents/company_profile_img20.jpg"),
            name: "Sanghyun Lim",
            position: "Software Engineer"
          },{
            src: require("@/assets/images/contents/company_profile_img21.jpg"),
            name: "Haneul Lee",
            position: "Software Engineer"
          },{
            src: require("@/assets/images/contents/company_profile_img25.jpg"),
            name: "Ariyanto Kusuma",
            position: "Director Of IDN"
          }],
        adviser: [{
            src: require("@/assets/images/contents/company_profile_img22.jpg"),
            name: "Peter Seo",
            position: "Advisor"
          },{
            src: require("@/assets/images/contents/company_profile_img23.jpg"),
            name: "Youngrok Koh",
            position: "Advisor"
          },{
            src: require("@/assets/images/contents/company_profile_img24.jpg"),
            name: "Chris Yang",
            position: "Advisor"
          },{
            src: require("@/assets/images/contents/company_profile_img26.jpg"),
            name: "Andi Tjahjady",
            position: "Legal Advisor"
        }],
        partners: [{
            url: "https://www.groundx.xyz/",
            src: require("@/assets/images/contents/company_partner_logo01.png"),
            name: "그라운드X"
          },{
            url: "http://www.barunson.co.kr/",
            src: require("@/assets/images/contents/company_partner_logo02.png"),
            name: "바른손"
          },{
            url: "https://bnktothefuture.com/",
            src: require("@/assets/images/contents/company_partner_logo03.png"),
            name: "뱅크투더퓨처"
          },{
            url: "https://certik.io/",
            src: require("@/assets/images/contents/company_partner_logo04.png"),
            name: "썰틱"
          },{
            url: "https://haechi.io/",
            src: require("@/assets/images/contents/company_partner_logo05.png"),
            name: "해치랩스"
          },{
            url: "https://xangle.io/",
            src: require("@/assets/images/contents/company_partner_logo06.png"),
            name: "쟁글"
          },{
            url: "https://www.bitforex.com/",
            src: require("@/assets/images/contents/company_partner_logo07.png"),
            name: "비트포렉스"
          },{
            url: "http://greedilous.com/",
            src: require("@/assets/images/contents/company_partner_logo08.png"),
            name: "그리디어스"
          },{
            url: "http://www.nexusonecap.com/default/",
            src: require("@/assets/images/contents/company_partner_logo09.png"),
            name: "넥서스원"
          },{
            url: "https://quiztok.com/kon/",
            src: require("@/assets/images/contents/company_partner_logo10.png"),
            name: "퀴즈톡"
          },{
            url: "http://www.medieus.io/",
            src: require("@/assets/images/contents/company_partner_logo11.png"),
            name: "메디우스"
          },{
            url: "https://www.chainflix.biz/",
            src: require("@/assets/images/contents/company_partner_logo12.png"),
            name: "체인플릭스"
          },{
            url: "http://www.lylawoffice.com/",
            src: require("@/assets/images/contents/company_partner_logo13.png"),
            name: "헨리유"
          },{
            url: "http://www.decenternet.com/",
            src: require("@/assets/images/contents/company_partner_logo14.png"),
            name: "디센터넷"
          },{
            url: "http://www.decenternet.com/",
            src: require("@/assets/images/contents/company_partner_logo15.png"),
            name: "디앱스토어"
          },{
            url: "https://fan-rep.com/",
            src: require("@/assets/images/contents/company_partner_logo16.png"),
            name: "팬랩"
          },{
            url: "https://spinprotocol.com/",
            src: require("@/assets/images/contents/company_partner_logo17.png"),
            name: "스핀프로토콜"
          },{
            url: "http://ataclub.io/",
            src: require("@/assets/images/contents/company_partner_logo18.png"),
            name: "아타클럽"
          },{
            url: "http://yachtya.kr/",
            src: require("@/assets/images/contents/company_partner_logo19.png"),
            name: "요트야"
          }]
      }
    }
  }
</script>