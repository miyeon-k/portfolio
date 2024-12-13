import React, {useRef , useState , useEffect} from 'react';
import { getCabonMapList, savePurchaseInfo } from '../../crud/cabonMap.crud'
import $ from 'jquery'
import {toNumber , toastAlert , customConfirm } from '../util/util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { light } from '@fortawesome/fontawesome-svg-core/import.macro'
import MapLeftInfo from './MapLeftInfo'
import Notice from './modal/Notice'

export default function NaverMapAPI(props){

	const [map , setMap] = useState(null);
	const mapElement = useRef(null);
	const { naver } = window;
			
	const [purchaseList , setPurchaseList] = useState([]);
	const [purchaseDataList , setPurchaseDataList] = useState([]);
	const [areaInfo , setAreaInfo] = useState(null);
	const [show , setShow] = useState(false)
	const [showBuyArea , setShowBuyArea] = useState(false)
	const [showBuy , setShowBuy] = useState(false)
	const [address , setAddress] = useState('')
	const [maxLat , setMaxLat] = useState('')
	const [maxLng , setMaxLng] = useState('')
	const [minLat , setMinLat] = useState('')
	const [minLng , setMinLng] = useState('')
	const [price , setPrice ] = useState(0)
	const [searchAddres , setSearchAddress] = useState('')

	const handleSearch = async(param) => {
		let searchParam;
			
		if(param){
			searchParam = param;
			setMaxLat(param.maxLat);
			setMaxLng(param.maxLng);
			setMinLat(param.minLat);
			setMinLng(param.minLng);
		}else{            
			searchParam = {maxLat: maxLat , maxLng: maxLng , minLat: minLat , minLng: minLng}                        
		}
		await getCabonMapList(searchParam).then(response => {
			const status = response.status;
			const data = response.data.result;
			
			if(status === 200){                
				setPurchaseList(data)
			}
		}).catch((error)=>{
			//에러 핸들링
			console.log(error);
		})
	}    

	const handleMakeMapArea = (x, y, z) => {
		$('#layerArea').remove();

		let div = '<div id=layerArea>';
		
		for(let i = 0 ; i < 10 ; i ++ ){
			let inx = 1 + (10 * i );
			div = div + '<div style="display:flex; height:25.6px;">';
			for(let k = 0 ; k < 10 ; k ++  ){
				const xyzLocaltion = [x, y, z].join('_')+'_'+(inx);      
				
				const purchaseData = purchaseList.filter(list => list.purchaseMap === xyzLocaltion);		   
				
				if(purchaseData.length > 0){
					div = div +  '<div class=tilegrid_buy id='+xyzLocaltion+'></div>'                      
				}else{
					div = div +  '<div class=tilegrid id='+xyzLocaltion+'></div>'                      
				}
				
				inx = inx + 1;
			}
			div = div + '</div>'
		}
		div = div + '</div>';        

		return $(div);   
	}
	
	const handlePurchaseInfo = async(val) => {	
		const mapKey = val.domEvent.target.id.split('_')        
		const data = { mapLat: val.coord.y, mapLng: val.coord.x, mapX: mapKey[0], mapY: mapKey[1], mapZ: mapKey[2], mapIndex: mapKey[3], price: '10000' , id: val.domEvent.target.id}                
		setAreaInfo(data);        

		const purchaseData = purchaseList.filter(list => list.purchaseMap === val.domEvent.target.id);	
		if(purchaseData.length > 0){
			setShowBuy(false)            
		}else{
			setShowBuyArea(true)
			setShowBuy(true)
		}

		naver.maps.Service.reverseGeocode({
			coords: val.coord,
			orders: [
				naver.maps.Service.OrderType.ADDR,
				naver.maps.Service.OrderType.ROAD_ADDR
			].join(',')
		}, function(status, response) {           
			setAddress(response.v2.address.roadAddress ? response.v2.address.roadAddress : response.v2.address.jibunAddress)
		});

		$("#"+val.domEvent.target.id).attr('class','tilegrid_click');
		setAreaInfo(null)
	}

	const handleAreaBuy = async() =>{
		if(localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === '' ){
			toastAlert('로그인 후 구매 가능합니다.' , 'info' , 'center')   
			return false
		}

		if(await customConfirm('구매하시겠습니까?' , '구매하기')){
			await savePurchaseInfo(purchaseDataList).then(response => {			            
				if(response.data.check){           																	
					handleSearch();                                
					handleAreaBuyReset();                 
					toastAlert('구매에 성공했습니다.' , 'success' , 'center')
				}else{
					if(response.data.code === 999){
						toastAlert('로그인 후 구매 가능합니다.' , 'info' , 'center')   
					}else{
						toastAlert(response.data.message , 'info', 'center')
						handleSearch();                                
					}
				}           
			}).catch((error)=>{		
						console.log(error);
			})
		}                
	}

	const handleAreaBuyReset = () =>{
		for(let i = 0 ; i < purchaseDataList.length ; i ++ ){
			$("#"+purchaseDataList[i].id).attr('class','tilegrid');
		}

		setPurchaseDataList([])
		setAreaInfo(null)
		setAddress('')
		setShowBuy(false)
		setShowBuyArea(false)
		setSearchAddress('')
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

	useEffect(() => {            		
		if (!mapElement.current || !naver) return;         
		
		const koreaBound = new naver.maps.LatLngBounds(
			new naver.maps.LatLng(32.4699729, 122.9105855),
			new naver.maps.LatLng(40.4703499, 129.2387105));

		const mapOptions: naver.maps.MapOptions = {
			center: props.geolocation.latitude ? new naver.maps.LatLng(props.geolocation.latitude, props.geolocation.longitude) : new naver.maps.LatLng(37.485947, 126.879452),
			zoom: 15,
			maxZoom: 17,
			maxBounds: koreaBound,
		};

		if(!map){
			setMap(new naver.maps.Map(mapElement.current, mapOptions)); 
		}
	}, []);

	useEffect(() => {
		if(map){	
			const tileGridLayer = new naver.maps.Layer('tileGrid', {
				name: "TileGrid",
				minZoom: 7,
				maxZoom: 17,
				tileSize: new naver.maps.Size(300, 300),
				getTile: function(x, y, z) {                       
					if(z === 17){
						const div = handleMakeMapArea(x, y , z);   
						return div[0];            
					}else{
						return '';
					}            
				}
			});  

			tileGridLayer.setMap(map)
									
			const clickEventExist = naver.maps.Event.hasListener(map , 'click');            
			const idleEventExist = naver.maps.Event.hasListener(map , 'idle');            
			const zoomEventExist = naver.maps.Event.hasListener(map , 'zoom_changed');            
			const rClickEventExist = naver.maps.Event.hasListener(map , 'rightclick');                

			if(!clickEventExist){
				naver.maps.Event.addListener(map, 'click', function(e) {                    
					if(map.getZoom() === 17){                        
						handlePurchaseInfo(e) 
					}
				});
			}
			
			if(!rClickEventExist){
				naver.maps.Event.addListener(map, 'rightclick', function(e) {      
					const mouseMoveEventExist = naver.maps.Event.hasListener(map , 'mousemove'); 
					if(mouseMoveEventExist){
						naver.maps.Event.clearListeners(map, 'mousemove')
					}else{
						naver.maps.Event.addListener(map, 'mousemove', function(e) {     
							if(map.getZoom() === 17){
								handlePurchaseInfo(e)
							}
						});                                
					}                                        
				});
			}            
			
			if(!idleEventExist){
				naver.maps.Event.addListener(map, 'idle', function(e) {
					if(map.getZoom() === 17){
						const southWest = map.getBounds().getSW()
						const northEast = map.getBounds().getNE()
						const param = {maxLat: northEast.y , maxLng: northEast.x , minLat: southWest.y , minLng: southWest.x}                        
						handleSearch(param);
					}                
				});
			}
									
			if(!zoomEventExist){
				naver.maps.Event.addListener(map, 'zoom_changed', function(e) {
					if(map.getZoom() !== 17){
						if(map.getZoom() < 8){                        
							const point = new naver.maps.LatLng(37.4343899, 126.9803291 );
							map.panTo(point);
						}
						map.refresh(true);
					}
				});
			}          

			
			naver.maps.Event.addListener(map, 'drag', function(e) {                    
				tileGridLayer.setMap(null)
			});
		}
	}, [map, purchaseList])
	
	useEffect(() => {      
		if(areaInfo !== null){                        
			const existData = purchaseDataList.filter(list => list.id === areaInfo.id );
			if(existData.length === 0){
				setPurchaseDataList(purchaseDataList => [...purchaseDataList, areaInfo]);
			}
				
		}        
	}, [areaInfo])    

	useEffect(() => {
		if(purchaseDataList.length > 0){
			let sumPrice = 0 ;
			for(let i = 0 ; i < purchaseDataList.length ; i ++ ){
				sumPrice = sumPrice + Number(purchaseDataList[i].price)                
			}
			setPrice(sumPrice)            
				
		}        
	},[purchaseDataList])

	const [ showNoticeModal , setShowNoticeModal ] = useState(false)

	const handleSession = val => {
		setShowNoticeModal(false)			
	}
	
	const handleShowModal = () => {
		setShowNoticeModal(true)
}

	const handleClose = val => {
		setShowNoticeModal(false)
	}
    
  return (
		<>
			<div className='map'>
				{showBuy ? <aside className='mapBuy'>
					{/* <div>
						<div><FontAwesomeIcon icon={light('planet-ringed')} /></div>
						<p><span>구로주공아파트</span>{address} {purchaseDataList.length > 1 ? '외 ' + (purchaseDataList.length-1) : ''}</p>
					</div> */}
					<ul>
						<li><span>타일 :</span>{purchaseDataList.length} 개</li>
						<li><span>가격 :</span>{showBuy ? toNumber(price)+  ' NGR' : '0 NGR' }</li>
					</ul>
					<p>
						<button className='buy' onClick={event => handleAreaBuy()}>구매하기</button>
						<button className='delete' onClick={event => handleAreaBuyReset()}><FontAwesomeIcon icon={light('trash-can')} /> 타일 초기화</button>
					</p>
				</aside> : ''}
				<MapLeftInfo callback={handleSearchAddess} handleShowModal={ handleShowModal}/>

				<div ref={mapElement}></div>
			</div>

			{showNoticeModal && <Notice show = {showNoticeModal} callback={handleSession} hide={handleClose}/> }
		</>
  )
}