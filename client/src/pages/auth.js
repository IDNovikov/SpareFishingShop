import React, { useContext, useState } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../";
import styles from "./auth.module.css";
import H1Medium from "../components/UI/H1Medium";
import YellowButton from "../components/UI/yellowButton/yellowButton";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const uniAuth = async () => {
    try {
      if (email != "" && password != "") {
        let data;
        if (isLogin) {
          data = await login(email, password);
        } else {
          data = await registration(email, password);
        }
        user.setUser(user);
        user.setIsAuth(true);
        navigate(ADMIN_ROUTE);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div
      style={{
        height: window.innerHeight - 110,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.card}>
        <H1Medium text={isLogin ? "Authorization" : "Registration"} />
        <form
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            marginBottom: "15px",
          }}
        >
          <input
            className={styles.search}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter mail"
          />
          <input
            className={styles.search}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          {/* {isLogin ? (
            <div>
              You don`t have an accaunt?
              <NavLink to={REGISTRATION_ROUTE}> Create accaunt </NavLink>
            </div>
          ) : (
            <div>
              You have an accaunt?
              <NavLink to={LOGIN_ROUTE}> Login </NavLink>
            </div>
          )} */}
        </form>
        <div style={{ width: "100%" }} onClick={uniAuth}>
          <YellowButton
            height={"42px"}
            width={"100%"}
            text={"Login >"}
            fontSize={"20px"}
            fontColor={"Black"}
          />
        </div>
      </div>
    </div>
  );
});

export default Auth;
