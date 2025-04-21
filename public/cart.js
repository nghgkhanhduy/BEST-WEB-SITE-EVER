document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cart-items');
  const clearCartButton = document.getElementById('clear-cart');

  // Get cart items from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to calculate and display the total price
  function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('card', 'mb-3');
      itemElement.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Price: $${item.price}</p>
              <div class="d-flex align-items-center">
                <label for="quantity-${index}" class="me-2">Quantity:</label>
                <input type="number" id="quantity-${index}" class="form-control w-25" value="${item.quantity}" min="1">
              </div>
            </div>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);

      // Add event listener to update quantity
      const quantityInput = document.getElementById(`quantity-${index}`);
      quantityInput.addEventListener('change', function () {
        const newQuantity = parseInt(this.value);
        if (newQuantity > 0) {
          cart[index].quantity = newQuantity;
          localStorage.setItem('cart', JSON.stringify(cart));
          updateTotalPrice();
        }
      });
    });

    // Add total price element
    const totalPriceElement = document.createElement('h3');
    totalPriceElement.id = 'total-price';
    cartItemsContainer.appendChild(totalPriceElement);
    updateTotalPrice();
  }

  // Clear cart functionality
  clearCartButton.addEventListener('click', function () {
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('total-price').textContent = '';
  });
});