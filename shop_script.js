// ✅ Utility functions and cart setup OUTSIDE DOMContentLoaded
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = totalItems;
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total-amount');
  if (!cartItems || !cartTotal) return;

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
      <button onclick="removeFromCart(${item.id})" class="remove-item">&times;</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `P${total.toFixed(2)}`;
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
}

function updateCartQuantity(itemId, change) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    const newQty = item.quantity + change;
    if (newQty >= 1 && newQty <= 10) {
      item.quantity = newQty;
      sessionStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
    }
  }
}

// ✅ MAIN logic wrapped in DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
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
  const cartModal = document.getElementById('cart-modal');
  const cartClose = document.getElementById('cart-close');
  const cartIcon = document.querySelector('.cart');

  let currentImages = [];
  let currentIndex = 0;

  document.querySelectorAll('.shopdiv .item').forEach(item => {
    item.addEventListener('click', () => {
      try {
        currentImages = JSON.parse(item.dataset.images);
      } catch (e) {
        currentImages = [];
      }

      currentIndex = 0;
      modalTitle.textContent = item.querySelector('h2').textContent;
      modalDesc.textContent = item.dataset.description;
      modalPrice.textContent = item.dataset.price;
      modalImg.src = currentImages[currentIndex];

      const typePicker = document.getElementById('TYPE-picker');
      const typeOptions = document.getElementById('TYPE-options');
      typeOptions.innerHTML = '';

      if (item.dataset.types) {
        const types = JSON.parse(item.dataset.types);
        types.forEach(type => {
          const button = document.createElement('button');
          button.textContent = type;
          button.addEventListener('click', () => {
            modalTitle.textContent = `${item.querySelector('h2').textContent} - ${type}`;
            typeOptions.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
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

  modalClose.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  });

  cartIcon.addEventListener('click', () => {
    cartModal.classList.add('show');
    updateCartDisplay();
  });
  cartClose.addEventListener('click', () => cartModal.classList.remove('show'));
  cartModal.addEventListener('click', e => { if (e.target === cartModal) cartModal.classList.remove('show'); });

const addToCartBtn = document.querySelector('.add-to-cart');

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity-input').value) || 1;

    const selectedItem = [...document.querySelectorAll('.shopdiv .item')].find(el =>
      el.querySelector('h2')?.textContent.trim() === modalTitle.textContent.split(' - ')[0].trim()
    );

    const productId = selectedItem?.dataset.id || Date.now();

    const item = {
      id: parseInt(productId),
      name: modalTitle.textContent,
      item: modalTitle.textContent,
      price: parseFloat(modalPrice.textContent.replace('P', '')),
      image: modalImg.src,
      quantity: quantity
    };

    cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    modal.classList.remove('show');
  });
} else {
  console.error("❌ Could not find '.add-to-cart' button in the DOM.");
}

  statusClose.addEventListener('click', () => statusModal.classList.remove('show'));
  statusModal.addEventListener('click', e => { if (e.target === statusModal) statusModal.classList.remove('show'); });

  document.getElementById('buy-now-btn').addEventListener('click', async function () {
    try {
      const response = await fetch('process_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart })
      });
      const result = await response.json();
      const statusMessage = document.getElementById('status-message');

      document.getElementById('cart-modal').classList.remove('show');

      if (result.success) {
        statusMessage.innerHTML = `<div class="status-success"><h3>Order Placed Successfully!</h3><p>Thank you for your purchase.</p></div>`;
        cart = [];
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
      } else {
        statusMessage.innerHTML = `<div class="status-error"><h3>Error Processing Order</h3><p>${result.message}</p></div>`;
      }
      statusModal.classList.add('show');
    } catch (error) {
      console.error('Error:', error);
      const statusMessage = document.getElementById('status-message');
      statusMessage.innerHTML = `<div class="status-error"><h3>Error Processing Order</h3><p>An unexpected error occurred. Please try again.</p></div>`;
      statusModal.classList.add('show');
    }
  });

  document.getElementById('increase-qty').addEventListener('click', () => {
    const input = document.getElementById('quantity-input');
    if (parseInt(input.value) < 10) input.value = parseInt(input.value) + 1;
  });

  document.getElementById('decrease-qty').addEventListener('click', () => {
    const input = document.getElementById('quantity-input');
    if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
  });

  document.getElementById('quantity-input').addEventListener('change', e => {
    let value = parseInt(e.target.value);
    if (value < 1) e.target.value = 1;
    if (value > 10) e.target.value = 10;
  });

  // Initialize count and cart display on load
  updateCartCount();
  updateCartDisplay();
});
