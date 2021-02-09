import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import valid from "../utils/valid";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "", c_password: "" });

  const { name, email, password, c_password } = user;

  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);

  const { auth } = state;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleRegister = async e => {
    e.preventDefault();

    const errorMsg = valid(name, email, password, c_password);
    if (errorMsg) return dispatch({ type: "NOTIFY", payload: { error: errorMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", user);

    if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) return router.push("/");
  }, [auth]);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <form onSubmit={handleRegister} className='mx-auto my-4' style={{ maxWidth: "500px" }}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Full Name
          </label>
          <input type='text' className='form-control' id='name' name='name' value={name} onChange={handleInputChange} />
        </div>
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
        <div className='mb-3'>
          <label htmlFor='c_pass' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='c_pass'
            name='c_password'
            value={c_password}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit' className='btn btn-dark w-100 mb-3'>
          Register
        </button>
        <p>
          Already have an account ?{" "}
          <Link href='/login'>
            <a className='text-danger'>Login</a>
          </Link>
        </p>
      </form>
    </>
  );
}

export default Register;
