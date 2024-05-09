import './style/App.css';
import SingUp from './pages/SingUp/SingUp';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Main from './pages/Main/Main';
import Navigation from './components/Navigation/Navigation';
import AboutMe from './pages/AboutMe/AboutMe';
import SingIn from './pages/SingIn/SingIn';
import { useEffect } from 'react';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Navigation/>}>
      <Route path='/' element = {<Main/>}/>
      <Route path='/singup'  element = {<SingUp/>}/>
      <Route path='/singin'  element = {<SingIn/>}/>
      <Route path='/aboutme'  element = {<AboutMe/>}/>
      {/* <Route path='*'  element = {<Error/>}/> */}
    </Route>
  )
)
function App() {
  useEffect(()=>{
    console.log(123)
  },[])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
