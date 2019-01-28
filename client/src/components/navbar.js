import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import HamburgerMenu from 'react-hamburger-menu'

const Navbar = ({isLoggedIn, logout, openMenu, handleMenu}) => {
  return (
    <nav>
      <HamburgerMenu
        isOpen={openMenu}
        menuClicked={handleMenu}
        width={18}
        height={15}
        strokeWidth={1}
        rotate={0}
        color="black"
        borderRadius={0}
        animationDuration={0.5}
      />
      <Link to="/">
        <h1>Kiwibis</h1>
      </Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <hr />
    </nav>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleMenu: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
