import { useState, useEffect } from 'react'
import { useNavigate, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import { login } from '../../redux/actions/authActions'


const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)

    let userId = localStorage.getItem('userId')
    useEffect(() => {
        if (userId) {
            // history.push('/home')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data = { email, password }
        console.log("Data of user:", data)
        // dispatch(login(data))
        // alert('User login successfully...')
    }

    return (
        <>
            {/* <section class="inner_page_head">
                <div class="container_fuild">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="full">
                                <h3>Contact us</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section class="why_section layout_padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 offset-lg-3">
                            <div class="full">
                                <form onSubmit={handleSubmit}>
                                    <fieldset>
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
                                        <button className="btn btn-primary">Login</button>
                                        {/* <input type="submit" value="Submit" /> */}
                                    </fieldset>
                                </form>
                            </div>
                            <div className="">
                                Didn't have account?
                                <span onClick={() => navigate('/register')} style={{ cursor: 'pointer' }} className="" >
                                    Sign up
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        // <div className="create">
        //     <h2>User Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <label className="label">Email:</label>
        //         <input
        //             type="email"
        //             required
        //             value={email}
        //             onChange={e => setEmail(e.target.value)}
        //         />
        //         <label>Password:</label>
        //         <input
        //             type="password"
        //             required
        //             value={password}
        //             onChange={e => setPassword(e.target.value)}
        //         />
        //         <button type="submit">Login</button>
        //         <div className=''>
        //             Didn't have account?
        //             <span  style={{ cursor: 'pointer' }}>
        //                 Sign up
        //             </span>
        //         </div>
        //     </form>
        // </div>
    );
}

export default Login;
