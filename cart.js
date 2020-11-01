const main = () => {
  let removeCartItemButtons = document.getElementsByClassName("danger");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let element = removeCartItemButtons[i];
    button.addEventListener("click", removeCartClicked);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartButton = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
};

const preventReload = () => {
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
};

preventReload();

const purchaseClicked = () => {
  alert("Terima kasih sudah membeli");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  updateCartTotal();
};

const addToCartClicked = (event) => {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;

  console.log(`Clicked ${title} add to cart.`);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
};

const removeCartClicked = (event) => {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  console.log("Cart Remove Clicked");

  updateCartTotal();
};

const quantityChanged = (event) => {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  console.log("Cart Update Clicked");
  updateCartTotal();
};

const addItemToCart = (title, price, imageSrc) => {
  console.log(`Add ${title} to cart.`);
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
    <div class="cart-item cart-item-row">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100/">
        <span class="cart-item-title">${title}</span>
    </div>
    <div class="cart-price cart-item-row">${price}</div>
    <div class="cart-quantity cart-item-row">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Remove</button>
    </div>
    `;

  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartClicked);

  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
};

const updateCartTotal = () => {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("Rp", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
    console.log("Cart Updated");
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerHTML =
    "Rp" + " " + total;
};

console.log("js running");
