import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import './styles.scss';
import '../public/styles/home.scss';
import { Provider } from 'react-redux';
import configureStore from '../store';

NProgress.configure({
	template: `<main class="whole" role="bar" style="position: relative;">
	<div class="simple-spinner"></div>
</main>`
});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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

