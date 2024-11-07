// Archivo: app.js


  // Elementos del DOM
  const cartItemsContainer = document.querySelector('.items-car');
  const cartTotal = document.querySelector('.price-total');
  const addToCartButtons = document.querySelectorAll('.card button');
  
  // Estado del carrito (inicia vacío)
  let cart = [];
  
  // Función para actualizar el total del carrito
  function updateCartTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  }
  
  // Función para renderizar los items del carrito
  function renderCart() {
    cartItemsContainer.innerHTML = ''; // Limpiar carrito
  
    if (cart.length === 0) {
      // Si el carrito está vacío, mostrar un mensaje o mantener el contenedor vacío
      cartItemsContainer.innerHTML = '<p></p>';
      cartTotal.textContent = 'R$ 0.00'; // Reiniciar el total
      return; // Terminar la función si no hay productos
    }
  
    // Renderizar cada item en el carrito
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="item-information">
          <span class="title-item">${item.title}</span>
          <div class="quantity-selector">
            <i class="fa-solid fa-minus restar-quantidade" data-index="${index}"></i>
            <input type="text" value="${item.quantity}" class="car-item-quantity" disabled>
            <i class="fa-solid fa-plus sumar-quantidade" data-index="${index}"></i>
          </div>
          <span class="price-bttn">R$ ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <span class="delete-bttn" data-index="${index}">
          <i class="fa-regular fa-trash-can"></i>
        </span>
      `;
  
      // Añadir el item al contenedor del carrito
      cartItemsContainer.appendChild(cartItem);
    });
  
    updateCartTotal(); // Actualizar el total
  }
  
  // Función para agregar un producto al carrito
  function addToCart(title, price, image) {
    const existingItem = cart.find(item => item.title === title);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ title, price, image, quantity: 1 });
    }
  
    renderCart();
  }
  
  // Event listener para botones "Agregar al carrito"
  addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
      const card = event.target.closest('.card');
      const title = card.querySelector('h3').textContent;
      const price = parseFloat(card.querySelector('p').textContent.replace('R$', ''));
      const image = card.querySelector('img').src;
  
      addToCart(title, price, image);
    });
  });
  
  // Event listener para incrementar, decrementar y eliminar productos en el carrito
  cartItemsContainer.addEventListener('click', event => {
    const index = event.target.getAttribute('data-index');
  
    if (event.target.classList.contains('sumar-quantidade')) {
      cart[index].quantity++;
      renderCart();
    } else if (event.target.classList.contains('restar-quantidade')) {
      cart[index].quantity--;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1); // Eliminar el producto si la cantidad es 0
      }
      renderCart();
    } else if (event.target.classList.contains('delete-bttn')) {
      cart.splice(index, 1); // Eliminar el producto
      renderCart();
    }
  });
  
  // Mostrar/ocultar el carrito al hacer clic en el icono
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.car-icon');
    const cart = document.querySelector('.carrinho');
    
    cartIcon.addEventListener('click', () => {
      cart.classList.toggle('show');
    });
  });
  