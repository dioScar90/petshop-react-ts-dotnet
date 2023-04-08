import React from "react";
import "./edit-product.scss";
import { TextField, Button } from "@mui/material";
import { IProduct } from "../../types/global.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct: React.FC = () => {
  const [product, setProduct] = React.useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });

  const redirect = useNavigate();
  const { id } = useParams();

  console.log(id);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    axios.get<IProduct>(`${baseUrl}/${id}`).then((response) =>
      setProduct({
        title: response.data.title,
        brand: response.data.brand,
      })
    );
  }, []);

  const handleSaveBtnClick = () => {
    // Why don't we set required for these inputs?
    if (product.title === "" || product.brand === "") {
      alert("Enter values");
      return;
    }
    const data: Partial<IProduct> = {
      brand: product.brand,
      title: product.title,
    };
    axios
      .put(`${baseUrl}/${id}`, data)
      .then((response) =>
        redirect("/products", {
          state: { message: "Product Updated Successfully" },
        })
      )
      .catch((error) => alert("Error"));
  };

  const handleBackBtnClick = () => {
    redirect("/products");
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <TextField
        autoComplete="off"
        label="Brand"
        variant="outlined"
        name="brand"
        value={product.brand}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Title"
        variant="outlined"
        name="title"
        value={product.title}
        onChange={changeHandler}
      />
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSaveBtnClick}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default EditProduct;
