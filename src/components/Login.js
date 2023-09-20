import React, { useState } from 'react'

const Login = ({ showDash, showlogin }) => {
    const [userDetail, setUserDetail] = useState({
        username: '',
        password: ''
    })
    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showlogin ? 'block' : 'none'}` }}>
            <div className="container">
                <div className='row vh-100 align-items-center justify-content-center '>
                    <div className="">
                        <>
                            {/* Section: Design Block */}
                            <section className="text-center text-lg-start">
                                <style
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            "\n    .cascading-right {\n      margin-right: -50px;\n    }\n\n    @media (max-width: 991.98px) {\n      .cascading-right {\n        margin-right: 0;\n      }\n    }\n  "
                                    }}
                                />
                                {/* Jumbotron */}
                                <div className="container py-4">
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-lg-5 mb-5 mb-lg-0">
                                            <div
                                                className="cascading-right"
                                                style={{
                                                    background: "hsla(0, 0%, 100%, 0.55)",
                                                    backdropFilter: "blur(30px)",
                                                    borderRadius:"0.25rem"
                                                }}
                                            >
                                                <div className="card-body p-5 shadow-5 text-center">
                                                    <h2 className="fw-bold mb-5">Sign In now</h2>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4 text-left">
                                                        <label className="form-label" htmlFor="form3Example3">
                                                            UserName
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                setUserDetail({
                                                                    ...userDetail,
                                                                    username: e.target.value
                                                                })
                                                            }}
                                                            placeholder='Enter Username'
                                                            type="text"
                                                            id="form3Example3"
                                                            className="form-control"
                                                        />

                                                    </div>
                                                    {/* Password input */}
                                                    <div className="form-outline mb-4 text-left">
                                                        <label className="form-label" htmlFor="form3Example4">
                                                            Password
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                setUserDetail({
                                                                    ...userDetail,
                                                                    password: e.target.value
                                                                })
                                                            }}
                                                            placeholder='Enter password'
                                                            type="text"
                                                            id="form3Example4"
                                                            className="form-control"
                                                        />

                                                    </div>
                                                    {/* Submit button */}
                                                    <button
                                                        onClick={() => showDash(userDetail)}
                                                        type="submit"
                                                        className="btn btn-secondary btn-block mb-4 fw-600"
                                                    >
                                                        Sign In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Jumbotron */}
                            </section>
                            {/* Section: Design Block */}
                        </>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Login
