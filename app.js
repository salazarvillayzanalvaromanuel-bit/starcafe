(function () {
  "use strict";

  var whatsappNumber = "51900000000";
  var menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    document.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.checked = false;
      });
    });
  }

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("contact-name").value.trim();
      var reason = document.getElementById("contact-reason").value;
      var message = document.getElementById("contact-message").value.trim();
      var text = "Hola, soy " + name + ". Motivo: " + reason + ". " + message;
      window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }

  var grid = document.getElementById("product-grid");
  if (!grid) return;

  var search = document.getElementById("product-search");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".product-card"));
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-chip"));
  var resultCount = document.getElementById("results-count");
  var emptyState = document.getElementById("empty-state");
  var activeFilter = "todos";

  function normalizeText(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
  }

  function filterProducts() {
    var term = normalizeText(search.value.trim());
    var visibleCount = 0;
    cards.forEach(function (card) {
      var categoryMatches = activeFilter === "todos" || card.dataset.category === activeFilter;
      var textMatches = !term || normalizeText(card.dataset.name + " " + card.textContent).includes(term);
      var visible = categoryMatches && textMatches;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    resultCount.textContent = visibleCount + (visibleCount === 1 ? " producto" : " productos");
    emptyState.hidden = visibleCount !== 0;
  }

  search.addEventListener("input", filterProducts);
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(function (item) {
        var selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      filterProducts();
    });
  });

  var storageKey = "selva-rica-cart";
  var cart = {};
  var validProductIds = new Set(Array.prototype.map.call(grid.querySelectorAll(".add-to-cart"), function (button) {
    return button.dataset.id;
  }));
  try {
    var savedCart = window.localStorage.getItem(storageKey);
    if (savedCart) cart = JSON.parse(savedCart);
    if (!cart || Array.isArray(cart) || typeof cart !== "object") cart = {};
    Object.keys(cart).forEach(function (id) {
      if (!validProductIds.has(id)) delete cart[id];
    });
  } catch (error) {
    console.warn("No se pudo recuperar el carrito guardado.", error);
    cart = {};
  }

  var cartPanel = document.getElementById("cart-panel");
  var backdrop = document.getElementById("cart-backdrop");
  var cartItems = document.getElementById("cart-items");
  var cartEmpty = document.getElementById("cart-empty");
  var cartCount = document.getElementById("cart-count");
  var subtotal = document.getElementById("cart-subtotal");
  var checkout = document.getElementById("checkout");
  var lastFocusedElement = null;

  function saveCart() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch (error) {
      console.warn("No se pudo guardar el carrito en este navegador.", error);
    }
  }

  function renderCart() {
    cartItems.replaceChildren();
    var ids = Object.keys(cart);
    var itemCount = 0;
    var total = 0;
    var hasUnpricedItems = false;

    ids.forEach(function (id) {
      var item = cart[id];
      if (!item || typeof item.name !== "string" || !Number.isInteger(item.quantity) || item.quantity < 1 ||
          (item.price !== null && !Number.isFinite(item.price))) {
        delete cart[id];
        return;
      }
      itemCount += item.quantity;
      if (item.price === null) {
        hasUnpricedItems = true;
      } else {
        total += item.price * item.quantity;
      }

      var row = document.createElement("div");
      row.className = "cart-line";
      var name = document.createElement("span");
      name.className = "cart-line-name";
      name.textContent = item.name;
      var linePrice = document.createElement("span");
      linePrice.className = "cart-line-price";
      linePrice.textContent = item.price === null
        ? "Precio por confirmar"
        : "S/ " + (item.price * item.quantity).toFixed(2);
      var controls = document.createElement("div");
      controls.className = "cart-line-controls";
      var decrease = document.createElement("button");
      decrease.type = "button";
      decrease.className = "quantity-button";
      decrease.dataset.action = "decrease";
      decrease.dataset.id = id;
      decrease.setAttribute("aria-label", "Quitar una unidad de " + item.name);
      decrease.textContent = "−";
      var quantity = document.createElement("span");
      quantity.textContent = "Cantidad: " + item.quantity;
      var increase = document.createElement("button");
      increase.type = "button";
      increase.className = "quantity-button";
      increase.dataset.action = "increase";
      increase.dataset.id = id;
      increase.setAttribute("aria-label", "Añadir una unidad de " + item.name);
      increase.textContent = "+";
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-button";
      remove.dataset.action = "remove";
      remove.dataset.id = id;
      remove.textContent = "Eliminar";
      controls.append(decrease, quantity, increase, remove);
      row.append(name, linePrice, controls);
      cartItems.append(row);
    });

    cartCount.textContent = String(itemCount);
    subtotal.textContent = hasUnpricedItems ? "Por confirmar" : "S/ " + total.toFixed(2);
    cartEmpty.hidden = itemCount > 0;
    cartItems.hidden = itemCount === 0;
    checkout.disabled = itemCount === 0;
    saveCart();
  }

  function openCart() {
    lastFocusedElement = document.activeElement;
    cartPanel.hidden = false;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("close-cart").focus();
  }

  function closeCart() {
    cartPanel.hidden = true;
    backdrop.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.getElementById("open-cart").addEventListener("click", openCart);
  document.getElementById("close-cart").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !cartPanel.hidden) closeCart();
  });

  grid.addEventListener("click", function (event) {
    var button = event.target.closest(".add-to-cart");
    if (!button) return;
    var id = button.dataset.id;
    if (!cart[id]) {
      cart[id] = {
        name: button.dataset.name,
        price: button.dataset.price ? Number(button.dataset.price) : null,
        quantity: 0
      };
    }
    cart[id].quantity += 1;
    renderCart();
    button.textContent = "Añadido ✓";
    window.setTimeout(function () {
      button.textContent = "Añadir";
    }, 1000);
  });

  cartItems.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-action]");
    if (!button || !cart[button.dataset.id]) return;
    var item = cart[button.dataset.id];
    if (button.dataset.action === "increase") item.quantity += 1;
    if (button.dataset.action === "decrease") item.quantity -= 1;
    if (button.dataset.action === "remove" || item.quantity < 1) delete cart[button.dataset.id];
    renderCart();
  });

  checkout.addEventListener("click", function () {
    var lines = Object.keys(cart).map(function (id) {
      var item = cart[id];
      var priceText = item.price === null
        ? "precio por confirmar"
        : "S/ " + (item.quantity * item.price).toFixed(2);
      return "• " + item.quantity + " x " + item.name + " — " + priceText;
    });
    if (!lines.length) return;
    var message = "Hola, quiero hacer este pedido:\n" + lines.join("\n") + "\n\nTotal: " + subtotal.textContent;
    window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank", "noopener");
  });

  filterProducts();
  renderCart();
  if (window.location.hash === "#catalogo") {
    document.getElementById("catalogo").scrollIntoView();
  }
}());
