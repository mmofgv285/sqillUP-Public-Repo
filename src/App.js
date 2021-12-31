import logo from './logo.svg';
import './App.css';
import PricePlan from './pages/PricePlan/PricePlan';
import NavBar from './assets/layout/navbar';
import Footer from './assets/layout/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignInAndSignUp/SignIn';
import SignUp from './pages/SignInAndSignUp/SignUp';
import ResetPassword from './pages/SignInAndSignUp/ResetPassword';
import AddBillingInfo from './pages/Billing/AddBillingInfo';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PricePlan />}/>
          <Route path="signin" element={<SignIn />}/>
          <Route path="reset-password" element={<ResetPassword />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="billing" element={<AddBillingInfo />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
