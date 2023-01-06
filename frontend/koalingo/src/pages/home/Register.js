import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stylesLogin from "./login.module.css";
import stylesEmailLogin from "./emailLogin.module.css"
import stylesRegister from "./register.module.css"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerWithEmailAndPassword } from "../../firebase";
import { AuthContext } from "../../App";
import Button from "../../components/button/Button";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";

const Register = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email field is required"),
        password: yup.string().min(4).required("Password field is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const onGoBackClick = useCallback(() => {
        navigate("/");
     }, [navigate]);

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const { register, handleSubmit, formState: errors } = useForm({
        resolver: yupResolver(schema)
    });
    // Navigate to home page on submit

    const onKoaUserButtonClick = useCallback(() => {
       navigate("/login");
    }, [navigate]);

    const onSubmitClick = useCallback((data) => {
        registerWithEmailAndPassword(data.email, data.password);
    }, [navigate]);

    return (
        <div className={stylesLogin.loginPage}>
            <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />

            <form onSubmit={handleSubmit(onSubmitClick)}>
                <div className={stylesRegister.loginWrapper}> 
                    <RecWrapper size= "heightFit"
                    children1={
                        <div className={stylesRegister.registerText}> Registration </div>
                    }
                    children2={
                        <input 
                        className={stylesRegister.email} 
                        name="email"
                        placeholder="email"
                        {...register("email")}
                        />
                    }
                    children3={
                        <input
                        className={stylesRegister.password}
                        name="password"
                        type="password"
                        placeholder="password"
                        {...register("password")}
                        />
                    }

                    children4={
                        <input
                        className={stylesRegister.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm password"
                        {...register("confirmPassword")}
                        />
                    }

                    children8={
                        <input className={stylesRegister.submitBtn} type="submit"  />
                    }
                    />
                    <div className={stylesRegister.goBackWrapper}>
                        <div className={stylesRegister.backText}
                            onClick={onKoaUserButtonClick}><u>Already a Koalingo User?</u></div>
                        <Button btnText="Go back" onClick={onGoBackClick}
                                btnStyle="bgColor" length="btnLong" />
                    </div>
                    <p>{errors.email?.message}</p>
                    <p>{errors.password?.message}</p>
                    <p>{errors.confirmPassword?.message}</p>
                </div>
                
            </form>
        </div>
    );
    };

export default Register;