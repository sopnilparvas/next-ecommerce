import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";

function Navbar() {
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);

  const { auth } = state;

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand'>RongDhonu</a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse justify-content-end' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link href='/cart'>
                <a className={`nav-link ${router.pathname === "/cart" ? "active" : ""}`}>
                  <i className='fas fa-shopping-bag'></i> Cart
                </a>
              </Link>
            </li>

            {Object.keys(auth).length === 0 ? (
              <li className='nav-item'>
                <Link href='/login'>
                  <a className={`nav-link ${router.pathname === "/login" ? "active" : ""}`}>
                    <i className='fas fa-user-tie'></i> Login
                  </a>
                </Link>
              </li>
            ) : (
              <li className='nav-item dropdown'>
                <a
                  className='nav-link'
                  href='#'
                  id='navbarDropdownMenuLink'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  style={{
                    border: "2px solid #ccc",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginTop: "5px",
                    lineHeight: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {auth.user.name.charAt(0).toUpperCase()}
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                  <li>
                    <Link href='/profile'>
                      <a className='dropdown-item'>My Profile</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/logout'>
                      <a className='dropdown-item'>Logout</a>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
