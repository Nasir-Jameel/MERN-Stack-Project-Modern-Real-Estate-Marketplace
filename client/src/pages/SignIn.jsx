import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import { useDispatch } from "react-redux"
import { signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice"
const SignIn = () => {
  
  const [formData, setformData] = useState({})
 const dispatch = useDispatch()
 const {loading, error} = useSelector((state)=> state.user)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setformData({
     ...formData,
     [e.target.id]: e.target.value
    })

  }
 const handleSubmit =async (e)=>{
  e.preventDefault()
 try {
  dispatch(signInStart())
  const res = await fetch("/api/auth/signin", 
    {
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(formData)
    }
  )
  const data = await res.json()
  if (data.success === false){
   dispatch(signInFailure(data.message))
    return;
  }
  dispatch(signInSuccess(data))
  navigate("/");
 } catch (error) {
 dispatch(signInFailure(error.message))
 }
 }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4 ' >
        
        <input className='border p-3 rounded-lg' id="email" type="email" placeholder="Email" onChange={handleChange}/>
        <input className='border p-3 rounded-lg' id="password" type="password" placeholder="Password" onChange={handleChange}/>
        <button disabled ={loading} className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:backdrop-opacity-95 disabled:opacity-80  "> {loading? "loading...": "Sign In "}</button>
      </form  >
      <div className="flex gap-2 mt-5">
        <p > Dont have an account?
        </p>
        <Link to="/sign-up" className="text-blue-500 hover:underline">Sign up</Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div> 
  )
}

export default SignIn