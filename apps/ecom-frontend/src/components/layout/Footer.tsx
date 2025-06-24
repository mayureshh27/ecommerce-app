import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons'

export function Footer() {
  return (
    <>
      <footer className="footer bg-secondary border-2 border-t text-base-content p-10">
        <nav>
          <h6 className="footer-title">Help</h6>
          <a href="#" className="link link-hover">Shipping</a>
          <a href="#" className="link link-hover">Returns + Exchanges</a>
          <a href="#" className="link link-hover">FAQ</a>
          <a href="#" className="link link-hover">Compare</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="#" className="link link-hover">About us</a>
          <a href="#" className="link link-hover">Contact</a>
          <a href="#" className="link link-hover">Jobs</a>
          <a href="#" className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a href="#" className="link link-hover">Terms of use</a>
          <a href="#" className="link link-hover">Privacy policy</a>
          <a href="#" className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer bg-secondary text-base-content px-10 py-4">
        <aside className="grid-flow-col items-center">
          <FontAwesomeIcon className="pe-3" icon={faTruckFast} size="3x" />
          <p>
            CodeCake Ltd.
            <br/>
            Providing Ecommerce solutions
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="#" aria-label="Twitter shop">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="#" aria-label="Youtube shop">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="#" aria-label="Facebook shop">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  )
}