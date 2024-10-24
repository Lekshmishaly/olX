import React, { useState, useContext } from "react";
import "./Signup.css";
import OlxSignup from "../../assets/OlxSignup.png";
import { FirebaseContext } from "../../store/FirebaseContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const navigateLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);

      await updateProfile(user, {
        displayName: username,
      });

      console.log("User signed up with displayName:", user.displayName);

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username,
        email,
        phone,
      });

      console.log("User data added to Firestore");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <h1>Signup</h1>
        <img className="singup-image" src={OlxSignup}></img>
        <form onSubmit={handleSubmit}>
          <label className="labels" htmlFor="fname">
            Username
          </label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label className="labels" htmlFor="fname">
            Email
          </label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label className="labels" htmlFor="lname">
            Phone
          </label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label className="labels" htmlFor="lname">
            Password
          </label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={navigateLogin}>Login</a>
      </div>
    </div>
  );
}
