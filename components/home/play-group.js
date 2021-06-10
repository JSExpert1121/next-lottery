import React from 'react';
import Link from 'next/link';

export const PlayGroup = ({handleJoin}) => {
	return (
		<div className="play-in-group-section">
			<h1>Playing in a group</h1>
			<div id="nav-megamillions-group-ticket" className="home-banner-new" style={{ cursor: 'pointer' }}>
				<h2>Playing in a group is <br />more fun and <br />cost less!</h2>
				<a href="javascript:void(0);" onClick={handleJoin}>Join Now</a>
			</div>
		</div>
	)
}

export default PlayGroup;