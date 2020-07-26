const express= require("express");
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus} = require("../controllers/order");
const {updatedStock} = require("../controllers/product")

router.param("userId", getUserById);
router.param("orderId", getOrderById);


router.post("/order/create/:userId",isSignedIn, isAuthenticated,pushOrderInPurchaseList,updatedStock, createOrder)

router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders )
router.get("/order/status/:userId", isSignedIn, isAuthenticated,isAdmin,getOrderStatus )
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus )

module.exports = router;