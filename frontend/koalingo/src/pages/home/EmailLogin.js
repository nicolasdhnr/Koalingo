import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { logInWithEmailAndPassword  } from "../../firebase";
import { AuthContext } from "../../App";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


const EmailLogin = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email field is required"),
        password: yup.string().min(4).required("Password field is required"),
    });
    const { register, handleSubmit, formState: errors } = useForm({
        resolver: yupResolver(schema)
    });


    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    // Navigate to home page on submit

    const onGoBackClick = useCallback(() => {
       navigate("/");
    }, [navigate]);

    const onLoginClick = useCallback(async (data) => {
        await logInWithEmailAndPassword(data.email, data.password);
    }, [navigate]);


    return (
        <div className={styles.login1}>
        <form onSubmit={handleSubmit(onLoginClick)}>
        <div className={styles.login1Child} />
        <div className={styles.login}>
            <button
            className={styles.loginChild}
            onClick={onGoBackClick}
            />
            <div className={styles.login2}>Go back</div>
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

            <input
            className={styles.password}
            name="password"
            type="password"
            placeholder="Password"
            {...register("password")}
            />
            
        </div>
        <button className={styles.trac3}/>
        <button className={styles.submit} >Log in</button>
        <b className={styles.registrationForm}>Time to Koalearn!</b>
        </form>
        </div>
       
    );
};

export default EmailLogin;