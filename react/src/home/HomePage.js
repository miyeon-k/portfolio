import React from 'react'
import { BrowserRouter, Switch, Route , Redirect} from 'react-router-dom';
import Index from './index'
// import MapIndex from './map/index_bak'
import MapIndex from './map/index'
import NoticeIndex from './notice/index'
import Page404 from './error/404'

export default function HomePage(props) {  

  const handleLogin = val => {
    props.callback(val)
  }
  
  return (      
        <Switch>                  
            <Route exact path="/">
              <Redirect to='/index'/>
            </Route>
            <Route exact path="/index" component={Index}></Route>
            <Route exact path="/map/index" render={() => <MapIndex callback={handleLogin} />}/>
            {/* <Route exact path="/map/index" component={MapIndex}></Route> */}
						<Route exact path="/notice/index" component={NoticeIndex}></Route>
            <Route exact path="*" component={Page404}></Route>
        </Switch>          
  )
}