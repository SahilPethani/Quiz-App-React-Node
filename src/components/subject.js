import React from 'react'
import "../App.css"

const Subject = ({ showSubject, subject, satrt, backButton }) => {
    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showSubject ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className='d-flex justify-content-between'>
                        <h2 className="fw-bold ">Subject's</h2>
                        <button type="button" class="bg-color text-white btn-lg border-0 " onClick={() => backButton(1)} style={{ width: "auto" }} data-bs-toggle="button" autocomplete="off" aria-pressed="true">
                            Back to Dashboard
                        </button>
                    </div>

                    <div className='row gap-3 justify-content-center'>
                        {
                            subject.map((sub, index) => (
                                <div className="col-3 px-0" onClick={() => satrt(sub)}>
                                    <div className=" mb-lg-0">
                                        <div
                                            className="card"
                                            style={{
                                                backdropFilter: "blur(30px)"
                                            }}
                                        >
                                            <div style={{
                                                height: "182px"
                                            }} className="card-body subcard shadow-5 text-center align-items-center justify-content-center d-flex">
                                                <h2 className="fw-bold ">{sub.name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subject
