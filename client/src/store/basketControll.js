import { makeAutoObservable } from "mobx";

export default class BasketControl {
  constructor() {
    this._basket = [];

    makeAutoObservable(this);
  }

  setBasket(basket) {
    this._basket = basket;
  }

  get basket() {
    return this._basket;
  }

  addProduct(product) {
    this._basket.push(product);
    localStorage.removeItem("basket");
    localStorage.setItem("basket", JSON.stringify(this._basket));
  }

  deleteProduct(id) {
    this._basket.some((product, ind) => {
      if (product.id == id) {
        this._basket.splice(ind, 1);
        return true;
      }
    });
    localStorage.removeItem("basket");
    localStorage.setItem("basket", JSON.stringify(this._basket));
  }

  deleteBasket() {
    this.setBasket([]);
    localStorage.removeItem("basket");
  }
}
