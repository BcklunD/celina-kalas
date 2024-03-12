import NamnSelector from './components/NamnSelector';
import Tipspromenad from './components/Tipspromenad';
import Topplista from './components/Topplista';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router';

function App() {
  const location = useLocation();

  // localStorage.removeItem('person');
  const person = JSON.parse(localStorage.getItem('person'));
  if (person === null)
    return <NamnSelector />;

  return (
    <>
      <Navbar />
      <div id='content'>
        <Routes key={location.pathname.split("/")[1]} location={location}>
          <Route exact path="/" element={<Tipspromenad/>}/>
          <Route exact path="/topp" element={<Topplista/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
