import React from 'react'
import errorImg from '../static/images/error_img.png'
import errorBubbleImg from '../static/images/error_bubble.png'

export default function Page404() {    

	return (           
		<div className="error">
			<p>
				<span>OOPS...</span>
				<em>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br />
				입력하신 주소가 정확한지 다시 한 번 확인해주세요.</em>
			</p>
			<div>
				<img src={errorImg} width='100%' alt='error person' title='error person' />
				<p><img src={errorBubbleImg} width='100%' alt='error bubble' title='error bubble' /><span>404</span></p>
			</div>
		</div>
	)
}