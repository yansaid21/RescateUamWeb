import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GeneralRoutes } from './config/routes';
import { Login } from './components/screens/login/login';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {GeneralRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
        ))}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
