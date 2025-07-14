const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalClose = document.getElementById('modal-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const statusModal = document.getElementById('status-modal');
const statusClose = document.getElementById('status-close');


let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.shopdiv .item').forEach(item => {
    item.addEventListener('click', () => {
        try {
            currentImages = JSON.parse(item.dataset.images);
        } catch (e) {
            console.error("Invalid JSON in data-images", e);
            currentImages = [];
        }

        currentIndex = 0;

        modalTitle.textContent = item.querySelector('h2').textContent;
        modalDesc.textContent = item.dataset.description;
        modalPrice.textContent = item.dataset.price;
        modalImg.src = currentImages[currentIndex];

        //this to pick types and stuff
        const typePicker = document.getElementById('TYPE-picker');
        const typeOptions = document.getElementById('TYPE-options');

        if (item.dataset.types) {
            const types = JSON.parse(item.dataset.types);

            types.forEach(type => {
                const button = document.createElement('button');
                button.textContent = type;
                button.addEventListener('click', () => {
                    modalTitle.textContent = `${item.querySelector('h2').textContent} - ${type}`;
                    typeOptions.querySelectorAll('button').forEach(btn => {
                        btn.classList.remove('selected');
                    });
                    button.classList.add('selected');
                });
                typeOptions.appendChild(button);
            });

            typePicker.style.display = 'block';
        } else {
            typePicker.style.display = 'none';
        }

        modal.classList.add('show');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
});

// cart functionality
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
const cartModal = document.getElementById('cart-modal');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total-amount');
const cartIcon = document.querySelector('.cart');

cartIcon.addEventListener('click', () => {
    cartModal.classList.add('show');
    updateCartDisplay();
});

cartClose.addEventListener('click', () => {
    cartModal.classList.remove('show');
});
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

//CART modal popup thingamajig
document.querySelector('.add-to-cart').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    const name = {
        id: Date.now(),
        name: document.getElementById('modal-title').textContent,
        price: parseFloat(document.getElementById('modal-price').textContent.replace('P', '')),
        image: document.getElementById('modal-img').src,
        quantity: quantity || 1
    };

    cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log('Item added to cart:', item);
    console.log('Cart after add:', cart);
    updateCartCount();
    updateCartDisplay();
    modal.classList.remove('show');
});

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">P${item.price.toFixed(2)}</p>
                <div class="cart-quantity-picker">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-item">×</button>
        `;
        console.log(item.image);
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `P${total.toFixed(2)}`;
}

// Add the remove from cart function
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart after remove:', cart);
    updateCartCount();
    updateCartDisplay();
}

// update quant cart
function updateCartQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        const newQty = item.quantity + change;
        if (newQty >= 1 && newQty <= 10) {
            item.quantity = newQty;
            sessionStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart after quantity update:', cart);
            updateCartCount();
            updateCartDisplay();
        }
    }
}

const addToCart = () => {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    const item = {
        id: Date.now(),
        name: document.getElementById('modal-title').textContent,
        price: parseFloat(document.getElementById('modal-price').textContent.replace('P', '')),
        image: document.getElementById('modal-img').src,
        quantity: quantity
    };

    cart.push(item);
    updateCartCount();
    updateCartDisplay();
    modal.style.display = 'none';
};

// close !
statusClose.addEventListener('click', () => {
    statusModal.classList.remove('show');
});

// close! but click outside
statusModal.addEventListener('click', (e) => {
    if (e.target === statusModal) {
        statusModal.classList.remove('show');
    }
});

//order process functionality
document.getElementById('buy-now-btn').addEventListener('click', async function () {
    console.log('Cart being sent to server:', cart);
    try {
        const response = await fetch('process_order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cart }) // send cart data
        });

        const result = await response.json();
        console.log('Server response:', result);
        const statusModal = document.getElementById('status-modal');
        const statusMessage = document.getElementById('status-message');

        document.getElementById('cart-modal').classList.remove('show');

        if (result.success) {
            statusMessage.innerHTML = `
                <div class="status-success">
                    <h3>Order Placed Successfully!</h3>
                    <p>Thank you for your purchase.</p>
                </div>
            `;
            cart = [];
            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        } else {
            statusMessage.innerHTML = `
                <div class="status-error">
                    <h3>Error Processing Order</h3>
                    <p>${result.message}</p>
                </div>
            `;
        }

        statusModal.classList.add('show');
    } catch (error) {
        console.error('Error:', error);
        const statusModal = document.getElementById('status-modal');
        const statusMessage = document.getElementById('status-message');

        statusMessage.innerHTML = `
            <div class="status-error">
                <h3>Error Processing Order</h3>
                <p>An unexpected error occurred. Please try again.</p>
            </div>
        `;
        statusModal.classList.add('show');
    }
    cart = [];
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
});

document.getElementById('increase-qty').addEventListener('click', () => {
    const input = document.getElementById('quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue < 10) {
        input.value = currentValue + 1;
    }
});

document.getElementById('decrease-qty').addEventListener('click', () => {
    const input = document.getElementById('quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
});

document.getElementById('quantity-input').addEventListener('change', (e) => {
    const value = parseInt(e.target.value);
    if (value < 1) e.target.value = 1;
    if (value > 10) e.target.value = 10;
});