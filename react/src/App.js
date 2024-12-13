import React, { useEffect  , useState } from 'react';
import Layout from './home/layout/layout'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoadingComponent from './home/common/LoadingComponent'
import AxoisInterceptor from './home/inteceptor/AxoisInterceptor'


const App = () => {	

	const [loading , setLoading] = useState(false)	
	
	const axoisCallBack = val => {
		setLoading(val)
	}


	return (    								
		<BrowserRouter>
			<AxoisInterceptor callback={axoisCallBack}/>
			<LoadingComponent loading={loading}/>  
			<Layout />
		</BrowserRouter>			 
	);
}

export default App;