import React from 'react'
import errorImg from '../static/images/error_img.png'
import errorBubbleImg from '../static/images/error_bubble.png'

export default function Page403() {    

	return (           
		<div className="error">
			<p>
				<span>OOPS...</span>
				<em>요청하신 페이지에 접근이 거부되었습니다.<br/>
				입력하신 주소가 정확한지 다시 한 번 확인해주세요.</em>
			</p>
			<div>
				<img src={errorImg} width='100%' alt='error person' title='error person' />
				<p><img src={errorBubbleImg} width='100%' alt='error bubble' title='error bubble' /><span>403</span></p>
			</div>
		</div>
	)
}