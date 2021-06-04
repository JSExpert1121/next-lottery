import React, { useState } from 'react';
import Layout from 'components/layout';
import { parseJsonFile } from 'helpers/json';

const FaqPage = ({ faqs }) => {
	const [opens, setOpens] = useState([]);

	const toggleOpen = i => {
		const index = opens.indexOf(i);
		if (index < 0) {
			opens.push(i);
		} else {
			opens.splice(index, 1);
		}
		setOpens([...opens]);
	}

	return (
		<Layout>
			<div id="main" className="clearfix">
				<div className="wrap">
					<div id="middle" className="innerbg view-all-lottery" style={{ marginTop: 32 }}>
						<div className="wrap">
							<div className="innerpage">
								<div className="all-lot-title">
									<h1>Frequently Asked Questions</h1>
								</div>
								<div className="main-content row page-faq_content">
									<div className="col-md-12">
										<ul className="faq-main">
											{faqs && faqs.map((faq, index) => (
												<li key={index} onClick={() => toggleOpen(index)} className={opens.includes(index) ? 'open-answer' : ''}>
													<h3 className="question-title" dangerouslySetInnerHTML={{ __html: faq.title }} />
													<div className="answer-content">
														<p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const getStaticProps = async (ctx) => {

	const faqs = await parseJsonFile('data/faq.json');

	return {
		props: {
			faqs
		}
	}
}

export default FaqPage
