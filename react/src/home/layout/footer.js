import React, { useEffect, useState } from 'react'
import TextLoop from 'react-text-loop'
import { getNoticeList } from '../../crud/notice.crud'

export default function Footer() {

	const [ noticeTitle , setNoticeTitle ] = useState([])

	const handleSearch = async() => {
		const param = {noticeTitle: '' , pagePerSize: 5 ,pageIndex: 1}
		await getNoticeList(param).then(response => {		
            const check = response.data.check
            
            if(check){                							
                setNoticeTitle(response.data.responseData.result)
            }            
            
		}).catch((error)=>{			
			  console.log(error);
		})
	}
	
	useEffect(() => {
		handleSearch()
	},[])

	return (
		<footer>
			<dl>				
				<dt>공지사항
					{ noticeTitle.length > 0 && 
						<TextLoop> 
							{noticeTitle.map((list , index) => {
								return(
									<div key={index}>{list.noticeTitle}</div>
								)

							})}
						</TextLoop>
					}
				</dt>				
				<dd>주식회사 비즈마블 | 유승완 | 사업자번호 : 888-88-01955 <br/>서울특별시 금천구 가산디지털1로 226 에이스하이엔드타워5차 903호</dd>
			</dl>
		</footer>
	)
}