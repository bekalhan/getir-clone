import './App.css';
import {Box} from '@mui/material';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import {Stack} from '@mui/material';
import MiddleSide from './components/MiddleSide';
import MyAdress from '../src/components/MyAdress';
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Register from './components/Register';
import Login from './components/Login';
import PrivateProtectRoute from './ProtectedRoutes/PrivateProtectRoute';
import { useSelector } from "react-redux";
import {  Redirect } from "react-router-dom";
import MyProductInBasket from './components/MyProductInBasket';



function App() {
  const user = useSelector(state => state?.user);
  const { userAuth } = user;
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <Box>
        {userAuth ?(
          <Box>
         <Navbar />
        <BottomNavbar />
          </Box>
        ):null}
      <Switch>
          <Route exact path="/getirmeyenin/kayıtol" component={Register} />
          <Route exact path="/getirmeyenin/girisyap" component={Login} />
          <PrivateProtectRoute exact path="/" />
          <PrivateProtectRoute exact path="/getirmeyenin/kategoriler" component={MiddleSide} />
          <PrivateProtectRoute exact path="/getirmeyenin/hesap/adreslerim" component={MyAdress} />
          <PrivateProtectRoute exact path="/getirmeyenin/sepetim" component={MyProductInBasket} />
      </Switch>
    </Box>
    </BrowserRouter>
  );
}


export default App;
