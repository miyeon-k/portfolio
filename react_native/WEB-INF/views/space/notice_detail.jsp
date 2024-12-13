<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<%@ include file="/resources/include/head.jsp" %>
	</head>
	<body>
		<div class="wrap">


			<div class="container">
				
				
				<!-- 스페이스 - 관리 - 공지사항 - 상세 -->
				<div class="space-manage-notice-detail">
					<dl>
						<dt>
							<dl>
								<dt>
									<p style="background:url('/resources/images/img/content_list01_img12.jpg') center no-repeat; background-size:cover;"></p>
									<div>
										<h2>Youngaroo</h2>
										<h3>5개월 전</h3>
									</div>
								</dt>
								<dd>공지</dd>
							</dl>
						</dt>
						<dd onclick="modalOpen('#modalFollow');"><i class="fal fa-ellipsis-v"></i></dd>
					</dl>
					
					<h2>게시글 운영방침입니다. 규정위반 글은 무통보 삭제되며, 제재 수준은 신고 처리되어 블라인드 처리 됩니다.</h2>
					
					<div>기멍생 이용규정
						(Ver.2.0, update 2019-09-19)
						
						지난 9월 12일(월)에 앞서 공지드린바와 같이 그동안 다소 까다로웠던 기멍생의 이용규정을 대폭 완화하여 회원님들의 스페이스 이용을 보다 편리하게 하고자 합니다.
						
						좀 더 회원님들이 쉽게 이해하고 준수할 수 있도록 간소화 하였습니다.
						
						보다 안전하고 편리한 소통 환경을 만들기 위해 1,690만 팔로워님들의 적극적인 이용정책 숙지 및  준수를 부탁드립니다.
						
						본 규정은 2019년 9월 26일부터 적용/시행 될 예정입니다.
					</div>
				</div>
				<!-- 스페이스 - 관리 - 공지사항 - 상세 끝 -->
				
				
				<!-- 모달 - 팔로우 -->
				<div id="modalFollow" class="modal-wrap">
					<div class="modal-bg"></div>
					<div class="modal-btn-cancel modal-btn-cancelX"><i class="fal fa-times"></i></div>
					<div class="modal-area">
						<ul class="modal-follow">
							<li>팔로우</li>
							<li class="mf-following" style="display:none">팔로잉</li>
							<li>
								<h1>수정</h1>
								<h1 onclick="modalOpenCenter('#modalDelete');">삭제</h1>
							</li>
							<li>
								<h1>링크복사</h1>
								<h1 onclick="modalOpenCenter('#modalShare');">공유하기</h1>
							</li>
						</ul>
					</div>
				</div>
				<!-- 모달 - 팔로우 끝 -->
				
				
				<!-- 모달 - 공유하기 -->
				<div id="modalShare" class="modal-wrap">
					<div class="modal-bg"></div>
					<div class="modal-area">
						<div class="modal-share">
							<dl>
								<dt><span><i class="far fa-share-alt"></i></span> 공유하기</dt>
								<dd class="modal-btn-cancel"><i class="fal fa-times"></i></dd>
							</dl>
							<ul>
								<li><img src="/resources/images/content/space_share_icn01.png" width="100%" alt="facebook" title="facebook" /></li>
								<li><img src="/resources/images/content/space_share_icn02.png" width="100%" alt="youtube" title="youtube" /></li>
								<li><img src="/resources/images/content/space_share_icn03.png" width="100%" alt="instagram" title="instagram" /></li>
								<li><img src="/resources/images/content/space_share_icn04.png" width="100%" alt="tiktok" title="tiktok" /></li>
								<li><img src="/resources/images/content/space_share_icn05.png" width="100%" alt="kakaotalk" title="kakaotalk" /></li>
								<li><img src="/resources/images/content/space_share_icn06.png" width="100%" alt="band" title="band" /></li>
								<li><img src="/resources/images/content/space_share_icn07.png" width="100%" alt="url" title="url" /></li>
							</ul>
							<div class="modal-btn-cancel">닫기</div>
						</div>
					</div>
				</div>
				<!-- 모달 - 공유하기 끝 -->
				
				
				<!-- 모달 - 삭제하기 -->
				<div id="modalDelete" class="modal-wrap">
					<div class="modal-bg"></div>
					<div class="modal-area-center">
						<div class="modal-bottom-btn02">
							<h2>삭제하기</h2>
							<h3>삭제하시면 보상을 받으실 수 없습니다.<br/>정말 삭제하시겠습니까?</h3>
							<dl>
								<dt>YES</dt>
								<dd class="modal-btn-cancel">NO</dd>
							</dl>
						</div>
					</div>
				</div>
				<!-- 모달 - 삭제하기 끝 -->


			</div>


		</div>
	</body>
</html>
