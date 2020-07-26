import React, {useState, useEffect} from 'react';
import Base  from "../core/Base"
import { Link } from "react-router-dom";
import { getCategories, getaProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";



const UpdateProduct = ({ history, match }) => {
    const [values, setValues] = useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      error: "",
      loading: false,
      getRedirect: false,
      photo: "",
      categories: [],
      category: "",
      createdProduct: "",
      formData: "",
    });
  
    const {
      name,
      description,
      price,
      stock,
      error,
      loading,
      getRedirect,
      photo,
      categories,
      category,
      createdProduct,
      formData,
    } = values;
    const { user, token } = isAuthenticated();
    const onSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: "" });
      updateProduct(match.params.productId, user._id, token, formData).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            getRedirect: true,
            loading: true,
            name: "",
            photo: "",
            price: "",
            stock: "",
            description: "",
            createdProduct: data.name,
          });
        }
      });
    };
  
    const handleChange = (name) => (event) => {
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };
  

    const preloadCategories = ()=>{
        getCategories()
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({categories: data, formData: new FormData()})
            }
        })
    }
    const preLoad = (productId) => {
      getaProduct(productId).then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, 
            name: data.name,
            photo: data.photo,
            stock: data.stock,
            price: data.price,
            description: data.description,
            category: data.category,
            formData: new FormData() });
        }
        preloadCategories();
      });
      
    };
  
    useEffect(() => {
      preLoad(match.params.productId);
    }, []);
  
    const successMessage = () => {
      return (
        <div
          className="alert alert-success mt-3"
          style={{ display: createdProduct ? "" : "none" }}
        >
          <h4>{createdProduct} Updated successfully</h4>
          {setTimeout(() => {
            if (getRedirect) {
              history.replace("/admin/dashboard");
            }
          }, 2000)}
        </div>
      );
    };
    const warningMessage = () => {
      return (
        <div
          className="alert alert-warning"
          style={{ display: error ? "" : "none" }}
        >
          <span> updation is Faild</span>
        </div>
      );
    };
  
    // const didRedirect = ()=>{
    //    if(getRedirect){
    //      history.replace("/admin/dashboard")
    //    }
  
    //   }
  
    // const toAdminDashboard=()=>(
    //    setTimeout(didRedirect,2000)
    // )
  
    const createProductForm = () => (
      <form>
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              required
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            required
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            required
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            required
            placeholder="Category"
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, index) => {
                return (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            required
            placeholder="Stock"
            value={stock}
          />
        </div>
  
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Update Product
        </button>
      </form>
    );
  
    return (
      <Base
        title="Update a product here!"
        description="Welcome to product update section"
        className="container bg-info p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {createProductForm()}
          </div>
        </div>
      </Base>
    );
  };
  
  export default UpdateProduct;
  