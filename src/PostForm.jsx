import React, { useState } from "react";

const PostForm = () => {
  const token = sessionStorage.getItem("token");
  const COHORT_NAME = "2302-acc-pt-web-pt-b";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const [post, setPost] = useState({
    title: "",
    description: "",
    price: "",
    willDeliver: true,
  });

  const makePost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: post,
        }),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await makePost();
  };
  const handleRefreshClick = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Post a Form</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="Enter the title"
                      value={post.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Enter the description"
                      value={post.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Enter the price"
                      value={post.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="willDeliver">Will Deliver?</label>
                    <input
                      type="checkbox"
                      className="form-control"
                      id="willDeliver"
                      name="willDeliver"
                      checked={post.willDeliver}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}
                  >
                    Post
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleRefreshClick}
                  >
                    refresh Page
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;