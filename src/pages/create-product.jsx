import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Products from "./products";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateProduct() {
  const [products, setProducts] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
  });

  const navigate = useNavigate();
  function changeHandler(e) {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const { title, desc, price, rating, review } = products;
    if (!title) return toast.error("Title is required!");
    if (!desc) return toast.error("Description is required!");
    if (!price) return toast.error("Price is required!");
    if (!rating) return toast.error("Rating is required!");
    if (!review) return toast.error("Review is required!");
    try {
      // await axios.post("http://localhost:8000/", products);
      await axios.post("crud-server-production.up.railway.app", products);
      toast.success("Product created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create product!");
      console.error(error);
    }
  }

  return (
    <div className="w-50 mx-auto mt-4 my-4">
      <h2 className="fst-italic">Create Product</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Garments"
            value={products.title}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            type="text"
            name="desc"
            placeholder="Garments in Lahore"
            value={products.desc}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="10"
            value={products.price}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            placeholder="1-5"
            value={products.rating}
            min={1}
            max={5}
            step={1}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value > 5) value = 5;
              if (value < 1) value = 1;
              setProducts({ ...products, rating: value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Reviews</Form.Label>
          <Form.Control
            type="text"
            name="review"
            placeholder="Satisfied"
            value={products.review}
            onChange={changeHandler}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CreateProduct;
