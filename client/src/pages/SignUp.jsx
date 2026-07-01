import {Link} from "react-router-dom"

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 ' >
        <input className='border p-3 rounded-lg' id="username" type="text" placeholder="Username" />
        <input className='border p-3 rounded-lg' id="email" type="email" placeholder="Email" />
        <input className='border p-3 rounded-lg' id="password" type="password" placeholder="Password" />
        <button className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:backdrop-opacity-95 disabled:opacity-80  ">Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p >Have an account?
        </p>
        <Link to="/sign-in" className="text-blue-500 hover:underline">Sign in</Link>
      </div>
    </div> 
  )
}

export default SignUp