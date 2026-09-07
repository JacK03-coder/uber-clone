import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/home';
import UserLogin from './assets/pages/userLogin';
import UserSignup from './assets/pages/userSingnup';
import CaptainLogin from './assets/pages/captainLogin';
import CaptainSignup from './assets/pages/captainSignup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  );
};

export default App; 