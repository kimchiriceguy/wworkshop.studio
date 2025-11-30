function Cart({ items, updateQuantity, removeFromCart, clearCart, total }) {
    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <h2>Cart Items</h2>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                {item.name} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
}

export default Cart;