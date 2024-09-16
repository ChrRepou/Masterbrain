import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id={"inputImage"}
          src={imageUrl}
          alt=""
          width={"350px"}
          height={"auto"}
        />
        {faceBoxes.map((box, i) => {
          return (
            <div
              className="bounding-box"
              key={`box-${i}`}
              style={{
                top: box.topRow,
                bottom: box.bottomRow,
                right: box.rightColumn,
                left: box.leftColumn,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
