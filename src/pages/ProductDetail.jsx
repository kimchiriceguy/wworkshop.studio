import { useParams } from 'react-router-dom';

function ProductDetail({ addToCart }) {
    const { id } = useParams();

    return (
        <div className="product-detail-page">
            <h1>Product Detail</h1>
            <p>Viewing product with ID: {id}</p>
            <button onClick={() => addToCart({ id, name: 'Sample Product', price: 29.99 })}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductDetail;