import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { ProductInterface } from "../types/types";

const CategoryPage: React.FC = () => {
  async function fetchProducts(): Promise<ProductInterface[]> {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }

  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    fetchProducts().then((p) => setProducts(p));
  }, []);

  const { category } = useParams<{ category: string }>();

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );

  return (
    <div>
      <h2> {category} Products </h2>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default CategoryPage;
