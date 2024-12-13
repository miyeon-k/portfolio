import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'

const Index = () => {


  return (
		<div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh'}}>
			카본맵 랜딩 화면
			<button style={{marginTop:'1%'}}><Link to='./map/index'>들어가기</Link></button>
		</div>
  );
}

export default Index;