import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stylesLogin from "./login.module.css";
import stylesEmailLogin from "./emailLogin.module.css"
import stylesRegister from "./register.module.css";
import { logInWithEmailAndPassword  } from "../../firebase";
import { AuthContext } from "../../App";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from "../../components/button/Button";
import RecWrapper from "../../components/rectangleWrapper/Wrapper";


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
        <div className={stylesLogin.loginPage}>
            <img className={stylesEmailLogin.koalingoLogo} alt="" src="../koalingo_logo.svg" />
            
            <form onSubmit={handleSubmit(onLoginClick)}>
                <div className={stylesEmailLogin.loginWrapper}> 
                    <RecWrapper size='long'
                                content={
                                    <div className={stylesEmailLogin.loginWrapperChild}>
                                        Email Sign-in
                                        <input className={stylesRegister.input} 
                                                name="email"
                                                placeholder="email"
                                                {...register("email")}
                                        />
                                        <input className={stylesRegister.input}
                                                name="password"
                                                type="password"
                                                placeholder="password"
                                                {...register("password")}
                                        />
                                        <Button btnText="Time to KoaLearn!" onClick={onLoginClick}
                                                btnStyle="gold" length="btnLong"/>
                                    </div>
                                }
                    />
                </div>
            </form>

            <div className={stylesEmailLogin.goBackWrapper}>
                <Button btnText="Go back" onClick={onGoBackClick}
                        btnStyle="bgColor" length="btnLong" />
            </div>
        </div>
    );
};

export default EmailLogin;