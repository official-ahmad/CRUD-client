import React, { useState } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
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
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const { title, desc, price, image } = products;

    // Basic Validation
    if (!title || !desc || !price) {
      return toast.error("Please fill in all required fields!");
    }

    setLoading(true);
    const searchKeyword = title.trim().replace(/\s+/g, ",");
    const autoImage = `https://source.unsplash.com/800x600/?${searchKeyword}`;

    // Alternative: If source.unsplash is slow, use this more modern format:
    // const autoImage = `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80`;

    const finalData = {
      ...products,
      image: image.trim() !== "" ? image : autoImage,
    };

    try {
      await axios.post("http://localhost:8000/products", finalData);

      toast.success(`${title} published successfully!`);
      navigate("/");
    } catch (error) {
      toast.error("Server Error: Could not save product.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="w-50 mx-auto mt-4 my-4">
      <Card
        className="p-4 shadow-sm border-0"
        style={{ borderRadius: "15px", backgroundColor: "#fefefe" }}
      >
        <h2 className="fst-italic mb-4 text-center">✨ Create New Product</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Product Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              placeholder="e.g. Nike Shoes, Rolex Watch"
              value={products.title}
              onChange={changeHandler}
            />
            <Form.Text className="text-muted small">
              We'll use this title to automatically find a cool image!
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="desc"
              required
              placeholder="Write a short catchy description..."
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
                  required
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
                  min="1"
                  max="5"
                  value={products.rating}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3 text-muted" style={{ opacity: 0.7 }}>
            <Form.Label className="small">
              Custom Image URL (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={products.image}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Top Review</Form.Label>
            <Form.Control
              type="text"
              name="review"
              placeholder="What do customers say?"
              value={products.review}
              onChange={changeHandler}
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              type="submit"
              variant="dark"
              size="lg"
              className="rounded-pill"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Publishing...
                </>
              ) : (
                "Publish Product"
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateProduct;
