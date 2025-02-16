import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types"; // Add prop-types for prop validation

export function ProductForm({ product, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: product?.nombre || "",
    descripcion: product?.descripcion || "",
    precio: product?.precio || 0,
    stock: product?.stock || 0,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <Stack spacing={3} maxWidth={500} m="auto">
        <Typography variant="h5">
          {product ? "Edit Product" : "Create New Product"}
        </Typography>

        <TextField
          label="Name"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
        />

        <TextField
          label="Price"
          type="number"
          value={formData.precio}
          onChange={(e) =>
            setFormData({ ...formData, precio: Number(e.target.value) })
          }
          required
        />

        <TextField
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={(e) =>
            setFormData({ ...formData, stock: Number(e.target.value) })
          }
          required
        />

        <Button type="submit" variant="contained" size="large">
          {product ? "Update" : "Create"}
        </Button>
      </Stack>
    </form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.node.isRequired,
  onSubmit: PropTypes.node.isRequired,
};