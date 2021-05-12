import { useEffect } from 'react';
import BannerItem from 'components/common/banner-item';

const Banner = ({banners}) => {
    useEffect(() => {
        jQuery("#owl-home-banner").owlCarousel({
            autoplay: true,
            loop: true,
            navigation: false, // Show next and prev buttons
            dots: false,
            slideSpeed: 1000,
            paginationSpeed: 400,
            singleItem: true,
            pagination: false,
            items: 1,
        });
    }, []);
    return (
        <section id="owl-home-banner" className="owl-carousel owl-theme">
            {banners && banners.map((item, idx) => (
                <BannerItem {...item} key={idx} />
            ))}
        </section>
    )
}

export default Banner;