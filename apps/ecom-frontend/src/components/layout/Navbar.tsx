import { Link, useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useCategories } from '@/hooks/useApi'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export function Navbar() {
  const navigate = useNavigate()
  const { data: categories } = useCategories()
  const { user, isAuthenticated, logout, hasAuthority } = useAuthStore()
  const totalItems = useCartStore(state => state.getTotalItems())

  const handleLogin = () => {
    // Implement OAuth login logic here
    console.log('Login clicked')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <Link to="/" className="btn btn-ghost text-xl">
            <div className="border-1 bg-secondary logo p-2 rounded-xl">EC</div>
          </Link>
        </div>
      </div>
      
      <div className="navbar-center flex">
        <div className="menu menu-sm sm:menu-lg menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li>
            <details>
              <summary>Products</summary>
              <ul className="z-30">
                {categories?.content.map(category => (
                  <li key={category.publicId}>
                    <Link 
                      to="/products" 
                      state={{ category: category.publicId }}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          {isAuthenticated && hasAuthority('ROLE_ADMIN') && (
            <li>
              <details>
                <summary>Admin</summary>
                <ul className="z-30">
                  <li><Link to="/admin/categories">Categories</Link></li>
                  <li><Link to="/admin/products">Products</Link></li>
                  <li><Link to="/admin/orders">Orders</Link></li>
                </ul>
              </details>
            </li>
          )}
        </div>
      </div>
      
      <div className="navbar-end pe-4 flex align-items-center">
        <div className="dropdown dropdown-end pe-4">
          <div tabIndex={0} role="button">
            {isAuthenticated && user?.imageUrl ? (
              <div className="border border-solid rounded-full">
                <img 
                  src={user.imageUrl} 
                  alt="user-avatar"
                  className="avatar-unknown rounded-full" 
                  width="45px" 
                />
              </div>
            ) : (
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
            )}
          </div>
          {isAuthenticated ? (
            <ul className="dropdown-content menu menu-lg bg-base-100 rounded-box z-10 w-52 p-2 shadow">
              <li>
                <Link to="/users/orders">My Orders</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul className="dropdown-content menu menu-lg bg-base-100 rounded-box z-10 w-52 p-2 shadow">
              <li>
                <button onClick={handleLogin}>Login</button>
              </li>
            </ul>
          )}
        </div>
        
        <Link to="/cart" className="dropdown dropdown-end me-2">
          <div tabIndex={0} role="button">
            <div className="indicator">
              <span className="indicator-item badge badge-primary">{totalItems}</span>
              <FontAwesomeIcon icon={faCartShopping} className="menu-icon" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}