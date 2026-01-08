class Product {
  // constructor method to initialize object properties
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
  // you can add your methods here
}

class Cart {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    this.calculateTotals();
  }

  decreaseItem(productId) {
    const item = this.items.find((i) => i.product.id === productId);
    if (!item) return;

    item.quantity--;

    if (item.quantity === 0) {
      this.removeItem(productId);
    } else {
      this.calculateTotals();
    }
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalPrice = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    this.totalQuantity = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getTotalQuantity() {
    return this.totalQuantity;
  }
}


const product1 = new Product(
  1,
  "Soft Cotton Polo Shirt",
  100,
  "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1266705_alternate10?$rl_4x5_pdp$"
);

const product2 = new Product(
  2,
  "Bi-Swing Jacket",
  200,
  "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-5462_alternate10?$rl_4x5_pdp$"
);

const product3 = new Product(
  3,
  "RL Leather Sneaker",
  300,
  "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710970855001_alternate10?$rl_4x5_pdp$"
);

const initialProducts = [product1, product2, product3];

const cart = new Cart();

// cart.addItem(product1);

// cart.addItem(product2);

// cart.addItem(product3);

// console.log(cart.getTotalPrice());

// console.log(cart.getTotalQuantity());

// console.log(cart.getItems());


// cart.removeItem(1)

// console.log(cart.getTotalPrice());

// console.log(cart.getTotalQuantity());

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartQty = document.getElementById("cart-qty");

  // 1️⃣ Render products
  initialProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-4");

    productCard.innerHTML = `
      <div class="card mb-4">
        <img src=${product.image} class="card-img-top">
        <div class="card-body text-center">
          <h5>${product.name}</h5>
          <p>$${product.price}</p>
          <button class="btn btn-dark w-100">Add to Cart</button>
        </div>
      </div>
    `;

    productCard.querySelector("button").addEventListener("click", () => {
      cart.addItem(product, 1);
      updateCartUI();
    });

    productsContainer.appendChild(productCard);
  });

  // 2️⃣ Add initial products to cart
  initialProducts.forEach((product) => {
    cart.addItem(product, 1);
  });

  // 3️⃣ Initial render
  updateCartUI();

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = `
      <p class="text-muted text-center">Cart is empty</p>
    `;
    }

    cart.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "d-flex justify-content-between align-items-center mb-3";

      div.innerHTML = `
      <div>
        <strong>${item.product.name}</strong><br />
        <small>$${item.product.price}</small>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary dec">
          <i class="bi bi-dash"></i>
        </button>

        <span>${item.quantity}</span>

        <button class="btn btn-sm btn-outline-secondary inc">
          <i class="bi bi-plus"></i>
        </button>
      </div>

      <div class="d-flex align-items-center gap-2">
        <strong>$${item.product.price * item.quantity}</strong>
        <button class="btn btn-sm btn-outline-danger delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

      // ➕ Increase
      div.querySelector(".inc").addEventListener("click", () => {
        cart.addItem(item.product, 1);
        updateCartUI();
      });

      // ➖ Decrease
      div.querySelector(".dec").addEventListener("click", () => {
        cart.decreaseItem(item.product.id);
        updateCartUI();
      });

      // 🗑️ Delete
      div.querySelector(".delete").addEventListener("click", () => {
        cart.removeItem(item.product.id);
        updateCartUI();
      });

      cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = cart.getTotalPrice();
    cartQty.textContent = cart.getTotalQuantity();
  }

});

