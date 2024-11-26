const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("admin", {
  //заменить на множество users
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true }, //email\log
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" }, // def:user
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productsId: { type: DataTypes.STRING, allowNull: false },
  certificateUniqId: { type: DataTypes.STRING, allowNull: false },
  totalCost: { type: DataTypes.STRING, allowNull: false },
  typeOfDelivery: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  payment: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  adress: { type: DataTypes.STRING, allowNull: false },
});

const Certificate = sequelize.define("certificate", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uniqId: { type: DataTypes.STRING, primaryKey: true },
  recipient: { type: DataTypes.STRING, allowNull: false },
  emailFrom: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.STRING, allowNull: true },
  emailTo: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tittle: { type: DataTypes.TEXT, unique: false, allowNull: false },
  discription: { type: DataTypes.TEXT, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Size = sequelize.define("size", {
  //продукт должен  иметь много размеров
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Color = sequelize.define("color", {
  //продукт должен иметь много цветов
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const ProductInfo = sequelize.define("product_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tittle: { type: DataTypes.TEXT },
  discription: { type: DataTypes.TEXT },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Admin.hasMany(Basket);
Basket.belongsTo(Admin);

Basket.hasOne(Certificate);
Certificate.belongsTo(Basket);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Size.hasMany(Product);
Product.belongsTo(Size);

Color.hasMany(Product);
Product.belongsTo(Color);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

Type.belongsToMany(Brand, { through: TypeBrand });
Type.belongsToMany(Size, { through: TypeBrand });
Type.belongsToMany(Color, { through: TypeBrand });

Brand.belongsToMany(Type, { through: TypeBrand });
Brand.belongsToMany(Size, { through: TypeBrand });
Brand.belongsToMany(Color, { through: TypeBrand });

Size.belongsToMany(Brand, { through: TypeBrand });
Size.belongsToMany(Type, { through: TypeBrand });
Size.belongsToMany(Color, { through: TypeBrand });

Color.belongsToMany(Type, { through: TypeBrand });
Color.belongsToMany(Brand, { through: TypeBrand });
Color.belongsToMany(Size, { through: TypeBrand });

module.exports = {
  Admin,
  Basket,
  Certificate,
  BasketProduct,
  Product,
  ProductInfo,
  Post,
  Type,
  Brand,
  TypeBrand,
  Size,
  Color,
};
