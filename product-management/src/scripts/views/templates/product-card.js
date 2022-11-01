const buildProductTemplate = (product) => {
  const { id, name, price, image, description } = product;
  const productCard = 
    `<article class="product-card" data-id=${id}>
      <button class="btn-secondary btn-edit-product" data-id=${id}>
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="btn-secondary btn-delete-product">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <img src="${image}" alt="item-iame" class="item-image" />
      <div class="product-info">
        <p class="product-name text-secondary">${name}</p>
        <p class="product-price text-price">${price}<span> VND</span></p>
        <p class="product-description text-primary">${description}</p>
      </div>
    </article>`;
  return productCard;
};

export { buildProductTemplate };
