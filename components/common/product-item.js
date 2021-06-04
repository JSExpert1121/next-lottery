import { useCallback } from 'react';

const ProductItem = (props) => {
    const { id, image, name1, name2, no, x, y } = props;

    const viewMorePopUp = useCallback((id, x, y) => {
        // console.log("view popup: ", id, x, y);
    }, []);
    const buyNowProductBtn = useCallback(id => {
        // console.log("buy now: ", id);
    }, []);

    return (
        <div className="cart-item item" id={id}>
            <div className="slider_box">
                <div className="slider_bg new-york-lotto">
                <div className="item_img">
                    <img src={image} />                                
                </div>
                <div className="slidewrap">
                    <h1 className="lname">{name1} <span className="brand-color">{name2}</span></h1>
                    <h2 className="lname2"></h2>
                </div>
                </div>
                <div className="carousel_time">
                <div className="comman">
                    <a onClick={() => viewMorePopUp(no, x, y)}>
                    <span className="buy_button view_big">Details</span>
                    </a>
                </div>
                <div className="comman">
                    <a onClick={() => buyNowProductBtn(no, 2, 7, 1)}>
                        <span className="buy_button special">Join Group</span>
                    </a>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;