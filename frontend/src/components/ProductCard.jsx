import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton, 
  Box,
  Dialog, 
  DialogActions, 
  DialogTitle 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import PropTypes from "prop-types"; // Add prop-types for prop validation
import axios from 'axios';

const client = axios.create({ baseURL: "https://localhost:443" });

export function ProductCard({ product }) {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const authRes = await client.get('users/me', {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'auth-token': token
      }
    });

    console.log(authRes);

    const prodRes = await client.delete('/products/' + product._id, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'auth-token': token
      }
    });


    console.log("Deleted product:", prodRes);
    setOpenDeleteDialog(false);
    //window.location.reload();
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.nombre}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {product.descripcion}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="subtitle1" color="primary">
            ${product.precio.toFixed(2)}
          </Typography>
          
          <Typography variant="subtitle2" sx={{ color: product.stock > 0 ? 'green' : 'error.main' }}>
            {product.stock} in stock
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
        <IconButton
          color="primary"
          onClick={() => navigate(`/edit-product/${product._id}`)}
          aria-label="Edit"
        >
          <Edit fontSize="small" />
        </IconButton>
        
        <IconButton 
          color="error" 
          onClick={() => setOpenDeleteDialog(true)}
          aria-label="Delete"
        >
          <Delete fontSize="small" />
        </IconButton>
      </CardActions>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>
          Delete `{product.nombre}`?
        </DialogTitle>
        
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            variant="contained"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    precio: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};