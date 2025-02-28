import "../styles.css";
import heart1 from "../img/heart1.png";
import list from "../img/list.png";
import { useNavigate } from "react-router-dom";

const MyPagePlantList = () => {
  const navigate = useNavigate();

  const clickFavorite = () => {
    navigate("/favorite");
  };
  const clickWishListe = () => {
    navigate("/want");
  };
  return (
    <div className="mypage-square-container">
      <button onClick={clickFavorite} className="mypage-square-button">
        <span className="mypage-square-button-text">お気に入り</span>
        <img src={heart1} alt="" className="mypage-img1 " />
      </button>
      <button onClick={clickWishListe} className="mypage-square-button">
        <span className="mypage-square-button-text">欲しい植物</span>
        <img src={list} alt="" className="mypage-img2 " />
      </button>
    </div>
  );
};
export default MyPagePlantList;
