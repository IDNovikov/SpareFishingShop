import { makeAutoObservable } from "mobx";

export default class FavoriteStore {
  constructor() {
    this._favorites = [];

    makeAutoObservable(this);
  }

  setFavorites(favorites) {
    this._favorites = favorites;
  }

  get favorites() {
    return this._favorites;
  }

  addProduct(product) {
    let flag = false;
    if (!flag) {
      this._favorites.forEach((elem) => {
        if (elem.id == product.id) {
          return (flag = true);
        }
      });
    }
    if (!flag) {
      this._favorites.push(product);
      localStorage.removeItem("favorites");
      localStorage.setItem("favorites", JSON.stringify(this._favorites));
      return this._favorites;
    }
  }

  deleteFavorite(id) {
    this._favorites.map((product, ind) => {
      if (product.id == id) {
        return this._favorites.splice(ind, 1);
      }
    });
    localStorage.removeItem("favorites");
    localStorage.setItem("favorites", JSON.stringify(this._favorites));
  }

  deletefavorites() {
    this.setFavorites([]);
    localStorage.removeItem("favorites");
  }
}
