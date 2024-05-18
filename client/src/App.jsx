import React from 'react';
import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export function ProtectedRoute(props){

  if(localStorage.getItem('checkSpense')){
    return props.children;
  }
  else{
    return <Navigate to='/login'/>
  }

}

export default App;