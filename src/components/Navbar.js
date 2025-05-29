import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id='navbar'>
        <NavLink to="/">
          <div className='navbar-title'>
            <h1>Hanna</h1>
            <p>30-års poolparty</p>
          </div>
        </NavLink>
        <NavLink to="/" activeclassname="active">Tipspromenad</NavLink>
        <NavLink to="/topp" activeclassname="active">Topplista</NavLink>
    </nav>
  )
}
