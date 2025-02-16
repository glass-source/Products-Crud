import { useState, useEffect } from "react";
import { Grid2, Container, Typography } from "@mui/material";
import { ProductCard } from "../components/ProductCard";
import { Navbar } from "../components/Navbar";
import { createAuthedClient } from "../context/AuthUtils";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const client = createAuthedClient();
  // Fetch products on component mount
  useEffect(() => {

    const fetchProducts = async () => {
      console.log("fetching products");
      try {
        const data  = await client.get("/products");
        setProducts(data);
      } catch (err) {
        if(err.response?.status === 401) navigate("/login");
        console.log("Failed to load products:", err);
        setError("Failed to load products");
      }
      console.log("Success, fetched products");
    };
    
    fetchProducts
  });

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product?.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /*
  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }
  */


  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar onSearch={setSearchQuery} />

      <Container sx={{ py: 4 }}>
        <Grid2 container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid2 item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} />
              </Grid2>
            ))
          ) : (
            <Typography variant="h6" sx={{ width: "100%", textAlign: "center", mt: 4 }}>
              No products found.
            </Typography>
          )}
        </Grid2>
      </Container>
    </>
  );
}