// Simple cart using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
  const item = { name: productName, price: parseFloat(price) };
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

function loadCartItems() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalContainer.textContent = '0.00';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  totalContainer.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartItems();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  localStorage.removeItem('cart');
  loadCartItems();
}

function submitContactForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name && email && message) {
    alert("Thank you for contacting us, " + name + "!");
    document.getElementById('contact-form').reset();
  } else {
    alert("Please fill out all fields.");
  }
}

// Auto-load cart items if on cart.html
if (window.location.pathname.includes("cart.html")) {
  window.addEventListener('DOMContentLoaded', loadCartItems);
}
