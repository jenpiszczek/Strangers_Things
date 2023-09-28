import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import MessageForm from "./MessageForm";

const Home = () => {
  const COHORT_NAME = "2302-acc-pt-web-pt-b";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const token = sessionStorage.getItem("token");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        console.log(result);
        setData(result.data.posts);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [BASE_URL, token]);

  const checkIfUserIsAuthor = (post) => {
    return post.isAuthor;
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setData((prevData) => prevData.filter((post) => post._id !== postId));
      } else {
        console.error("Failed to delete post.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the post.", error);
    }
  };

  const handleShowMessageForm = (postId) => {
    setSelectedPost(postId);
    setShowMessageForm(true);
  };
  const postMatches = (post, text) => {
    return (
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.description.toLowerCase().includes(text.toLowerCase())
    );
  };

  // Update the filteredPosts based on the searchTerm
  const filteredPosts = data.filter((post) => postMatches(post, searchTerm));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PostForm />
      <div>
        {/* Add the search input field */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredPosts.map((post) => {
          const isAuthor = checkIfUserIsAuthor(post);
          const isCurrentUser =
            post.author.username === sessionStorage.getItem("username");

          return (
            <div key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {isAuthor && (
                <div>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
              {!isCurrentUser && (
                <button
                  onClick={() => handleShowMessageForm(post._id)}
                  className="btn btn-primary"
                >
                  Message
                </button>
              )}
            </div>
          );
        })}
      </div>
      {showMessageForm && (
        <MessageForm
          postId={selectedPost}
          token={token}
          onClose={() => setShowMessageForm(false)}
        />
      )}
    </>
  );
};

export default Home;