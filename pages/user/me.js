import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Layout from 'components/layout';
import ProfileForm from 'components/form/profile-form';
import DataTable from 'containers/table/data-table';
import { parseJsonFile } from 'helpers/json';
import * as UserActions from 'store/actions/user';
import TicketsTable from 'components/account/tickets-table';
import ProductsTable from 'components/account/products-table';

const tabs = [
	{ title: 'Details', class: 'avatar' },
	{ title: 'Transactions', class: 'transactions' },
	{ title: 'Tickets', class: 'tickets' },
	{ title: 'Products', class: 'products' }
]

const MyAccount = ({ countries }) => {

	const [tab, setTab] = useState(0);
	const balance = useSelector(state => state.user.balance);
	const transactions = useSelector(state => state.user.transactions);
	const tickets = useSelector(state => state.user.tickets);
	const products = useSelector(state => state.user.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(UserActions.setTransactions([]));
		dispatch(UserActions.setTickets([]));
		dispatch(UserActions.setProducts([]));
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
									{tabs.map((item, index) => (
										<li className="tab-item" key={item.title}>
											<a href="#" onClick={() => setTab(index)} className={tab === index ? 'active' : ''}>
												<i className={item.class}>&nbsp;</i>
												<span>{item.title}</span>
											</a>
										</li>
									))}
								</ul>
								<div className='actions-bar'>
									<div className='winning'>
										<span>Total Playing Credits</span>
										<span className='money'>€ {balance ? parseInt(balance.WinningAmount).toFixed(2) : '0.00'}</span>
									</div>
									<div className='buttons'>
										<Link href='/user/withdraw'><a className='button'>Withdraw</a></Link>
										<Link href='/user/deposit'><a className='button' style={{textTransform: 'uppercase'}}>Deposit</a></Link>
									</div>
								</div>
							</div>
							<div className="tab-page">
								{tab === 0 && (
									<ProfileForm countries={countries} />
								)}
								{tab === 1 && (
									<DataTable
										headers={['Transactions', 'ID', 'Date', 'Amount', 'Lottery', 'Product']}
										keys={['TransactionType', 'TransactionId', 'Date', 'Amount', 'Name', 'ProductName']}
										values={transactions}
										action={UserActions.getTransactions}
									/>
								)}
								{tab === 2 && (
									<DataTable
										headers={['Country', 'Lottery', 'Type', 'Date', 'Status', 'Winnings', 'Details']}
										values={tickets}
										action={UserActions.getTickets}
										component={TicketsTable}
									/>
								)}
								{tab === 3 && (
									<DataTable
										headers={['Product', 'Lottery', 'Group Shares', 'Draws Left', 'Total Lines', 'Purchased on', 'End Date', 'Status']}
										values={products}
										action={UserActions.getProducts}
										component={ProductsTable}
									/>
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
