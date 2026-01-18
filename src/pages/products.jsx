import React, { useEffect, useState } from "react"; // 1. Dono hooks aik sath import karein
import axios from "axios";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./products.css";
import toast from "react-hot-toast";

const Products = () => {
  // Function declaration check karein
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 2. Function component ke andar hona chahiye
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://crud-server-production.up.railway.app/products",
      );
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  // 3. useEffect hamesha top level par hona chahiye
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://crud-server-production.up.railway.app/products/${id}`,
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product Deleted!");
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="w-75 mx-auto my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">All Products</h1>
        <Button variant="dark" onClick={() => navigate("/create")}>
          Create Product
        </Button>
      </div>

      <div className="row g-4">
        {products &&
          products
            .filter((p) => p.title)
            .map((meriProduct) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={meriProduct._id}
              >
                <Card
                  className="h-100 shadow-sm border-0"
                  style={{ borderRadius: "15px" }}
                >
                  <div
                    style={{
                      height: "180px",
                      overflow: "hidden",
                      borderRadius: "15px 15px 0 0",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: "100%", objectFit: "cover" }}
                      src={
                        meriProduct.image ||
                        "https://placehold.co/600x400?text=No+Image"
                      }
                      onError={(e) => {
                        // Loop breaking logic
                        if (
                          e.target.src !==
                          "https://placehold.co/600x400?text=Error"
                        ) {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/600x400?text=Error";
                        }
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {meriProduct.title}
                    </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <h5 className="text-success mb-0">
                        ${meriProduct.price}
                      </h5>
                      <div className="d-flex gap-2">
                        <FaEdit
                          className="text-primary cursor-pointer"
                          onClick={() => navigate(`/edit/${meriProduct._id}`)}
                        />
                        <FaTrash
                          className="text-danger cursor-pointer"
                          onClick={() => deleteProduct(meriProduct._id)}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Products;
