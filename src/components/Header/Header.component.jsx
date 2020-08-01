import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.styles.scss';
import CartDropdown from '../CartDropdown/CartDropdown.component';
import CartIcon from '../CartIcon/CartIcon.component';
import { ReactComponent as Logo } from '../../../src/assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
// import Logo from '../../../src/assets/crown.svg';

const Header = ({currentUser, hidden}) => (
  <header className="navbar">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
      {/* <img src={Logo} alt=""/> */}
    </Link>
    <nav className="navbar-nav">
      <Link to="/shop" className="nav-item">Shop</Link>
      {
        currentUser ?
          (<div tabIndex="0" role="link" className="nav-item" onClick={(e) => {
            e.preventDefault();
            auth.signOut();
            window.location.pathname = '/';
          }}>Sign Out</div>) :
          ( <Link className="nav-item" to="/register">Sign In</Link> )

      }
      <Link to="/contact" className="nav-item">Contact</Link>
      <CartIcon />
    </nav>
    {(
      !hidden ?
      <CartDropdown /> :
      null
    )}

  </header>
);

const mapStateToProps = ({ user: { currentUser }, cart: {hidden}}) => ({
  currentUser,
  hidden
});

export default connect(mapStateToProps, null)(Header);