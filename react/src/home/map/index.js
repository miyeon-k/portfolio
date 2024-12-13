import React, { useState , useEffect} from 'react';
import { getGeoToken , getGeojsonInfo , getStageUrl , getLocationInfo } from '../../crud/certifications.crud'
import ProgressComponent from '../common/ProgressComponent';
import moment from 'moment';
import { Tab, Tabs } from '@material-ui/core'
import ReactEcharts from 'echarts-for-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { light, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import {toNumber , toastAlert , customConfirm } from '../util/util'
import ProfileImg from '../static/images/profile.jpg'
import { getNgrPriceInfo , getUSDPriceInfo } from '../../crud/lbank.crud';
import { savePurchaseInfo, getCabonMapList , getCabonMapAreaInfo} from '../../crud/cabonMap.crud';
import { getMonthMeasurement } from '../../crud/measurement.crud';
import { use } from 'echarts';

const MapIndex = props => {    
    
    const sessionId = localStorage.getItem('userId')

    const { sop } = window;
    const data = [];
    let preFeature = null;
	let click = false;
        
    const [ map , setMap ] = useState(null)            
    const sido = ['11'] // 서울 , 경기 , 인천
    //const sido = ['11','23','31'] // 서울 , 경기 , 인천
    //const sido = ['11','21','22','23','24','25','26','29','31','32','33','34','35','36','37','38','39'] // 전국
    const [ show , setShow ] = useState(false)
    const [ showBuy , setShowBuy ] = useState(false)
    const [ address , setAddress ] = useState('')		
    const [ searchSidoCode , setSearchsSidoCode ] = useState('')
	const [ showNoticeModal , setShowNoticeModal ] = useState(false)
    const [ airPollutionInfo , setAirPollutionInfo] = useState({})    
    const [ ngrPrice , setNgrPrice] = useState(0)
    const [ usdPrice , setUsdPrice] = useState(0)
    const [ buyInfo , setBuyInfo ] = useState({})
    const [ buyList , setBuyList] = useState([])
    const [ load , setLoad ] = useState(false)
    const [ status , setStatus ] = useState('')
    const [ ownerList , setOwnerList ] = useState([])
    const [ commonBuy , setComonBuy ] = useState(false)
    const [ commonPrice, setCommonPrice] = useState(10000000);
    const [ defaultPrice, setDefaultPrice] = useState(0);
    const [ sellPrice, setSellPrice] = useState(0);
    const [ biddingTotalPrice , setBiddingTotalPrice] = useState(0)
    const [ periodIndex, setPeriodIndex] = useState(0);
    const [ buyIndex, setBuyIndex] = useState(0);
    const [ measurementList , setMeasurementList ] = useState([])
    const [ searchYear , setSearchYear ] = useState(Number(moment().format('YYYY')))
    const [ chartData , setChartData] = useState(null)
    const [ geoData , setGeoData ]  = useState([])

    const buy = {
		hidden: {x: '-25rem', opacity: 0},
		visible: {x: 0, opacity: 1}
	}

    const initGeoStyle = () =>{
        return {
            weight: 0.8,
            color: 'red',
            fillOpacity: 0
        };
    }

    const clickGeoStyle = () =>{
        return {
            weight: 1,
            color: '#2760fe',
            fillOpacity: 0.7
        };
    }

    const waitGeoStyle = () =>{
        return {
            weight: 1,
            color: '#7839ff',
            fillOpacity: 0.7
        };
    }

    const biddingGeoStyle = () =>{
        return {
            weight: 1,
            color: '#ff324a',
            fillOpacity: 0.7
        };
    }

    const ownGeoStyle = () =>{
        return {
            weight: 1,
            color: '#1e1e1e',
            fillOpacity: 0.7
        };
    }

    const handleResetStyle = async(feature) => {

        if(preFeature !== null){
            preFeature.setStyle(initGeoStyle)   
            
        }else{
            preFeature = feature
        }
        feature.setStyle(clickGeoStyle)   
        
    }	

    const handleGetBuyList = async() => {

        await getCabonMapList().then((res) => {		            
            setBuyList(res.data.result)
            setLoad(true)
        }).catch((error)=>{			
            console.log(error);
        })  
        
    }

    const handleGetUsdPrice = async() => {

        await getUSDPriceInfo().then((res) => {												
            setUsdPrice(res.data[0].basePrice)
        }).catch((error)=>{			
            console.log(error);
        })  
        
    }

    const getNgrPrice = async() => {        

        await getNgrPriceInfo().then((res) => {												
            setNgrPrice(res.data.data[0].ticker.latest)
        }).catch((error)=>{			
            console.log(error);
        })  
        
    }
    const getAccessToken = async(initMap) => {
        let k = 0 ;
        for(let i = 0 ; i < sido.length ; i ++ ){
            k = i + 1;
            await getGeoToken().then((res) => {												
                handleGeoStage(res.data.result.accessToken , sido[i] , k , initMap)
            }).catch((error)=>{			
                console.log(error);
            })            
        }
		
	}

    const handleSearchAddress = async(val) => {
        await getGeoToken().then((res) => {		
            const param = { accessToken: res.data.result.accessToken , address: val } 
            getLocationInfo(param).then((res) => {	
                
                if(res.data.errCd === 0 ){                    
                    map.setView(sop.utmk(res.data.result.resultdata[0].x, res.data.result.resultdata[0].y)); 

                }else{
                    toastAlert(res.data.errMsg , 'info' , 'center')
                }
            }).catch((error)=>{			
                console.log(error);
            }) 

        }).catch((error)=>{			
            console.log(error);
        }) 
    }

    const handleGeoStage = async(accessToken , val , index  , initMap) => {
		const param = {accessToken: accessToken , cd: val} 
		let finish = false ;
		await getStageUrl(param).then((res) => {						
			
			for(let i = 0 ; i < res.data.result.length ; i ++ ){
                if( i === res.data.result.length -1 ){
                    finish = true
                }
				handleChangeGeoJson(accessToken, res.data.result[i].cd , index , initMap , finish)			
			}			            
			            
		}).catch((error)=>{			
			console.log(error);
		})		
	}


    const handleChangeGeoJson = async(accessToken , val, index , initMap , finish) => {	

		const param = {accessToken: accessToken , year: moment().format('YYYY') - 1 , adm_cd: val } 

		await getGeojsonInfo(param).then((res) => {									
			            
            if(data.length === 0){
                data.push(res.data)		
            }else{                
                for(let i = 0 ; i < res.data.features.length ; i ++ ){                    
                    data[0].features.push(res.data.features[i])
                }
            }

            if(index === sido.length){
                if(finish){            
                    setGeoData(data)
                    handleMakeJson(data , initMap)
                    setShow(true)
                }                
            }                        			
		}).catch((error)=>{			
			console.log(error);
		})		
	}
    
    const handleGetAreaInfo = async(param ) =>{
        
        const params = { searchTmX:param.searchTmX , searchTmY:param.searchTmY , sidoCode:param.sidoCode} 

        getNgrPrice()

        await getCabonMapAreaInfo(params).then((res) => {			
            let sPrice = res.data.responseData.userInfo.length > 0 ? res.data.responseData.userInfo[0].price : 0;
            if(sPrice && sPrice.indexOf(',') > -1 ){
                sPrice = sPrice.replaceAll(',', '');
                sPrice = Number(sPrice);
            }else{
                sPrice = Number(sPrice);
            }
			
            setBiddingTotalPrice(res.data.responseData.totalPrice)	
            setOwnerList(res.data.responseData.userInfo)
            setStatus(res.data.responseData.status)
            setSellPrice(sPrice)
            setDefaultPrice(res.data.responseData.price)
            handleMonthMeasurement(moment().format('YYYY') , param.sidoCode)

		}).catch((error)=>{
			
			console.log(error);
		})		
    }    

    const handleMonthMeasurement = async(year , sidoCode) =>{

        const param = { year : year , sidoCode: sidoCode ? sidoCode : searchSidoCode}
                
        await getMonthMeasurement(param).then((res) => {			
            const result = res.data.responseData.result;
            
            const list = []
            for(let i = 1 ; i < 13 ; i ++ ){
                let index = i < 10 ? '0'+i : i+'' ;
                const filterData = result.filter(list => list.month === index);
                if(filterData.length > 0){
                    list.push(filterData[0].cnt)
                }else{
                    list.push(0)
                }                
            }
            
            const gases = {
                grid: {top: 15, right: 0, bottom: 0, left: 5, containLabel: true},
                xAxis: {
                    type: 'category',
                    data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                    axisLabel: {color: '#6f6f6f'},
                    axisLine: {
                        lineStyle: {color: '#ededed'}
                    },
                    axisTick: {alignWithLabel: 'center'},
                },
                yAxis: {
                    type: 'value',                   
                    axisLabel: {color: '#6f6f6f'},
                    splitLine: {
                        lineStyle: {color: '#ededed'}
                    }
                },
                series: [
                    {
                        data: list,
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        itemStyle: {color:'#7839ff'},
                        lineStyle: {color:'#7839ff'}
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                }
            }

			setChartData(gases)
		}).catch((error)=>{
			
			console.log(error);
		})		
    } 

    const handleMakeJson = (data, initMap) =>{
        
        initMap.setView(sop.utmk(953820, 1953437), 8); 
        
        for(let i = 0 ; i < data[0].features.length ; i ++ ){
            const featuresData = sop.geoJson(data[0].features[i]);
            
            const existData = buyList.filter(list => list.sidoCode === data[0].features[i].properties.adm_cd )
            
            if(existData.length > 0){
                if(existData[0].status === 'REQUEST'){
                    featuresData.setStyle(waitGeoStyle)
                    featuresData.addTo(initMap)
                }else if(existData[0].status === 'CONFIRM' || existData[0].status === 'OWNER'){
                    featuresData.setStyle(ownGeoStyle)
                    featuresData.addTo(initMap)
                }else if(existData[0].status === 'BIDDING'){
                    featuresData.setStyle(biddingGeoStyle)
                    featuresData.addTo(initMap)
                }else{
                    if(existData[0].status === 'SELL'){
                        if(existData[0].userId === sessionId){
                            featuresData.setStyle(ownGeoStyle)
                            featuresData.addTo(initMap)
                        }
                    }else{
                        featuresData.setStyle(initGeoStyle)
                        featuresData.addTo(initMap)    
                    }                    
                }                  
            }else{
                featuresData.setStyle(initGeoStyle)
                featuresData.addTo(initMap)
            }            
            
            featuresData.on('contextmenu', function(e){        
                click = false;    
                
                if(preFeature !== null ){
                    let index ;   
                    for (var key in preFeature._layers) {
                        index = key;
                    } 
                    const adm_cd = preFeature._layers[index].feature.properties.adm_cd;
                    console.debug(buyList)
                    
                    const existData = buyList.filter(list => list.sidoCode === adm_cd )

                    console.debug(existData)
                    if(existData.length > 0){
                        if(existData[0].status === 'REQUEST'){
                            preFeature.setStyle(waitGeoStyle)                            
                        }else if(existData[0].status === 'CONFIRM'){
                            preFeature.setStyle(ownGeoStyle)                            
                        }else if(existData[0].status === 'BIDDING'){
                            preFeature.setStyle(biddingGeoStyle)                         
                        }else{
                            if(existData[0].status === 'SELL'){
                                if(existData[0].userId === sessionId){
                                    featuresData.setStyle(ownGeoStyle)                                    
                                }
                            }else{
                                featuresData.setStyle(initGeoStyle)                                
                            }                    
                        }              
                    }else{
                        preFeature.setStyle(initGeoStyle)                             
                    }                         
                }                
                          
                setAirPollutionInfo({})
                setAddress('')
                setShowBuy(false)                        
            })

            
            featuresData.on('click', function(e){                         
                if(!click){
                    featuresData.off('mouseout')

                    const property = e.layer.feature.properties;                      
                    const param = { searchTmX: property.x , searchTmY: property.y , sidoCode: property.adm_cd }                                                                            
                    
                    preFeature = featuresData                    

                    initMap.setView(sop.utmk(property.x, property.y)); 
                    
                    const existData = buyList.filter(list => list.sidoCode === property.adm_cd )
                    
                    if(existData.length > 0){
                        setStatus(existData[0].status)
                    }

                    setBuyInfo({...buyInfo ,  sidoCode: property.adm_cd , address: property.adm_nm , mapX: property.x , mapY: property.y , feature: featuresData })
                    handleResetStyle(featuresData)                                                       
                    handleGetAreaInfo(param , featuresData)
                    setAddress(property.adm_nm)
                    setSearchsSidoCode(property.adm_cd)
                    setShowBuy(true)           
                    setComonBuy(false) 
                    click = true                    
                }
                
            })                
        }                        
    }

    const handleBuy = async(type) =>{        
        
        if(localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === '' ){			
            props.callback(true)
			return false
		}        

        let confirmMessage = ''
        let price = 0;
        let nPrice = 0 
        let alertMessage = ''
        let paymentId = '';

        if(type === 'REQUEST'){            
            confirmMessage = '구매 신청 하시겠습니까?'
            price = toNumber(defaultPrice )
            nPrice = toNumber(Math.round(defaultPrice / ( ngrPrice * usdPrice )) , 1 )
            alertMessage = '구매 신청 되었습니다.'
        }else if(type === 'SELL'){
            confirmMessage = '해당 지역을 판매 하시겠습니까?'
            price = toNumber(sellPrice)
            nPrice= toNumber(Math.round(sellPrice / ( ngrPrice * usdPrice ) , 1 ))
            paymentId = ownerList[0].paymentId;
            alertMessage = '해당 지역을 판매 상태로 변경되었습니다.'
        }if(type === 'MODIFY'){
            confirmMessage = '금액을 수정 하시겠습니까?'
            price = toNumber(sellPrice)
            nPrice= toNumber(Math.round(sellPrice / ( ngrPrice * usdPrice ) , 1 ))
            paymentId = ownerList[0].paymentId;
            alertMessage = '해당 지역을 판매 금액을 수정하였습니다.'
        } if(type === 'CANCEL'){
            confirmMessage = '해당 지역을 판매 취소 하시겠습니까?'
            price = toNumber(sellPrice)
            nPrice= toNumber(Math.round(sellPrice / ( ngrPrice * usdPrice ) , 1 ))
            paymentId = ownerList[0].paymentId;
            alertMessage = '해당 지역을 판매 취소 하였습니다.'
        }        

        if(await customConfirm (confirmMessage , '확인')){    
             
            const param = { paymentId : paymentId ,
                            sidoCode : buyInfo.sidoCode ,                 
                            address: buyInfo.address ,
                            mapX: buyInfo.mapX ,
                            mapY: buyInfo.mapX, 
                            price: price , 
                            status: type,
                            ngrPrice: nPrice }

            await savePurchaseInfo(param).then((res) => {
                
                if(res.data.check){
                    toastAlert(alertMessage, 'success' , 'center')                    
                    window.location.reload();
                }else{
                    if(res.data.code === 999){
						toastAlert('로그인 후 구매 가능합니다.' , 'info' , 'center')   
                        props.callback(true)
					}else{
                        const status = res.data.responseData.result[0].status                    
                        if(status === 'REQUEST'){
                            buyInfo.feature.setStyle(waitGeoStyle)
                        }else if(status === 'CONFIRM'){
                            buyInfo.feature.setStyle(ownGeoStyle)
                        }if(status === 'SELL'){
                            buyInfo.feature.setStyle(clickGeoStyle)
                        }
                        toastAlert(res.data.message, 'info' , 'center')                        
                    }
                }
            }).catch((error)=>{
                
                console.log(error);
            })	
        }
        
    }

    const handleBidding = async() =>{        
        
        if(localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === '' ){
			toastAlert('로그인 후 구매 가능합니다.' , 'info' , 'center')   
			return false
		}        

        if(await customConfirm('입찰 신청 하시겠습니까?' , '신청하기')){            
            const param = { sidoCode : buyInfo.sidoCode ,                 
                            address: buyInfo.address ,
                            mapX: buyInfo.mapX ,
                            mapY: buyInfo.mapX, 
                            price: toNumber(commonPrice) , 
                            status: 'BIDDING',
                            ngrPrice: toNumber(Math.round(defaultPrice / ( ngrPrice * usdPrice )) , 1 )}

            await savePurchaseInfo(param).then((res) => {
                
                if(res.data.check){
                    toastAlert('입찰 신청 되었습니다.', 'success' , 'center')
                    buyInfo.feature.setStyle(waitGeoStyle)                    
                    buyInfo.searchTmX = buyInfo.mapX
                    buyInfo.searchTmY = buyInfo.mapY
                    handleGetAreaInfo(buyInfo)
                }else{
                    if(res.data.code === 999){
						toastAlert('로그인 후 구매 가능합니다.' , 'info' , 'center')   
					}else{
                        const status = res.data.responseData.result[0].status                    
                        if(status === 'REQUEST'){
                            buyInfo.feature.setStyle(waitGeoStyle)
                        }else if(status === 'CONFIRM'){
                            buyInfo.feature.setStyle(ownGeoStyle)
                        }
                        toastAlert(res.data.message, 'info' , 'center')
                    }
                }
            }).catch((error)=>{
                
                console.log(error);
            })	
        }
        
    }

    const handleShowModal = () => {
		setShowNoticeModal(true)
	}

	const handleClose = val => {
		setShowNoticeModal(false)
	}

      
    const handlePeriodChange = (event, newPeriodIndex) => {
      setPeriodIndex(newPeriodIndex);
    };

    const handleBuyChange = (event, newBuyIndex) => {
      setBuyIndex(newBuyIndex);
    };		

	const incrementCount = val =>{
        if(val === 'price'){
		    setCommonPrice(commonPrice + 1000000);
        }else{
            setSellPrice(sellPrice + 1000000);
        }
	}

	const decrementCount = val =>{
		
        if(val === 'price'){
		    if(commonPrice == 0){ return }
    	    setCommonPrice(commonPrice - 1000000);
        }else{
            if(sellPrice == 0){ return }
            setSellPrice(sellPrice - 1000000);
        }
	}

    useEffect(() => {
        if(load){
            if(map === null){

                const initMap = sop.map("map" , { zoomSliderControl: false , measureControl: false})               
                
                initMap.off("dblclick");
                setMap(initMap)
                getAccessToken(initMap);               
                handleGetUsdPrice();
            }                        
        }
        
    }, [load])         

    useEffect(() => {
        handleMonthMeasurement(searchYear)
    }, [searchYear])    

    useEffect(() => {
        handleGetBuyList()
    },[])

	return (        
		<div className='map'>
            {showBuy &&
			<aside className='mapBuy'>
				<section className='buy01'>
					<span><em><FontAwesomeIcon icon={solid('location-dot')} /></em>플레이스</span>
					<p>{address}</p>
                    {status !== 'REQUEST' && status !== 'CONFIRM' && 
					<Tabs value={buyIndex} onChange={handleBuyChange} variant='fullWidth'>
						{ ownerList && ownerList.filter(list => list.userId === sessionId && ( list.status === 'OWNER' || list.status === 'SELL')).length > 0 ? <Tab label='판매' /> :  <Tab label='구매' /> }
					</Tabs>
                    }

					{ ownerList && ownerList.filter(list => list.userId === sessionId && ( list.status === 'OWNER' || list.status === 'SELL')).length === 0 ? (
                        <div className='buyCon'>						
                            <dl>
                                <dt>                                   
                                    <div className='price'>가격                                        
                                        <p>
                                            <em>{ defaultPrice ? toNumber(defaultPrice ) : 0 }</em> 원<br/>
                                            <em>{ defaultPrice ? toNumber(Math.round(defaultPrice / ( ngrPrice * usdPrice )) , 1 ) : 0 }</em> NGR
                                        </p>                                        
                                    </div>
                                </dt>
                                {!status &&                                                                          
                                    <dd>
                                            <button className='buyAll' onClick={event => handleBuy('REQUEST')}>구매신청</button>                                         
                                    </dd>                                    
                                }    
                            </dl>
                            {commonBuy && <div> * 입찰금액은 100만원 단위입니다.</div> }
                        </div>)
                    :
                        <div className='buyCon'>
                            <dl>
                                <dt>
                                    <div className='mount'>금액
                                        <p>
                                            <span onClick={event => decrementCount('sell')}><FontAwesomeIcon icon={light('minus')} /></span>
                                            {toNumber(sellPrice)}
                                            <span onClick={event => incrementCount('sell')}><FontAwesomeIcon icon={light('plus')} /></span>
                                        </p>                                        
                                    </div>
                                    <div className='mount'>NGR
                                        <p>
                                            <span>{ sellPrice > 0 ? toNumber(Math.round(sellPrice / ( ngrPrice * usdPrice )) , 1 ) : 0 }</span> 
                                        </p>
                                    </div>
                                </dt>
                                <dd>
                                    {status === 'SELL' ? 
                                        <>
                                            <button className='buyAll' onClick={event => handleBuy('MODIFY')}>금액수정</button>   
                                            <button className='cancel' onClick={event => handleBuy('CANCEL')}>판매취소</button> 
                                        </>
                                    :
                                        <button className='buyAll' onClick={event => handleBuy('SELL')}>판매</button>                                    
                                    }
                                </dd>
                            </dl>
                        </div>
                    }
					
				</section>

				<section className='buy02'>
					<span><em><FontAwesomeIcon icon={solid('chart-line')} /></em>측정 현황</span>					
                    <div style={{textAlign:'center'}}>
                        <span onClick={event => setSearchYear(searchYear -1 ) }> {' < '} </span> {searchYear} <span onClick={event => setSearchYear(searchYear + 1 )}> {' > '} </span>
                    </div>
					{chartData && (<div className='periodChart'><ReactEcharts option={chartData}></ReactEcharts></div>)}
					{/* {periodIndex === 1 && (<div className='periodChart'>The second tab</div>)} */}
				</section>

				<section className='buy03'>
					<span><em><FontAwesomeIcon icon={solid('circle-user')} /></em>소유자 정보</span>
					{ownerList.map((list , index ) => 
						<ol key={index}>
							<li>
								<div>
									<p><img src={ProfileImg} width='100%' alt='profile' title='profile' /></p>
									<em>{list.nickName}</em>
                                    <em style={{color:'red', fontWeight:'bold'}}>{list.status === 'REQUEST' ? '승인 대기중' : list.status === 'BIDDING' ? '입찰 진행중' : status === 'SELL' ? '판매중' : ''} </em>
                                    {list.status === 'BIDDING' && <em style={{color:'red', fontWeight:'bold'}}>{toNumber(list.price) + '원'} </em>}
								</div>								
							</li>							
						</ol>
                    )}
				</section>
                <section className='info05'>
                    <span><em><FontAwesomeIcon icon={solid('circle-info')} /></em>사용방법</span>
                    <ol>
                        <li><span>마우스 왼쪽 클릭 :</span>지역 선택</li>
                        <li><span>마우스 오른쪽 클릭 :</span>지역 선택 해제</li>
                    </ol>				
                </section>
			</aside>
            }

			<div id="map">
				{!show && <ProgressComponent /> }    
			</div>
		</div>
	);
}

export default MapIndex;