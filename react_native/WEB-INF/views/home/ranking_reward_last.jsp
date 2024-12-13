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
					<li onclick="location.href='#none';" class="active">차수 별 랭킹</li>
					<li onclick="location.href='#none';">금주 누적 포인트</li>
				</ul>
				<!-- 홈 - 랭킹 - 보상내역 - 탭메뉴 끝 -->
				
				
				<!-- 홈 - 랭킹 - 보상내역 - 차수별랭킹 -->
				<div class="home-ranking-reward-last">
					<h2>차수 별 랭킹입니다.</h2>
					<h3>스테이킹 등급에 따른 가중치가 적용된 순위 및 포인트 입니다.</h3>
					
					<div>
						<h2>2019.10.04~2019.10.10 주간 랭킹 입니다</h2>
						
						<table cellpadding="0" cellspacing="0" summary="주간 랭킹 01">
							<caption>주간 랭킹 01</caption>
							<colgroup>
								<col width="30%" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
									<th>활동</th>
									<td>
										123456 Point / 개인 스테이킹 1등급 / 1.16% / 1004등<br/>
										= <span>100 HIBS</span>
									</td>
								</tr>
								<tr>
									<th>개인 스테이킹</th>
									<td>
										100,000HIBS / 기여도 : 26% / 1004등<br/>
										= <span>100 HIBS</span>
									</td>
								</tr>
								<tr>
									<th>운영자</th>
									<td>
										<div>
											1. 기멍생<br/>
											- 123456 Point / 1004등<br/>
											= <span>100 HIBS</span>
										</div>
										<div>
											2. 메시<br/>
											- 123456 Point / 1004등<br/>
											= <span>100 HIBS</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="hrrl-tbl03">
						<h2>2019.10.04~2019.10.10 주간 랭킹 입니다</h2>
						
						<table cellpadding="0" cellspacing="0" summary="주간 랭킹 02">
							<caption>주간 랭킹 02</caption>
							<colgroup>
								<col width="30%" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
									<th>활동</th>
									<td>
										0 Point / 개인 스테이킹 5등급 / 1.01% / 1004등<br/>
										= <span>0 HIBS</span>
									</td>
								</tr>
								<tr>
									<th>개인 스테이킹</th>
									<td>
										스테이킹 없음 / 1004등<br/>
										= <span>0 HIBS</span>
									</td>
								</tr>
								<tr>
									<th>운영자</th>
									<td>
										<div>
											운영중인 스페이스 없음<br/>
											= <span>0 HIBS</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<!-- <div class="hrrl-tbl03">
						<h2>2019.10.04~2019.10.10 주간 랭킹 입니다</h2>
						
						<table cellpadding="0" cellspacing="0" summary="주간 랭킹 03">
							<caption>주간 랭킹 03</caption>
							<colgroup>
								<col width="20%" />
								<col width="35%" />
								<col width="15%" />
								<col width="*" />
							</colgroup>
							<thead>
								<tr>
									<th colspan="2">스테이킹</th>
									<th colspan="2">등급</th>
								</tr>
								<tr>
									<td colspan="2">123등(100,000 HIBS)</td>
									<td colspan="2">1등급*가중치1.16%</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>활동</th>
									<td>123등(100,000 HIBS)</td>
									<th rowspan="4" class="hrrl-tbl">보상</th>
									<td>1,000 HIBS</td>
								</tr>
								<tr>
									<th>운영자</th>
									<td>123등(100,000 HIBS)</td>
									<td>1,000 HIBS</td>
								</tr>
								<tr>
									<th>헌터</th>
									<td>123등(100,000 HIBS)</td>
									<td>1,000 HIBS</td>
								</tr>
								<tr>
									<th>이벤트</th>
									<td>123등(100,000 HIBS)</td>
									<td>1,000 HIBS</td>
								</tr>
							</tbody>
						</table>
					</div> -->
				</div>
				<!-- 홈 - 랭킹 - 보상내역 - 차수별랭킹 끝 -->


			</div>


		</div>
	</body>
</html>
