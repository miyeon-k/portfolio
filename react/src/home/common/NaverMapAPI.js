import React, {useRef , useState , useEffect} from 'react';
import { getCabonMapList, savePurchaseInfo } from '../../crud/cabonMap.crud'
import $ from 'jquery'
import {toNumber , toastAlert , customConfirm } from '../util/util'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { light, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import MapLeftInfo from './MapLeftInfo'
import ProfileImg from '../static/images/profile.jpg'
import { getGeoToken , getGeojsonInfo , getGeojsonKey, getStageUrl } from '../../crud/certifications.crud'
import moment from 'moment';
import { List } from 'echarts';
import { LinearProgress } from '@material-ui/core'

export default function NaverMapAPI(props){

	const [ map , setMap ] = useState(null);
	const mapElement = useRef(null);
	const { naver } = window;
					
	const [ show , setShow ] = useState(false)
	const [ showBuyArea , setShowBuyArea ] = useState(false)
	const [ showBuy , setShowBuy ] = useState(false)
	const [ address , setAddress ] = useState('')	
	const [ price , setPrice ] = useState(0)
	const [ searchAddres , setSearchAddress ] = useState('')
	const [ showNoticeModal , setShowNoticeModal ] = useState(false)
	const [ geoAccessToken , setGeoAccessToken ] = useState('')
	const [ regionGeoJson , setRegionGeoJson ] = useState(null)
	// const sido = ['11','21','22','23','24','25','26','29','31','32','33','34','35','36','37','38','39']
	const sido = ['11']

	const handleGeoStage = async(accessToken , val) => {
		const param = {accessToken: accessToken , cd: val} 
		
		await getStageUrl(param).then((res) => {						
			
			for(let i = 0 ; i < res.data.result.length ; i ++ ){
				handleChangeGeoJson(accessToken, res.data.result[i].cd)			
			}
			
			
		}).catch((error)=>{
			//에러 핸들링
			console.log(error);
		})
		
	}

	const handleGeoJsonKey = async(accessToken , val) => {

		const param = {accessToken: accessToken , x_coor: val.x, y_coor: val.y ,  addr_type: '20'} 
		
		await getGeojsonKey(param).then((res) => {		
									
			const admCd = res.data.result[0].sido_cd
			
			let exist = false;
			for(let i = 0 ; i < sido.length ; i ++ ){
				if(sido[i] === admCd){
					exist = true
				}
			}

			if(!exist){
				sido.push(admCd)
				handleGeoStage(accessToken, admCd)		
			}			
			
		}).catch((error)=>{			
			console.log(error);
		})
	}

	const handleChangeGeoJson = async(accessToken , val) => {	

		const param = {accessToken: accessToken , year: moment().format('YYYY'), adm_cd: val } 

		await getGeojsonInfo(param).then((res) => {									
			
			setRegionGeoJson(res.data)			
			
		}).catch((error)=>{
			
			console.log(error);
		})		
	}

	const getAccessToken = async() => {

		await getGeoToken().then((res) => {												
			handleGeoStage(res.data.result.accessToken , '11')
		}).catch((error)=>{			
			console.log(error);
		})
	}
	

	const searchCoordinateToAddress = async(latlng) => {		
		
		const val = naver.maps.UTMK.fromLatLngToUTMK(latlng);
		
		await getGeoToken().then((res) => {												
			handleGeoJsonKey(res.data.result.accessToken , val )
		}).catch((error)=>{			
			console.log(error);
		})
				
	}

	const handleSearchAddess = val =>{
		naver.maps.Service.geocode({
			query: val
		}, function(status, response) {                      
			const item = response.v2.addresses[0];
			if(item){
				const point = new naver.maps.Point(item.x, item.y);
				map.setCenter(point);
			}           
		});
	}

	const handleGeoJson = async(val) => {
		
		let json = val ;
		for(let i = 0 ;i < json.features.length ; i ++ ){
			for(let k = 0 ; k < json.features[i].geometry.coordinates.length ; k ++ ){									
				for(let z = 0 ; z < json.features[i].geometry.coordinates[k].length ; z ++ ){
					json.features[i].geometry.coordinates[k][z] = naver.maps.UTMK.fromUTMKToCoord(naver.maps.Point(json.features[i].geometry.coordinates[k][z][0], json.features[i].geometry.coordinates[k][z][1]))			
				}
				
			}
		}		
		await map.data.addGeoJson(json)
	}

	useEffect(() => {            		
		if (!mapElement.current || !naver) return;         
		

	    const koreaBound = new naver.maps.LatLngBounds( new naver.maps.LatLng(32.4699729, 122.9105855),new naver.maps.LatLng(40.4703499, 129.2387105));

	    const mapOptions: naver.maps.MapOptions = {
		  center: new naver.maps.LatLng(37.485947, 126.879452),
		  zoom: 14,
		  maxZoom: 15,
		  maxBounds: koreaBound,
	    };

	    if(!map){
	 	  setMap(new naver.maps.Map(mapElement.current, mapOptions)); 
	    }	
			
		getAccessToken()
	}, []);

	useEffect(() => {
		if(regionGeoJson){
			handleGeoJson(regionGeoJson)
		}
	}, [regionGeoJson])

	useEffect(() => {
		if(map){				
			
			
			map.data.setStyle(function(feature) {
		
				var styleOptions = {
					fillColor: 'lightblue',
					fillOpacity: 0,
					strokeColor: 'lightblue',
					strokeWeight: 0,
					strokeOpacity: 0
				};			
		
				return styleOptions;
			});	

			const clickEventExist = map.data.hasListener('click');   
			const rightClickEventExist = map.data.hasListener('rightclick');   
			const mouseoverEventExist = map.data.hasListener('mouseover');   						
			
			if(!mouseoverEventExist){
				map.data.addListener('mouseover', function(e) { 	
					if(map.data.getMap().getZoom() === 14 || map.data.getMap().getZoom() === 15){
						var feature = e.feature								
						setAddress(feature.property_adm_nm)
						map.data.revertStyle();					
			
						map.data.overrideStyle(feature, {
							fillOpacity: 0.6,
							strokeWeight: 4,
							strokeOpacity: 1
						});
					}
				});			
			}  

			if(!clickEventExist){
				map.data.addListener('click', function(e) { 	
					if(map.data.getMap().getZoom() === 14 || map.data.getMap().getZoom() === 15){
						setShowBuy(true)
						//map.data.removeListener(map , 'mouseover');  
						map.data.clearListeners('mouseover');
					}
					
				});			
			} 

			map.data.addListener('mouseout', function(e) { 	
				console.log(e.feature)
				searchCoordinateToAddress(map.data.getMap().center)
			});	

			// naver.maps.Event.addListener(map, 'dragend', function(e) {	
				
			// 	searchCoordinateToAddress(map.center)
				
			// });

			if(!rightClickEventExist){
				map.data.addListener('rightclick', function(e) { 	
					if(!mouseoverEventExist){
						map.data.addListener('mouseover', function(e) { 	
							if(map.data.getMap().getZoom() === 14 || map.data.getMap().getZoom() === 15){
								var feature = e.feature										
								setAddress(feature.property_adm_nm)
								map.data.revertStyle();					
					
								map.data.overrideStyle(feature, {
									fillOpacity: 0.6,
									strokeWeight: 4,
									strokeOpacity: 1
								});
							}
						});			
					}
					
				});			
			} 									
		}				
	}, [map, geoAccessToken]);	
	

	const handleSession = val => {
		setShowNoticeModal(false)			
	}
	
	const handleShowModal = () => {
		setShowNoticeModal(true)
	}

	const handleClose = val => {
		setShowNoticeModal(false)
	}

	let [count, setCount] = useState(0);

	const incrementCount = () =>{
		setCount(count + 1);
	}

    const decrementCount = () =>{

		if(count == 0){ return; }
    	setCount(count - 1);
    }

	const buy = {
		hidden: { x:'-25rem', opacity:0 },
		visible: { x:0, opacity:1 }
	}
    
  return (
		<div className='map'>
			{showBuy ?
				<motion.aside className='mapBuy' variants={buy} initial='hidden' animate='visible'>
					<section className='sec01'>
						<span><em><FontAwesomeIcon icon={solid('location-dot')} /></em>플레이스</span>
						<p>{address}</p>
						<ul>
							{/* <li>구매가능 수량 :<span>{purchaseDataList.length}</span> 개</li> */}
							<li>총 금액 :<span>{showBuy ? toNumber(price) : '0' }</span> NGR</li>
						</ul>
						<div>
							<div>
								<span onClick={decrementCount}><FontAwesomeIcon icon={light('minus')} /></span>
								{count}
								<span onClick={incrementCount}><FontAwesomeIcon icon={light('plus')} /></span>
							</div>
							<button className='buy' >구매</button>
							<button className='delete' ><FontAwesomeIcon icon={light('trash-can')} /> 초기화</button>
						</div>
					</section>

					<section className='sec02'>
						<span><em><FontAwesomeIcon icon={solid('hashtag')} /></em>지역 정보</span>
					</section>

					<section className='sec03'>
						<span><em><FontAwesomeIcon icon={solid('circle-user')} /></em>소유자</span>
						<ol>
							<li>
								<div>
									<p><img src={ProfileImg} width='100%' alt='profile' title='profile' /></p>
									<em>Nickname</em>
								</div>
								<span><em>3</em> Place</span>
							</li>
							<li>
								<div>
									<p><img src={ProfileImg} width='100%' alt='profile' title='profile' /></p>
									<em>ahahahahah</em>
								</div>
								<span><em>1</em> Place</span>
							</li>
							<li>
								<div>
									<p><img src={ProfileImg} width='100%' alt='profile' title='profile' /></p>
									<em>나는한글로할꼬야아나는한글로할꼬야아나는한글로할꼬야아</em>
								</div>
								<span><em>1</em> Place</span>
							</li>
						</ol>
					</section>
				</motion.aside>
			: <MapLeftInfo callback={handleSearchAddess} handleShowModal={ handleShowModal}/>}
			{/* <MapLeftInfo callback={handleSearchAddess} handleShowModal={ handleShowModal}/> */}

			<div ref={mapElement}></div>
		</div>
  )
}