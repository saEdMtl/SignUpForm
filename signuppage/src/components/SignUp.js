import React, { useState, useEffect } from 'react';

import { validate } from './Validate';

import styles from './SignUp.module.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './Toast';

const SignUp = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data,"signup"))
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
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true,
            })
            notify("error", "Invalid data")
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form onSubmit={submitHandlet}>
                    <h2>Sign Up</h2>
                    <div className={styles.formfield}>
                        <label>Name</label>
                        <input
                            className={(errors.name && touched.name) ? styles.uncompleted : styles.input}
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={changeHandler}
                            onFocus={focusHandler} />
                        {errors.name && touched.name && <div><span>{errors.name}</span></div>}
                    </div>
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
                    <div className={styles.formfield}>
                        <label>Confirm Password</label>
                        <input
                            className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.input}
                            type="text"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={changeHandler}
                            onFocus={focusHandler} />
                        {errors.confirmPassword && touched.confirmPassword && <div><span>{errors.confirmPassword}</span></div>}
                    </div>
                    <div className={styles.formfield}>
                        <div className={styles.checkbox}>
                            <label>I accept terms of privacy and policy</label>
                            <input
                                type="checkbox"
                                name="isAccepted"
                                value={data.isAccepted}
                                onChange={changeHandler}
                                onFocus={focusHandler} />
                        </div>
                        {errors.isAccepted && touched.isAccepted && <div><span>{errors.isAccepted}</span></div>}
                    </div>
                    <div className={styles.buttons}>
                        <a href="/login">Login</a>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default SignUp;