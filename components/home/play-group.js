import React from 'react';
import Link from 'next/link';

export const PlayGroup = () => {
	return (
		<div className="play-in-group-section">
			<h1>Playing in a group</h1>
			<div id="nav-megamillions-group-ticket" className="home-banner-new" style={{ cursor: 'pointer' }}>
				<h2>Playing in a group is <br />more fun and <br />cost less!</h2>
				<Link href="/group">Join Now</Link>
			</div>
		</div>
	)
}

export default PlayGroup;