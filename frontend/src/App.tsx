import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/App.scss';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<ApplyJob/>}/>
        <Route path='/applications' element={<Applications/>}/>

      </Routes>
    </div>
  )
}

export default App
