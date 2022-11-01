const buildProductTemplate = (product) => {
  const { name, price, image, description } = product;
  const productCard = `<article class="products-item">
  <button class="btn-secondary btn-edit-item">
  <i class="fa-solid fa-pen-to-square"></i>
  </button>
      <button class="btn-secondary btn-delete-item">
        <i class="fa-solid fa-xmark"></i>
        </button>
        <img src="${image}" alt="item-iame" class="item-image" />
        <div class="item-info">
        <p class="item-name text-secondary">${name}</p>
        <p class="item-price text-price">${price}<span> VND</span></p>
        <p class="item-description text-primary">${description}</p>
      </div>
    </article>`;
  return productCard;
};

export { buildProductTemplate };
