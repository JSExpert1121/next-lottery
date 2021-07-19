import React, { useState, useEffect } from 'react'
import Link from 'next/link';

export const FreeLottoItem = (props) => {

	const { name, image, link } = props
	return (
		<div className='free-lotto-item'>
			<div className='flex-row'>
				<div className='cover'>
					<img src={image} alt={name} />
					<div className='title'>
						<Link href={`${link}`}><a className="playNowBtn">{name}</a></Link>
					</div>
				</div>
			</div>
		</div>
	)
}
