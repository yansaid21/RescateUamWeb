import './App.css'
import 'typeface-fira-sans';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GeneralRoutes } from './config/routes';
import { Layout } from 'antd'; // o un layout predeterminado

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {GeneralRoutes.map((route, index) => {
          const LayoutComponent = route.Layout || Layout; // Usa Layout de antd si Layout no está definido
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <LayoutComponent>
                  <route.component />
                </LayoutComponent>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
