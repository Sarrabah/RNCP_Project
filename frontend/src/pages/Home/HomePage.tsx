import React, { useEffect, useState } from "react";
import { ProductInterface } from "../../types/types";
import ProductList from "../../components/ProductList";
import "./Homepage.css";
import { Link } from "react-router-dom";

const Homepage: React.FC = () => {
  async function fetchProducts(): Promise<ProductInterface[]> {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }

  const categories: string[] = ["furniture", "door", "floor", "bathroom"];

  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    fetchProducts().then((p) => setProducts(p));
  }, []);

  return (
    <div>
      <h2 className="title"> All our available products! </h2>
      {categories.map((category) => {
        const filteredProducts: ProductInterface[] = products.filter(
          (product) => product.category === category,
        );
        return (
          <div key={category}>
            <h3 style={{ padding: "0.1%", fontSize: "30px" }}>{category}</h3>
            <ProductList products={filteredProducts.slice(0, 3)} />
            <div className="category-link">
              <Link
                style={{
                  fontSize: "16px",
                  marginBottom: "15px",
                  marginTop: "20px",
                }}
                to={`/category/${category}`}
              >
                See More
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Homepage;
