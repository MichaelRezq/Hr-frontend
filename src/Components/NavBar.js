import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, BrowserRouter as Router } from "react-router-dom";

const NavBar = () => {
  if (localStorage.getItem("access_token")) {
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link className="text-decoration-none text-white" to="/">
                  Hr System
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Brand>
                  <Navbar.Brand>
                    <Link className="text-decoration-none text-white" to="/">
                      Home
                    </Link>
                  </Navbar.Brand>

                  <Link
                    className="text-decoration-none text-white"
                    to="/Employee"
                  >
                    Employee
                  </Link>
                </Navbar.Brand>
                <Navbar.Brand>
                  <Link
                    className="text-decoration-none text-white"
                    to="/Logout"
                  >
                    Logout
                  </Link>
                </Navbar.Brand>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand>
                <Link className="text-decoration-none text-white" to="/">
                  Hr System
                </Link>
              </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Brand>
                <Link className="text-decoration-none text-white" to="/Signup">
                  Signup
                </Link>
              </Navbar.Brand>
              <Navbar.Brand>
                <Link className="text-decoration-none text-white" to="/Login">
                  Login
                </Link>
              </Navbar.Brand>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </Router>
  );
};

export default NavBar;
