const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim white underline pa3 pointer"
          onClick={() => onRouteChange("signout")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim white underline pa3 pointer"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
        <p
          className="f3 link dim white underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
      </nav>
    );
  }
};

export default Navigation;
