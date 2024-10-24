import React, { useContext } from "react";
import "./Header.css";
import { AuthContext } from "../../store/FirebaseContext";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import OlxLogo from "../../assets/OlxSignup.png";
import SearchIcon from "../../assets/search.png";
import Sell from "../../assets/sell.jpg";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {}
  };

  function sell() {
    if (user) {
      navigate("/create");
    } else {
      alert("You're not logged in");
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <img width={60} src={OlxLogo} alt="Olx Logo" />
        </div>
        <div className="placeSearch">
          <select className="dropdown" id="countries" name="countries">
            <option value="IN">India</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AQ">Antarctica</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
          </select>
        </div>
        <div className="productSearch">
          <div className="input">
            <select className="dropdown" id="categories" name="categories">
              <option value="all">All Categories</option>
              <option value="cars">Cars</option>
              <option value="phones">Phones</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
            </select>
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <img src={SearchIcon} alt="Search" /> {/* Add search image */}
          </div>
        </div>
        <div className="language">
          <select className="multiple-lang">
            <option value="en">English</option>
            <option value="ml">മലയാളം (Malayalam)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="es">Español (Spanish)</option>
            <option value="fr">Français (French)</option>
            <option value="de">Deutsch (German)</option>
            <option value="it">Italiano (Italian)</option>
            <option value="zh">中文 (Chinese)</option>
            <option value="ja">日本語 (Japanese)</option>
            <option value="ko">한국어 (Korean)</option>
            <option value="pt">Português (Portuguese)</option>
            <option value="ru">Русский (Russian)</option>
            <option value="ar">العربية (Arabic)</option>
          </select>
        </div>
        <div className="loginPage">
          <span>{user ? ` Welcome, ${user.displayName}` : ""}</span>
        </div>
        <button onClick={handleLogout}>{user ? "Logout" : "Login"}</button>
        <div className="sellMenu">
          <div className="sellMenuContent">
            <img
              src={Sell}
              alt="Sell"
              onClick={sell}
              style={{
                cursor: "pointer",
                width: "80px",
                height: "60px",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
