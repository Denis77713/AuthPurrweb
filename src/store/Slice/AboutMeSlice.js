import { createSlice, current } from "@reduxjs/toolkit";
import styles from "../../components/Input/InputStyle/input.module.css"

const AboutMeSlice = createSlice({
    name:"AboutMe",
    initialState:{
         singUp:{},
         phone:"",
         classes: [styles.none,styles.none,styles.none],
    },
    reducers:{
      // Приводит данные к нормальному виду для отправки и сохроняет в объекте SingUp
        handleClickValidation(state,actions){
          const newArr = [styles.unsuccessfully,styles.unsuccessfully,styles.unsuccessfully]
          const [name,surname] = actions.payload
          const phone = state.phone.replaceAll(" ","").replaceAll("+","")
          
          if(state.phone.length === 16)newArr[2] = styles.successfully
          if(name.length > 0)newArr[0] = styles.successfully
          if(surname.length > 0)newArr[1] = styles.successfully
        
          state.classes = [...newArr]
          const data = current(state.singUp)
          
          const dataObj = {
            email:data.email,
            name:name,
            surname:surname,
            phone:phone,
            password:data.password,
          }
          state.singUp = dataObj
        },
        // Берет email и password из SingUp и записывает в объект SingUp тут.
        dataInAboutMe(state,actions){
          const {email,password} = actions.payload 
            state.singUp = {email,password}
        },
        // Валидация телефона
        phoneValidation(state,actions){
            
        let phone = actions.payload[0].split("")
        if(actions.payload[1] !== "Backspace"){
          if(phone[0] === "7"||phone[0]==="+") {
            if (phone.length > 2 && phone.length < 4)phone[2] = ` ${phone[2]}`
            if (phone.length > 6 && phone.length < 8)phone[6] = ` ${phone[6]}`
            if (phone.length > 10 && phone.length < 12)phone[10] = ` ${phone[10]}`
            if (phone.length > 13 && phone.length < 16)phone[13] = ` ${phone[13]}`
        }
      }

        if(actions.payload[1] === "Backspace"){
          if(phone[phone.length-1]===" " || phone[phone.length-1]==="+") phone.pop()
          if(phone[phone.length-2]==="+" && phone[phone.length-1]==="7") phone.length = 0
        }
        if(actions.payload[1] === " ") phone.pop()
        
        let num
        
        const arr = ["1","2","3","4","5","6","7","8","9","0","+7"]
        const arr2 = ["1","2","3","4","5","6"]
        
        if(phone.length >= 1){
          num = phone[phone.length - 1].replaceAll(" ","")
          if(!arr.includes(num)) phone.pop()
            // При первом нажатии в начало ставится +7 и потом нажатай кнопка 9
          if(arr.includes(num) && phone.length <= 4 && actions.payload[1] !== "Backspace") phone = ["+7 ",phone[0]]
            
          }
          // Первая цифра после +7 будет больше значений arr2 
          arr2.forEach(i => {
            if(phone[1] === i){
              phone.length = 0
            }
          });
          if(phone.length > 16) phone.pop()
          phone = phone.join("")
          state.phone = phone
        },
        // Имя и фамилия с большой буквы
        nameAndSurname(state,actions){
          const first = actions.payload[0].toUpperCase()
          let word = actions.payload.split("")
          word[0] = first
          word = word.join("")
          actions.payload = word
        },
        // Вывод данных которые вытащили из SingUp и отправили в этот редюсер
        check(state,actions){
          console.log(current(state.singUp))
        },
        // Зарос на отправку данных на сервер
        post(state,action){
          let data = current(state.singUp)
          console.log(data)
          console.log(JSON.stringify(data))
          const URL =
            "http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com/auth/register";
          fetch(URL, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            }).then((response) =>console.log(response))
          
        }

    }
})
export let {handleClickValidation,dataInAboutMe,phoneValidation,nameAndSurname,check,post} = AboutMeSlice.actions
export default AboutMeSlice.reducer