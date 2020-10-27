function preventReload() {
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
}

preventReload();

function main() {
  let addToCartButton = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0]
    .innerText;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();

  console.log("Add to Cart", title);
}

function addItemToCart(title, price, imageSrc) {
  // defining div element
  let cartRow = document.createElement("div");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  // creating div with class cart-row
  cartRow.classList.add("cart-row");

  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert(`produk ${title} sudah pernah ditambahkan ke keranjang`);
      return;
    }
  }

  let cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100/">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div c;ass="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Remove</button>
    </div>
    `;

  cartRow.innerHTML = cartRowContents;
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCart);

  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function removeCart(params) {}

function quantityChanged(params) {}

function updateCartTotal(params) {}

console.log("js running");