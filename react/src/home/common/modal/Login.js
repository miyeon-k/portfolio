import React, { useEffect, useState } from 'react'
import { toastAlert , validateEmail } from '../../util/util'
import { getUserInfo } from '../../../crud/user.crud'
import Modal from '@material-ui/core/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Login(props){    

    const [ show , setShow ] = useState(props.show)
    const [ email , setEmail ] = useState('')
    const [ password , setPaswword ] = useState('')
    const [ validataion , setValidation]  = useState('')
    
    const handleResetText = val => {
        if(val === 'ID'){
            setEmail('')
        }else{
            setPaswword('')
        }
        
    }

    const handleClose = () =>{
        props.hide()        
    }

    const handleTerms = () =>{        
        props.handleTerms(true)
        setShow(false)	
    }

    const handleLogin = async() =>{

        if(email === null || email === ''){
            setValidation('이메일을 입력해주세요')
            return false
        }else{
            if(!validateEmail(email)){
                setValidation('이메일을 형식이 아닙니다.')
                return false
            }
        }
        if(password === null || password === ''){
            setValidation('비밀번호를 입력해주세요')
            return false
        }

        const formData = new FormData();

        formData.append('email' , email);
        formData.append('password' , password);

        await getUserInfo(formData).then(response => {		
            
            const check = response.data.check	

            if(check){
                const data = response.data.responseData.userInfo
                localStorage.setItem('accessToken' , data.accessToken)
                localStorage.setItem('userId' , data.userId)
                props.callback(true)
                setShow(false)	
            }else{          
                //handleClose()  
                toastAlert(response.data.message , 'info')
            }
            
		}).catch((error)=>{			
			  console.log(error);
		})
    }

    useEffect(() => {
        if(validataion !== null && validataion !== ''){
            if(email !== null && email !== ''){
                if(validataion.indexOf('이메일') > -1 ){
                    setValidation('')
                }
            }
        }
    }, [email])


    useEffect(() => {
        if(validataion !== null && validataion !== ''){
            if(password !== null && password !== ''){
                if(validataion.indexOf('비밀번호') > -1 ){
                    setValidation('')
                }
            }
        }
    }, [password])

    return (            
			<Modal open={show} className='modal' onClose={handleClose}>                
				<div className='modal-content'>
					<p>Atmopedia</p>
					<div className='login'>
						<p>
							<input type='text' value={email} onChange={event => setEmail(event.target.value)} className={validataion.indexOf('이메일') > -1 ? 'warning' : ''} placeholder='이메일' />
							{email && <label ><FontAwesomeIcon icon={solid('circle-xmark')} onClick={event => handleResetText('ID')}/></label> }
						</p>
						<p>
							<input type='password' value={password} onChange={event => setPaswword(event.target.value)} onKeyPress={event => event.key === 'Enter' && handleLogin()} className={validataion.indexOf('비밀번호') > -1 ? 'warning' : ''} placeholder='비밀번호' />
							{password &&  <label><FontAwesomeIcon icon={solid('circle-xmark')} onClick={event => handleResetText('Pass')}/></label> }
						</p>
						{validataion && <em>{validataion}</em>}
						<button className='modal-button' onClick={event => handleLogin()}>로그인</button>
						<div>
							<span onClick={event => handleTerms()}>회원가입</span>
							<p>
								<span>아이디 찾기</span>
								<span>비밀번호 찾기</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>              
    )
}