import Head from 'next/head';
import { ProtectedRoute } from 'custom/guards';
import Transition from 'custom/transition';
import 'nprogress/nprogress.css'; //styles of nprogress

import './styles.scss';
import '../public/styles/home.scss';
import { Provider } from 'react-redux';
import configureStore from '../store';

const store = configureStore();
export default function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Transition>
				<ProtectedRoute config={{ match: '/user/*', url: '/auth/login' }}>
					<Head>
						<title>Bitcoin Lottery - Lottery with Bitcoins</title>
					</Head>
					<Component {...pageProps} />
				</ProtectedRoute>
			</Transition>
		</Provider>
	)
}

