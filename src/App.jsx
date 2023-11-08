import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import {  } from "./components/PrivateRoute";
import { Profile } from "./pages/Profile"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { ForgotPassword } from "./pages/ForgotPassword"
import  Deals from "./pages/Deals"
import { Header } from "./components/Header"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute"
import { List } from "./pages/List"
import { EditListing } from "./pages/EditListing";
import Listing  from "./pages/Listing";


const App = () => {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/category/:categoryName/:listingId" element={<Listing />}></Route>
        <Route path="/deals/category/:categoryName/:listingId" element={<Listing />}></Route>
        <Route path="/profile/category/:categoryName/:listingId" element={<Listing />}></Route>
        <Route path="/deals" element={<Deals />}></Route>
        <Route path="/list" element={<PrivateRoute />}>
          <Route path="/list" element={<List />}></Route>
        </Route>
        <Route path="/edit-listing" element={<PrivateRoute />}>
          <Route path="/edit-listing/:listingId" element={<EditListing />}></Route>
        </Route>
      </Routes>
    </Router>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"  
      />  
    </>
  )
}

export default App
