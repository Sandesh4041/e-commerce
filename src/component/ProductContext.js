import {createContext,useEffect,useState } from "react";

export  const ProductContext=createContext();

export const ProductProvider=({children})=>{

      const[allProduct,setAllProduct]=useState([])
      const[filterData,setFilterData]=useState([])
      const [searchQuery,setSearchQuery]=useState('')

    useEffect(()=>{
        fetch('/newArrival.json')
        .then((res)=>res.json())
        .then((data)=>setAllProduct(data))
    
        fetch('/sales.json')
        .then((res)=>res.json())
        .then((data)=>setAllProduct((arrivalItems)=>[...arrivalItems,...data]))
      },[])
    
      useEffect(()=>{
        const filtering=allProduct.filter((item)=>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      setFilterData(filtering)
      },[allProduct,searchQuery])
    return(

        <ProductContext.Provider value={{filterData,setSearchQuery,searchQuery}} >
            {children}
            </ProductContext.Provider>
   
    )
}