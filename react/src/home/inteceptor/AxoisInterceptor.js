import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AxoisInterceptor(props) {  
  
  useEffect(() => {        
    
    let loading = false;
    axios.interceptors.request.use(function (config) {	
      const accessToken = localStorage.getItem('accessToken')

      config.headers.accessToken = accessToken;
      loading = true    
      props.callback(loading)
      
      return config;
      
    }, function (error) {         
      loading = false
      console.log(error)
      return Promise.reject(error);
    })
    axios.interceptors.response.use((config) => {                        			
       loading = false
       props.callback(loading)
       return config;
      },(error) => {
        loading = false   
        console.log(error)
        return Promise.reject(error)
    })

    
  }, [])  

  return (
    <div style={{display:'none'}}></div>
  )
}