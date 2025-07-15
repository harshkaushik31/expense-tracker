import React, { useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate();

  const { setToken, axios , setUser} = useAppContext();

  const [state,setState] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
  
      const payload = state === 'login' ? { email, password } : { name, email, password };
  
      const { data } = await axios.post(`/api/v1/user/${state}`, payload);
      console.log("AUTH RESPONSE:", data);
  
      axios.defaults.headers.common[`Authorization`] = `${data.data.token}`;
      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);
  
      if(data.success) {
        navigate('/');
        setToken(data.data.token);
        setUser(data.data.user);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        setEmail('');
        setPassword('');
        setName('');
      }else{
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred during authentication. Please try again.");
      setEmail('');
      setPassword('');
      setName('');
      
    }
  }

  return (
    <AuthLayout>
      <div className='flex flex-col justify-center items-center w-full h-full mt-8 mx-4 rounded-xl'>
        
      <form action="" onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()} className='w-[60%]'>
        <p className='text-center text-2xl mb-8'>User <span>{state === 'login' ? 'Login' : 'Sign Up'}</span></p>

        {state === 'register' && (
          <div className='w-full px-4'>
            <input 
            type="text" 
            placeholder='Enter your name...' 
            className=' px-2 py-1 w-full rounded-lg mt-1 border border-violet-500 my-4' 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required/>
          </div>
        )
        }

        <div className='w-full px-4'>
            <input 
            type="text" 
            placeholder='Enter your email...' 
            className=' px-2 py-1 w-full rounded-lg mt-1 border border-violet-500 my-4' 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required/>
          </div>

          <div className='w-full px-4'>
            <input 
            type="text" 
            placeholder='Enter your password...' 
            className=' px-2 py-1 w-full rounded-lg mt-1 border border-violet-500 my-4' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required/>
          </div>

          {state === 'register'?  (
            <p className='ml-4'>Already have an account? <span onClick={() => setState('login') }className='text-blue-400 cursor-pointer'>Click here</span></p>
          ) : (
            <p className='ml-4'>Don't have an account? <span onClick={() =>setState('register') }className='text-blue-400 cursor-pointer'>Click here</span></p>
          )}

          <div className='w-full px-4'>
<button className="bg-violet-500 hover:bg-violet-700 transition-all text-white w-full py-2 rounded-xl cursor-pointer mt-4">
                {state === "register" ? "Create Account" : "Login"}
            </button>
          </div>

      </form>

      </div>
    </AuthLayout>
  )
}

export default Login