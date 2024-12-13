import { async } from "q";
import React, { useEffect, useState } from "react";
import { getToken , impKey, getIamPortUserInfo } from '../../../crud/certifications.crud'
import Modal from '@material-ui/core/Modal';
import moment from "moment";

export default function Certification(props){    

    const [ show , setShow ] = useState(props.show)
    const [accessToken , setAccessToken] = useState('');
    const [impUId , setImpUId] = useState('');

    const handleClose = () =>{        
        props.hide()        
    }

    const handleGetToken = async() => {
        await getToken().then(response => {		                        
            setAccessToken(response.data.response.access_token)
		}).catch((error)=>{			
			  console.log(error);
		})
    }

    const handleGetUserInfo = async(val) =>{
        await getIamPortUserInfo(val , accessToken).then(response => {		
            if(response.data.response.certified){
                props.callback(response.data.response)
            }else{
                alert('인증에 실패했습니다.')
            }
            
		}).catch((error)=>{			
			  console.log(error);
		})
    }

    useEffect(() => {
        if(accessToken){
            const IMP = window.IMP; // 생략 가능
            IMP.init(impKey); // 예: imp00000000

            IMP.certification({ // param                
                merchant_uid: "CERT_"+moment().format('YYYYMMDDHHMMSS'), // 주문 번호
                m_redirect_url : "", // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
                popup : true // PC환경에서는 popup 파라메터가 무시되고 항상 true 로 적용됨
            }, function (rsp) { // callback
                
                if(rsp.success){
                    setImpUId(rsp.imp_uid)
                }else{
                    handleClose();
                }
                
            });
        }
        
    }, [accessToken])

    useEffect(() => {
        if(impUId){
            handleGetUserInfo(impUId)
        }

    }, [impUId] )

    useEffect(() => {
        handleGetToken();
    },[])

    return (
        <Modal open={show} onClose={handleClose} ><div></div></Modal>
    )
}