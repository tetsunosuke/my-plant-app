import happa from "../img/happa.png";
import men from "../img/men.png";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Modal } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import plantPlus2 from "../img/plantPlus2.png";

const UnderBar = (opacityProps: {
  happa: boolean;
  plant2: boolean;
  men: boolean;
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [destination, setDestination] = useState<string | null>(null);
  const location = useLocation();
  const isOnIncreasePlants = location.pathname === "/increase-plants";
  const onClickUnderBarButton = (
    e: React.MouseEvent<HTMLAnchorElement>,
    destination: string
  ) => {
    if (isOnIncreasePlants) {
      setDestination(destination);
      e.preventDefault();
      setVisible(true);
    }
  };
  const handleOk = () => {
    if (destination) {
      navigate(destination);
    }
  };
  const handleCancel = () => {
    if (destination) {
      setVisible(false);
    }
  };

  return (
    <div className="under-bar-container">
      <Modal
        visible={visible}
        centered
        okText="はい"
        cancelText="いいえ"
        onCancel={handleCancel}
        onOk={handleOk}
        style={{
          fontWeight: "bold",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        okButtonProps={{
          style: { backgroundColor: "#78A465", color: "white" },
        }}
      >
        編集内容が失われますが、
        <br />
        遷移しますか?
      </Modal>
      <div
        style={{
          display: "flex",
          gap: "80px",
          padding: "0px 66px",
        }}
      >
        <Link to="/list" onClick={(e) => onClickUnderBarButton(e, "/list")}>
          <img
            src={happa}
            alt=""
            className="under-bar-img-happa"
            style={{
              opacity: opacityProps.happa ? 1 : 0.1,
            }}
          />
        </Link>
        <Link
          to="/increase-plants-home"
          onClick={(e) => onClickUnderBarButton(e, "/increase-plants-home")}
        >
          <img
            src={plantPlus2}
            alt=""
            className="under-bar-img-plant2"
            style={{
              opacity: opacityProps.plant2 ? 1 : 0.3,
            }}
          />
        </Link>
        <Link
          to="/my-page"
          onClick={(e) => onClickUnderBarButton(e, "/my-page")}
        >
          <img
            src={men}
            alt=""
            className="under-bar-img-men"
            style={{
              opacity: opacityProps.men ? 1 : 0.3,
            }}
          />
        </Link>
      </div>
    </div>
  );
};
export default UnderBar;
