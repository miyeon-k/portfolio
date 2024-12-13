$(document).ready(function() {
	//------------------------------------------------------------------ 공통 ------------------------------------------------------------------//
	// 스크롤 반응 //
	var didScroll;
	var lastScrollTop = 0;
	var delta = 0;
	var navbarHeight = $('.header-home, .header-mypage, .header-upload, .header-view').outerHeight()-10;

	$(window).scroll(function(event){
	   didScroll = true;
	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }﻿
	}, 0);

	function hasScrolled() {
	    var st = $(this).scrollTop();
	    if(Math.abs(lastScrollTop - st) <= delta)
	        return;
	
	    if (st > lastScrollTop && st > navbarHeight){
			$('.header-home').stop().animate({ marginTop : '-66px' }, 150, 'easeOutQuad');
			$('.header-mypage').stop().animate({ marginTop : '-58px' }, 150, 'easeOutQuad');
			$('.header-upload').stop().animate({ marginTop : '-58px' }, 150, 'easeOutQuad');
			$('.header-view').stop().animate({ marginTop : '-58px' }, 150, 'easeOutQuad');
	    } else {
	        if(st + $(window).height() < $(document).height()) {
				$('.header-home').stop().animate({ marginTop : '0' }, 150, 'easeOutQuad');
				$('.header-mypage').stop().animate({ marginTop : '0' }, 150, 'easeOutQuad');
				$('.header-upload').stop().animate({ marginTop : '0' }, 150, 'easeOutQuad');
				$('.header-view').stop().animate({ marginTop : '0' }, 150, 'easeOutQuad');
	        }
	    }
	
	    lastScrollTop = st;
	};
	
	
	//------------------------------------------------------------------ 모달 ------------------------------------------------------------------//
	// 모달 - 초기화 //
	$('.modal-wrap').css({display:'none'});
	$('.modal-bg').css({display:'none', opacity:'0'});
	$('.modal-area').css({display:'none', bottom:'-200px'});
	$('.modal-area-center').css({display:'none', marginTop:'30px'});
	
	// 모달 - 배경 닫기 //
	$('.modal-bg').click(function(){
		TweenMax.to($('.modal-wrap'), 0.3, {display:'none'});
		TweenMax.to($('.modal-bg'), 0.3, {display:'none', opacity:'0'});
		TweenMax.to($('.modal-area'), 0.3, {display:'none', bottom:'-200px'});
		TweenMax.to($('.modal-area-center'), 0.3, {display:'none', marginTop:'30px'});
	});
	
	// 모달 - 취소버튼 //
	$('.modal-btn-cancel').click(function(){
		TweenMax.to($('.modal-wrap'), 0.3, {display:'none'});
		TweenMax.to($('.modal-bg'), 0.3, {display:'none', opacity:'0'});
		TweenMax.to($('.modal-area'), 0.3, {display:'none', bottom:'-200px'});
		TweenMax.to($('.modal-area-center'), 0.3, {display:'none', marginTop:'30px'});
	});
	
	// 모달 필터 - 체크 아이콘 변경 //	
	$('.modal-filter .mf-check dd').find('span').click(function(){
		$(this).find('svg').addClass('fas fa-check-circle');
		$(this).siblings().find('svg').addClass('fal fa-circle');
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
	
	// 모달 필터 - 체크 중복 아이콘 변경 //	
	var mfcd = 0;
	$('.modal-filter .mf-check-double dd').find('span').click(function(){
		if(mfcd == 0){
			$(this).find('svg').addClass('fas fa-check-square');
			$(this).addClass('active-overlap');
			mfcd = 1;
		} else {
			$(this).find('svg').addClass('fal fa-square');
			$(this).removeClass('active-overlap');
			mfcd = 0;
		}		
	});
	
	// 모달 필터 - 체크 초기화 //
	$('.modal-filter li:last-child').click(function(){
		$('.modal-filter dd').find('span:first-child').addClass('active').find('svg').addClass('fas fa-check-circle');
		$('.modal-filter dd').find('span:first-child').siblings().removeClass('active').find('svg').addClass('fal fa-circle');
	});
	
	// 모달 - 럭키박스 //
	$('.modal-luckybox-btn').click(function(){
		$('#modalLuckyBox').css({display:'none'});
	});
	
	
	//------------------------------------------------------------------ 라디오버튼 / 체크박스 ------------------------------------------------------------------//
	// 체크박스 //	
	var checkbtn = 0;
	$('.checkbox').click(function(){
		if(checkbtn == 0){
			$(this).find('svg').addClass('fas fa-check-square').css({color: '#f21363'});
			checkbtn = 1;
		} else {
			$(this).find('svg').addClass('fal fa-square').css({color: '#999'});
			checkbtn = 0;
		}		
	});
	
	// 라디오버튼 //
	var radiobtn = 0;
	$('.radio').children().click(function(){
		$(this).find('svg').addClass('fas fa-check-circle').css({color: '#3381f3'});
		$(this).siblings().find('svg').addClass('fal fa-circle').css({color: '#999'});
		$(this).addClass('active').css({color: '#333'});
		$(this).siblings().removeClass('active').css({color: '#999'});
	});
	
	
	//------------------------------------------------------------------ 토글 / 렌지 ------------------------------------------------------------------//
	$('.toggle').click(function(){
		$(this).toggleClass('active');
	});
	
	
	//------------------------------------------------------------------ 탭메뉴 ------------------------------------------------------------------//
	// 탭버튼 - 고정 //
	//var hmtOffset = $('.home-main-tab').offset();
	$(window).scroll( function() {
		if ($(document).scrollTop() > 5) {
			$('#tabMenuFix').css({position : 'fixed', top : '0', marginTop : '0', boxShadow : '0 0 5px 0 rgba(0,0,0,0.1)', zIndex : '999'});
		} else {
			$('#tabMenuFix').css({position : 'relative', top : '0', marginTop : '-1px', boxShadow : 'none', zIndex : '999'});
		}
	});
	
	
	//------------------------------------------------------------------ 댓글 ------------------------------------------------------------------//
	// 댓글 - 누구의 답변 - 닫기 //
	$('.comment-write .cw-who dd').click(function(){
		$('.cw-who').slideUp(150, 'easeOutQuad');
	});
	
	//댓글 열기
	$('.commentOpen').on('click',function(){
		$('.cw-textarea > div').css({display : 'none'});
		$('.cw-textarea > textarea').css({display : 'block'});
		$('.comment-list').stop().animate({bottom : '0'}, 300, 'easeOutQuad');
		$('.wrap').css({position: 'fixed', overflow: 'hidden'});
	});
	
	// 댓글 - 제스쳐 열기
	var commentWriteOpen = document.getElementById("commentWriteOpen");
	if(commentWriteOpen){
		var cwo = new Hammer(commentWriteOpen);
	    cwo.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	    
	    cwo.on("swipeup", function () { 
	    	$('.cw-textarea > div').css({display : 'none'});
			$('.cw-textarea > textarea').css({display : 'block'});
	    	$('.comment-list').stop().animate({bottom : '0'}, 300, 'easeOutQuad');
	    	$('.wrap').css({position: 'fixed', overflow: 'hidden'});
	    });
	}
    
	//댓글 닫기
	$('.commentClose').on('click',function(){
		$('.cw-textarea > div').css({display : 'block'});
		$('.cw-textarea > textarea').css({display : 'none'});
		$('.comment-list').stop().animate({bottom : '-100%'}, 300, 'easeOutQuad');
		$('.wrap').css({position: 'relative', overflow: 'inherit'});
	});
	
	// 댓글 - 제스쳐 닫기
	var commentListClose = document.getElementById("commentListClose");
	if(commentListClose){
		var clc = new Hammer(commentListClose);
	    clc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	    
	    clc.on("swipedown", function () { 
	    	$('.cw-textarea > div').css({display : 'block'});
			$('.cw-textarea > textarea').css({display : 'none'});
	    	$('.comment-list').stop().animate({bottom : '-100%'}, 300, 'easeOutQuad');
	    	$('.wrap').css({position: 'relative', overflow: 'inherit'});
	    });
	}
	
	// 댓글 수정,삭제
    $('.cl-cmt-area > div').each(function (index) {
    	var clHeight = $('.cl-cmt-area > div').eq(index).height()+31;
    	$('.cl-cmt-area > div > h1').eq(index).find('div').css({height : clHeight+'px'});
    	
    	var cooc = new Hammer(this);
	    cooc.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
	    
    	cooc.on("swipeleft", function () { 
	    	$('.cl-cmt-area > div').eq(index).find('> dl > dd > a svg').addClass('fal fa-chevron-right');
	    	$('.cl-cmt-area > div').eq(index).animate({marginLeft : '-100px'}, 200, 'easeOutQuad');
	    }); 
	    
    	cooc.on("swiperight", function () { 
    		$('.cl-cmt-area > div').eq(index).find('> dl > dd > a svg').addClass('fal fa-chevron-left');
	    	$('.cl-cmt-area > div').eq(index).animate({marginLeft : '0'}, 200, 'easeOutQuad');
	    });
    });
    
    
    //------------------------------------------------------------------ 업로드 ------------------------------------------------------------------//
    // 업로드 - 스페이스 오픈 닫기 //
	var uploadOpenCloseChk = 0;
	$('.ua-space > dl > dd').click(function(){
		if (uploadOpenCloseChk == 0) {
			$('.ua-space-hidden').slideDown(350, 'easeOutQuad');
			$(".ua-space > dl > dd").text("닫기");
			uploadOpenCloseChk = 1;
		} else {
			$('.ua-space-hidden').slideUp(350, 'easeOutQuad');
			$(".ua-space > dl > dd").text("전체보기");
			uploadOpenCloseChk = 0;
		}
	});
	
	// 업로드 - 커뮤니티 - 미리보기 이미지 //
	var swiper = new Swiper('.ua-upload-files-img', {
		slidesPerView: 4,
		spaceBetween: 10,
	});
	
	
	//------------------------------------------------------------------ 홈 - 메인 ------------------------------------------------------------------//
	//홈 - 메인 - 탭버튼//
	var hmtOffset = $('.home-main-tab').offset();
	$(window).scroll( function() {
		if ($(document).scrollTop() > 5) {
			$('.home-main-tab').css({position : 'fixed', marginTop : '-66px', padding : '20px', /*padding : '18px 5%', textAlign : 'center', boxShadow : '0 0 10px 0 rgba(0,0,0,0.1)',*/ zIndex : '999'});
			//$('.home-main-tab > a').css({fontSize : '20px'});
			//$('.home-main-tab > a:active').css({fontSize : '20px'});
			$('.home-main-tab dd').css({display: 'block'});
		} else {
			$('.home-main-tab').css({position : 'relative', marginTop : '0', padding : '10px 20px 0 20px'/*padding : '10px 5% 0 5%', textAlign : 'left', boxShadow : 'none'*/});
			//$('.home-main-tab > a').css({fontSize : '16px'});
			//$('.home-main-tab > a:active').css({fontSize : '16px'});
			$('.home-main-tab dd').css({display: 'none'});
		}
	});
	
	// 홈 - 메인 - 나의스페이스 //
	var swiper = new Swiper('.home-main-myspace', {
		slidesPerView: 4,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 홈 - 메인 - 퀘스트(sns) //
	var swiper = new Swiper('.home-main-quest-sns', {
		slidesPerView: 3,
		spaceBetween: 8,
		//centeredSlides: true,
		freeMode: true,
	});
	
	// 홈 - 메인 - 퀘스트(댓글형) //
	var swiper = new Swiper('.home-main-quest-cmt', {
		slidesPerView: 2,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	
	//------------------------------------------------------------------ 홈 - 퀘스트 ------------------------------------------------------------------//
	// 홈 - 퀘스트 - 대표 슬라이드 //
	var swiper = new Swiper('.home-quest-best', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		loop: true,
		autoplay: {
			delay: 3000,
		},
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 200,
			modifier: 1,
			slideShadows : true,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	
	
	//------------------------------------------------------------------ 홈 - 스페이스 ------------------------------------------------------------------//
	// 홈 - 스페이스 - 추천리스트 //
	var swiper = new Swiper('.home-space-best', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		//effect: 'flip',
		effect: 'cube',
		grabCursor: true,
		cubeEffect: {
		  shadow: false,
		  //slideShadows: true,
		  //shadowOffset: 50,
		  //shadowScale: 0.94,
		},
		loop: true,
		autoplay: {
		  delay: 3000,
		},
		pagination: {
			el: '.swiper-pagination',
			dynamicBullets: true,
		},
	});
	
	// 홈 - 스페이스 - 나의스페이스 //
	var swiper = new Swiper('.home-space-myspace', {
		slidesPerView: 4,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 홈 - 스페이스 - 베스트10 //
	var swiper = new Swiper('.home-space-top', {
		slidesPerView: 3,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 홈 - 스페이스 - 카타고리 리스트 //
	var swiper = new Swiper('.home-space-catagory-list01', {
		slidesPerView: 3,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 홈 - 스페이스 - 카타고리 리스트 //
	var swiper = new Swiper('.home-space-catagory-list02', {
		slidesPerView: 2,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 홈 - 스페이스 - 생성 //
	$('.home-space-make-category li').click(function(){
		$(this).css({border:'#3381f3 2px solid'});
		$('.header-view li:nth-child(3)').css({color : '#3381f3'});
		$('.header-view li:nth-child(3)').click(function(){
			location.href = '/common/viewP.do?path=home/space_make_info';
		});
	});
	
	// 홈 - 스페이스 - 정보입력 - 다음버튼 //
	$('.hsmi-info').on('propertychange change keyup paste input', function(){
		var spaceInfo = $(this).val();
		
		if(spaceInfo != ""){
			$('.header-view li:nth-child(3)').css({color : '#3381f3'});
			$('.header-view li:nth-child(3)').click(function(){
				location.href = '/common/viewP.do?path=home/space_make_complete';
			});
		}else{
			$('.header-view li:nth-child(3)').css({color : '#ccc'});
		}
	});
	
	// 홈 - 스페이스 - 정보입력 - 스페이스 ID 중복체크버튼 //
	$('.hsmi-id').on('propertychange change keyup paste input', function(){
		var spaceID = $(this).val();
		
		if(spaceID != ""){
			$('.hsmi-id-check').css({background : '#3381f3'});
		}else{
			$('.hsmi-id-check').css({background : 'rgba(51,129,243,.7)'});
		}
	});
	
	
	//------------------------------------------------------------------ 스페이스 - 관리 ------------------------------------------------------------------//
	// 스페이스 - 관리 메뉴 //
	$('#spaceManageMenuOpen').click(function(){
		$('.space-manage-menu-bg').css({ display : 'block' });
		$('.space-manage-menu').animate({ marginRight : '0' }, 350, 'easeOutQuad');
		$('body').css({ overflow : 'hidden' });
	});
	$('#spaceManageMenuClose').click(function(){
		$('.space-manage-menu-bg').css({ display : 'none' });
		$('.space-manage-menu').animate({ marginRight : '-300px' }, 350, 'easeOutQuad');
		$('body').css({ overflow : 'auto' });
	});
	$('.space-manage-menu-bg').click(function(){
		$('.space-manage-menu-bg').css({ display : 'none' });
		$('.space-manage-menu').animate({ marginRight : '-300px' }, 350, 'easeOutQuad');
		$('body').css({ overflow : 'auto' });
	});
	
	
	//------------------------------------------------------------------ 스페이스 - 메인 ------------------------------------------------------------------//
	// 스페이스 - 메인 - 공지 //
	var swiper = new Swiper('.space-main-notice', {
		slidesPerView: 2,
		spaceBetween: 10,
		//centeredSlides: true,
		//freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 스페이스 - 메인 - 핵인싸 //
	var swiper = new Swiper('.space-main-best-member', {
		slidesPerView: 4,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 스페이스 - 메인 - 퀘스트 //
	var swiper = new Swiper('.space-main-quest', {
		slidesPerView: 2,
		spaceBetween: 10,
		//centeredSlides: true,
		freeMode: true,
		/*autoplay: {
			delay: 3000,
		},*/
	});
	
	// 스페이스 - 메인 - 커뮤니티 //
	var swiper = new Swiper('.space-main-community', {
		slidesPerView: 'auto',
		spaceBetween: 15,
		//effect: 'flip',
		//effect: 'cube',
		//grabCursor: true,
	});
	
	
	//------------------------------------------------------------------ 스페이스 - 미디어 ------------------------------------------------------------------//
	// 스페이스 - 미디어 - 상세 - 상단이미지 //
	var swiper = new Swiper('.smv-img', {
		slidesPerView: 'auto',
		autoHeight: true,
		spaceBetween: 0,
		loop: true,
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},
	});
	
	// 스페이스 - 미디어 - 상세 - 댓글 수정,삭제
    $('.smv-comment > div').each(function (index) {
    	var smvHeight = $('.smv-comment > div').eq(index).height()+31;
    	$('.smv-comment > div > h1').eq(index).find('div').css({height : smvHeight+'px'});
    	
    	var smvOC = new Hammer(this);
    	smvOC.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
	    
    	smvOC.on("swipeleft", function () { 
	    	$('.smv-comment > div').eq(index).find('> dl > dd > a svg').addClass('fal fa-chevron-right');
	    	$('.smv-comment > div').eq(index).animate({marginLeft : '-100px'}, 200, 'easeOutQuad');
	    }); 
	    
    	smvOC.on("swiperight", function () { 
    		$('.smv-comment > div').eq(index).find('> dl > dd > a svg').addClass('fal fa-chevron-left');
	    	$('.smv-comment > div').eq(index).animate({marginLeft : '0'}, 200, 'easeOutQuad');
	    });
    });
    

    //------------------------------------------------------------------ 마이페이지 - 보상내역 ------------------------------------------------------------------//
	var swiper = new Swiper('.mrp-space', {
	    slidesPerView: 4,
	    spaceBetween: 10,
	    freeMode: true
	});
	
	
    //------------------------------------------------------------------ 마이페이지 - 알림 ------------------------------------------------------------------//
	$('.mypage-inform-faq-list > div').find('dl').click(function(){
		$(this).find('dd').toggleClass('active');
		$(this).next('div').toggleClass('active');
	});
    
    
	//------------------------------------------------------------------ 셋팅 ------------------------------------------------------------------//
	/* 서비스 탈퇴 - 버튼 활성화 */
	var swc = 0;
	$('.setting-withdrawal').find('.checkbox').click(function(){
		if(swc == 0){
			$('.setting-withdrawal > p').css({background: '#333'});
			swc = 1;
		} else {
			$('.setting-withdrawal > p').css({background: '#999'});
			swc = 0;
		}
	});
});





//모달 오픈 - 하단 //
function modalOpen(modalId){
	$(modalId).css({display:'block'});
	TweenMax.to($(modalId + '> .modal-wrap'), 0.3, {display:'block'});
	TweenMax.to($(modalId + '> .modal-bg'), 0.3, {display:'block', opacity:'1'});
	TweenMax.to($(modalId + '> .modal-area'), 0.3, {display:'block', bottom:'0'});
	TweenMax.to($(modalId + '> .modal-area-center'), 0.3, {display:'block', marginTop:'0'});
}

// 모달 오픈 - 가운데 //
function modalOpenCenter(modalId){
	$(modalId).css({display:'block'});
	$('#modalFollow').css({display:'none'});
	TweenMax.to($(modalId + '> .modal-wrap'), 0.3, {display:'block'});
	TweenMax.to($(modalId + '> .modal-bg'), 0.3, {display:'block', opacity:'1'});
	TweenMax.to($(modalId + '> .modal-area'), 0.3, {display:'block', bottom:'0'});
	TweenMax.to($(modalId + '> .modal-area-center'), 0.3, {display:'block', marginTop:'0'});
}





//댓글 등록 //
function commentResize(obj) {
	if(obj.scrollHeight <= 130){
		obj.style.height = "1px";
		obj.style.height = (8+obj.scrollHeight)+"px";
	}
}





// 링크점선 제거 //
function bluring(){
	if(event.srcElement.tagName=="A" || event.srcElement.tagName=="IMG")
	document.body.focus();
}
document.onfocusin=bluring;
