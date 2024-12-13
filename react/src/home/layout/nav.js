import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { light } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Nav() {

	return (
		<nav>
			<NavLink to='/map/index' activeClassName='active'><span><FontAwesomeIcon icon={light('house-heart')} /></span>아트모페디아</NavLink>
			<NavLink to='/notice/index'activeClassName='active'><span><FontAwesomeIcon icon={light('siren-on')} /></span>공지사항</NavLink>
		</nav>
	)
}
