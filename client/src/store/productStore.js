import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [];
    this._price = [];
    this._brands = [];
    this._colors = [];
    this._sizes = [];
    this._products = [
      // {id: 1, name: "ClassicNosok1", price: 2500, img:"https://fb.ru/media/i/8/8/5/8/6/6/i/885866.jpg"}
    ];

    this._selectedTypes = [];
    this._selectedTypesName = [];
    this._selectedBrands = [];
    this._selectedBrandsName = [];
    this._selectedColors = [];
    this._selectedColorsName = [];
    this._selectedSizes = [];
    this._selectedSizesName = [];
    this._selectedPrices = [];
    this._selectedSearch = {};

    this._page = 1;
    this._totalCount = 9;
    this._limit = 3;

    makeAutoObservable(this);
  }
  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }
  setColors(colors) {
    this._colors = colors;
  }
  setSizes(sizes) {
    this._sizes = sizes;
  }
  setPices(prices) {
    this._prices = prices;
  }
  setProducts(products) {
    this._products = products;
  }

  //множественное выделение
  setSelectedTypes(type, name) {
    this.setPage(1);
    if (name !== undefined) {
      return (this._selectedTypes = [type]), (this._selectedTypesName = name);
    } else {
      let flag = true;
      let arr = [...this._selectedTypes];
      arr.map((elem, ind) => {
        if (elem == type) {
          arr.splice(ind, 1);
          return (flag = false);
        }
      });
      if (flag) {
        arr.push(Number(type));
      }
      return (this._selectedTypes = arr);
    }
  }

  setSelectedBrands(brand, name) {
    this.setPage(1);
    if (name !== undefined) {
      return (
        (this._selectedBrands = [brand]), (this._selectedBrandsName = name)
      );
    } else {
      let flag = true;
      let arr = [...this._selectedBrands];
      arr.map((elem, ind) => {
        if (elem == brand) {
          arr.splice(ind, 1);
          return (flag = false);
        }
      });
      if (flag) {
        arr.push(Number(brand));
      }
      return (this._selectedBrands = arr);
    }
  }
  setSelectedSizes(size, name) {
    this.setPage(1);
    if (name !== undefined) {
      return (this._selectedSizes = [size]), (this._selectedSizesName = name);
    } else {
      let flag = true;
      let arr = [...this._selectedSizes];
      arr.map((elem, ind) => {
        if (elem == size) {
          arr.splice(ind, 1);
          return (flag = false);
        }
      });
      if (flag) {
        arr.push(Number(size));
      }
      return (this._selectedSizes = arr);
    }
  }
  setSelectedColors(color, name) {
    this.setPage(1);
    if (name !== undefined) {
      return (
        (this._selectedColors = [color]), (this._selectedColorsName = name)
      );
    } else {
      let flag = true;
      let arr = [...this._selectedColors];
      arr.map((elem, ind) => {
        if (elem == color) {
          arr.splice(ind, 1);
          return (flag = false);
        }
      });
      if (flag) {
        arr.push(Number(color));
      }
      return (this._selectedColors = arr);
    }
  }

  setSelectedPrices(min, max) {
    this.setPage(1);
    let arr = new Array();
    arr[0] = min;
    arr[1] = max;
    this._selectedPrices = arr;
  }

  setSelectedSearch(value) {
    this._selectedSearch = value;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get colors() {
    return this._colors;
  }
  get sizes() {
    return this._sizes;
  }
  get prices() {
    return this._prices;
  }
  get products() {
    return this._products;
  }

  //множественное выделение
  get selectedTypes() {
    return this._selectedTypes;
  }
  get selectedTypesName() {
    return this._selectedTypesName;
  }
  get selectedBrands() {
    return this._selectedBrands;
  }
  get selectedBrandsName() {
    return this._selectedBrandsName;
  }
  get selectedSizes() {
    return this._selectedSizes;
  }
  get selectedSizesName() {
    return this._selectedSizesName;
  }
  get selectedColors() {
    return this._selectedColors;
  }
  get selectedColorsName() {
    return this._selectedColorsName;
  }
  get selectedPrices() {
    return this._selectedPrices;
  }

  get selectedSearch() {
    return this._selectedSearch;
  }

  get totalCount() {
    return this._totalCount;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  sortByLowPrice() {
    this._products.sort((a, b) => {
      if (Number(a.price) > Number(b.price)) {
        return 1;
      }
      if (Number(a.price) < Number(b.price)) {
        return -1;
      }
      return 0;
    });
    return this._products;
  }
  sortByHighPrice() {
    this._products.sort((a, b) => {
      if (Number(a.price) < Number(b.price)) {
        return 1;
      }
      if (Number(a.price) > Number(b.price)) {
        return -1;
      }
      return 0;
    });
    return this._products;
  }
  sortByAZ() {
    this._products.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    return this._products;
  }
  sortByZA() {
    this._products.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
    return this._products;
  }
  sortByIndex() {
    this._products.sort((a, b) => {
      if (Number(a.id) < Number(b.id)) {
        return 1;
      }
      if (Number(a.id) > Number(b.id)) {
        return -1;
      }
      return 0;
    });
    return this._products;
  }
}
