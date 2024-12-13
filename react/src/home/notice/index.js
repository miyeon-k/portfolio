import React, { useEffect, useState } from 'react'
import Paging from '../common/Paging'
import NoticeView from './component/NoticeView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, light } from '@fortawesome/fontawesome-svg-core/import.macro'
import MetaImg from '../static/images/meta.jpg'
import { getNoticeList } from '../../crud/notice.crud';
export default function Notice(props){

	let activePage = 1;    

	const [ searchNotice , setSearchNotice ] = useState('')
	const [ noticeId , setNoticeId ] = useState('')
	const [ noticeList , setNoticeList ] = useState([])
	const [ showNoticeViewModal , setShowNoticeViewModal ] = useState(false)
	const [pagination , setPagination] = useState({})

	const handleResetText = val => {
		if(val === 'notice'){
			setSearchNotice('')
		}
	}

	const handleShowModal = val =>{
		setNoticeId(val);
		setShowNoticeViewModal(true)
	}
	const handleClose = val => {        
		setShowNoticeViewModal(false)
	}

	const handleSearch = async() => {
		const param = {noticeTitle: searchNotice , pagePerSize: 6 , pageIndex: activePage}
		await getNoticeList(param).then(response => {		
            const check = response.data.check
            
            if(check){                
                setNoticeList(response.data.responseData.result)        
				setPagination(response.data.responseData.pagination)        
                
            }            
            
		}).catch((error)=>{			
			  console.log(error);
		})
	}

	const handleChangePage = (newPage) =>{
		activePage = newPage;
		handleSearch()
	}

	useEffect(() => {
		handleSearch()
	},[searchNotice])

	return (
		<>
			<div className="notice">
				<dl>
					<dt>공지사항</dt>
					<dd className='search'>
						<input type='text' value={searchNotice} onChange={event => setSearchNotice(event.target.value)} placeholder='제목으로 검색하세요'/>
						{searchNotice && <label onClick={event => handleResetText('notice')}><FontAwesomeIcon icon={solid('circle-xmark')} /></label>}						
					</dd>
				</dl>
				<ul className="list-card">
					{noticeList.length > 0 && noticeList.map((list , index) => {
						return (
							<li onClick={event => handleShowModal(list.noticeId)} key={index}>
								<div>
									<span>{list.regDate}
										{list.headerYn === 'Y' && <em><FontAwesomeIcon icon={solid('star')} /></em> }
									</span>
									<p>{list.noticeTitle}</p>									
								</div>
								<p><img src={MetaImg} width='100%' alt='notice image' title='notice image' /></p>
							</li>			
						)		
					})}
				</ul>

				<Paging
					totalCount={pagination.totalCount  }
					rowsPerPage={pagination.pagePerSize}
					page={pagination.pageIndex}
					onPageChange={handleChangePage}
				/>
			</div>

			{showNoticeViewModal && <NoticeView show = {showNoticeViewModal} hide={handleClose} noticeId={noticeId}/> }
		</>
	)
}