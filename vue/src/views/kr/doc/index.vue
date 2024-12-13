<template>
  <div class="docs">
    <div class="docs-title">
      <h2>하이블럭스 <span>독스</span></h2>
      <h3>최신 뉴스와 다양한 콘텐츠를 통해 하이블럭스를 알아보세요</h3>
    </div>

    <ul class="content docs-tabMenu">
      <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" v-bind:key="tab.index">
        <a href="#" v-on:click="currentTab = index">{{tab}}</a>
      </li>
    </ul>

    <div class="docs-tabContent">
      <!-- 활동보상 -->
      <div v-show="currentTab == 0">
        <div class="content">
          <h2>콘텐츠 활동에 따라 무제한 적립</h2>
          <h3>포인트 적립</h3>

          <ul class="docs-contentCut3">
            <li>
              <span>01</span>
              <p>큐레이션 게시물의 보팅을<br/>하거나 받을 경우</p>
              <em>5 포인트 지급</em>
            </li>
            <li>
              <span>02</span>
              <p>직접 등록한 게시물의 보팅을 하거나 받을 경우</p>
              <em>10 포인트 지급</em>
            </li>
            <li>
              <span>03</span>
              <p>등록 게시물의 좋아요를 하거나 받을 경우</p>
              <em>0.01 포인트 지급</em>
            </li>
            <li>
              <span>04</span>
              <p>게시물을 공유할 경우 공유한 사람에게</p>
              <em>1 포인트 지급</em>
            </li>
            <li>
              <span>05</span>
              <p>헌터 자격 획득 후 신고한 유해 게시물이 선정될 경우</p>
              <em>5 포인트 지급</em>
            </li>
          </ul>
        </div>
        <div class="docs-contentFull">
          <div class="content">
            <ul>
              <li>· 개인 스테이킹 등급에 따라 포인트에 가중치 적용하여 최종 포인트가 지급됩니다.</li>
              <li>· 보팅은 한번 했을 경우 취소할 수 없습니다.</li>
              <li>· 좋아요는 금 주 보상 전까지는 취소가 가능하며 금 주 이후에는 취소가 불가능 합니다.</li>
              <li>· 신고 포인트는 헌터 자격이 주어진 사용자만 받을 수 있습니다.</li>
            </ul>
            <p>※ 포인트 산정은 매주 진행되며, 과거 작성한 게시글이라도 매주 새롭게 받은 활동에 대해서는 포인트가 지급됩니다.</p>
            <dl>
              <dt>* 용어 :</dt>
              <dd>
                <a href="#none">큐레이션</a>
                <a href="#none">보팅</a>
                <a href="#none">헌터</a>
                <a href="#none">스테이킹</a>
                <a href="#none">가중치</a>
              </dd>
            </dl>
          </div>
        </div>

        <div class="content docs-tabContent02">
          <h3>보상</h3>

          <ul class="docs-contentCut2">
            <li>
              <span>01</span>
              <p>월요일부터 ~ 일요일 자정까지</p>
              <em>나의 총 활동 포인트 합산</em>
            </li>
            <li>
              <span>02</span>
              <p>합산한 활동 포인트를 개인 스테이킹 등급의</p>
              <em>가중치를 적용하여 나의 최종 포인트 산출</em>
            </li>
            <li>
              <span>03</span>
              <p>모든 사용자의 가중치가 적용된 총 합계 포인트에서</p>
              <em>나의 최종 포인트의 점유율 산정</em>
            </li>
            <li>
              <span>04</span>
              <p>보상풀의 활동 보상 금액에서</p>
              <em>나의 점유율을 곱하여 보상 금액 지급</em>
            </li>
          </ul>
        </div>
        <div class="docs-contentFull">
          <div class="content">
            <ul>
              <li>· 활동 보상풀의 금액은 매 주 달라질 수 있습니다. (보상풀의 50%)</li>
              <li>· UCT 기준 월요일은 보상 금액에 대한 정산이 진행되기 때문에 활동 내역을 확인할 수 없습니다.</li>
              <li>· 개인 활동에 대한 보상은 운영 보상과는 별도로 진행됩니다.</li>
            </ul>
            <dl>
              <dt>* 용어 :</dt>
              <dd>
                <a href="#none">보상풀</a>
                <a href="#none">UCT</a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <!-- 활동보상 끝 -->

      <!-- 운영보상 -->
      <div v-show="currentTab == 1">
        <div class="content">
          <h2>운영 활동에 따라 각 스페이스 별 포인트 지급</h2>
          <h3>포인트 적립</h3>

          <ul class="docs-contentCut3">
            <li>
              <span>01</span>
              <p>주간 각 게시물별</p>
              <em>활동 포인트<br/>(보팅, 좋아요, 공유) 총합</em>
            </li>
            <li>
              <span>02</span>
              <p>스페이스 주간 방문자 수</p>
              <em>방문자 1명 당 1포인트 지급</em>
            </li>
            <li>
              <span>03</span>
              <p>스페이스 주간 팔로워 수</p>
              <em>팔로워 1명 당 1포인트 지급</em>
            </li>
          </ul>
        </div>
        <div class="docs-contentFull">
          <div class="content">
            <ul>
              <li>· 주간 팔로워 수 포인트는 한 계정당 한번만 지급되며, 지급된 계정은 언팔로우 후 팔로잉을하여도 포인트가 추가로 지급되지 않습니다.</li>
              <li>· 포인트 산정은 매주 진행되며, 과거 작성한 게시글이라도 매주 새롭게 받은 활동에 대해서는 포인트가 지급됩니다.</li>
            </ul>
            <dl>
              <dt>* 용어 :</dt>
              <dd>
                <a href="#none">보팅</a>
              </dd>
            </dl>
          </div>
        </div>

        <div class="content docs-tabContent02">
          <h3>보상</h3>

          <ul class="docs-contentCut3">
            <li>
              <span>01</span>
              <p>월요일부터 일요일 자정까지</p>
              <em>나의 운영 포인트 합산<br/>(각 스페이스별 별도)</em>
            </li>
            <li>
              <span>02</span>
              <p>모든 스페이스의 가중치가 적용된 총 합계 포인트에서</p>
              <em>나의 최종 포인트의 점유율 산정</em>
            </li>
            <li>
              <span>03</span>
              <p>보상풀의 운영 보상 금액에서</p>
              <em>나의 점유율을 곱하여<br/>보상 금액 지급</em>
            </li>
          </ul>
        </div>
        <div class="docs-contentFull">
          <div class="content">
            <ul>
              <li>· 운영 보상풀의 금액은 매주 달라질 수 있습니다. (보상풀의 20%)</li>
              <li>· UCT 기준 월요일은 보상 금액에 대한 정산이 진행되기때문에 운영 내역을 확인할 수 없습니다.</li>
              <li>· 운영 활동에 대한 보상은 개인 보상과는 별도로 진행됩니다.</li>
            </ul>
            <dl>
              <dt>* 용어 :</dt>
              <dd>
                <a href="#none">가중치</a>
                <a href="#none">점유율</a>
                <a href="#none">보상풀</a>
                <a href="#none">UCT</a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <!-- 운영보상 끝 -->

      <!-- 스테이킹 보상 -->
      <div v-show="currentTab == 2">
        <div class="content">
          <h2>스테이킹(예치금액)에 따라 활동/운영 포인트의 가중치 및 스테이킹 보상 지급</h2>
          <h3>포인트 적립</h3>

          <ul class="docs-contentCut3">
            <li>
              <span>01</span>
              <p>매주 개인 스테이킹 진행</p>
              <em>월요일부터 일요일까지<br/>자유롭게 스테이킹</em>
            </li>
            <li>
              <span>02</span>
              <p>월요일 09시 ~ 17시까지 언스테이킹 가능</p>
              <em>현재 보유 스테이킹 금액<br/>출금 가능</em>
            </li>
            <li>
              <span>03</span>
              <p>최종 스테이킹 금액으로 등급 및 스테이킹 점유율 산정</p>
              <em>상대 평가로 나의 등급 산정</em>
            </li>
          </ul>
        </div>
        <div class="docs-contentFull">
          <div class="content">
            <ul>
              <li>· 개인 스테이킹의 등급 산정은 매주 새롭게 진행됩니다. · 언스테이킹은 스테이킹 등급 및 점유율 산정 전 주 1회 월요일 09시 ~ 17시에만 가능합니다.</li>
              <li>· 스테이킹 등급은 활동 보상의 가중치를 적용하기 위해 산출됩니다.</li>
            </ul>
            <dl>
              <dt>* 용어 :</dt>
              <dd>
                <a href="#none">스테이킹</a>
                <a href="#none">언스테이킹</a>
                <a href="#none">점유율</a>
                <a href="#none">가중치</a>
              </dd>
            </dl>
          </div>
        </div>

        <div class="content docs-tabContent02">
          <h3>보상</h3>

          <div class="docs-contentTable">
            <dl>
              <dt>등급</dt>
              <dd>1등급</dd>
              <dd>2등급</dd>
              <dd>3등급</dd>
              <dd>4등급</dd>
              <dd>5등급</dd>
            </dl>
            <dl>
              <dt>등급기준<br/>(스테이킹 기준)</dt>
              <dd>상위 20%</dd>
              <dd>상위 40%</dd>
              <dd>상위 60%</dd>
              <dd>상위 80%</dd>
              <dd>그외 100%</dd>
            </dl>
            <dl>
              <dt>혜택 (가중치)</dt>
              <dd>X 1.16</dd>
              <dd>X 1.08</dd>
              <dd>X 1.04</dd>
              <dd>X 1.02</dd>
              <dd>X 1.01</dd>
            </dl>
            <dl>
              <dt class="column">개인 스테이킹 보상<span>*직접 보상 수령</span></dt>
              <dd class="flex5">나의 스테이킹 금액 / 총 개인 스테이킹 금액*100 = 나의 스테이킹 점유율<br/>총 개인 스테이킹 보상 금액(보상풀의 15%) * 나의 스테이킹 점유율 = 나의 보상금액</dd>
            </dl>
            <dl>
              <dt>헌터 보상</dt>
              <dd class="flex5">유해 게시물 신고 후 선정 시 500HIBS 및 활동 포인트 10포인트 지급</dd>
            </dl>
          </div>
        </div>
        <div class="docs-contentFull">
          <div class="content">
            <ul>
              <li>· 개인 스테이킹은 등급은 활동 보상의 가중치를 적용합니다.</li>
              <li>· 개인 스테이킹 보상은 총 스테이킹 개 수 에서 나의 점유율을 산정하여 개인에게 보상 합니다.</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 스테이킹 보상 끝 -->
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        currentTab: 0,
        tabs: ['활동보상','운영보상','스테이킹 보상']
      }
    }
  }
</script>