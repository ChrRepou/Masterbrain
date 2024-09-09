import Tilt from "react-parallax-tilt";
import './Logo.css';
import brain from './brain.png'

const Logo = (props) => {
  return (
    <div className="ma4 mt0">
      <Tilt tiltAxis={'x'}>
        <div className="br2 shadow-2" style={{ height: "150px", width: "150px", background: "linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)"}}>
          <div className="pa3" role="img"><img style={{paddingTop: "5px"}} src={brain} alt="brain logo" /></div>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
