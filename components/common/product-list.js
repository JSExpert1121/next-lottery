import ProductItem from './product-item';

const ProductList = (props) => {
    const { products } = props;
    return (
        <div className="cart-products">
            {/* <div className="row row-special" style="display:none;"> */}
            <div className="row row-special" style={{display: 'none'}}>
                {products && products.map((item, idx) => (
                    <ProductItem {...item} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default ProductList;