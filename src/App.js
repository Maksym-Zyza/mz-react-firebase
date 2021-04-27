import React from "react";
import firebase from "firebase/app";

export default class App extends React.Component {
  state = {
    email: "",
    password: "",
    hasAccount: false,
    name: "",
    key: "",
    value: "",
  };

  componentDidMount() {
    const db = firebase.database();

    // ===== Массив "name"
    const name = db.ref("name");
    name.on("value", (elem) => {
      this.setState({ name: elem.val() });
      console.log(this.state.name);
    });

    //===== Массив "lots"
    // const ref = db.ref("lots");
    // ref.on("value", gotData, errData);

    // function gotData(data) {
    //   console.log(data.val());
    // }
    // function errData(err) {
    //   console.log("Error>>", err);
    // }
  }

  handleChenge = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // ========= Registration
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((response) => console.log(`registration successful`, response))
    //   .catch((error) => console.log(error.message));

    // ========= signIn
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => alert(`Hello ${this.state.email}!`, response))
      .then(() => {
        this.setState({ hasAccount: true });
      })
      .catch((error) => alert(error.message));
  };

  // Запись в DataBase
  sendData = (e) => {
    e.preventDefault();

    const { key, value } = this.state;
    const db = firebase.database();
    db.ref(key).push(value);
    console.log("Your data was written to DataBase");
    // this.setState({ value: "" });
  };

  render() {
    const { hasAccount, name } = this.state;
    // console.log(name, "name");
    // console.log(Object.values(name));
    // console.log(Object.keys(name));

    return (
      <div>
        {hasAccount ? (
          <div className="flex_block">
            <h1 className="message">Enter your data</h1>

            <form
              className="flex_block"
              onSubmit={this.sendData}
              autoComplete="off"
            >
              <input
                type="text"
                id="key"
                placeholder="enter key"
                onChange={this.handleChenge}
              />
              <input
                type="text"
                id="value"
                placeholder="enter value"
                onChange={this.handleChenge}
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </form>

            <h3 className="text">User name:</h3>

            {/* <ul>
              {Object.values(name).map((elem, index) => (
                <li className="text" key={index}>
                  {elem}
                </li>
              ))}
            </ul> */}
          </div>
        ) : (
          <div className="flex_block">
            <h1>Sign In</h1>
            <h2 className="text">Enter your mail and password</h2>

            <form
              className="flex_block"
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
              <label className="flex_block">
                Mail
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  onChange={this.handleChenge}
                />
              </label>

              <label className="flex_block">
                Password
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  onChange={this.handleChenge}
                />
              </label>

              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
