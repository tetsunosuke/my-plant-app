import UnderBar from "../components/UnderBar";
import ImageList from "../components/ImageList";
import "../../src/index.css";
import listBackimg from "../img/list_background.png";

const FavoritePlantsPage = () => {
  const opacityProps = {
    happa: false,
    plant2: false,
    men: true,
  };

  return (
    <div
      style={{
        backgroundImage: `url(${listBackimg})`,
      }}
      className="back-img2"
    >
      <h1 className="pageTitle" style={{ marginTop: "20px" }}>
        お気に入り
      </h1>
      <ImageList favoritePage={true} />

      <UnderBar {...opacityProps} />
    </div>
  );
};
export default FavoritePlantsPage;
