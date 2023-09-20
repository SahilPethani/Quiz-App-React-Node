import React from 'react';
import hestory from '../assets/history_play_img.png';
import game_img from '../assets/game_banner.png';
import diamond from '../assets/diamond.png';
import "../App.css"

const Start = ({ startQuiz, showStart, selectSubject, backButton }) => {
    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showStart ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className='d-flex justify-content-end' style={{ marginBottom: "120px" }}>
                        <button type="button" class="bg-color text-white btn-lg border-0 " onClick={() => backButton(2)} style={{ width: "auto" }} >
                            Back to Subject's
                        </button>
                    </div>
                    <div className='row gap-3 justify-content-center' style={{ marginBottom: "200px" }}>
                        <img className='w-50 h-50' src={game_img} style={{ marginBottom: "-16px", marginLeft: "550px" }} />
                        <div className="col-lg-9 position-relative">
                            <img className='w-100' src={hestory} />
                            <div className='position-absolute quiz_content'>
                                <h1 className='fw-bold mb-4'>Basic {selectSubject?.name} Quiz</h1>
                                <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;