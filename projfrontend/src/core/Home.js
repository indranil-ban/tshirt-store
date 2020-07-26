import React, {useState,useEffect} from 'react';
import {API} from '../backend';
import "../styles.css";
import Base from "../core/Base"
import Card from "../core/Card";
import {getProducts} from "../core/helper/coreapicalls"
const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false)

    const loadProducts=()=>{
        setError(false)
        getProducts().then(data=>{
            if(data.error){
                setError(true);
            }else{
                setProducts(data);
            }
        })
    }

    useEffect(()=>{
        loadProducts()
    },[])

    
    
    return ( 
        <Base title="Home Page" description="Welcome to tshirt store">
            <div className="row text-center">
                <h1 className="text-white"> All of T-shirts</h1>
                <div className="row">
                    {products.map((product, index)=>{
                        return <div key={index} className="col-3">
                            <Card product={product}></Card>
                        </div>
                    })}
                </div>
           </div>
        </Base>
     );
}
 
export default Home;