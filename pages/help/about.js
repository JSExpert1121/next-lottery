import React from 'react';
import Layout from 'components/layout';

const About = ({html}) => {
	return (
		<Layout>
			<main id="main" className="clearfix about">
				<div className="wrap">
					<div id="middle" className="innerbg view-all-lottery" style={{ marginTop: 32 }}>
						<div className="wrap">
							<div className="innerpage" dangerouslySetInnerHTML={{__html: html}}>
							</div>
						</div>
					</div>

				</div>
			</main>
		</Layout>
	)
}

export async function getStaticProps(context) {
	try {
		const result = await fetch('https://news.bitcoin.com/feed/', { method: 'GET' });
		return {
			props: { html: result }
		}
	} catch (error) {
		return {
			props: { html: 'some error occurs' }
		}
	}
}

export default About
