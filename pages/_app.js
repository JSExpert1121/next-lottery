import Head from 'next/head';
import './styles.scss';
import '../public/styles/home.scss';
import { Provider } from 'react-redux';
import configureStore from '../store';

const store = configureStore();
export default function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Head>
				<title>Bitcoin Lottery - Lottery with Bitcoins</title>
			</Head>
			<Component {...pageProps} />
		</Provider>
	)
}

