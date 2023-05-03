import React, { useState, useEffect } from 'react';
import { validate } from './Validate';
import styles from './SignUp.module.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './Toast';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data,"login"))
    }, [data, touched])

    const changeHandler = event => {

        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    const focusHandler = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const submitHandlet = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("success", "You sign in successfully")
        } else {
            setTouched({
                email: true,
                password: true
            })
            notify("error", "Invalid data")
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form onSubmit={submitHandlet}>
                    <h2>Login</h2>
                    <div className={styles.formfield}>
                        <label>Email</label>
                        <input
                            className={(errors.email && touched.email) ? styles.uncompleted : styles.input}
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={changeHandler}
                            onFocus={focusHandler} />
                        {errors.email && touched.email && <div><span>{errors.email}</span></div>}
                    </div>
                    <div className={styles.formfield}>
                        <label>Password</label>
                        <input
                            className={(errors.password && touched.password) ? styles.uncompleted : styles.input}
                            type="text"
                            name="password"
                            value={data.password}
                            onChange={changeHandler}
                            onFocus={focusHandler} />
                        {errors.password && touched.password && <div><span>{errors.password}</span></div>}
                    </div>
                    <div className={styles.buttons}>
                        <a href="/signup">Sign Up</a>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;