import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerWithEmailAndPassword } from "../../firebase";
import { AuthContext } from "../../App";

const Register = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email field is required"),
        password: yup.string().min(4).required("Password field is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const { register, handleSubmit, formState: errors } = useForm({
        resolver: yupResolver(schema)
    });
    // Navigate to home page on submit

    const onLoginButtonClick = useCallback(() => {
       navigate("/");
    }, [navigate]);

    const onSubmitClick = useCallback((data) => {
        registerWithEmailAndPassword(data.email, data.password);
    }, [navigate]);

    return (
        <div className={styles.login1}>
        <form onSubmit={handleSubmit(onSubmitClick)}>
        
        <div className={styles.login1Child} />
        <div className={styles.login}>
            <button
            className={styles.loginChild}
            onClick={onLoginButtonClick}
            />
            <div className={styles.login2}>Login</div>
            <div className={styles.alreadyAKoalingoUser}>
            Already a Koalingo user?
            </div>
        </div>
        <div className={styles.login1Item} />
        <img
            className={styles.allergiesPlanDeTravail11}
            alt=""
            src="../../koalingo_logo.svg"
        />
        <div className={styles.groupe61}>
        
            <input 
            className={styles.email} 
            name="email"
            placeholder='email' 
            {...register("email")}
            />
            <p>{errors.email?.message}</p>
            <input
            className={styles.password}
            name="password"
            type="password"
            placeholder="Password"
            {...register("password")}
            />
            <p>{errors.password?.message}</p>
            <input
            className={styles.confirm}
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            />
            <p>{errors.confirmPassword?.message}</p>
            
        </div>
        <input className={styles.trac3} type="submit"  />
        <input className={styles.submit} type="submit"  />
        
    
        </form>
        <b className={styles.registrationForm}>Registration form</b>
        </div>
       
    );
    };

export default Register;