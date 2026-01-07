let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  renderCart();
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  toggleCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  container.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<span>${item.name}</span><span>$${item.price}</span>`;
    container.appendChild(div);
  });
}

function checkout() {
  fetch('/.netlify/functions/create-checkout', {
    method: 'POST',
    body: JSON.stringify(cart)
  })
  .then(res => res.json())
  .then(data => window.location = data.url);
}
