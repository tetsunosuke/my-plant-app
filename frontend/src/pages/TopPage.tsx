import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import plant1 from "../img/plant1.png";
import { Button } from "@douyinfe/semi-ui";
import axios from "axios";

const TopPage = () => {
  const navigate = useNavigate();

  const login = async () => {
    navigate("/login");
  };

  return (
    <div className="top-page">
      <div className="top-page-container">
        <img src={plant1} alt="植物" className="top-page-icon" />
        <span className="top-page-title">ぼくの植物じてん</span>
        <Button onClick={login} className="white-button">
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default TopPage;
