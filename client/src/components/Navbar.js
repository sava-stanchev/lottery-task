import {Link} from 'react-router-dom';

const NavBar = () => {

    return(
        <header className="main-header">
        <Link to="/home">
          <div className="brand-logo">
            <div href="#home" className="brand-logo-name">LotteryApp</div>
          </div>
        </Link>
        <nav className="main-nav">
        </nav>
      </header>  
    )
};
  
  export default NavBar;
  