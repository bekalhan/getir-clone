import './App.css';
import {Box} from '@mui/material';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import {Stack} from '@mui/material';
import MiddleSide from './components/MiddleSide';
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <BottomNavbar />
      <Switch>
          <Route exact path="/getirmeyenin/kategoriler" component={MiddleSide} />
      </Switch>
    </Box>
    </BrowserRouter>
  );
}

export default App;
