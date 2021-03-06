import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logingOut } from '../services/authAPI'

const Navbar = ({ isLogged, logingOut, history }) => {

    const handleLogout = () => {
        logingOut()
        history.replace('/login')
    }

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                  Share a story
              </Link>

              <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                 data-target="navbarBasicExample">
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true"> </span>
              </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                  <Link className="navbar-item" to="/">
                      Home
                  </Link>

                  <NavLink className="navbar-item" to="/stories">
                      Stories
                  </NavLink>

                  <div className="navbar-item">
                      <NavLink className="button is-info" to="/stories/new">
                          Share my story
                      </NavLink>
                  </div>
              </div>

              <div className="navbar-end">
                  <div className="navbar-item">
                      <div className="buttons">
                          {isLogged ? <button onClick={handleLogout} className="button is-danger">Log out</button>
                            :
                            <>
                                <NavLink to="/signup" className="button is-primary">
                                    Sign up
                                </NavLink>
                                <NavLink to="/login" className="button is-light">
                                    Log in
                                </NavLink>
                            </>
                          }
                      </div>
                  </div>
              </div>
          </div>
      </nav>
    )
}

const mapStateToProps = (state) => ({
    isLogged: state.authReducer.isLogged
})

export default connect(mapStateToProps, { logingOut })(Navbar)

// Toggle menu on mobile
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target
                const $target = document.getElementById(target)

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active')
                $target.classList.toggle('is-active')

            })
        })
    }

})