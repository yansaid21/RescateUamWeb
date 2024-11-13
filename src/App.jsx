import './App.css';
import 'typeface-fira-sans';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { AdminRoutes, BrigadistRoutes, UserRoutes, GeneralRoutes } from './config/routes';
import { ProtectedAdmin, ProtectedBrigadist, ProtectedUser } from './config/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {GeneralRoutes.map((route, index) => {
          const LayoutComponent = route.Layout || Layout;
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
        
        <Route element={<ProtectedAdmin />}>
          {AdminRoutes.map((route, index) => {
            const LayoutComponent = route.Layout || Layout;
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
        </Route>
        
        <Route element={<ProtectedBrigadist />}>
          {BrigadistRoutes.map((route, index) => {
            const LayoutComponent = route.Layout || Layout;
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
        </Route>

        <Route element={<ProtectedUser />}>
          {UserRoutes.map((route, index) => {
            const LayoutComponent = route.Layout || Layout;
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
