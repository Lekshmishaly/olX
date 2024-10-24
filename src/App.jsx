import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Create from "./pages/Create";
import ViewPost from "./pages/ViewPost";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Post from "./store/PostProvider";

function App() {
  const { setuser } = useContext(AuthContext);
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
    return () => unsubscribe();
  }, [setuser]);

  return (
    <>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/viewpost" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </>
  );
}

export default App;
