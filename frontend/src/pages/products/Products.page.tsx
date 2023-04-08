import { useState, useEffect } from "react";
import { IProduct } from "../../types/global.typing";
import "./products.scss";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProductsList = async () => {
    try {
      const response = await axios.get<IProduct[]>(baseUrl);
      setProducts(response.data);
    } catch (error) {
      alert("An error occurred! " + error);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  console.log(products);

  return (
    <div className="products">
      <h1>Products List</h1>
      {products.length === 0 ? (
        <h1>No Products</h1>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Brand</th>
                <th>Creation Time</th>
                <th>Update Time</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.title}</td>
                  <td>{prod.brand}</td>
                  <td>{moment(prod.createdAt).fromNow()}</td>
                  <td>{prod.updatedAt ? moment(prod.updatedAt).fromNow() : "Never yet"}</td>
                  <td>
                    <Button variant="outlined" color="warning" sx={{ mx: 3 }}>
                      <Edit />
                    </Button>
                    <Button variant="outlined" color="error">
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
