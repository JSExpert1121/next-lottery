import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Layout from 'components/layout';
import ProfileForm from 'components/form/profile-form';
import DataTable from 'containers/table/data-table';
import { parseJsonFile } from 'helpers/json';
import * as UserActions from 'store/actions/user';
import TicketsTable from 'components/account/tickets-table';
import ProductsTable from 'components/account/products-table';


const MyAccount = ({ countries }) => {

	const [tab, setTab] = useState(0);
	const transactions = useSelector(state => state.user.transactions);
	const tickets = useSelector(state => state.user.tickets);
	const products = useSelector(state => state.user.products);

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
											<i className="avatar">&nbsp;</i>
											<span>Details</span>
										</a>
									</li>
									<li className="tab-item">
										<a href="#" onClick={tabClicked(1)} className={tab === 1 ? 'active' : ''}>
											<i className="transactions">&nbsp;</i>
											<span>Transactions</span>
										</a>
									</li>
									<li className="tab-item">
										<a href="#" onClick={tabClicked(2)} className={tab === 2 ? 'active' : ''}>
											<i className="tickets">&nbsp;</i>
											<span>Tickets</span>
										</a>
									</li>
									<li className="tab-item">
										<a href="#" onClick={tabClicked(3)} className={tab === 3 ? 'active' : ''}>
											<i className="products">&nbsp;</i>
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
										keys={['CountryName', 'LotteryName', 'LotteryTypeID', 'DrawDate', 'Status', 'Winning', 'WinningResult']}
										values={tickets}
										action={UserActions.getTickets}
										component={TicketsTable}
									/>
								)}
								{tab === 3 && (
									<DataTable
										headers={['Product', 'Lottery', 'Group Shares', 'Draws Left', 'Total Lines', 'Purchased on', 'End Date', 'Status']}
										keys={[]}
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
