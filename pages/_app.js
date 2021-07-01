import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ProtectedRoute } from 'custom/guards';
import Transition from 'custom/transition';
import 'nprogress/nprogress.css'; //styles of nprogress

import './styles.scss';
import '../public/styles/home.scss';
import { Provider } from 'react-redux';
import IdleLogout from './_idle';
import configureStore from '../store';


export default function MyApp({ Component, pageProps }) {

	const [store, setStore] = useState(null);

	useEffect(() => {
		setStore(configureStore());
	}, []);

	return !!store && (
		<Provider store={store}>
			<Transition>
				<ProtectedRoute config={{ match: '/(user|btcraffles)/*', url: '/auth/login' }}>
					<IdleLogout timeout={30 * 60 * 1000} />
					<Head>
						<title>BitcoinLotterys - Lottery with Bitcoins</title>
					</Head>
					<Component {...pageProps} />
				</ProtectedRoute>
			</Transition>
		</Provider>
	)
}

