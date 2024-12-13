<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<%@ include file="/resources/include/head.jsp" %>
	</head>
	<body>
		<div class="wrap">


			<div class="container">
				
				
				<!-- 스페이스 - 관리 - 공지사항 - 등록 -->
				<div class="space-manage-notice-write">
					<ul>
						<li>
							<h2>제목</h2>
							<input type="text" name="notice title" title="notice title" class="w100p" placeholder="제목을 입력해주세요." />
						</li>
						<li>
							<h2>내용</h2>
							<textarea name="notice content" title="notice content" rows="" cols="" class="w100p h300" placeholder="내용을 입력해주세요."></textarea>
						</li>
					</ul>
					<dl>
						<dt>중요공지</dt>
						<dd class="toggle active"><span></span></dd>
					</dl>
				</div>
				<!-- 스페이스 - 관리 - 공지사항 - 등록 끝 -->


			</div>


		</div>
	</body>
</html>
