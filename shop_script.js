const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalClose = document.getElementById('modal-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.shopdiv .item').forEach(item => {
    item.addEventListener('click', () => {
        currentImages = JSON.parse(item.dataset.images);
        currentIndex = 0;

        modalTitle.textContent = item.querySelector('h2').textContent;
        modalDesc.textContent = item.dataset.description;
        modalPrice.textContent = item.dataset.price;
        modalImg.src = currentImages[currentIndex];

        // Handle type picker
        const typePicker = document.getElementById('TYPE-picker');
        const typeOptions = document.getElementById('TYPE-options');

        if (item.dataset.types) {
            const types = JSON.parse(item.dataset.types);
            typeOptions.innerHTML = ''; // Clear previous options

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
let cart = [];
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
    const item = {
        id: Date.now(),
        name: document.getElementById('modal-title').textContent,
        price: document.getElementById('modal-price').textContent,
        image: document.getElementById('modal-img').src
    };

    cart.push(item);
    updateCartCount();
    updateCartDisplay();
});

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemPrice = parseInt(item.price.replace(/[^\d]/g, ''));
        total += itemPrice;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">${item.price}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-item">×</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `P${total}`;
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    updateCartDisplay();
}