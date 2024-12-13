import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Terms(props){

    const [ show , setShow ] = useState(props.show)
	const [ showRegistModal , setShowRegistModal ] = useState(false)
	const [ allCheck , setAllCheck ] = useState(false);
	const [checkItems, setCheckItems] = useState([])		
	const data = [
		{id:'one', title:'만 14세 이상입니다.', sub:'(필수)'},
		{id:'two', title:'서비스 이용약관 동의', sub:'(필수)'},
		{id:'three', title:'개인정보 수집 및 이용 동의', sub:'(필수)'},
		{id:'four', title:'위치정보 수집 및 이용 동의', sub:'(선택)'}
	];

    const handleClose = () =>{      		
        props.hide()        
    }

	// 체크박스 단일 선택
	const handleSingleCheck = (checked, id) => {
		if (checked) {
			setCheckItems(prev => [...prev, id]);
		} else {
			setCheckItems(checkItems.filter((el) => el !== id));
		}
	};

	// 체크박스 전체 선택
	const handleAllCheck = (checked) => {
		if(checked) {
			const idArray = [];
			data.forEach((el) => idArray.push(el.id));
			setCheckItems(idArray);
			setAllCheck(true)
		}
		else {
			setCheckItems([]);
			setAllCheck(false)
		}
	}

    const handleRegist = () =>{        
		props.callback(true)
		setShow(false)	
	}	

	useEffect(() => {
		const length = checkItems.filter((el) => el !== 'four').length;
		if(length > 2){
			setAllCheck(true)
		}else{
			setAllCheck(false)
		}
	}, [checkItems])

    return (
			<Modal open={show} className='modal' onClose={handleClose}>                
				<div className='modal-content'>
					<p>Atmopedia</p>
					<div className='terms'>
						<p>서비스 약관에 동의해주세요.</p>
						<div>
							<input type='checkbox' id='select-all' name='select-all' className='checkbox' onChange={(e) => handleAllCheck(e.target.checked)} checked={checkItems.length === data.length ? true : false} />
							<label htmlFor='select-all'>모두 동의합니다.</label>
						</div>
						<ul>
							{data?.map((data, key) => (
								<li key={key}>
									<input type='checkbox' id={`select-${data.id}`} name={`select-${data.id}`} className='checkbox'	onChange={(e) => handleSingleCheck(e.target.checked, data.id)} checked={checkItems.includes(data.id) ? true : false} />
									<label htmlFor={`select-${data.id}`}>{data.title} <span>{data.sub}</span></label>
									<Link to=''><FontAwesomeIcon icon={solid('chevron-right')} /></Link>
								</li>
							))}
						</ul>
						<button className={allCheck ? 'modal-button' : 'disable'} disabled={allCheck ? false : true} onClick={event => handleRegist()}>동의</button>
					</div>
				</div>
			</Modal>
    )
}