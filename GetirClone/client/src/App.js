import './App.css';
import {Box} from '@mui/material';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import {Stack} from '@mui/material';
import MiddleSide from './components/MiddleSide';
import MyAdress from '../src/components/MyAdress';
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FavouriteProduct from './components/FavauriteProducts';





function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <BottomNavbar />
      <Switch>
          <Route exact path="/getirmeyenin/kategoriler" component={MiddleSide} />
          <Route exact path="/getirmeyenin/hesap/adreslerim" component={MyAdress} />
          <Route exact path="/getirmeyenin/hesap/favoriler" component={FavouriteProduct} />
      </Switch>
    </Box>
    </BrowserRouter>
  );
}


export default App;
