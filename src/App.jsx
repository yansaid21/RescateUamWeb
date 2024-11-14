import './App.css';
import 'typeface-fira-sans';
import { router } from './config/routes';
import { RouterProvider } from 'react-router-dom';

function App() {


  return (
    <RouterProvider router={router} />
  );
}

export default App;
