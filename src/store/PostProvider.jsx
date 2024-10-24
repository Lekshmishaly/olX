import { createContext, useState } from "react";

// Create the context (make sure the naming matches your imports)
export const PostContext = createContext(null);

function PostProvider({ children }) {
  // Define state for postDetails and the setter function
  const [postDetails, setPostDetails] = useState(null);

  // Provide both postDetails and setPostDetails as an object
  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
