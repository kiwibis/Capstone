import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import HamburgerMenu from 'react-hamburger-menu'

const Navbar = ({isLoggedIn, logout, menuOpen, toggleMenu}) => {
  return (
    <div>
      <nav id="nav-bar">
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />

            <span />
            <span />
            <span />

            <ul id="menu">
              {isLoggedIn ? (
                <div id="menu-link-list">
                  {/* The navbar will show these links after you log in */}
                  <button onClick={logout}>Logout</button>
                </div>
              ) : (
                <div id="menu-link-list">
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
              )}
            </ul>
          </div>
        </nav>
        <div id="title-container">
          <Link to="/">
            <h1 id="title">Kiwi</h1>
          </Link>
        </div>
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
