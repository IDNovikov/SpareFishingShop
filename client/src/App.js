import React, { useContext, useEffect, useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { SpinnerCircular } from "spinners-react";
import Footer from "./components/Footer/Footer";

const App = observer(() => {
  const { user } = useContext(Context);
  const { basket } = useContext(Context);
  const { favorites } = useContext(Context);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const secondComponentRef = useRef(null);

  const scrollToSecondComponent = () => {
    if (secondComponentRef.current) {
      secondComponentRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("secondComponentRef is null");
    }
  };

  useEffect(() => {
    check()
      .then((data) => {
        if (data) {
          user.setUser(true);
          user.setIsAuth(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("basket")) {
      let data = JSON.parse(localStorage.getItem("basket"));
      basket.setBasket(data);
    }
    if (localStorage.getItem("favorites")) {
      let data = JSON.parse(localStorage.getItem("favorites"));
      favorites.setFavorites(data);
    }
  });
  if (loading) {
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <SpinnerCircular
          size={200}
          thickness={150}
          color={"#e0d900"}
          secondaryColor={"rgba(0,0,0,0.7)"}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar scrollToSecondComponent={scrollToSecondComponent} />
      <AppRouter ref={secondComponentRef} />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
