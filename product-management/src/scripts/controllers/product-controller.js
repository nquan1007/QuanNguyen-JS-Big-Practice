export default class ProductController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize = () => {
    this.view.initialize();
    this.view.bindAddNewProduct(this.handleAddNewProduct);
  }

  handleAddNewProduct = (product) => {
    const productData = {
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    }
    console.log(productData);
  }
}