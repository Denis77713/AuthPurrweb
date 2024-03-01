import './style/App.css';
import SingIn from './pages/SingUp/SingUp';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Main from './pages/Main/Main';
import Navigation from './components/Navigation/Navigation';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Navigation/>}>
      <Route index  element = {<Main/>}/>
      <Route path='/singin'  element = {<SingIn/>}/>
      {/* <Route path='*'  element = {<Error/>}/> */}
    </Route>
  )
)
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
