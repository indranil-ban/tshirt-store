import {API} from "../../backend";
export const createCategory =(userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, 
    {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}

export const getCategories =() => {
    return fetch(`${API}/categories`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            
        },
    
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}



export const getaCategory =(categoryId) => {
    return fetch(`${API}/category/${categoryId}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            
        },
    
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}


export const updateCategory =(categoryId,userId,token, category) => {
    
    return fetch(`${API}/category/${categoryId}/${userId}`, 
    {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(category),
    })
    .then(response=>{
        
        return response.json();
    })
    .catch(err=>{console.log(err)})
}


export const deleteCategory =(categoryId,userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, 
    {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
    
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}





export const createProduct =(userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, 
    {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: product,
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}

export const updateProduct =(productId,userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, 
    {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: product,
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}

export const deleteProduct =(productId,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, 
    {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
    
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}


export const getProducts =() => {
    return fetch(`${API}/products`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            
        },
    
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}


export const getaProduct =(productId) => {
    return fetch(`${API}/product/${productId}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            
        },
    
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}
