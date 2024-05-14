import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// Добавить хранение в куках
export const Auth = createAsyncThunk(
  "AcyncSlice/Auth",
  async function  (data) {
    console.log(data);
    const [email,password] = data
    let token
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

    // document.cookie = "user=John";
    // alert(document.cookie);
    localStorage.setItem("test", token.accessToken)
  }
)

//
//
//
const AcyncSlice = createSlice({
  name: "AcyncSlice",
  initialState: {
    error: true,
  },
  reducers: {
    // Меняем границы по клику фокуса
    //  Валидация по клику
    test(state, action) {
    },
    error(state, action) {},
  },
})
export const { test, error } = AcyncSlice.actions
export default AcyncSlice.reducer
