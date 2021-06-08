import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charSet="UTF-9" />
					{/* <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /> */}
					<link rel='stylesheet' id='fancybox-style-css' href='/styles/jquery.fancybox.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-jquery-ui-css' href='/styles/jquery-ui.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-fonts-css' href='/styles/fonts.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-bootstrap3-css' href='/styles/bootstrap3.grid.min.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-normalize-css' href='/styles/normalize.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-jquery-popup-css' href='/styles/jquery.modal.min.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-owl-carousel-css' href='/styles/owl.carousel.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-owl-theme-css' href='/styles/owl.theme.default.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-owl-carousel-custom-css' href='/styles/owl.carousel.custom.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-owl-carousel-custom-css' href='/styles/font-awesome.min.css' type='text/css' media='all' />
					<link rel='stylesheet' id='theme-styles-css' href='/styles/style.css' type='text/css' media='all' />
					<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossOrigin="anonymous" />
					<link rel="stylesheet" id="open-sans-css" href="https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&amp;subset=latin%2Clatin-ext&amp;ver=4.5.14" type="text/css" media="all"></link>
					<script type='text/javascript' src='/js/jquery.js'></script>
					<script type='text/javascript' src='/js/jquery-migrate.js'></script>
					<script type='text/javascript' src='/js/owl.carousel.js'></script>
					<script type='text/javascript' src='/js/jquery.simplyscroll.js'></script>
					<script type='text/javascript' src='/js/jquery.modal.min.js'></script>
				</Head>
				<body className='home'>
					<Main />
					<NextScript />
					<script type='text/javascript' src='/js/mobile.js'></script>
					<script type='text/javascript' src='/js/custom.js'></script>
				</body>
			</Html>
		)
	}
}

export default MyDocument;