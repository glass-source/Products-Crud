import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import { ProductForm } from "../components/ProductForm";
import { createAuthedClient } from "../context/AuthUtils";
import PropTypes from "prop-types"; // Add prop-types for prop validation

export function ProductPage({ edit = false }) {
  const [product, setProduct] = useState(null);
  const { _id } = useParams();
  const _idRef = useRef(null); // Use useRef to store _id
  const navigate = useNavigate();

  useEffect(() => {
    const client = createAuthedClient();

    if (edit) {
      client.get("/products").then(({ data }) => {
        const foundProduct = data.find((p) => {
          _idRef.current = p._id; // Store _id in the ref
          return p._id === _id; // Return the condition for find
        });

        if (foundProduct) {
          setProduct({
            nombre: foundProduct.nombre,
            descripcion: foundProduct.descripcion,
            precio: foundProduct.precio,
            stock: foundProduct.stock,
          });
        }
      }).catch(() => navigate("/dashboard"));
    }
  }, [edit, _id, navigate]);

  const handleSubmit = async (formData) => {
    const client = createAuthedClient();

    if (edit) {
      console.log("Editing product");
      const res = await client.put(`/products/${_idRef.current}`, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: formData.precio,
        stock: formData.stock,
      });

      if(res.response.status === 401) {
        console.log("Unauthorized");
        navigate("/login");
      }

    } else {

      

      const res = await client.post("/products",  {
        "nombre": formData.nombre,
        "descripcion": formData.descripcion,
        "precio": formData.precio,
        "stock": formData.stock
    });

      console.log(res);
      if(res.response.status === 401) {
        console.log("Unauthorized");
        navigate("/login");
      }
    }

      navigate("/dashboard");
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        {edit ? "Edit Product" : "Create Product"}
      </Typography>

      <ProductForm product={product} onSubmit={handleSubmit} />

      {edit && (
        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            try {
              const client = createAuthedClient();
              await client.delete(`/products/${_idRef.current}`);
              navigate("/dashboard");
            } catch (err) {
              if(err.response?.status === 401) navigate("/login");
              console.error("Delete failed:", err);
            }
          }}
          sx={{ mt: 2 }}
        >
          Delete Product
        </Button>
      )}
    </Container>
  );
}


ProductPage.propTypes = {
  edit: PropTypes.node.isRequired
};