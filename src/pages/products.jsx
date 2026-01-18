import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
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

      // Ensure we only set state if the response is actually an array
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
  // fetchProducts();    we cannot use this here as it will create infinite loop

  useEffect(() => {
    // we can use useEffect to call the function only once when the component is mounted
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    try {
      // 1. Perform the API delete
      // await axios.delete(`crud-server-production.up.railway.appid/${id}`);
      // Ensure the URL is exactly what your backend expects
      await axios.delete(
        `https://crud-server-production.up.railway.app/products/${id}`,
      );

      // 2. Safely filter the array
      // We use (products || []) to ensure we are always calling .filter on an array
      const remainingProducts = (products || []).filter((p) => p._id !== id);

      // 3. Update state
      setProducts(remainingProducts);

      toast.error("Deleted Permanently!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product.");
    }
  }
  return (
    <div className="w-75 mx-auto my-4 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Products</h1>
        <Button variant="dark" onClick={() => navigate("/create")}>
          {/* <Link to="/create">Create Products</Link>  // it is the method of navigating from oonr route to another!! */}
          Create products
        </Button>
      </div>

      {/* <div className="d-flex justify-content-between flex-wrap mt-4 gap-5">
        {products.map((meriProduct) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{meriProduct.title}</Card.Title>
                <Card.Text>{meriProduct.desc}</Card.Text>
                <Card.Text>{meriProduct.price}</Card.Text>
                <Card.Text>{meriProduct.rating}</Card.Text>
                <Card.Text>{meriProduct.reviews}</Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div> */}

      <div className="row g-4 mt-4 complete">
        {products
          .filter((p) => p.title)
          .map((meriProduct) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              style={{ flexWrap: "wrap" }}
              key={meriProduct._id || meriProduct.id}
            >
              <Card className="h-100 card-style">
                <Card.Img
                  variant="top"
                  src={
                    meriProduct.image || "https://via.placeholder.com/300x180"
                  }
                />
                <Card.Body>
                  <Card.Title>{meriProduct.title}</Card.Title>
                  <Card.Text>{meriProduct.desc}</Card.Text>
                  <Card.Text>Price: ${meriProduct.price}</Card.Text>
                  <Card.Text>Rating: {meriProduct.rating}</Card.Text>
                  <Card.Text>Reviews: {meriProduct.review}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary">Details</Button>
                    <div className="d-flex gap-3">
                      <FaTrash onClick={() => deleteProduct(meriProduct._id)} />
                      {/* <FaEdit onClick={() => navigate("/edit/:id  ")} /> */}
                      <FaEdit
                        onClick={() => navigate(`/edit/${meriProduct._id}`)}
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
}

export default Products;
