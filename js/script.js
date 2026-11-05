// Every product sits in a ".card-body" that is a direct child of ".list-products"
const listProducts = document.querySelector(".list-products");
const totalElement = document.querySelector(".total");

// Read a price like "100 $" and return the number 100
function getPrice(card) {
  return parseFloat(card.querySelector(".unit-price").textContent);
}

// Recalculate the total from the products that are still in the cart
function updateTotal() {
  const products = listProducts.querySelectorAll(":scope > .card-body");
  let total = 0;

  products.forEach(function (product) {
    const quantity = parseInt(product.querySelector(".quantity").textContent);
    total += getPrice(product) * quantity;
  });

  totalElement.textContent = " " + total + " $ ";

  // Show a message when the cart is empty
  if (products.length === 0) {
    listProducts.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  }
}

// Set up the buttons of each product
const products = listProducts.querySelectorAll(":scope > .card-body");

products.forEach(function (product) {
  const plusBtn = product.querySelector(".fa-plus-circle");
  const minusBtn = product.querySelector(".fa-minus-circle");
  const deleteBtn = product.querySelector(".fa-trash-alt");
  const heartBtn = product.querySelector(".fa-heart");
  const quantity = product.querySelector(".quantity");

  // 1. "+" button: add one
  plusBtn.addEventListener("click", function () {
    quantity.textContent = parseInt(quantity.textContent) + 1;
    updateTotal();
  });

  // 1. "-" button: remove one (never below 0)
  minusBtn.addEventListener("click", function () {
    const current = parseInt(quantity.textContent);
    if (current > 0) {
      quantity.textContent = current - 1;
      updateTotal();
    }
  });

  // 2. Trash button: delete the product from the cart
  deleteBtn.addEventListener("click", function () {
    product.remove();
    updateTotal();
  });

  // 3. Heart button: like / unlike (changes color)
  heartBtn.addEventListener("click", function () {
    heartBtn.classList.toggle("liked");
  });
});

// 4. Show the correct total when the page loads
updateTotal();
