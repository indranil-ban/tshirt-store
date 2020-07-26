import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./core/Home"
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import createCategory from "./admin/AddCategory";
import createProduct from "./admin/AddProduct";
import managecategory from "./admin/ManageCategories";
import manageproduct from "./admin/ManageProducts";
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from "./core/Cart"





const routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/cart" exact component={Cart}/>


                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}></AdminRoute>
                <AdminRoute path="/admin/create/category" exact component={createCategory}></AdminRoute>
                <AdminRoute path="/admin/create/product" exact component={createProduct}></AdminRoute>
                <AdminRoute path="/admin/categories" exact component={managecategory}></AdminRoute>
                <AdminRoute path="/admin/products" exact component={manageproduct}></AdminRoute>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}></AdminRoute>
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}></AdminRoute>

                

                





            </Switch>
        </Router>
      );
}
 
export default routes;