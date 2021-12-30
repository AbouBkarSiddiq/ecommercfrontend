import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data =  { userName, email, password, address }
        console.log('Data coming at register page:', data)

        // axios.post('http://192.168.100.44:3000/user/register', data)
        // .then((response) => {
        //     alert('Data sent successfully.', response)
        //     console.log('User registration successful')
        //     setIsLoading(false)
        //     history.push('/')
        // })
    }
    return (
        <>
        <section class="why_section layout_padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 offset-lg-3">
                            <div class="full">
                                <form onSubmit={handleSubmit}>
                                    <fieldset>
                                    <input
                                            type="text"
                                            placeholder="Enter Name"
                                            name="userName"
                                            value={userName}
                                            onChange={e => setUserName(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter your address"
                                            name="address"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            required
                                        />
                                        <button className="btn btn-primary">Sign Up</button>
                                        {/* <input type="submit" value="Submit" /> */}
                                    </fieldset>
                                </form>
                            </div>
                            <div className="">
                                Already have an account?
                                <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} className="" >
                                    Login
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        // <div className="create">
        //     <h2>User Register</h2>
        // <form onSubmit={handleSubmit}>
        //     <label>User Name:</label>
        //     <input 
        //     type="text"
        //     required
        //     value={userName}
        //     onChange={e => setUserName(e.target.value)}
            
        //     />
        //     <label>Email:</label>
        //     <input 
        //     type="email"
        //     required
        //     value={email}
        //     onChange={e => setEmail(e.target.value)}
        //     />
        //     <label>Password:</label>
        //     <input 
        //     type="password"
        //     required
        //     value={password}
        //     onChange={e => setPassword(e.target.value)}
        //     />
        //     <button>Register</button>
        //     <div className=''>
        //             Already have account?
        //             <span onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>
        //                 Login
        //             </span>
        //         </div>
        // </form>
        // </div>
     );
}
 
export default Register;