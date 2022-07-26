// Open cart
$("#cart-icon").on("click", function () {
  $(".cart").addClass("active");
});

// Close cart

$("#close-cart").on("click", function () {
  $(".cart").removeClass("active");
});

// ------- Cart Js

if (document.readyState == "loading") {
  // console.log(document.readyState)
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// main fonction

function ready() {
  // remove items from cart
  // var removeCartButtons = $(".cart-remove");
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Quantity Changes
  // var quantityInputs = $(".cart-quantity");
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // Buy button
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Buy now
function buyButtonClicked() {
  alert("Thank you your purchase!");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

// remove items from cart main function
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// quantityChanged
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add to cart main function

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-image")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

// Add to cart main function
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this product to cart");
      // quantityChanged();
      return;
    }
  }

  var cartBoxContent = `
                          <img src="${productImg}" alt="" class="cart-img" />
                          <div class="detail-box">
                             <div class="cart-product-title">${title}</div>
                             <div class="cart-price">${price}</div>
                              <input type="number" value="1" class="cart-quantity" />
                          </div>
                          <!-- remove cart -->
                          <i class="fa-solid fa-trash-can cart-remove"></i>
                                    
                      `;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
// Update Total
function updateTotal() {
  var cartContent = $(".cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText =
    total.toFixed(2) + "$";
  // document.getElementById("totalPrice")[0].innerText = total + "$";
  // $(".total-price")[0].innerText = total + "$";
}
