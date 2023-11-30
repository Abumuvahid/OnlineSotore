import React, { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../components/http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation();
   const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const click = async () => {
  try{
    let date;
    if (isLogin) {
      date = await login(email, password);
    } else {
      date = await registration(email, password);
      
    }
    user.setUser(user)
    user.setIsAuth(true)
    navigate(SHOP_ROUTE)
  }  catch(e){
    alert(e.response.data.message)
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ window: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-colum">
          <Form.Control
            className="mt-3"
            placeholder="введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Control
            className="mt-3"
            style={{ marginLeft: "10px" }}
            placeholder="введите ваш парол..."
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>

        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
          <Button
            className="align-self-end mt-3 "
            variant="outline-success"
            onClick={click}
          >
            {isLogin ? "Войти" : "Регистрация"}
          </Button>

          {isLogin ? (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              Нет акаунта?{" "}
              <NavLink to={REGISTRATION_ROUTE}>Зарегисрируйтеся</NavLink>{" "}
            </div>
          ) : (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              Есть аккаунт <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
            </div>
          )}
        </Row>
      </Card>
    </Container>
  );
})

export default Auth;
