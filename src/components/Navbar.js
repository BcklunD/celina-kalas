import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id='navbar'>
        <NavLink to="/">
          <div className='navbar-title'>
            <h1>Celina</h1>
            <p>1-års kalas</p>
          </div>
        </NavLink>
        <NavLink to="/" activeclassname="active">Tipspromenad</NavLink>
        <NavLink to="/topp" activeclassname="active">Topplista</NavLink>
    </nav>
  )
}
