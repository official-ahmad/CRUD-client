import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./products.css";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const res = await axios.get(
        "https://crud-server-production.up.railway.app/products",
      );

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Failed to load products");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    try {
      await axios.delete(
        `https://crud-server-production.up.railway.app/products/${id}`,
      );

      const remainingProducts = (products || []).filter((p) => p._id !== id);
      setProducts(remainingProducts);
      toast.error("Deleted Permanently!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product.");
    }
  }

  return (
    <div className="w-75 mx-auto my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">All Products</h1>
        <Button variant="dark" onClick={() => navigate("/create")}>
          Create Product
        </Button>
      </div>

      <div className="row g-4 mt-4 complete">
        {products
          .filter((p) => p.title) // Ensure only products with titles are shown
          .map((meriProduct) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={meriProduct._id || meriProduct.id}
            >
              <Card className="h-100 card-style shadow-sm">
                {/* Image Section with Dynamic Fallback */}
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    className="card-img-top"
                    src={
                      meriProduct.image ||
                      `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500` // Fallback Image
                    }
                    onError={(e) => {
                      // Agar image fail ho, to placeholder set karein
                      // Lekin check karein ke kahin loop na ban jaye
                      if (
                        e.target.src !==
                        "https://placehold.co/300x200?text=No+Image"
                      ) {
                        e.target.onerror = null; // Yeh line loop ko rok degi
                        e.target.src =
                          "https://placehold.co/300x200?text=No+Image";
                      }
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title
                      className="mb-0 text-truncate"
                      style={{ maxWidth: "70%" }}
                    >
                      {meriProduct.title}
                    </Card.Title>
                    <Badge bg="warning" text="dark">
                      ★ {meriProduct.rating}
                    </Badge>
                  </div>

                  <Card.Text className="text-muted small flex-grow-1">
                    {meriProduct.desc?.substring(0, 60)}...
                  </Card.Text>

                  <div className="mt-3">
                    <h5 className="text-success fw-bold mb-3">
                      ${meriProduct.price}
                    </h5>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="outline-primary" size="sm">
                        Details
                      </Button>
                      <div className="d-flex gap-3 text-secondary">
                        <FaEdit
                          className="cursor-pointer icon-hover-blue"
                          onClick={() => navigate(`/edit/${meriProduct._id}`)}
                        />
                        <FaTrash
                          className="cursor-pointer icon-hover-red"
                          onClick={() => deleteProduct(meriProduct._id)}
                        />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
