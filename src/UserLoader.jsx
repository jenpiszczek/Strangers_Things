import React, { useState, useEffect } from "react";

const UserLoader = ({ token }) => {
  const COHORT_NAME = "2302-acc-pt-web-pt-b";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          // Set the user object in state if the request is successful
          setUser(result.data);
          console.log(result);
        } else {
          // Handle error here
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data.", error);
      }
    };

    // Check if a token exists in sessionStorage
    if (token) {
      fetchUser();
    }
  }, [BASE_URL, token]);

  return (
    <div>
      {user && (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <h3>Your Messages</h3>
          {user.messages.map((message) => (
            <div key={message._id}>
              <p>{message.content}</p>
            </div>
          ))}
          <h3>Your Posts</h3>
          {user.posts.map((post) => (
            <div key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {/* Render messages for each post */}
              {post.messages.map((postMessage) => (
                <div key={postMessage._id}>
                  <p>{postMessage.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserLoader;