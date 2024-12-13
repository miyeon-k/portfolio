<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<%@ include file="/resources/include/head.jsp" %>
	</head>
	<body>
		<div class="wrap">


			<div class="container">
	
				
				<!-- 홈 - 랭킹 - 보상내역 - 탭메뉴 -->
				<ul class="tab-menu-two">
					<li onclick="location.href='#none';">차수 별 랭킹</li>
					<li onclick="location.href='#none';" class="active">금주 누적 포인트</li>
				</ul>
				<!-- 홈 - 랭킹 - 보상내역 - 탭메뉴 끝 -->
				
				
				<!-- 홈 - 랭킹 - 보상내역 - 금주누적포인트 -->
				<div class="home-ranking-reward-this">
					<h2>2019.10.07 ~ 어제까지 활동 누적 포인트 입니다.</h2>
					
					<!-- 데이터 집계 중 -->
					<!-- <div>
						<p><img src="/resources/images/content/home_ranking_reward_img01.png" width="100%" title="ranking reward img" alt="ranking reward img" /></p>
						<h2>데이터 집계 중 입니다.</h2>
						<h3>금주 누적포인트는 익일 정산되기때문에<br/>월요일은 확인할 수 없어요.</h3>
					</div>
					
					<dl>
						<dt>
							스테이킹 등급
							<div onclick="modalOpenCenter('#modalInfo');"><i class="fas fa-exclamation-circle"></i></div>
						</dt>
						<dd>
							스테이킹 비율에 따라 등급이 부여 되고, 등급에 따라 주간 보상시 가중치가 더해져 보상됩니다.
							<div>* 데이터 집계일 : 2019.00.00(월)~ 2019.00.00(일) (UCT기준)</div>
						</dd>
					</dl> -->
					<!-- 데이터 집계 중 끝 -->
					
					<!-- 데이터 집계 완료 -->
					<!-- <h3><span></span> 총 누적 포인트 <em>4,500P</em></h3> -->
					
					<div>
						<dl class="hrrt-data-info">
							<dt>활동보상</dt>
							<dd onclick="modalOpenCenter('#modalInfoAct');"><i class="fas fa-exclamation-circle"></i></dd>
						</dl>
						
						<div class="hrrt-data-grade">개인 스테이킹 2등급 / 가중치 1.08% 적용</div>
						
						<div class="hrrt-data">
							<table cellpadding="0" cellspacing="0" summary="활동">
								<caption>활동</caption>
								<colgroup>
									<col width="40%" />
									<col width="30%" />
									<col width="*" />
								</colgroup>
								<thead>
									<tr>
										<th><span><i class="fas fa-vote-yea"></i></span>보팅 함</th>
										<td onclick="location.href='#none';">1</td>
										<td>300P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-poll"></i></span>보팅 받음</th>
										<td onclick="location.href='#none';">458</td>
										<td>7620P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-heart"></i></span>좋아요 함</th>
										<td onclick="location.href='#none';">1</td>
										<td>300P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-heart"></i></span>좋아요 받음</th>
										<td onclick="location.href='#none';">15</td>
										<td>300P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-share-alt"></i></span>게시물 공유</th>
										<td onclick="location.href='#none';">15</td>
										<td>300P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-hat-cowboy"></i></span>헌터</th>
										<td onclick="location.href='#none';">2</td>
										<td>20P</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>총 포인트</th>
										<td></td>
										<td>2,424P</td>
									</tr>
								</tbody>
							</table>
						</div>
						
						<dl class="hrrt-data-info mt20">
							<dt>운영자 보상</dt>
							<dd onclick="modalOpenCenter('#modalInfoMan');"><i class="fas fa-exclamation-circle"></i></dd>
						</dl>
						
						<div class="hrrt-data-manager"><span><i class="fas fa-user-circle"></i></span>기멍생</div>
						
						<div class="hrrt-data">
							<table cellpadding="0" cellspacing="0" summary="운영자">
								<caption>운영자</caption>
								<colgroup>
									<col width="40%" />
									<col width="30%" />
									<col width="*" />
								</colgroup>
								<thead>
									<tr>
										<th><span><i class="fas fa-file-plus"></i></span>전체 게시글</th>
										<td onclick="location.href='#none';">15</td>
										<td>300P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-analytics"></i></span>금주 방문자 수</th>
										<td onclick="location.href='#none';">458</td>
										<td>7620P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-user-circle"></i></span>금주 팔로워 수</th>
										<td onclick="location.href='#none';">15</td>
										<td>300P</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>총 포인트</th>
										<td></td>
										<td>2,424P</td>
									</tr>
								</tbody>
							</table>
						</div>
						
						<div class="hrrt-data-manager"><span><i class="fas fa-user-circle"></i></span>메시</div>
						
						<div class="hrrt-data">
							<table cellpadding="0" cellspacing="0" summary="운영자">
								<caption>운영자</caption>
								<colgroup>
									<col width="40%" />
									<col width="30%" />
									<col width="*" />
								</colgroup>
								<thead>
									<tr>
										<th><span><i class="fas fa-file-plus"></i></span>전체 게시글</th>
										<td onclick="location.href='#none';">15</td>
										<td>300P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-analytics"></i></span>금주 방문자 수</th>
										<td onclick="location.href='#none';">458</td>
										<td>7620P</td>
									</tr>
									<tr>
										<th><span><i class="fas fa-user-circle"></i></span>금주 팔로워 수</th>
										<td onclick="location.href='#none';">15</td>
										<td>300P</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>총 포인트</th>
										<td></td>
										<td>2,424P</td>
									</tr>
								</tbody>
							</table>
						</div>
						
						<div class="hrrt-data hrrt-data-none">
							<span><i class="fal fa-hourglass-end"></i></span>
							<h2>데이터 집계 중 입니다.</h2>
							<h3>월요일(UCT기준) 포인트는 익일 정산되기때문에<br/>지금은 확인할 수 없어요.</h3>
						</div>
					</div>
					
					<!-- <dl>
						<dt>
							스테이킹 등급 <span>2등급</span>
							<div onclick="modalOpenCenter('#modalInfo');"><i class="fas fa-exclamation-circle"></i></div>
						</dt>
						<dd>
							스테이킹 비율에 따라 등급이 부여 되고, 등급에 따라 주간 보상시 가중치가 더해져 보상됩니다.
							<div>* 데이터 집계일 : 2019.00.00(월)~ 2019.00.00(일) (UCT기준)</div>
						</dd>
					</dl> -->
					<p>* 데이터 집계일 : 2019.00.00(월)~ 2019.00.00(일) (UCT기준)</p>
					<!-- 데이터 집계 완료 -->
				</div>
				<!-- 홈 - 랭킹 - 보상내역 - 금주누적포인트 끝 -->
				
				
				<!-- 모달 - 활동포인트 -->
				<div id="modalInfoAct" class="modal-wrap">
					<div class="modal-bg"></div>
					<div class="modal-btn-cancel modal-btn-cancelX"><i class="fal fa-times"></i></div>
					<div class="modal-area-center">
						<div class="modal-info">
							<span><i class="fad fa-exclamation-circle"></i></span>
							<h2>활동 포인트를 쌓는 방법 총 5가지!</h2>
							<ul>
								<li>- 큐레이션 게시물에 보팅 하거나 받기<span>+10P</span></li>
								<li>- 직접 등록한 게시물에 보팅 하거나 받기<span>+5P</span></li>
								<li>- 게시물에 좋아요 하거나 받기<span>+0.01P</span></li>
								<li>- 게시물 공유하기<span>+1P</span></li>
								<li>- 유해 콘텐츠 신고해서 보상받기(헌터만)<span>+10P</span></li>
							</ul>
							<p>※ 획득한 포인트를 이용하여 하이블럭스의 알고리즘에 의해 주단위로 보상이 주어집니다</p>
							<a href="#none">자세한 보상기준안내 보러가기 ></a>
						</div>
					</div>
				</div>
				<!-- 모달 - 활동포인트 끝 -->
				
				<!-- 모달 - 운영자포인트 -->
				<div id="modalInfoMan" class="modal-wrap">
					<div class="modal-bg"></div>
					<div class="modal-btn-cancel modal-btn-cancelX"><i class="fal fa-times"></i></div>
					<div class="modal-area-center">
						<div class="modal-info">
							<span><i class="fad fa-exclamation-circle"></i></span>
							<h2>운영자 포인트를 쌓는 방법 총 3가지!</h2>
							<ul>
								<li>- 나의 스페이스 게시물 별 점수 총합<span>+@P</span></li>
								<li>- 나의 스페이스 주간 방문자 수<span>+1P</span></li>
								<li>- 나의 스페이스 주간 팔로워 수<span>+1P</span></li>
							</ul>
							<p>※ 획득한 포인트를 이용하여 하이블럭스의 알고리즘에 의해 주단위로 보상이 주어집니다</p>
							<a href="#none">자세한 보상기준안내 보러가기 ></a>
						</div>
					</div>
				</div>
				<!-- 모달 - 운영자포인트 끝 -->


			</div>


		</div>
	</body>
</html>
