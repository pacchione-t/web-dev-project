import { Link } from "react-router-dom";
import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
  
// function Login() {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const navigate = useNavigate();
//   const signin = async () => {
//     await client.signin(credentials);
//     navigate("/project/account");
//   };
//   return (
//     <div>
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";


function Login() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const signin = async () => {
    console.log(credentials);
    const user = await client.signin(credentials);
    dispatch(setCurrentUser(user));
    navigate("/profile"); //could go to profile - id ?
  };
  const signup = async () => {
    try {
      console.log(credentials);
      const user = await client.signup(credentials);
      dispatch(setCurrentUser(user));
      navigate("/profile"); // could navigate to profile-id as well
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const signupAsBusiness = async () => {
    try {
      console.log(credentials);
      credentials.role = 'JOB-POSTER';
      const user = await client.signup(credentials);
      dispatch(setCurrentUser(user));
      navigate("/profile"); // could navigate to profile-id as well
    } catch (err) {
      setError(err.response.data.message);
    }
  };


  return (
    <div>
      <h1>Login</h1>
      {error && <div>{error}</div>}
      {/* <input value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <br/>
      <input value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <button onClick={signin}> Signin </button> */}
      <form class="">
      <div class="form-group pt-3 form-control-sm col-md-6">
          <input placeholder="Username" class="form-control" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
      </div>
      <div class=" form-group pt-3  form-control-sm col-md-6 pt-2">
        <input class="form-control" placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
      </div>
      <div class="col-md-6 pt-3">
      <Link to="/register"><small id="emailHelp" class="form-text text-muted">Not a User? Register Here</small></Link>
      </div>
      <div class="col-md-6 pt-3">
       <Link to="/home"><button onClick={signin} type="submit" class="btn btn-primary ">Sign in</button></Link>
      </div>
    </form>
    </div>
  )
}

export default Login;