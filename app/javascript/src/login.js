export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    signInUser(username, password, function (data) {
      window.location.href = '/feed';
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <div className="row button-row">
            <div className="col-8 ps-0">
              <input
                className="form-control col-8"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <button
              id="log-in-btn"
              className="col-4 btn btn-default btn-primary"
              type="submit"
            >
              Log In
            </button>
          </div>

          <label>
            <input type="checkbox" className="me-1" />
            <span>Remember me</span>
            <span className="px-1"> · </span>
          </label>

          <a href="#">Forgot password?</a>
        </form>
      </>
    );
  }
}
