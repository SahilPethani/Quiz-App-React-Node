import React from 'react'
import "../App.css"

const Dashbord = ({ dashbord, showsubject,logout, showresultList }) => {
    return (
        <section className='text-white text-center bg-dark' style={{ display: `${dashbord ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className='d-flex justify-content-between'>
                        <h2 className="fw-bold ">User dashboard</h2>

                        <button type="button" class="bg-color text-white btn-lg border-0 d-inline" onClick={logout} style={{ width: "auto" }} data-bs-toggle="button" autocomplete="off" aria-pressed="true">
                            <span>
                                Log Out
                            </span>
                        </button>
                    </div>
                    <div className='d-flex' style={{marginBottom:"200px"}}>
                        <div className='w-50'>
                            <div className="row g-0 align-items-center justify-content-center">
                                <div className="col-lg-5 mb-5 mb-lg-0">
                                    <div
                                        onClick={showsubject}
                                        className="card cascading-right"
                                        style={{
                                            backdropFilter: "blur(30px)"
                                        }}
                                    >
                                        <div style={{
                                            height: "182px"
                                        }} className="card-body p-5 shadow-5 text-center align-items-center justify-content-center d-flex">
                                            <h2 className="fw-bold ">Subject's</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-50'>
                            <div className="row g-0 align-items-center justify-content-center">
                                <div className="col-lg-5 mb-5 mb-lg-0">
                                    <div
                                        className="card cascading-right"
                                        style={{
                                            backdropFilter: "blur(30px)"
                                        }}
                                        onClick={showresultList}
                                    >
                                        <div style={{
                                            height: "182px"
                                        }} className="card-body p-5 shadow-5 text-center align-items-center justify-content-center d-flex">
                                            <h2 className="fw-bold">Result's</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <button type="button" class="btn-lg rounded-pill border-0 btn-primary" data-bs-toggle="button" autocomplete="off">Mathematics</button>
                        <button type="button" class="btn-lg rounded-pill border-0 btn-primary ms-4" data-bs-toggle="button" autocomplete="off" aria-pressed="true">Science</button>
                        <button type="button" class="btn-lg rounded-pill border-0 btn-primary ms-4" data-bs-toggle="button" autocomplete="off">Physics</button>
                        <button type="button" class="btn-lg rounded-pill border-0 btn-primary ms-4" data-bs-toggle="button" autocomplete="off">Show Result's</button> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashbord
