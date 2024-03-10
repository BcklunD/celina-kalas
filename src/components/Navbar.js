import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id='navbar'>
        <NavLink to="/"><h1>Celinas 1-års kalas</h1></NavLink>
        <NavLink to="/" activeclassname="active">Tipspromenad</NavLink>
        <NavLink to="/topp" activeclassname="active">Topplista</NavLink>
    </nav>
  )
}
