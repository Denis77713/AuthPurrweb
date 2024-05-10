import React, { useState } from "react"
import Form from "../../components/Form/Form"
import { handleClickValidation } from "../../store/Slice/SingInSlice"

function SingIn() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  //
  const arrState = [name, surname]
  const Inputs = [
    {
      id: 0,
      state: name,
      set: setName,
      name: "email",
      placeholder: "example@mail.ru",
      label: "Электронная почта",
      type: "email",
    },
    {
      id: 1,
      state: surname,
      set: setSurname,
      name: "password",
      placeholder: "Введите 8 значный пароль",
      label: "Пароль",
      type: "password",
    },
  ]
  //
  const bottomText = {
    bool: true,
    text: "Еще нет аккаунта?",
    href: "Зарегистрироваться",
    url: "/singup",
  }
  // login
  let token
  async function onSubmit(email,password) {
    const auth = {
      email: email,
      password: password,
    }

    const URL =
      "http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com/auth/login"

    await fetch(URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    })
      .then((response) => response.json())
      .then((data) => (token = data))

    console.log(token)
    localStorage.setItem("test", token.accessToken)
  }
// path
// Использовать при запуске приложения, будет выдавать данные
function Editing() {
  const body = {
    // Пароль можно поменять
    password: "asdasdasda"
  };
  console.log(JSON.stringify(body));

  const URL =
    "http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com/users";
  //
  //
  fetch(URL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.refreshToken}`,
      "API-Key": "secret",
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "PATCH",
      "Access-Control-Allow-Headers": "Content-Type,Authorization,accept",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  console.log(token.refreshToken === token.accessToken);
}
  return (
    <>
      <Form
        Inputs={Inputs}
        arrState={arrState}
        title={"Авторизация"}
        bottomText={bottomText}
        handleClickValidation={(handleClickValidation)}
        onSubmit={()=>onSubmit(name,surname)}
      />
    </>
  )
}

export default SingIn
