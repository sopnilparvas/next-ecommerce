import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);

  const { auth } = state;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleLogin = async e => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/login", user);

    if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({ type: "AUTH", payload: { token: res.access_token, user: res.user } });

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) return router.push("/");
  }, [auth]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleLogin} className='mx-auto my-4' style={{ maxWidth: "500px" }}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='pass' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='pass'
            name='password'
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit' className='btn btn-dark w-100 mb-3'>
          Login
        </button>
        <p>
          Don't have an account ?{" "}
          <Link href='/register'>
            <a className='text-danger'>Register</a>
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
