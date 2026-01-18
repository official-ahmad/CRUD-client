import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const params = useParams();
  console.log(params.id);
  async function fetchProduct() {
    // const product = await axios.get(`http://localhost:8000/${params.id}`);
    const product = await axios.get(
      `crud-server-production.up.railway.app/products${params.id}`,
    );
    console.log(product.data);
    setProductData(product.data);
  }
  useEffect(() => {
    fetchProduct();
  }, []);

  function changeHandler(e) {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const { title, desc, price, rating, review } = productData;
    if (!title) return toast.error("Title is required!");
    if (!desc) return toast.error("Description is required!");
    if (!price) return toast.error("Price is required!");
    if (!rating) return toast.error("Rating is required!");
    if (!review) return toast.error("Review is required!");
    try {
      // await axios.patch(`http://localhost:8000/${params.id}`, productData);
      await axios.patch(
        `https://crud-server-production.up.railway.app/products${params.id}`,
        productData,
      );
      toast.success("Product Updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create product!");
      console.error(error);
    }
  }
  return (
    <div className="w-50 mx-auto mt-4 my-4">
      <h2 className="fst-italic">Edit Product</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Garments"
            value={productData.title}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            type="text"
            name="desc"
            placeholder="Garments in Lahore"
            value={productData.desc}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="10"
            value={productData.price}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            placeholder="1-5"
            value={productData.rating}
            onChange={changeHandler}
            min={1}
            max={5}
            // step={1}
            // onChange={(e) => {
            //   let value = Number(e.target.value);
            //   if (value > 5) value = 5;
            //   if (value < 1) value = 1;
            //   setProducts({ ...products, rating: value });
            // }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Reviews</Form.Label>
          <Form.Control
            type="text"
            name="review"
            placeholder="Satisfied"
            value={productData.review}
            onChange={changeHandler}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Edit
        </Button>
      </Form>
    </div>
  );
}

export default EditProduct;
