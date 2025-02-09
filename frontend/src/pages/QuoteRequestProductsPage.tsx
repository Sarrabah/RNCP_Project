import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuoteRequestProductsPage = ()=> {
    const [productsDetails, setProductsDetails]= useState([]);
    const { id } = useParams<{ id: string }>();

    const getAllProductsDetails = useCallback(async()=> {
        const reponse =  await fetch(`/api/quoterequestproducts/${id}`);
        const data = await reponse.json();
        setProductsDetails(data);

    }, [id])
    useEffect(()=> {
        getAllProductsDetails();
    },[getAllProductsDetails])
    console.log(productsDetails)
    return(
        <div>
            hello
        </div>
    )
}
export default QuoteRequestProductsPage;