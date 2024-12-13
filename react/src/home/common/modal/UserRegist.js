import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import { saveUserInfo , getExistUserInfo} from '../../../crud/user.crud'
import { toastAlert, validateEmail, validatePassword, validatePhoneNo, removeWhitespace } from '../../util/util'


export default function UserRegist(props){
        
    const [ show , setShow ] = useState(props.show)        
    const [ password , setPaswword ] = useState('')
	const [ passwordCheck , setPaswwordCheck ] = useState('')
    const [ userName , setUserName ] = useState(props.userData.name)
    const [ nickName , setNickName ] = useState('')
    const [ email , setEmail ] = useState('')
    const [ phoneNo , setPhoneNo ] = useState(props.userData.phone)               
    const [ emailValid , setEmailValid] = useState('')
    const [ pwdValid , setPwdValid] = useState('')
	const [ pwdcheckValid , setPwdCheckValid] = useState('')
    const [ phoneNoValid , setPhoneNoValid] = useState('')
	const [ userNameValid , setUserNameValid] = useState('')
    const [ nickNameValid , setNickNameValid] = useState('')
    
    const handleClose = () =>{        
        props.callback(false)
        setShow(false)	
    }

    const handleExistUser = async(val) => {
        const param = {certKey: val}

        await getExistUserInfo(param).then(response => {		
            const message = response.data.message
            if(message !== '' && message !== null){
                toastAlert(message, 'info')
                handleClose()
            }
            
        }).catch((error)=>{			
              console.log(error);
        })
    }

    const handleValid = type => {
        if(type === 'email'){            
            
            if(!validateEmail(email)){            
                setEmailValid('메일 형식이 아닙니다.');
                return false
            }else{
                setEmailValid('');                
                return true
            }
        } else if(type === 'password'){
            if(password.length < 8 || password.length > 20){
                setPwdValid('8 ~ 20자 이내로 사용해야 합니다.')
                return false
            }
            if(validatePassword(password) !== ''){
                setPwdValid(validatePassword(password))
                return false
            } else{
                setPwdValid('')
                return true
            }      
        } else if(type === 'passwordCheck'){            
            if(password !== passwordCheck){
                setPwdCheckValid('비밀번호가 일치하지 않습니다.')
                return false
            } else {
                setPwdCheckValid('')
                return true
            }
        }    
    }
    const handleRegist = async() =>{
        if( handleValid('email') && handleValid('password') && handleValid('passwordCheck') ) {
            const param = {
                userName: userName,
                password: password,
                nickName: nickName,
                email: email,
                phoneNo: phoneNo,
                certKey: props.userData.unique_key
            }

            await saveUserInfo(param).then(response => {		
                console.log(response)
                const check = response.data.check	
                
                if(check){
                    toastAlert('회원 가입 되었습니다.', 'success')
                    const data = response.data.responseData.userInfo
                    localStorage.setItem('accessToken' , data.accessToken)                    
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
       
    }

    useEffect(() => {
        if(props.userData.unique_key){
            handleExistUser(props.userData.unique_key)
        }
    }, [props])        

    return (
			<Modal open={show} className='modal' onClose={handleClose}>                
				<div className='modal-content'>
					<p>Atmopedia</p>
					<div className='join'>
						<p>회원가입을 위해 작성해주세요.</p>
						<dl>
							<dt>이름</dt>
							<dd><input type='text' value={userName} className='disable' disabled/></dd>
						</dl>
						<dl>
							<dt>이메일</dt>
							<dd><input type='email' value={email} onChange={event => setEmail(event.target.value)} onBlur={event => handleValid('email')} className={emailValid && 'notice'} placeholder='이메일을 입력해주세요' /></dd>
						</dl>
						{emailValid && <em>{emailValid}</em>}
						<dl>
							<dt>비밀번호</dt>
							<dd>
								<input type='password' value={password} onChange={event => setPaswword(event.target.value)} onBlur={event => handleValid('password')} className={pwdValid && 'notice'} placeholder='숫자+영문자+특수문자 조합. 8 ~ 20자 이내' />
								<input type='password' value={passwordCheck} onChange={event => setPaswwordCheck(event.target.value)} onBlur={event => handleValid('passwordCheck')} className={pwdcheckValid && 'notice'} placeholder='비밀번호를 한번 더 입력해주세요' />
							</dd>
						</dl>
						{pwdValid && <em>{pwdValid}</em>}
						{pwdcheckValid && <em>{pwdcheckValid}</em>}
						<dl>
							<dt>휴대폰 번호</dt>
							<dd><input type='tel' value={phoneNo} className='disable' disabled /></dd>
						</dl>
						<dl>
							<dt>닉네임</dt>
							<dd><input type='text' value={nickName} onChange={event => setNickName(event.target.value)} onBlur={event => handleValid('nickName')} placeholder='닉네임을 입력해주세요' /></dd>
						</dl>
						
						<button className={email && password && passwordCheck ? 'modal-button' : 'disabled'} onClick={event => handleRegist()} disabled={email && password && passwordCheck ? false : true }>회원가입</button>
					</div>
				</div>
			</Modal>
    )
}