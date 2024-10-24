import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import bikeimage from "../../assets/bikeimage.jpg";
import Heals from "../../assets/Heals-point.jpg";
import Laptops from "../../assets/laptops.jpg";
import Cycle from "../../assets/cyle.jpg";
import Tshirt from "../../assets/t-shirt.jpg";
import Shoes from "../../assets/Mens-Shoes.jpg";

import { FirebaseContext } from "../../store/FirebaseContext";
import { getDocs, collection } from "firebase/firestore";
import { PostContext } from "../../store/PostProvider"; // Use PostContext with correct case

function Posts() {
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all documents in the 'products' collection
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Include the document ID
        }));
        console.log(allProducts);
        setProducts(allProducts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [db]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product, id) => {
            return (
              <div
                key={id}
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/viewpost");
                }}>
                <div className="favorite">{/* <Heart></Heart> */}</div>
                <div className="image">
                  <img src={product.image} alt="" />
                </div>
                <br />
                <div className="content">
                  <p className="name"> Name: {product.name}</p>
                  <p className="kilometer">Category: {product.category}</p>
                  <p className="rate"> Price: &#x20B9; {product.price} </p>
                </div>
                <br />
                <div className="date">
                  <span style={{ marginRight: "5px" }}>
                    {" "}
                    Date: {product.createdAt.toDate().toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="freshRecommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
          <span>View more</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">{/* <Heart></Heart> */}</div>
            <div className="image">
              <img src={Laptops} alt="" />
            </div>
            <div className="content">
              <p className="rate"> Price: &#x20B9; 270000</p>
              <span className="kilometer"> Category: Laptops</span>
              <p className="name"> Name: MacBook M3</p>
            </div>
            <div className="date">
              <span style={{ marginRight: "5px" }}>Date:10/10/2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">{/* <Heart></Heart> */}</div>
            <div className="image">
              <img src={Cycle} alt="" />
            </div>
            <div className="content">
              <p className="rate"> Price: &#x20B9; 150000</p>
              <span className="kilometer"> Category: Cycle</span>
              <p className="name"> Name: MI N1</p>
            </div>
            <div className="date">
              <span style={{ marginRight: "5px" }}>Date: 17/5/2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">{/* <Heart></Heart> */}</div>
            <div className="image">
              <img src={Tshirt} alt="" />
            </div>
            <div className="content">
              <p className="rate"> Price: &#x20B9; 3000</p>
              <span className="kilometer"> Category: Mens t-shirt</span>
              <p className="name"> Name: t-Shirt</p>
            </div>
            <div className="date">
              <span style={{ marginRight: "5px" }}>Date: 1/7/2024</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">{/* <Heart></Heart> */}</div>
            <div className="image">
              <img src={Shoes} alt="" />
            </div>
            <div className="content">
              <p className="rate"> Price: &#x20B9; 7000</p>
              <span className="kilometer"> Category: Mens Shoes</span>
              <p className="name"> Name: Nike</p>
            </div>
            <div className="date">
              <span style={{ marginRight: "5px" }}>Date: 26/1/2024</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">{/* <Heart></Heart> */}</div>
            <div className="image">
              <img src={Heals} alt="" />
            </div>
            <div className="content">
              <p className="rate"> Price: &#x20B9; 90000</p>
              <span className="kilometer"> Category: Women Chappal</span>
              <p className="name"> Name: Point-Heals</p>
            </div>
            <div className="date">
              <span style={{ marginRight: "5px" }}>Date: 30/5/2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">{/* <Heart></Heart> */}</div>
            <div className="image">
              <img src={bikeimage} alt="" />
            </div>
            <div className="content">
              <p className="rate"> Price: &#x20B9; 250000</p>
              <span className="kilometer"> Category: Two Wheeler</span>
              <p className="name"> Name: VS - 18</p>
            </div>
            <div className="date">
              <span style={{ marginRight: "5px" }}>Date:15/10/2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
