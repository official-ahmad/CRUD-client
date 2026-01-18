import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateProduct() {
  const [products, setProducts] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
    image: "", // Added image field
  });

  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const { title, desc, price, rating, review, image } = products;

    // Basic Validation
    if (!title) return toast.error("Title is required!");
    if (!desc) return toast.error("Description is required!");
    if (!price) return toast.error("Price is required!");
    if (!rating) return toast.error("Rating is required!");
    if (!review) return toast.error("Review is required!");

    // Optional: If no image is provided, we can assign a high-quality placeholder based on title
    const finalData = {
      ...products,
      image:
        image ||
        `https://source.unsplash.com/featured/?${title.replace(/\s+/g, ",")}`,
    };

    try {
      await axios.post(
        "https://crud-server-production.up.railway.app/products",
        finalData,
      );
      toast.success("Product created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create product!");
      console.error(error);
    }
  }

  return (
    <div className="w-50 mx-auto mt-4 my-4">
      <Card className="p-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <h2 className="fst-italic mb-4">Create New Product</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Product Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="e.g. Blue Denim Jacket"
              value={products.title}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="desc"
              placeholder="Describe the product quality and style..."
              value={products.desc}
              onChange={changeHandler}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="29.99"
                  value={products.price}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Rating (1-5)</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={products.rating}
                  min={1}
                  max={5}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val > 5) val = 5;
                    if (val < 1) val = 1;
                    setProducts({ ...products, rating: val });
                  }}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="Paste image link here (or leave blank for auto-image)"
              value={products.image}
              onChange={changeHandler}
            />
            <Form.Text className="text-muted">
              Tip: You can use an Unsplash link for high-quality photos.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Customer Review</Form.Label>
            <Form.Control
              type="text"
              name="review"
              placeholder="e.g. Excellent fit and material"
              value={products.review}
              onChange={changeHandler}
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              type="submit"
              variant="dark"
              size="lg"
              style={{ borderRadius: "10px" }}
            >
              Publish Product
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateProduct;
