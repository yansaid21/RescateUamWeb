import './App.css'
import 'typeface-fira-sans';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GeneralRoutes } from './config/routes';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {GeneralRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
              <route.Layout>
                <route.component />
              </route.Layout>
              }
            />
        ))}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
