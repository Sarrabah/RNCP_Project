import React from "react";
import { ProductInterface } from "../types/types";
import ProductList from "../components/ProductList";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";

export const products: Array<ProductInterface> = [
  {
    id: 1,
    image:
      "https://bricola.tn/13553-large_default/bouton-de-porte-503-satine-cebi.jpg",
    name: "Button",
    category: "furniture",
  },
  {
    id: 2,
    image:
      "https://alba-creation.com/fr/3540-thickbox_default/cale-de-porte-lestee.jpg",
    name: "Door stop",
    category: "door",
  },
  {
    id: 3,
    image:
      "https://www.lecnt.com/20220-home_default/parquet-terraclick-2g-m26324-chene-clair-ac3-12035x1917x8-mm.jpg",
    name: "Parquet",
    category: "floor",
  },
  {
    id: 4,
    image:
      "https://www.10000articles.shop/images/thumbs/0017244_robinet-jardin-chrome-1521.jpeg",
    name: "Faucet",
    category: "bathroom",
  },
  {
    id: 5,
    image:
      "https://www.meubletmoi.com/32650-large_default/lot-de-4-pieds-de-meuble-17-cm-x-4-cm-conique-courbe-en-bois-de-hetre.jpg",
    name: "Leg",
    category: "furniture",
  },
  {
    id: 6,
    image:
      "https://www.thirard.fr/wp-content/uploads/2022/08/Poigne%CC%81es.jpeg",
    name: "Handles",
    category: "furniture",
  },
  {
    id: 7,
    image:
      "https://www.brun-doutte.com/wp-content/uploads/2019/12/gar95-rampe-paris.jpg",
    name: "Rump",
    category: "furniture",
  },
  {
    id: 8,
    image:
      "https://medias.maisonsdumonde.com/images/ar_1:1,c_pad,f_auto,q_auto,w_732/v1/mkp/M24039577_5/cloche-en-fonte-marron-28-x-20-cm.jpg",
    name: "Bell",
    category: "door",
  },
  {
    id: 9,
    image:
      "https://bricola.tn/8330-large_default/poignee-de-porte-dilara-grand-trou-satin-chrome-doganlar.jpg",
    name: "Handles",
    category: "door",
  },
  {
    id: 10,
    image: "https://www.stevens-locks.com/pictures/products/PH64.JPG",
    name: "Door puller",
    category: "door",
  },
  {
    id: 11,
    image:
      "https://media.cdn.saint-maclou.com/3061_6060_A_Small.jpg?frz-w=640&frz-resizeimgs=true",
    name: "Tiling",
    category: "floor",
  },
  {
    id: 12,
    image:
      "https://www.stonenaturelle.be/library/media/bilder/produits-interieur/carrelage%20en%20travertin/travertinfliesen%20classic%20country/carrelage-travertin-classic-country-couloir-tabouret.jpg?w=748&hash=E3EA24BCC3BC25278F805962B6F396247DD5B564",
    name: "Tiling",
    category: "floor",
  },
  {
    id: 13,
    image:
      "https://www.somocergroup.com/wp-content/uploads/2021/04/AMBIANCE-AKROM-60X120.jpg",
    name: "Tiling",
    category: "floor",
  },
  {
    id: 14,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jPo-1QDjlX0kBITDL4mHc7jHFwASDWUjQw&s",
    name: "vanity unit set",
    category: "bathroom",
  },
  {
    id: 15,
    image:
      "https://media.adeo.com/mkp/a4582c8e25168d4335552ff3baeb31a7/media.jpg?width=650&height=650&format=jpg&quality=80&fit=bounds",
    name: "Mirror",
    category: "bathroom",
  },
  {
    id: 16,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSiuoDAnCbrVjlzEF87BpnsdWm6NYOnf9ww&s",
    name: "Basin",
    category: "bathroom",
  },
];
const categories: string[] = ["furniture", "door", "floor", "bathroom"];
const Homepage: React.FC = () => {
  return (
    <div>
      <h2 className="title"> All our available products! </h2>
      {categories.map((category) => {
        const filteredProducts = products.filter(
          (product) => product.category === category,
        );
        return (
          <div key={category}>
            <h3 style={{ padding: "0.1%", fontSize: "30px" }}>{category}</h3>
            <ProductList products={filteredProducts.slice(0, 3)} />
            <div className="category-header">
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
