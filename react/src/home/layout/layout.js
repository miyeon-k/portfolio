import React, { useEffect  , useState } from 'react';
import { useLocation } from "react-router-dom"
import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";
import HomePage from "../HomePage";
import Index from '../index'
import '../static/css/common.css'

import axios from 'axios'

const Layout = () => {

	const location = useLocation();	
	const [showLogin , setShowLogin] = useState(false)

	const handleLogin = val => {		
		setShowLogin(val)
	}
	return (
		<>
		{location.pathname !== '/index' ?	
			<div className='platform'>
				<Header showLogin={showLogin} callback={handleLogin}/>
				<Nav />
				<main><HomePage callback={handleLogin}/></main>
				<Footer />
			</div>
		:
			<Index />  
		}
		</>		
	)
}

export default Layout;