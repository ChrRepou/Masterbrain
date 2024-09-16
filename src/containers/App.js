import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [faceBoxes, setFaceBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    entries: 0,
    joined: "",
  });

  useEffect(() => {
    fetch("https://masterbrain-api.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const loadUser = (userData) => {
    setUser(userData);
    console.log("User:", userData);
  };

  const _onRouteChange = (route) => {
    setRoute(route);
    if (route === "home") setIsSignedIn(true);
    else setIsSignedIn(false);
    if (route === "signout") setImageUrl("");
  };

  const _onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    let calculationData = [];

    for (const region of data) {
      const regionData = region.region_info.bounding_box;
      calculationData.push({
        leftColumn: regionData.left_col * width,
        topRow: regionData.top_row * height,
        rightColumn: width - regionData.right_col * width,
        bottomRow: height - regionData.bottom_row * height,
      });
    }

    setFaceBoxes(calculationData);
  };

  const _onSubmit = () => {
    setImageUrl(input);

    fetch("https://masterbrain-api.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result:", result);
        if (result) {
          fetch("https://masterbrain-api.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.id) loadUser(data);
            })
            .catch(console.log);
        }
        calculateFaceLocation(result.outputs[0].data.regions);
      })
      .catch(console.log);
  };

  return (
    <div className="App pt2">
      <div className="flex justify-between">
        <ParticlesBg type="cobweb" color={"#FFFFFF"} bg={true} />
        <Logo />
        <Navigation onRouteChange={_onRouteChange} isSignedIn={isSignedIn} />
      </div>
      {route === "home" ? (
        <>
          <Rank username={user.username} rank={user.entries} />
          <ImageLinkForm onInputChange={_onInputChange} onSubmit={_onSubmit} />
          <FaceRecognition faceBoxes={faceBoxes} imageUrl={imageUrl} />
        </>
      ) : route === "register" ? (
        <Register onRouteChange={_onRouteChange} loadUser={loadUser} />
      ) : (
        <SignIn onRouteChange={_onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
