import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Header from './Header';
import Offer from './home/Offer';
import StudyRooms from './home/StudyRooms';
import Reviews from './home/Reviews';
import Cta from './login_register/Cta';
import Footer from './Footer';
import Matching from './Study-Group/Matching';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import About from './About-us/About';
import LoginPage from './login_register/LoginPage'
import { AuthContextProvider } from './useContext/LoginContext';
import Profile from './Profile/Profile';
import './css/login.css';

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
  <AuthContextProvider>
  <BrowserRouter>
    <React.StrictMode>
    <Header></Header>
      <Routes>
          <Route path='/' element={
            <>
              <Offer></Offer>
              <StudyRooms></StudyRooms>
              <Reviews></Reviews>
              <Cta></Cta>
              <Footer></Footer>
            </>
          }></Route>

          <Route path='studygroups' element={
            <>
            <Matching></Matching>
            <Cta></Cta>
            <Footer></Footer>
            </>
          }></Route>

          <Route path='about' element={
            <>
            <About></About>
            <Cta></Cta>
            <Footer></Footer>
            </>
          }></Route>

          <Route path='login' element={
            <LoginPage></LoginPage>
          }></Route>

          <Route path='profile' element={
            <>
            <Profile></Profile>
            <Cta></Cta>
            <Footer></Footer>
            </>
          }></Route>

          

        </Routes>

    </React.StrictMode>
  </BrowserRouter>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
