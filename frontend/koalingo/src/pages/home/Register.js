import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const Register = () => {
  const navigate = useNavigate();
  
  // Define a schema for the form data using yup 
    const schema = yup.object().shape({
        email: yup.string().email().required("Email field is required"),
        password: yup.string().min(4).min(8).required("Password field is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const { register, handleSubmit, formState: errors } = useForm({
        resolver: yupResolver(schema)
    });
// Navigate to home page on submit
  const onSubmit = (data) => {
    console.log(data);
   navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" placeholder='email' {...register("email")} />
      <p>{errors.email?.message}</p>
      <input name="password" placeholder='password' {...register("password")} />
        <p>{errors.password?.message}</p>
    <input name="confirmPassword" placeholder='confirm password' {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>

        <input type="submit" />
    </form>
    );


  }






export default Register; 