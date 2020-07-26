const express = require("express");
const router = express.Router();
const { getProductById, createProduct, getProduct, photo, updateProduct, removeProduct, getAllProduct, getAllUniqueCategories, updatedStock } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
router.get("/product/:productId", getProduct);
router.get("/products", getAllProduct);
router.get("/product/photo/:productId" , photo);

router.put("/product/:productId/:userId",  
isSignedIn,
isAuthenticated,
isAdmin,
updateProduct);

router.delete("/product/:productId/:userId", 
isSignedIn,
isAuthenticated,
isAdmin,
removeProduct);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
