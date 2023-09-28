import React, { useState } from "react";

const MessageForm = ({ postId, token }) => {
  const COHORT_NAME = "2302-acc-pt-web-pt-b";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const [messageContent, setMessageContent] = useState("");

  const postMessage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: messageContent,
          },
        }),
      });
      const result = await response.json();
      console.log(result);

      // Clear the message input field after sending
      setMessageContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="messageContent">Message</label>
        <textarea
          className="form-control"
          id="messageContent"
          name="messageContent"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    </form>
  );
};

export default MessageForm;