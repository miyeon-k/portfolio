import React, {useRef , useState , useEffect} from 'react';
import { getCabonMapList, savePurchaseInfo } from '../../crud/cabonMap.crud'
import $ from 'jquery'
import { Tab, Tabs } from '@material-ui/core'
import ReactEcharts from 'echarts-for-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, light } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function MapLeftInfo(props) {
				
	const [show , setShow] = useState(false)
	const [address , setAddress] = useState('')	
	const [searchAddres , setSearchAddress] = useState('')	

	const handleShowModal = () => {
		props.handleShowModal()
	}

	function handleClick() {
		window.location.href = '../notice/index'
	}

	const handleResetText = val => {
		if(val === 'location'){
			setSearchAddress('')
		}
	}

	const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

	const gases = {
		grid: {top: 15, right: 0, bottom: 0, left: 0, containLabel: true},
		xAxis: {
			type: 'category',
			data: ['2017', '2018', '2019', '2020', '2021', '2022'],
			axisLabel: {color: '#6f6f6f'},
			axisLine: {
				lineStyle: {color: '#ededed'}
			},
			axisTick: {alignWithLabel: 'center'},
		},
		yAxis: {
			type: 'value',
			min: 400,
			max: 430,
			axisLabel: {color: '#6f6f6f'},
			splitLine: {
				lineStyle: {color: '#ededed'}
			}
		},
		series: [
			{
				data: [410, 412, 415, 418, 420, 422],
				type: 'line',
				smooth: true,
				itemStyle: {color:'#7839ff'},
				lineStyle: {color:'#7839ff'}
			}
		],
		tooltip: {
			trigger: 'axis'
		}
	}

	const ranking = {
		grid: {top: 0, right: 0, bottom: 0, left: 0, containLabel: true},
		xAxis: {
			type: 'value',
			splitLine: {show: false},
			axisLabel: {show: false}
		},
		yAxis: {
			type: 'category',
			data: ['충청북도', '경상남도', '인천광역시', '경상북도', '강원도', '울산광역시', '전라남도', '충청남도'],
			axisLabel: {fontWeight: '600', color: '#6f6f6f'},
			splitLine: {show: false},
			axisLine: {show: false},
			axisTick: {show: false},
		},
		series: [
			{
				name: 'Greenhouse gases',
				type: 'bar',
				data: [13.604, 14.173, 16.334, 20.261, 32.063, 42.192, 52.492, 71.173],
				label: {
					show: true,
					fontSize: 10,
					valueAnimation: true,
				},
				itemStyle: {color:'#7839ff'}
			}
		]
	}

	return (
		<aside className='mapInfo'>
			<section className='info01'>
				<span>검색할 지역</span>
				<div className='search'>
					<input type='text' value={searchAddres} onChange={event => setSearchAddress(event.target.value)} onKeyDown={event => event.key === 'Enter' ? props.callback(searchAddres) : ''} placeholder='주소를 입력해주세요' />
					{searchAddres && <label onClick={event => handleResetText('location')}><FontAwesomeIcon icon={solid('circle-xmark')} /></label>}
				</div>
			</section>

			<section className='info02'>
				<span>온실가스 배출량</span>
				<dl>
					<dt>693.397</dt>
					<dd>(단위 : 백만톤 CO₂eq)</dd>
				</dl>
				<ul>
					<li>에너지<span>527,339</span></li>
					<li>산업공정<span>126,895</span></li>
					<li>농업<span>23,054</span></li>
					<li>폐기물<span>16,108</span></li>
					<li>LULUCF<span>- 35,286</span></li>
				</ul>
			</section>

			{/* <section className='info03'>
				<span>구로구 온실가스 농도 변화 추이</span>
				<Tabs value={tabIndex} onChange={handleTabChange} variant='fullWidth'>
					<Tab label='CO₂' />
					<Tab label='CH₄' />
					<Tab label='N₂O' />
					<Tab label='HFCs' />
					<Tab label='PFCs' />
					<Tab label='SF₆' />
				</Tabs>
				{tabIndex === 0 && (<div className='tabChart'><ReactEcharts option={gases}></ReactEcharts></div>)}
				{tabIndex === 1 && (<div className='tabChart'>The second tab</div>)}
				{tabIndex === 2 && (<div className='tabChart'>The third tab</div>)}
				{tabIndex === 3 && (<div className='tabChart'>4444</div>)}
				{tabIndex === 4 && (<div className='tabChart'>5555</div>)}
				{tabIndex === 5 && (<div className='tabChart'>6666</div>)}
			</section> */}

			<section className='info04'>
				<span>1인당 온실가스 배출 순위</span>
				<div><ReactEcharts option={ranking}></ReactEcharts></div>
			</section>

			<section className='info05'>
				<span><em><FontAwesomeIcon icon={solid('circle-info')} /></em>사용방법</span>
				<ol>
					<li><span>마우스 왼쪽 클릭 :</span>지역 선택</li>
					<li><span>마우스 오른쪽 클릭 :</span>지역 선택 해제</li>
				</ol>				
			</section>
		</aside>
	)
}