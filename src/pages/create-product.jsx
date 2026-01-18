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
              placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhISExQWFhUXGRsaFxgXGR4YGBcXGhIgGxcaHRoYIiggGBolGxkZITEhJSkrLi4uGB8zODMtNygtLi0BCgoKDg0OGxAQGy0lHyU1LS0tLS0vMi0tLS0tLystLS0tLS03LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAP8AxgMBIgACEQEDEQH/xAAcAAADAAMBAQEAAAAAAAAAAAAABQYDBAcBAgj/xABQEAABAgMEBQkEBwQHBgYDAAABAgMABBEFEiExEyIjQVEGFDIzQkNSYWIHNERUJFNkcYGRoWNywdElc4KSscLwFXSipLPSZYOy0+HxFzVF/8QAGAEBAAMBAAAAAAAAAAAAAAAAAAECAwT/xAAmEQACAgICAgICAgMAAAAAAAAAAQIREiEDMSJBUfATgTJxQmHR/9oADAMBAAIRAxEAPwDuMEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEEAEEEeLUACSaAYknICAMc1MobQpxxSUISKqUo0AHmTlEFavtMFbsnLqe9ayUJp4koCStQ/eCYl+UVvrtF6/VaZVBOhbHeUODyxma9kdkEHAmNmybLBSFEG76MQPvQMa/fHRDhvbM5T+DIrlLartDpG2RU3tEhvL/zFOGv+vKPU89WCFzLxJHZecQRVumGhbHaofzhqy0gZKTXzRQ/qIzK/eJ/QD8o0/HFGebETElOoA+kPnVprTMydbcdZBrDeWtOeQlFFA0peJXerRGOLqBmqkerHmR/ar+lYw6JKsgpX3JAicExkzYTy9faKtPL3kCgC0YVNMaqSVJzrw3RVWHynl5obNVFVpdVga0qKEVCsMaA1iHmZQpxN6uSQFAkedEa34CEjxbvKASpDgzIFyuG8YBR/AE447hSXCn0WXIztsERfI3lYXVmXfoF9hVenicP8Bux/CLSOeUXF0zVOwgggipIQQQQAQQQQAQQQQAQQQQAQQQttq3mJUAvLoVdFKUqWtVM7qEAqOYxpQVgBlBE5O8sWGkBxWqkkAFRAGsKpOBN4HKgqoY4YRF8ofae+gpS0020lYIDjwUpV8ZpDQIJ8iaVwNIvHjlLoq5JHV4j/AGnWlo5XQJ6UwdH9yKVcP90EfieEcnnvaBaCsVzC0JrdUAEpcNd6EoAUD95MatuzLqWQC64XLjriitRUslToQMSSU0QTgMqGNVxYu2Vc76Ng8pJdsXUjSKTgABRIoKDEjDhVJNMsowTPLWZV0SlHAgVWP7Ss/wAokJURuJjdGbGbtvTKulMO/gsj/AiNczzpxLrh+9aj/GNaPaxYgziedGTrn99X842W7cmE5PufcpRUPyVUQvj2IBRynLWZRgq4pO/VuE/2kUhojlew6AHEqaIyx1EnyKcQa9pX/wBREY1CAOiB2l1xspCxrJUkapzooUwyrUDClaEYV7BYdppmGUOpNa1B8lJNFA0yxEfl6y7VXLLBBJbJ10cRxHBW/wDAcARc2rPPBMu6y8psJClC6tSULSbiU3rhBSkE8TmYy5I5l4ujvEEcWkPaHNMIK3F30UqkPAEKAwF19AwK1eJJwEUFke1NKlJbfbCFkVOtcT5XSSUr/vV8oxfDJF1NHSYInpblgwUhbiXGkmmstNUipompTUoqcr4TWkPmXUqAUkhQORBqDjxEZtNFrPuCCCIJCCCCACCCCACOV+2K1FMPMXSlIW2UqJF5RF7AJR2s+1UeWNY6pHNfatZl91l5awhlKLjlMF6y9WiiDdBIpqhSichvjTiay2Vn0c4s+YUV6JZJWRqFe1mHWzmhCBUJIzSB5gUh+1yaUttWmUGRq7RRCnlKyaWpZqlskUQUpClVpqjOPJOWSzqNpDNNZDq+mobqprfI3VdWlPpjdRyjbULzSS88ioKiaNor00hygQ2hYqQGx0h08o6pN/4mSEk9LJZbU423osQl5btdIRWlSCoKAz6akg0wTnGC0JK+itcDKruig1lBIoc8AC2qgGYrGryidU9t1KCkHBSlCjYJwSptutVLwulRqapxzhs2+gS0uteKUKKDhVV1Sdw8VxSh5Yb4mnRBz6XMbSY1lyy2lqacFFoNFcK8Qd4IoQd4IMZ0GIiGbErLqcWltAKlLISkDeTgBjDw8iLQGcqv8Cg/4KjW5G+/yf8AXI/9UTdjJRebKgg6ppfAKb5bNy9XC7fuk1w44REpUSo2U6uSM98m/wD3Cf8ACNa0rEmJcJL7K2go0SVilTTKPnlCUBtlIuBzM3Gw0RtHcCEpQCNGZcA0OKV0OBjaSf6JZ85x0/8ALtiKx5G6LShiJzHyqPYxOrpGrMzWmFReIKmmJGoIVzcKOsdZC7qs04iiTSgxzESvJ+yBMvJStQS3XXUTQXUiqhWhANOOGI4iL5z6SZp1QOjuFIwxCUjAEDGooBUecUvZY1rUlmlk4GXKTiUEFpTxFAimDaqCibqg2qtcSc0TlguoJQpNEnXeKUqW0EVwCmyL7Ncq0pjgTGOStZTRKSbzac0unpk7kumoIxGqsKA4RbWHOoSlISS0+tQIacBKbxGqEiuAQnWq0oGpGphEu4ojsUSdpuMXSlQbQjABRLkuFXcbjidZtKEYUrQk4iOm+zOf08opwNhsF1VEggigSmhqkAGudaDM/fEFb8iyoXE1YUvpOJILZTWtF5IKlqxIWG1UpUmLH2YtFmUUhQSNqsi6CAU3U0N1WKa0y/KoxjLlpxsvDsuYIxNvVjLHMahBBBABBBBABHPfaZaehcbKWm1uBlaklZIASFALTgCSDUVAunAa26OhRyb20qUJiUoXACzMA3CR4M6RpxK5JFZ9E7Zlic5D6X1laUUW2hKrjSb7DjgIQEUqFNgVNSQTU1j3lDZDTSkKSFkqZWQC4kiqW2lp1TdGF87uHCNLkY8ouhN6YoZduuJ+vDY3+FxQj23X1lqVUVTFS0sZnE81aH+KDHVTyoxHdkS6VofUpqpSptYN1tRFdEvCisMUHLiYXc0UHpqWpTEqQSLobSlV0bzTAD8lRpWJPvFmaSkrNWkKqptKsebO+WQuR9W3Oq56hZyKVLulGjB2yypJoMaoUnKpOA3w3kwKbYs8uNaRKSVsVbdO8tg6iqb7hqg0rQXKwiYcqI6ZaCibsywcCnWpS8pNKHDJA7JNcwnK9WJa07CbcSqYkhgkVearqo9TROKkeRpTMUGqmL9knzyLH0+T/rkH8lRqWNPVYbCZeRwSkEuJF9VAMTU41pj/AArj88nLSSxNMuuBVG1VUANalMaAkY41xMbMlKSTfQm5xJpdJTLoTUYYddlhlFZq2TFm1LTgrVcvIJSK4JCa8AKG8CnWzGNQMaR92i6ldmy60oCEmZeokbqNNgZb8I13W5NQoubnVjhoUca736Z/4QWtPy4lGZWXLyrjq3FKdShHTQkUFxavD+sVinZaTVCQnCPqzLPXMuhtscSpWYQgCqlq8gAT50j5kpJx9VxsV4q7KRSpJO7AE/cDwMdGlm2ZKXKWVBROClKHWOJNaqA120pOYGGCU1vVv6Sl6RRIRT7iGWywx0ciFdNKBrG961YuKH7iKUuxmmJ4y7Al0UvqCNmvEoVeJIvZ4pKQSNyFGMkvKg/SXgoHNutApar2BKwLpqrHEZ07KKlJPMLUpTiiFA1oTgpKcApdO0kkpQCCcD5RZJdEFfybsZhUsi8zeq+SbzazUB1ZVmodlv8AQwvnmgl5TIQQnSKbuFJICQwC5QLXQVWDjnjG3Y80SxKi+gFSVuGjYJvLYB7QO+YV+kSM7aarzig8PinBs05qcIG6IheVhlrZFjLW20q+6ovJvKS4lDgSLqCEoN68EkuIF0lSccjFhyEWFStUouJK1XU5AJAAFBUhINK0GGOQiVZnCgoAdRqNADZJ3TCEjdwaH5Q79lDl6zmzeCsTiEhPYSchvxjHkvHZePZcymcMIXymcMI5zUIIIIAIIIIAI5t7XJZC3JO8spxWnBYTW+0ojMeiOkxz72sPqQJdSUk0cQTiB2igDEH6wxpw/wA0Vn0Q3IaVaLze2OswkdanNE4gHs+cbNr2e1oZEF9WVOuT8qR4eIMafJK1XA+zs1YB4dNPZdSvw+mGdt2m5cldkrVdKOmn7Qnw8Ex1VLNfox1Qt5H2c2SQHzrS6a7VB7Smh2eDkZ+ULCLzDmkKvo61AX2yCQ2yvefOPOQ9puaRGyV1Ce2n5xHpgt60SWZKrSsWHO0g/CMcUf6pEVLMCHnS2HCkmra6K0aSFBSVaqXDxJoUndeBGVCMkylTDiXWzqk1SlNSATjQ06SD+eZzBvbMrKrmwUJQUqShooqEqKytpV5kXQBRxLe/JQSa5xnsd5DYLfSaVQ3lnAJJ7a8yQrVUlORorxGLMG7/ALHl5tClrSQsUvIappGTiQGqYPXvB0SKlBCqpE3a3JJ5gBYW062a0UlVK06RorK6TQmuBwNIZTwXJuBSSoqTVKaCqkA4lBTkGzgSnMihTdOA2BbxUHHwKvpAJZSSUqFDRTZTiDQkB0Y7l1wUqm07XRJIKknE0BbXjlqqxrlSnSB4iGTfJR28jT1QV9FpJBfWRmADqoABvFSsgK0MbvJ+3JnRAMyjcuFChfQLhUom6VJB6IGJIbBP+EN5WZSwla3SXVGiC4npuLrghIrqJBSaqSQdUkklFROVoVswJlxKNVVRKsU3mibmddGgnEAEVUtWNU1OKRo1ko0uZc0i63RQAt4VwqlKQMsMcMQnHAkXd+SacnXRrAou51FwNg5JJFLmGqlYqq4VGqUUhxasklDISyS045UJFCFNtXby3Ftk3r10hRUK6ziN6CYda9jsnbRtZS1UBCm8UhSKAhKcHVlHRIpVCfIqIOtGdUuS2zo1XEuIccoElQShDZSykJUdQ0WtZFT1iOELpCzNI4LyClKgCVN4p0CDRCPSpxdBQ44k7oyTFqJVVbqCpzRzBUdDvv0w18gAAOAAjSldIgu7MshY5oNIdVlPd+cqnj6TEAuzHNFXSfDKPVHtOx0BqcaCkbPJkdz9obHj9Mc8bmmi2Bc+HbHVHtO/vxnxt7JZ0Oas5aVO6/RaV3Stz7qv8hhl7NGCiSSlRqQfCU90jcYTWvPMgzhunBlXdK4TZ8cO/Z06lUoSnAX6ZEdyjcSYym3g7LR7LGUzhhC+UzhhHOahBBBABBBBABHNvbHLlaGKNlesnI079GEdJiC9qpGjaqaayPB8y34z5xpxfyRWXRy7k5ZqtM3sF/Fdrg0o8Yb23Zi9G1sHPez2v2s0OPnHvJ4J0yMQcZvss/Uq9UOLbQC0no4TZ7LXzEx6vOOlyqaMq0TXImzFaVALC+qp0uE82OMfVrWavQyOxc6leSvsbPn5Q15DoGnaxHQWOiz8+3wVGW12xoJLLq1jos/KoHi9MMvNL+hWhPyUlFoDq9A6brLKrpyVdlnzTPI0pnvjzlc4pt0qRqIVecSVCiyqg06EpGCAtCgugxqVDdDXkugFDwqnGWbzQ18s/wAFR5yslwK1TeWAHWlACiEilRdBIwUVVyqH8OjEqXmPQskJhCpcpXghNEKJO1eaUCpoiuN4UOIx1HDmYUylmhSHDRILTjoqpRANHWUiooReJ0hoBTWNMorOS1mltMwsAKW2oBJKXEkIJaUUg0OGuv7r0bsrdKbRQUBR0qFYFtXTWgnMDxb8f1iHLbRBA280UuLbB1askpD2qa1QcMAa04RrPOK0bGkdAFFIBrgEh5SVAgDpKShCb1cgPvi05TyiTML2FcZbsN71qO4xq6MBmUAQlN55VQSG6gTDlOiFVyziy3T++wzNYkuW0JbUNE4/rujNtaMKNcKHUa8qPHeYX2rbiZhyr2CFVCV4lAl0KJWtKhrNFxZJ3gAgUwhzL2ctUk2lu4kupUlRUVuC6kzBw1cDdSQKYAqrTCJaTs0qfVL0KDfKXG1HVDbTgQlF7cFOFIJ4ExEcW2w76Lay2AhlKlFWkmVJXgKrDaLtxN5OCkoQpNQRgXlbxHOpkG6vF3qX+yd7sdXsts3mVJSADpMUhyiheYIVqYa14q/tRETF66r+of3Pb3ocb2wx+tWes71R7J+ZPl6Y59Lq1UC+51UuOj+1EdimL20z6k/XfMOfyiClQvUwPQle099aPKI45XYaNu3HtnOnSLxZPZ/YzJ/jFb7MVVlFYk7U4kU7luNa3L2hnf6nxPfLPeXnDTkLXQOV+s4qPct714xlOVw/f/S8OyslM4YQvlM4YRzmoQQQQAQQQQARzT2yoq22bqTQJz/3tqOlxBe1iVStiqkXqBFDdUqn0xnwkRpxupFZdHKLEbOnTskdOaGf2ZZh5bbGyOyT74d/2t7+cYLJs5rnA2VNrMDq3flF+qHtvWazoiNGfez2Hfm1+rzjrlLyMUtExyMZ+kM7JOTu/hNtmNu25c6KTGiTmsZ8WVj/ACxsckrNZ5w1RB7/ALt3dMI9Ub9tWazo5QaM9MjoO+F/1eUMvNL+h6J/kk0aODRJxlkb/wBk8I95YsVKSWRjLLyV/Vn+MNeRlms3urUKy6ew741p8Xqj45UyDF1k3CKyzn1o+HYO8HjEZLKgalhKutzmq6nonVUT3LZ/hGy5NLQ/PjSrAK2AL6Qo0L7SKYg70n8o+7JlGtBO0WU6iD1pGcqrxI9MMpqzVGZmQ24og82OKUr/AP6TgzSeCIiUlbHomOUE+ozB2qMVyoxaT9UDw841Odq0UiNIvprOyFwe8v50pU4Zw0tuznOcKF8HaS/dK3SQO4Rj/wBnbOQvOEYjohKBit5WSyDXHOlI0jWiHexhZDp5tJ4zBqHDmfqJg8fOEMzNKRNLWnTA6eb86i8RQg1B/wBHOK2x5BHNpOryxqOd4gfDv/fE3PyTWnXtldbOd8nxn0xSDTZLHdhCiZEUe6hO870Sv84hXVnRk0d93cPSO92Om2NItUkdsepb74cJT0RAmSa0XWn3ZffD639yEGthlnMKN54Ue6lW8/XvxCyjhqjr+jK7z9aPOOlTMg1ed2qupV3w+Ye9EQsnJNVQdMejKnrk/Wj0whJbDH1uuHQznX9UN5+Veir9mZrKL6XWnpZ9S3CO3JFrRTdXldSO9T8q95eUUPs7bCZZYSq8NKcSoK7lveIy5GnDX3svDssZTOGEL5TOGEcxqEEEEAEEEEAEc69sEyUskAt9FPTH2xrKOixzz2vyqlsYXOinpAn4xngDF+P+RWXRzeyLSXzgYsdbMcR8Ivzh/wAoLSc0ZxZ984q+aPnE/ZFnL041WetmOPyq/LKKC37OVojgx72d/wBqV5eUdkscjFXQs5J2gvnDXUd/4vr0ecMbZtBwNynU9ad6vtHBXlCzkpZy+cNYMd/v/bJ8oY25IK0crgx1u9XnMweOa/Q3Rrch7ScvJxZ93TvV8yPV5x7bdpOaKU6s1l1g0cWPg2PVGLkTIKvJ1Wa6BPaHzAj4t+RIakxcZNGF5OJHwbHnEeOZO6Nvk9ajmjmxcrsGzg6flH/FXhD2Zm0aZS1tmqjLjopXhzp5Wabu8765RKcnrPVo5vYg7BvouA/CTHAw6m2FJeUClxHu/mD9Kf8A/iKySsbIx20yucLhRdBKDShp0EoAArmE+eYVDo2gkIkQltR6GISkY7TDXvHgc6YwptOXSJlSquA6VIxThQyiTwzqTGUNFSZIhL6+gKhJp1asPvjSKWiJFhY1pKEvJ0bX0XO0gdw/6Inp+1XNOvZK62c7xPjPphnZEgsy0nsXTquf9B8RPT1mL069gvrZvtes+cV40r+/KDsvLFtVz6FsldS33g+yenziAVajmiOzPuy+9/afdFfYtmqpJHQKwYR2xuRKHj5RCvWWoII0HcPd4Nzn3xPGo7oOzqL9puXnNmeqPeD5pwcPOOfy1quUSdEerlj007nR6YsjZyirqDi14x82fPzjnjNmLCE7BXUsnpcHfviIJboOzoduWo5o5waI9Qe8T9RMjw+UPPZ28VyqlEXTpMqg9y3vAES1r2Wr6YNArqT2vRN+cUvsyZKZMgpKdpWhNc2URlyJYa+9l4dlrKZwwhfKZwwjmNQggggAggggAiB9rUy2lii1EGiSMVj4xnwCkX0cx9s80A2EhxIN1NQcT74yfwjTjVyKy6I6x7Ra042p62Z7xz5Vfpigtu0WtEdqffD3jnzbnp8oiLGf242iOsmN32VcPbaeOiO0b97O77U9HXKPkYroy8kbQbMwztT33eOb5lHphjbNoN6OU23bJ61fhePg84leSLx07Ou3k7u+1Ihhbjx0Unrt9JW79m7DHzX6F6GHIqebvAab4dHeq+uJ8HlHtvzyA3K7f4dzvfsjHiRCXkWs3um37ujd61x5ynUbkuAWT9Gcz/3ViIx87F6HdhTKS1ObUHYtdpk/CP8AGnGH6gecOBND7vkCPjpgY6Emv4xCWQg6Gd1Wjsm8sPhXYevC7NPaqhjL9A/b5gY0++KzhtkpmG17+nVn1zW98fAp/CMRQSmTqE4FsYoUvc5vcIP4QjtVX0hWD3Ws7z8imMDrV5MsdGpWLYqpVD1jmEaRj0Q32dBsZv6NK9DDSjBtA7E0N6vKEFotjnK8U+8TQ6LIzqd6o85Py/0aW2I6bg6XEzf84S2myedL2SfeHszxar/GK8cPIN6OhWEpOikzeGDPBndLy54+URk24kBY0o6qYHcbnT5w1sJs83lNRHVK3/ZGz/liQnGtZYuNfFj8nTDjht/fgSZ1ZtaSpGuMWuDPzKDx9Uc7Cxowbw92QcmNzv70U8mCVsajeLI/6ssf80c5U0dD1aPdTv4OQ44VYbOu2kU3prWGLKtzPGaHi843/Z8QZQEGusMrv1KPASIk55jWf2aMWlb/ANs+P4xReysUkE4Aa27LqkRlONQZeD2XEpnDCF8pnDCOY1CCCCACCCCAMM6/o23HD2EqV/dTX+EcWZl5Z6dUq66FOpKlKXeSFqvlNVXk0riCM8o6/wAoGr0rMpHaZcGNd7ZHZqfyxjkVmWa7LTjbim04JAoHHcy8ajXSBu/QRvxLszmTU1KMlTjiXKGk05g4jMuFIwUBu/SLhXJ9AAxqG2rxCkNrBUl3FR1sVUZXjnrq4mINq0FqbALStZkCt9KsXX+Ckn7ouuUFooDc6osq6lSRVtCukJlQxFPGI15LVUURHWfY7qVICF0XcYSDolA3nngVGqa45flFFygs1QadUEs6gTo9VQCFKZUrC8ni8gfdSFNlzrImUat2j7PdqGDbN+mC/KHNvz7IZWm+RedSCKup6CpZHAgdExM28kgjT5GtgPvtqaTqNBOAapquLGF4VMZ+UsqkpY2PwznZaPwrHAxpykyUWhNgOXKtjs3s3lcaxo8oLRUW5XbJNZdebSflGOIhXnY9Dqx7PQWZ2rPct939kdPZXDG0JFoTTmbfuxzU3X+k3R271fwpnEzyen1FqcAWydg2cWwPhH+FOEUL9ouB9whKF1EsNmq5T+k1nGta9Lyikk8nQvRPWzItc4Vtj1sv3w+RT6YwIkmSlipK6LbFb61d65vQmkbduWq5p1bJXWS/eJ+TT6Y0lWk5dZNwDXb6Tqs9M54KD9I2inoh+yq5O2cxoJeiCdqoZOnNya+7jCWfs9nnK9nWsyru3TnLg+KGnJu0nNCx1fXHtr+tmfVE/aFpuc4V1HvAzKj8MniqKwi8w3orLDkW+bSh0XYWOrX8qoeP0xNzlmt6ZY0XezierPjPFcMbKtFfNpPFjorzFe4f8/KJ+ftBXOF6zHvE12AfFEccXf35Jky1kmm0tyzymSQmXvKo2cQlqWWR0/THNqJWlYDTaQlhZOCybhcqK3VUSaEeX54WlnzBXLSzd5kX5dSa6MVAVKMp/wAwjniVqRpAChVW1oVRNKBK6EjLHVFFeZiIJok6bY60Pl69LpSdClSSi+4lSHHXLqqlQpjUUI7NYovZq0EyKAE3RUGl0p7pG4kxFWA4psOUU0U6FKEFSKFSEPLF4g4glSlfhdiv9lTpVZ6CbvS7OA6pH6xnNeLLR7LiUzhhC+UzhhHOaBBBBABBBBAGjbt3m0xepd0S716lKXDWtcKffHG2phLxdcSygANheDiKgIaCyNWmOZ3R2HlGisrMAqujRrqrA0ASSTjh+ccoUy201NXZhKvo7nRDKcpZScdZVf0yMbcTSRnLskLLslWlZRoXOnKIN01yUFq/SHnKGduofYUJgKWlsCowFGmaj8lrj6sZIMwjFJ27WaGzlKngqE/KWzJkTzq1JWUFZSFpSQgE3UopcrcpfaBFcaHOsdEn5UUSPbJVemRtFDavnFPhllIH/EQIaW9N3ko2oN+YWRVNMA+7/wC0n9IYcl3VCYbKqUCn81uA4voGSk4k1pGxbDoUJRKqXiokgKbVdTR844Zkk5YkjyrCU/MhLRq2ZKKXaMxdVTZprqXviB/ONO2bLc0Ulrg7FYxaV8kx5eUMZB5CJ1wqTWrSD0SvvkHxCkL7ZnGdDJYU2K+7UPgmOC4i3mT6POTFlOEPjUN6XbzbWPhnwOz5w2nbMWVJOjSqplhsyU0rNIWK1A8caHJS0GEh83iKS7e5wfCvncTD2Zm2yaIXW6JdWJvUpMtJ7+lOicuEVlJ2K0c5tJ1K5k3QDrMquXlX6JaS3U11fOla0IMZzZ6rjGySNdOC3Eg4TDoyJywjbteykNzSilSbt5ne2V66ErunHoA1/CgyEbgmUpRL1dunSJwCm0j3p7GgBH4xrF9EM3+TMkdCxqM9ce8T9dMwjnbPVzg0Sx7wO0N8snhFfyZnE6Bjbd8e8/bzPBEIJ+fRzg7b4hPeqy5qngiKwk8g1o3bIs5zm8ngzk5uUe4mOAhFaNmu84cwa66byQs8fTFTZNotc2k6uHoudt36l/gnzidtC0WOcL1z105vdPaMRxydktFHYtmOASXQ6lOTbn1Ur6YiJqyllJxT1T5xbXhR0+nPzi+safYuSRvdyNzp7mW8xwiGfnWaKFe6mB0XPrD6occnsNF2uzHCR0MW97ax8UPT6oYeytkps9sKu1r2QQOrTxAjUatJi+1rZtD60fFNncTxjd9lzqVWe2UmoqRmTklPixjGbbi7Lx7LaUzhhC+UzhhGBoEEEEAEEEEAfD7QWlSDkoEGmBoRQ4jKOJ8onnX52bkzoylAcbSKqUsJcu0Uq+SKgL3UrHb45pbTaF2i62soKb6TdBUVDZs4kJUaDHwD7+OvE9spM5bZlS42ssJxWyvBVMHElqmHAmv6Q15RTzSbzCm7qlOIcFHFHBQbXTyNABU7405KTYCW1FOTLCu9zD/3RVcpeTUurnDgC0qabvC62siqW3cTfxrVlOVMo6ZySZmib5NPKS82pBdBq8E7TAKweBzrS4gg78fxhhazChzYqQCoTC0FRVVRo7MAEk+SU/kI+LNs5gPgBum1oNV4dKTUOJh3yls5gBFEfFnsvb1KO4+uDaU0R6Fks59Lc1lJ2DJwxGNw/hCq3ZgaKU2x93Xmn7IxFNydWRNPUI6hnNak9geH7t8fHKR5QRL9HCWc75XyrHEQy86FaJ/k/M0bm9sOobzT9kmIc2mu86oVQ5Rto44U/pED/LGxYruxna3Opb71BylHvEmN2120rmHQUhVGUHABdD/tQ/VXSPxrFZT2yaI7lG2dOrUR0pXf+xA/hGiqoQzqtCi0nH/fXh+UUnKqQb069lvlu7X4P340VSKLiaMk0KO7/wDEH8NdVf4RrGWl9+SGhhyaWQy2Ks4TFP8AmHv+6ENorImDrtjbN7uMomLnk9Jp0Sdh8V4Gh8SeJ84RWk2BMdWBtmc9AM5NPlFYy8qDWgsmYIlpPapGq52f2D/8jE9PPfSF7Ye8TfZ4lUXlkOfRpPo9sdJod3Njw+UJLScAmljU95mO8bGaDwT5w457DRnsSY2Untu58PCWY/lEXMPdIabszI6P7Qx1GxHvo8odXqVd6ndJtncn0xKTLh0hGpnNp64fWH0xHHK39/0GhlLTW0l6PjFtPY/ay5/jFD7Iz/RyNa9RahWlMqRhs2YqJRWp1P1qTkxLK3p8jDP2eH6KoYYPvDAhWTpGYAjGcriXitlfKZwwhfKZwwjnNQggggAggggAjj9qvFNuPqQ4yVG5VBvJUmiGk4qTQnFJ3nMR2COOcpZFxFsKWRVtQJF9xFzBJWKJreSchj/ERrxdspPohWrQcDQ6v3cdtf1370XVvWk5dnhVrqVnprO6b4qiBmbPIC03GsG3kdYnNt77+EXU1ZhcL9EM0dZUBRYJ1lvJH/XRHTOtWZqyesu0HOcp6o7ZrJa97BHih7ymtFzRpNG/eh21+j1ecS1mS6g605capflnOnTVJuKh7ygk183dq21qLbcwdG9DJP6oc/KE6yTCujDJvkTswAXRRloahoMEnh/rCNPlNNqusbR/3dzMn5ZiN6wWNJOTiipSdRPRKKYBfiUMMI95T2fqs0cX7s59Wfh2fVC1kPRp2JPqDM9tnupRx+UdhxaE+rnDp0l7Yo60Yf8A7Q5ecath2astzo0iupb7KN8o/wCvyhlbFnLDzhvJVsU9YAAP6RBwulWOsM6RWTjbCsn+VE+vTrxYzlt2PRNN8LJufXdqVMjBOSAqtLQe3mvHKGPKmSWH3DRnAy+88DxEaUzZ69GaaMUSa3UqUMLQc3pBAjRVS+/JGygsOfUGhtUCk2Mmk75lvy9cJbYtFQmDt+8ljggDOVSK5RQ2JZzmid1ki7NJyaX8xLE5jzhbyisxwPq16UMqeqOdwDfThEKsxujasK0lGXlxp14OKGA9cyn+IhNaNoK50rbOe8r/AOJkGKrk3ZbmhbGlVhM0wbG+ZdG9XqhDaNmL5xXSq69s9BPalU8VQg1kHdDCybQVzWT2r3VrGFfk1D/JE1OTag+oaV/B+aGZ3qMV1jWaoy0ptV5rTkjwTKfH6YSWjZh5yrar96d3N9pF7x+cRBqwzfsu0V6CUOmeGyUN5+CT/wBkWXs3WTLP1UpVJqYFVZ9dEvZtnq5tJ0dX0VDot/JvDx+mLHkQwUNzKSSr6W/iQBmsHcSN8Y8jWOjSPZVymcMIXymcMI5zQIIIIAIIIIAI5p7WiGi28lCy5QUUlwpp9IbSRTEYpURhxjpcT3KvkfLz4Tpy4LooChQSaX0q3g70j8zFoNJ7IatHFbNmy9MbRLxClzJNHaY3CTu44mHE9aSmm2FI5yCHdECXb2zDjgCcRifozWPpPExX/wD4rkm1XkrmK1UcVp7SbpyTwMfD/s8lVpulT1Au+NcYG8pXhyqtUbvkg2Z4s53yVKXXG0OJfUkt0I0lMpxCRl5KMMLWtElmXJD5LgOkqtJv7BShUUp0lKP4mLCR9mso0oLSp+oqBVY3rCvDxSI+nvZxKKShJU9RGVFjgR4eB/SJ/JC7GLIzkdaAvLJbcJLCKk6MkmjgzKcc4OU1opIlzolYsODooPwzHlFlIeziUaNUrf6ITi4MgajJI4mPZj2cyqw2CuY1ElIo4Mi2lGOrwQIj8kLsYsjuTE+2RMJ0KtZlvukfLPj+MOpqdaVfVRTQLKaE7Ou0ZXm2DXpb+MOJH2dyrRJS5MdEJxcGSQQMk+oxkc5ENhF1p5xJuhNXNqLoubsMdmnEHjEOcGxiyK5XTzZfc2v1J6xf1qx4PuhPaM81o1a5OzXvcXlPuHPVpnXIxeWt7PVvLUvnKU1uYaCvQWpWekGd79I9Z9mbRQUvTDqib4GiCWkhKnL9KKCyTU51/CL/AJIJLf3YxYjsa0GNFM5mj17oLPaljvX5Qt5VT7WncIQT1B6o7nVDevyi8Y5AMIC0h6Zos1OunPV4I9AjHO+ziWdUVKdmam7WjieyoqHY4kxX8kMrGDom+T9pNhpOxPvYpsR84n1+qElrWg1zhWxPWyx6pPyqOKo6LLcgZdCQkOzFL+kxcHSvhfhyqkRrP+zSVUorLszWqD1ic0ICU9jgBBckFKxgyf5PWg3oJYaJWDpHVI3uTQ/jCO0bRRzhR0S/ea9W3vYHlHRJTkBLthKUuzNEqvDaDOqz4eLiv0jWd9mkqpV8uzNb1/rE5hN0djgIR5IJ2HBk5Y0+2ZeTBZVmR1aD2JkRbciHApuYITdHOHMCAnNKTkMN8a0vyCYQhtAdmKINU66c9fPV/aK/SHtj2UiWQpCCohSislZqSpVK7huAH4RnOSa0WjFpjeUzhhC+UzhhGRcIIIIAIIIIAIIIIAwTQwhcRDZaaxi5uIAXUgpDHmwg5sIAXUgpDHmwg5sIAXUgpDHmwg5sIAW0ghiZYR881gDQj2kb4lRH1zYQAupBSGPNhBzYQAupBSGPNhBzYQAupBSGPNhBzYQBrSmcMIxIZAjLABBBBAH/2Q=="
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
