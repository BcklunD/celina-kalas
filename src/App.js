import NamnSelector from './components/NamnSelector';
import Tipspromenad from './components/Tipspromenad';

function App() {
  // localStorage.removeItem('person');
  console.log(`person:`, localStorage.getItem('person'));
  const person = localStorage.getItem('person');
  return (
    <div id='content'>
      {person === null ? <NamnSelector /> : <Tipspromenad id={person.id} />}
    </div>
  );
}

export default App;
