import React, { useEffect, useState } from 'react'
import { addQuestionsData, deleteQuestionsData, getAllQuestionsData, getSubjectData, updateQuestionsData } from '../config/ApiCall'
import { toast } from 'react-toastify';

const AddQuiz = ({ backButton, showAddQuiz }) => {

    const [subjectList, setSubjectList] = useState([])
    const [questionsList, setQuestionsList] = useState([])
    const [showQuestionsList, setShowQuestionsList] = useState([])
    const [update, setUpdate] = useState(false)

    const [selectedSub, setSelectedSub] = useState('')
    const [selectedQuestion, setSelectedQuestion] = useState('')

    const [addData, setAddData] = useState({
        question: "",
        subject: "",
        options: ['', '', '', ''],
        answer: ""
    })

    useEffect(() => {
        getAllQuestion()
        getAllSubject()
    }, [])

    const getAllQuestion = async () => {
        const result = await getAllQuestionsData()
        setQuestionsList(result);
        setShowQuestionsList(result)
    }

    const getAllSubject = async () => {
        const result = await getSubjectData()
        setSubjectList(result);
    }

    const changeSubject = (e) => {
        setSelectedSub(e.target.value)
        if (e.target.value !== "All Subject") {
            const data = questionsList.filter((item) => item.subject === e.target.value)
            setShowQuestionsList(data)
        } else {
            setShowQuestionsList(questionsList)
        }
    }

    const handledelete = (data) => {
        setSelectedQuestion(data)
    }

    const deleteData = async () => {
        const result = await deleteQuestionsData(selectedQuestion?.id)
        if (result?.status === 200) {
            toast.success(result?.message)
            getAllSubject()
            getAllQuestion()
            setSelectedQuestion('')
            setSelectedSub('')
        } else {
            toast.error(result?.message)
        }
    }

    const handleOptionChange = (index, value) => {
        const newOptions = [...addData.options];
        newOptions[index] = value;
        setAddData({ ...addData, options: newOptions });
    };

    const addOption = () => {
        if (addData.options.length < 5) {
            setAddData({ ...addData, options: [...addData.options, ''] });
        }
    };

    const removeOption = () => {
        if (addData.options.length > 0) {
            const newOptions = [...addData.options];
            newOptions.pop();
            setAddData({ ...addData, options: newOptions });
        }
    };

    const addDataToQuiz = async () => {
        if (
            addData.question.trim() !== '' &&
            addData.subject.trim() !== '' &&
            addData.answer.trim() !== '' &&
            addData.options.every(option => option.trim() !== '')
        ) {
            const result = await addQuestionsData(addData);
            if (result?.status === 200) {
                toast.success(result?.message)
                setUpdate(false)
                getAllSubject()
                getAllQuestion()
                setSelectedQuestion('')
                setSelectedSub('')
            } else {
                toast.error(result?.message)
            }
        } else {
            toast.error('Please check all quiz fields');
        }
    }

    const handleEdit = (data) => {
        setUpdate(true)
        setSelectedQuestion(data)
        setAddData({
            question: data.question,
            subject: data.subject,
            options: [...data.options], // Create a new array to avoid modifying the original data
            answer: data.answer
        });
    }

    const handleUpdateCancle = () =>{
        setUpdate(false)
        setSelectedQuestion('')
        setAddData({
            question: "",
            subject: "",
            options: ['', '', '', ''],
            answer: ""
        })
    }

    const saveDataToQuiz = async () => {
        if (
            addData.question.trim() !== '' &&
            addData.subject.trim() !== '' &&
            addData.answer.trim() !== '' &&
            addData.options.every(option => option.trim() !== '')
        ) {
            const result = await updateQuestionsData(selectedQuestion?.id, addData)
            if (result?.status === 200) {
                setUpdate(false)
                toast.success(result?.message)
                getAllSubject()
                getAllQuestion()
                setSelectedQuestion('')
                setSelectedSub('')
                setAddData({
                    question: "",
                    subject: "",
                    options: ['', '', '', ''],
                    answer: ""
                })
            } else {
                toast.error(result?.message)
            }
        } else {
            toast.error('Please check all quiz fields');
        }
    }

    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showAddQuiz ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className='d-flex justify-content-between'>
                        <h2 className="fw-bold ">Add & List Quize</h2>
                        <button type="button" class="bg-color text-white btn-lg border-0" data-bs-toggle="button" onClick={() => backButton(4)} autocomplete="off" aria-pressed="true">
                            Back to Dashboard
                        </button>
                    </div>
                    <div className=''>
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
                                        <h2 className="fw-bold " style={{ whiteSpace: "nowrap" }} >Subject :-</h2>
                                        <div className='justify-content-between d-flex' style={{ width: "85%" }}>
                                            <select
                                                className="form-select w-25"
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
                                            <button type="button"
                                                class="bg-color btn px-5 border-0 text-white d-inline"
                                                data-bs-toggle="modal"
                                                data-bs-target="#addQueistionModal"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-100'>
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
                                        <h2 className="fw-bold">Question List</h2>
                                        <div className="card-body px-3 shadow-5 text-center align-items-center justify-content-center d-flex">
                                            <div className='w-100' style={{ maxHeight: "470px", overflow: "auto" }}>
                                                {
                                                    showQuestionsList.length > 0 ?
                                                        <table class="table table-bordered text-white">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Subject</th>
                                                                    <th scope="col" style={{ width: "300px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    showQuestionsList?.map((item, index) => (
                                                                        <tr key={item?.id}>
                                                                            <th scope="row">{item?.id}</th>
                                                                            <td>{item?.question}</td>
                                                                            <td>{item?.subject}</td>
                                                                            <td className='d-flex gap-3 justify-content-center'>
                                                                                <button type="button"
                                                                                    class="card btn px-3 ml-1 border-0 btn-primary d-inline bg-primary"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#addQueistionModal"
                                                                                    onClick={() => handleEdit(item)}
                                                                                >
                                                                                    Edit
                                                                                </button>
                                                                                <button type="button" class="card btn px-3 ml-1 border-0 btn-primary d-inline bg-danger"
                                                                                    onClick={() => handledelete(item)}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#queistionModal">
                                                                                    Delete
                                                                                </button>
                                                                            </td>
                                                                        </tr>

                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                        :
                                                        <h2 className="fw-bold">Question Not Availabl for {selectedSub}</h2>
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

            {/* Delete Modal */}
            <>
                <div
                    className="modal fade"
                    id="queistionModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog text-dark">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Delete Question
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body text-start">
                                <h5>
                                    Question :- {selectedQuestion?.question}
                                </h5>
                                <hr></hr>
                                <h5>
                                    Subject :- {selectedQuestion?.subject}
                                </h5>
                                <hr></hr>
                                <h5>
                                    Do you really want to delete the Question data?
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
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteData}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>

            {/* add model */}
            <>
                <div
                    className="modal fade"
                    id="addQueistionModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered text-dark" style={{ maxWidth: "700px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    {update ? "Edit" : "Add"} Question
                                </h1>
                                <button
                                    onClick={handleUpdateCancle}
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body text-start">
                                <div className='d-flex align-items-center gap-5'>
                                    <h5>
                                        Question :-
                                    </h5>
                                    <textarea className="form-control w-75" value={addData.question} onChange={(e) => setAddData({ ...addData, question: e.target.value })} name='question' placeholder="Enter Question" aria-label="With textarea"></textarea>
                                </div>
                                <hr></hr>
                                <div className='d-flex align-items-center gap-5'>
                                    <h5 style={{ width: "105px" }}>
                                        Subject :-
                                    </h5>
                                    <select
                                        className="form-select w-75"
                                        placeholder='Enter Subject'
                                        value={addData.subject}
                                        onChange={(e) => setAddData({ ...addData, subject: e.target.value })}
                                    >
                                        <option selected="" value="" disabled>Select Subject</option>
                                        {
                                            subjectList?.map((item) =>
                                                <option name="subject" value={item?.name}>{item?.name}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <hr></hr>
                                <div className='d-flex align-items-center gap-5'>
                                    <h5 style={{ width: "105px" }}>
                                        Options :-
                                    </h5>
                                    <div className='w-75'>
                                        {addData.options.map((option, index) => (
                                            <input
                                                key={index}
                                                type="text" className="form-control mb-2"
                                                name="option1" aria-describedby="basic-addon1"
                                                placeholder={`Option ${index + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                            />
                                        ))}
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <button
                                                class="btn btn-secondary px-5 border-0 text-white d-inline"
                                                type="button"
                                                disabled={addData.options.length >= 5}
                                                onClick={addOption}
                                            >
                                                Add Option
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-danger px-5 border-0 text-white d-inline"
                                                onClick={removeOption}>
                                                Remove Option
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <hr></hr>
                                <div className='d-flex align-items-center gap-5'>
                                    <h5 style={{ width: "105px" }}>
                                        Answer :-
                                    </h5>
                                    <input type="text" name='answer' onChange={(e) => setAddData({ ...addData, answer: e.target.value })} value={addData.answer} className="form-control mb-2 w-75" placeholder="Enter Question Answer" aria-label="Option 1" aria-describedby="basic-addon1" />
                                </div>
                                <hr></hr>
                                <h5>
                                    Do you really want to {update ? "Edit" : "Add"} the Question data?
                                </h5>
                                <h5 className='text-danger'>
                                    This question mark only 5
                                </h5>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={handleUpdateCancle}
                                >
                                    Close
                                </button>
                                {
                                    update ?
                                        <button type="button" className=" btn btn-success" data-bs-dismiss="modal" onClick={saveDataToQuiz}>
                                            Save
                                        </button>
                                        :
                                        <button type="button" className=" btn btn-success" data-bs-dismiss="modal" onClick={addDataToQuiz}>
                                            Add
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </>

        </section>
    )
}

export default AddQuiz
