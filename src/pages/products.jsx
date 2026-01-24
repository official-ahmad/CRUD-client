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
      const res = await axios.get("http://localhost:8000/products");
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
      await axios.delete(`http://localhost:8000/products/${id}`);

      const remainingProducts = products.filter(
        (p) => p.id !== id && p._id !== id,
      );
      setProducts(remainingProducts);
      toast.success("Deleted Successfully!");
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
          .filter((p) => p.title)
          .map((meriProduct) => {
            const searchTerm = encodeURIComponent(meriProduct.title);
            const dynamicFallback = `https://loremflickr.com/400/300/${searchTerm}`;

            const displayImage =
              meriProduct.image && meriProduct.image.startsWith("http")
                ? meriProduct.image
                : dynamicFallback;

            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={meriProduct.id || meriProduct._id}
              >
                <Card className="h-100 card-style shadow-sm">
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={displayImage}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400?text=No+Image+Found";
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
                        ★ {meriProduct.rating || 0}
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
                            onClick={() =>
                              navigate(
                                `/edit/${meriProduct.id || meriProduct._id}`,
                              )
                            }
                          />
                          <FaTrash
                            className="cursor-pointer icon-hover-red"
                            onClick={() =>
                              deleteProduct(meriProduct.id || meriProduct._id)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
