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

/** 
 * Page that allows users to register with their email and password
 * See EmailLogin.js for more comments
 * @returns {JSX.Element}
*/
const Register = () => {
    // Get user from context provider
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Form schema definition
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

    // Handle exceptions
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
                <div className={stylesRegister.registerWrapper}>
                    {/* Wrap in white box */ }
                    <RecWrapper size="heightFit"
                        content={
                            // Input boxes
                            <div className={stylesRegister.registerWrapperChild}>
                                Registration
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
                                <input className={stylesRegister.input}
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="confirm password"
                                    {...register("confirmPassword")}
                                />
                                <input className={stylesRegister.submitBtn} type="submit" />
                            </div>
                        }
                    />
                    {/* Buttons */}
                    <div className={stylesRegister.goBackWrapper}>
                        <div className={stylesRegister.backText}
                            onClick={onKoaUserButtonClick}><u>Already a Koalingo User?</u></div>
                        <Button btnText="Go back" onClick={onGoBackClick}
                            btnStyle="bgColor" length="btnLong" />
                    </div>
                    {/* Display error messages */}
                    <p>{errors.email?.message}</p>
                    <p>{errors.password?.message}</p>
                    <p>{errors.confirmPassword?.message}</p>
                </div>
            </form>
        </div>
    );
};

export default Register;