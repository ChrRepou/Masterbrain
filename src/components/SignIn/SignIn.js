import { useState } from "react";

const SignIn = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmitSignIn = (event) => {
    event.preventDefault();
    const body = JSON.stringify({ email, password });
    console.log("body:", body);
    fetch("https://masterbrain-api.onrender.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
          onRouteChange("home");
        }
      })
      .catch(console.log);
  };

  return (
    <article
      className={
        "br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
      }
    >
      <main className={"pa4 black-80"}>
        <form className={"measure"}>
          <fieldset id="sign_up" className={"ba b--transparent ph0 mh0"}>
            <legend className={"f1 fw6 ph0 mh0"}>Sign In</legend>
            <div className={"mt3"}>
              <label className={"db fw6 lh-copy f6"} htmlFor="email-address">
                Email
              </label>
              <input
                className={
                  "pa2 input-reset ba bg-transparent b--black hover-white w-100"
                }
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className={"mv3"}>
              <label className={"db fw6 lh-copy f6"} htmlFor="password">
                Password
              </label>
              <input
                className={
                  "b pa2 input-reset ba bg-transparent b--black hover-white w-100"
                }
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div>
            <input
              className={
                "b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              }
              type="submit"
              value="Sign in"
              onClick={onSubmitSignIn}
            />
          </div>
          <div className={"lh-copy mt3"}>
            <p
              className={"f6 link dim black db pointer"}
              onClick={() => onRouteChange("register")}
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
