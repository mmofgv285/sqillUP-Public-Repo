import logo from './logo.svg';
import './App.css';
import PricePlan from './pages/PricePlan/PricePlan';
import NavBar from './assets/layout/navbar';
import Footer from './assets/layout/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignInAndSignUp/SignIn';
import SignUp from './pages/SignInAndSignUp/SignUp';
import AddBillingInfo from './pages/Billing/AddBillingInfo';

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PricePlan />}/>
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="billing" element={<AddBillingInfo />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
