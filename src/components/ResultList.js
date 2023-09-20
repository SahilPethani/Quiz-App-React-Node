import React, { useEffect, useState } from 'react'
import { getAllMarkData, getSubjectData } from './config/ApiCall'
import emoji from "../assets/correct-answer_old.png"

const ResultList = ({ showResultList, backButton }) => {
    const [subjectList, setSubjectList] = useState([])
    const [resultListData, setResultListData] = useState([])
    const [showResultListData, setShowResultListData] = useState([])

    const [selectedResult, setSelectedResult] = useState('')

    useEffect(() => {
        getAllSubject()
        getAllResult()
    }, [showResultList])

    const getAllResult = async () => {
        const result = await getAllMarkData()
        setResultListData(result);
        setShowResultListData(result)
    }

    const getAllSubject = async () => {
        const result = await getSubjectData()
        setSubjectList(result);
    }

    const changeSubject = (e) => {
        if (e.target.value !== "All Subject") {
            const data = resultListData.filter((item) => item.subject === e.target.value)
            setShowResultListData(data)
        } else {
            setShowResultListData(resultListData)
        }
    }

    const handleView = (data) => {
        setSelectedResult(data)
    }

    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showResultList ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className='d-flex justify-content-between'>
                        <h2 className="fw-bold ">Result List</h2>
                        <button type="button" class="bg-color text-white btn-lg border-0" data-bs-toggle="button" onClick={() => backButton(5)} autocomplete="off" aria-pressed="true">
                            Back to Dashboard
                        </button>
                    </div>
                    <div>
                        <div className='w-100 mb-5'>
                            <div className="mb-5 mb-lg-0">
                                <div
                                    className=""
                                    style={{
                                        background: "rgb(131 129 129 / 58%)",
                                        backdropFilter: "blur(30px)",
                                        borderRadius: "0.25rem",
                                        padding: "15px"

                                    }}
                                >
                                    <div className="card-body px-3 shadow-5 text-center align-items-center justify-content-between d-flex gap-4">
                                        <div className='w-100 d-flex gap-5'>
                                            <h2 className="fw-bold" style={{ whiteSpace: "nowrap" }}>Subject :-</h2>
                                            <div className='justify-content-between d-flex' style={{ width: "85%" }}>
                                                <select
                                                    className="form-select w-100"
                                                    id="floatingSelect"
                                                    onChange={changeSubject}
                                                >
                                                    <option selected="">All Subject</option>
                                                    {
                                                        subjectList?.map((item) =>
                                                            <option value={item?.name} key={item?.id}>{item?.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='w-100 d-flex gap-5'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-100'>
                        <img src={emoji} style={{paddingLeft:"900px", height:"100px"}}/>
                            <div className="align-items-center justify-content-center">
                                <div className="mb-5 mb-lg-0">
                                    <div
                                        className=""
                                        style={{
                                            background: "rgb(131 129 129 / 58%)",
                                            backdropFilter: "blur(30px)",
                                            borderRadius: "0.25rem",
                                            padding: "15px"
                                        }}
                                    >
                                        <h2 className="fw-bold">Result List</h2>
                                        <div className="card-body px-3 shadow-5 text-center align-items-center justify-content-center d-flex">
                                            <div className='w-100' style={{ maxHeight: "470px", overflow: "auto" }}>
                                                {
                                                    showResultListData.length > 0 ?
                                                        <table class="table table-bordered text-white">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Mark's</th>
                                                                    <th scope="col">Subject</th>
                                                                    <th scope="col" style={{ width: "300px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    showResultListData?.map((item, index) => (
                                                                        <tr key={item?.id}>
                                                                            <th scope="row">{item?.id}</th>
                                                                            <td>{item?.marks} out of {item?.outOf}</td>
                                                                            <td>{item?.subject}</td>
                                                                            <td className='d-flex gap-3 justify-content-center'>
                                                                                <button type="button"
                                                                                    class="card btn px-3 ml-1 border-0 btn-primary d-inline bg-primary"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#viewResultModal"
                                                                                    onClick={() => handleView(item)}
                                                                                >
                                                                                    View
                                                                                </button>
                                                                            </td>
                                                                        </tr>

                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                        :
                                                        <h2 className="fw-bold">Result's Not Found</h2>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* add model */}
            <>
                <div
                    className="modal fade"
                    id="viewResultModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered text-dark" style={{ maxWidth: "700px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    View Result
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body text-start">
                                <div className='d-flex align-items-center gap-5'>
                                    <h5 style={{ width: "115px" }}>
                                        Mark :-
                                    </h5>
                                    <h5 className={`w-75 ${selectedResult?.marks > (selectedResult?.outOf / 2) ? 'text-success' : 'text-danger'}`}>
                                        {selectedResult?.marks} {selectedResult?.marks > (selectedResult?.outOf / 2) ? 'Awesome!' : 'Oops!'}
                                    </h5>
                                </div>

                                <hr></hr>
                                <div className='d-flex align-items-center gap-5'>
                                    <h5 style={{ width: "115px" }}>
                                        Out Of :-
                                    </h5>
                                    <h5 className='w-75'>
                                        {selectedResult?.outOf}
                                    </h5>
                                </div>

                                <hr></hr>
                                <div className='d-flex align-items-center gap-5'>
                                    <h5 style={{ width: "115px" }}>
                                        Subject :-
                                    </h5>
                                    <h5 className='w-75'>
                                        {selectedResult?.subject}
                                    </h5>
                                </div>

                                <hr></hr>
                                <div className='d-flex align-items-center gap-5'>
                                    <h5>
                                        Questions :-
                                    </h5>
                                    <div className='w-75' style={{ maxHeight: "320px", overflow: "auto" }}>
                                        {selectedResult?.details?.map((option, index) => (
                                            <>
                                                <div className={`${option?.isCorrect ? 'border-success' : 'border-danger'} border mb-2 p-2 rounded `} >
                                                    <h5 style={{ fontSize: "13.28px" }}>
                                                        Question :- {option?.question}
                                                    </h5>
                                                    <h5 style={{ fontSize: "13.28px" }}>
                                                        Answer :-  {option?.selectedAnswer}
                                                    </h5>
                                                    <h5 style={{ fontSize: "13.28px" }}>
                                                        Mark :-  {option?.marks}
                                                    </h5>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>

                                <hr></hr>
                                <h5 className='text-danger'>
                                    All question mark only 5
                                </h5>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        </section>
    )
}

export default ResultList
