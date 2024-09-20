import React from 'react';
import { ProductProps } from '../components/Product';
import ProductList from '../components/ProductList';
import bouton from '../assets/bouton.png';
import stopporte from '../assets/stop-porte.png';
import parquet from '../assets/parquet.png';
import robinet from '../assets/robinet.png';
import NavBar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import '../styles/Homepage.css';
const products: ProductProps[] = [
  {
    id: 1,
    image: bouton,
    name: 'Button',
    price: '1.5 Euro',
    category: 'Furniture',
  },
  {
    id: 2,
    image: stopporte,
    name: 'Door stop',
    price: '3 Euro',
    category: 'Door',
  },
  {
    id: 3,
    image: parquet,
    name: 'Parquet',
    price: '100/m² Euro',
    category: 'Floor',
  },
  {
    id: 4,
    image: robinet,
    name: 'Faucet',
    price: '129 Euro',
    category: 'Bathroom',
  },
];
const categories: string[] = ['Furniture', 'Door', 'Floor', 'Bathroom'];
const Homepage: React.FC = () => {
  return (
    <Layout>
      <NavBar />
      <Layout>
        <Sider width={250}>
          <Sidebar />
        </Sider>
        <Content style={{ marginTop: '2px', padding: '0 24px' }}>
          <h2 className="title"> All our available products! </h2>
          {categories.map((category) => {
            const filteredProducts = products.filter(
              (product) => product.category === category,
            );
            return (
              <div key={category}>
                <h3>{category}</h3>
                <ProductList products={filteredProducts} />
              </div>
            );
          })}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Homepage;
