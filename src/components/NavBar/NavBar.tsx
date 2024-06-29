import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>Quote Center</NavLink>
      </div>
      <div className='collapse navbar-collapse'>
        <ul className='nav navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>
              Quotes
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/add-quote'>
              Submit new quote
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );

};

export default NavBar;