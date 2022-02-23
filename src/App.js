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
import AddStudent from './pages/AddStudent/AddStudent';
import MyProfile from './pages/Dashboard/MyProfile';
import StudentProfile from './pages/Dashboard/StudentProfile'; 
import GrowthScore from './pages/Dashboard/GrowthScore'; 
import GrowRewards from './pages/Dashboard/GrowthRewards'; 
import SubscriptionPlan from './pages/Dashboard/SubscriptionPlan'; 
import SubscriptionBilling from './pages/Dashboard/SubscriptionBilling';
import PurchaseHistory from './pages/Dashboard/PurchaseHistory';


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
          <Route path="add-student" element={<AddStudent />}/>
          <Route path="my-profile" element={<MyProfile />}/>
          <Route path="student-profile" element={<StudentProfile />}/>
          <Route path="growth-score" element={<GrowthScore />}/>
          <Route path="growth-rewards" element={<GrowRewards />}/>
          <Route path="subscription-plan" element={<SubscriptionPlan />}/> 
          <Route path="subscription-billing" element={<SubscriptionBilling />}/>
          <Route path="purchase-history" element={<PurchaseHistory />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
