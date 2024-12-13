import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import logoImg from '../static/images/logo.png'
import Login from '../common/modal/Login';
import UserRegist from '../common/modal/UserRegist';
import Certification from '../common/modal/Certification';
import Terms from '../common/modal/Terms';

export default function Header(props) {

    const [ showLoginModal , setShowLoginModal ] = useState(false)
    const [ showRegistModal , setShowRegistModal ] = useState(false)
	const [ showTermsModal , setShowTermsModal ] = useState(false)
    const [ showCertModal , setShowCertModal ]  = useState(false)
    const [ logInOutYn  , setLogInOutYn] = useState(true)
    const [ userData , setUserData ] = useState({})

    const handleSession = val => {
        setShowLoginModal(false)
        setShowRegistModal(false)
				setShowTermsModal(false)
        if(val){
            setLogInOutYn(true)            
        }else{
            localStorage.removeItem('accessToken')
            setLogInOutYn(false)
        }        
        props.callback(false)
    }

    const handleRegist = val =>{
        setUserData(val)
        setShowLoginModal(false)
        setShowTermsModal(false)
        setShowCertModal(false)
        setShowRegistModal(true)
    }

    const handleTerms = () =>{
        setShowLoginModal(false)
        setShowTermsModal(true)
	}

    const handleCert = () =>{
        setShowTermsModal(false)
        setShowCertModal(true)

    }

    const handleClose = val => {        
        setShowLoginModal(false)
        setShowTermsModal(false)
        setShowRegistModal(false)
        setShowCertModal(false)
    }
    useEffect(() => {        
        const session = localStorage.getItem('accessToken')

        if( session ){
            setLogInOutYn(true)
        }else{
            setLogInOutYn(false)
        }
    }, [])

    useEffect(() => {
        if(props.showLogin){
            setShowLoginModal(true)
        }        
    },[props])
    return (
			<>
				<header>
					<Link to='/index'><img src={logoImg} width='100%' alt='bizmarvel logo' title='bizmarvel logo' /></Link>
					{!logInOutYn ? 
						<div>
							<span onClick={event => setShowLoginModal(true)}>로그인</span>
							<button className='join' onClick={event => setShowTermsModal(true)}>회원가입</button>
						</div>
					:                    
						<div onClick={event => handleSession(false)} >로그아웃</div>                    
					}
				</header>

				{showLoginModal && <Login show = {showLoginModal} callback={handleSession} handleTerms={handleTerms} hide={handleClose}/> }
				{showRegistModal && <UserRegist show = {showRegistModal} userData={userData} callback={handleSession} hide={handleClose} /> }
				{showTermsModal && <Terms show = {showTermsModal}  callback={handleCert} hide={handleClose}/> }
				{showCertModal && <Certification show = {showCertModal}  callback={handleRegist} hide={handleClose}/> }
			</>
    )
}