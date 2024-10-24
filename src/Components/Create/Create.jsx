import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/FirebaseContext";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, Storage } from "../../firebase/config";
import { Navigate } from "react-router-dom";

const Create = () => {
  const Navigate = useNavigate();
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = async () => {
    if (!user) {
      console.log("User not authenticated!");
      return;
    }

    try {
      if (image) {
        const imageRef = ref(Storage, `/image/${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);

        await addDoc(collection(db, "products"), {
          name,
          category,
          price,
          image: url,
          userId: user.uid,
          createdAt: new Date(),
        });
        console.log(url);

        alert("Product added");
        Navigate("/");
      } else {
        console.log("Please add an image");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <h1>Add Items</h1>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />

          <br />
          <img
            className="add-image"
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}></img>

          <br />
          <br />
          <input
            className="choose-image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
