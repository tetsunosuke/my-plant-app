import "../styles.css";
import manyPlant from "../img/manyPlant.png";
import money from "../img/money.png";

const MyPagePlantInfo = (props: {
  totalNumbersOfPlants: number;
  totalMoney: number;
}) => {
  const repeatNumber = props.totalNumbersOfPlants;
  const formattedMoney = props.totalMoney.toLocaleString();

  return (
    <div>
      <div className="mypage-plant-inf-container">
        <span className="mypage-plant-info">植物たちの数</span>
        <span className="numbers mypage-number">
          {props.totalNumbersOfPlants}
        </span>
        <div className="mypage-back-plant">
          {Array.from({ length: repeatNumber }).map((_, index) => (
            <img
              src={manyPlant}
              alt={`plant-${index}`}
              className="mypage-backimg "
            />
          ))}
        </div>
        <span className="mypage-plant-info2">植物たちの総額</span>
        <span className="numbers mypage-number2">￥{formattedMoney}</span>
        <div className="mypage-back-plant2">
          <img
            key=""
            src={money}
            alt="money"
            className="mypage-fallMoney-1  "
          />
          <img
            key=""
            src={money}
            alt="money"
            className="mypage-fallMoney-4  "
          />
          <img
            key=""
            src={money}
            alt="money"
            className="mypage-fallMoney-2  "
          />
          <img
            key=""
            src={money}
            alt="money"
            className="mypage-fallMoney-3  "
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default MyPagePlantInfo;
