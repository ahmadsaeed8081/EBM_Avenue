
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/home';
import Buy4less from './screens/buy4less';
import Stake4pie from './screens/Stake4pie';
import Staking from './screens/Staking';

function App() {
  return (
    <div className=''>
     <Routes>
      <Route path='/'  element={<Home/>} />
      <Route path='/buy4less'  element={<Buy4less/>} />
      <Route path='/stake4pie'  element={<Stake4pie/>} />
      <Route path='/staking'  element={<Staking/>} />
     </Routes>
    </div>
  );
}

export default App;
