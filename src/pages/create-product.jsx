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
    image: "",
  });

  const navigate = useNavigate();
  

  function changeHandler(e) {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const { title, desc, price, rating, review, image } = products;

    if (!title) return toast.error("Title is required!");
    if (!desc) return toast.error("Description is required!");
    if (!price) return toast.error("Price is required!");

    // DYNAMIC AUTO-IMAGE LOGIC
    // Agar user ne koi image link NAHI diya, to hum title ke mutabiq Unsplash se image lenge
    // Naya aur fast URL format:
    const autoImage = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop&keyword=${title.replace(/\s+/g, ",")}`;

    const finalData = {
      ...products,
      image: image || autoImage, // Priority user ke link ko di jayegi, warna auto.
    };

    try {
      await axios.post(
        "https://crud-server-production.up.railway.app/products",
        finalData,
      );
      toast.success(`${title} created successfully!`);
      navigate("/");
    } catch (error) {
      toast.error("Failed to create product!");
      console.error(error);
    }
  }
  useffect(() => {
    CreateProduct();
  }, []);

  return (
    <div className="w-50 mx-auto mt-4 my-4">
      <Card
        className="p-4 shadow-sm border-0"
        style={{ borderRadius: "15px", backgroundColor: "#fefefe" }}
      >
        <h2 className="fst-italic mb-4 text-center">✨ Create New Product</h2>
        <Form onSubmit={submitHandler}>
          {/* Title Input: Yahi decide karega image kaisi hogi */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Product Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="e.g. Shoes, Watch, Shirt"
              value={products.title}
              onChange={changeHandler}
            />
            <Form.Text className="text-muted small">
              Hum title ke hisaab se image khud hi dhoond lenge!
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="desc"
              placeholder="Product details..."
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
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3 text-muted" style={{ opacity: 0.7 }}>
            <Form.Label className="small">
              Optional: Image URL Override
            </Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="Paste custom link or leave empty"
              value={products.image}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Review</Form.Label>
            <Form.Control
              type="text"
              name="review"
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
