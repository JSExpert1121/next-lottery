import React, { useCallback, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Layout from 'components/layout';
import ProfileForm from 'components/form/profile-form';
import Table from 'components/form/table';
import { parseJsonFile } from 'helpers/json';

const MyAccount = ({ countries }) => {

	const [tab, setTab] = useState(0);

	const tabClicked = useCallback((index) => () => {
		setTab(index);
	}, []);

	return (
		<Layout>
			<main id="main" className="clearfix">
				<div className="wrap">
					<div className="wrap-my-account clearfix">
						<div className="my-account-title">
							<h1>My Account</h1>
						</div>
						<div className="my-account-contents">
							<div className="tab-bar-container">
								<ul className="tab-bar">
									<li className="tab-item">
										<a href="#" onClick={tabClicked(0)} className={tab === 0 ? 'active' : ''}>
											<i class="avatar">&nbsp;</i>
											<span>Details</span>
										</a>
									</li>
									<li className="tab-item">
										<a href="#" onClick={tabClicked(1)} className={tab === 1 ? 'active' : ''}>
											<i class="transactions">&nbsp;</i>
											<span>Transactions</span>
										</a>
									</li>
									<li className="tab-item">
										<a href="#" onClick={tabClicked(2)} className={tab === 2 ? 'active' : ''}>
											<i class="tickets">&nbsp;</i>
											<span>Tickets</span>
										</a>
									</li>
									<li className="tab-item">
										<a href="#" onClick={tabClicked(3)} className={tab === 3 ? 'active' : ''}>
											<i class="products">&nbsp;</i>
											<span>Products</span>
										</a>
									</li>
								</ul>
								<div className='actions-bar'>
									<div className='winning'>
										<span>Winning Money</span>
										<span className='money'>€ {'0.00'}</span>
									</div>
									<div className='buttons'>
										<Link href='/user/deposit'><a className='button'>Deposit</a></Link>
										<Link href='/user/withdraw'><a className='button'>Withdraw</a></Link>
									</div>
								</div>
							</div>
							<div className="tab-page">
								{tab === 0 && (
									<ProfileForm countries={countries} />
								)}
								{tab === 1 && (
									<Table headers={['Transactions', 'ID', 'Date', 'Amount', 'Lottery', 'Product']} />
								)}
								{tab === 2 && (
									<Table headers={['Country', 'Lottery', 'Type', 'Date', 'Status', 'Winnings', 'Details']} />
								)}
								{tab === 3 && (
									<Table headers={['Product', 'Lottery', 'Group Shares', 'Draws Left', 'Total Lines', 'Purchased on', 'End Date', 'Status']} />
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export const getStaticProps = async (ctx) => {
	const countries = await parseJsonFile('data/countries.json');
	return {
		props: {
			countries
		}
	}
}

export default MyAccount
