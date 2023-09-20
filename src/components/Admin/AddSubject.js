import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { addSubjectData, deleteSubjectData, getSubjectData, updateSubjectData } from '../config/ApiCall';

const AddSubject = ({ showAddSubject, backButton }) => {

    const [subjectList, setSubjectList] = useState([])
    const [subjectName, setSubjectName] = useState({ name: '' })

    const [update, setUpdate] = useState(false)
    const [selectedSub, setSelectedSub] = useState({
        id: "",
        name: ""
    })

    const handleEdit = (data) => {
        setUpdate(true)
        setSubjectName({
            name: data?.name
        })
        setSelectedSub({
            id: data?.id,
            name: data?.name
        })
    }

    const cancleEdit = () => {
        setUpdate(false)
        setSubjectName({
            name: ""
        })
        setSelectedSub({
            id: "",
            name: ""
        })
    }

    const handledelete = (data) => {
        setSelectedSub({
            id: data?.id,
            name: data?.name
        })
    }

    useEffect(() => {
        getAllSubject()
    }, [])

    const getAllSubject = async () => {
        const result = await getSubjectData()
        setSubjectList(result);
    }

    const handleAddData = async () => {
        if (subjectName.name.trim() !== '') {
            const result = await addSubjectData(subjectName)
            if (result?.status === 200) {
                toast.success(result?.message)
                getAllSubject()
                setSubjectName({ name: "" });
            } else {
                toast.error("Error updating data")
            }
        } else {
            toast.error("Enter Subject Name")
        }
    }

    const deleteData = async () => {
        const result = await deleteSubjectData(selectedSub?.id)
        if (result?.status === 200) {
            toast.success(result?.message)
            getAllSubject()
            setSubjectName({ name: "" });
            setSelectedSub({
                id: "",
                name: ""
            })
        } else {
            toast.error(result?.message)
        }
    }

    const editData = async () => {
        if (subjectName.name.trim() !== '') {
            const result = await updateSubjectData(selectedSub.id, subjectName)
            if (result?.status === 200) {
                toast.success(result?.message)
                setUpdate(false)
                getAllSubject()
                setSubjectName({ name: "" });
                setSelectedSub({
                    id: "",
                    name: ""
                })
            } else {
                toast.error(result?.message)
            }
        } else {
            toast.error("Enter Subject Name")
        }
    }

    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showAddSubject ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className='d-flex justify-content-between'>
                        <h2 className="fw-bold ">Add & List Subject</h2>
                        <button type="button" class="bg-color text-white btn-lg border-0" data-bs-toggle="button" onClick={() => backButton(3)} autocomplete="off" aria-pressed="true">
                            Back to Dashboard
                        </button>
                    </div>
                    <div className=''>
                        <div className='w-100 mb-5'>
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
                                        <h2 className="fw-bold">{update ? "Edit" : "Add"} Subject</h2>

                                        <div className="card-body px-3 shadow-5 text-center align-items-center justify-content-center d-flex">
                                            <h2 className="fw-bold w-25 ">Name :-</h2>
                                            <input type="text" class="form-control mr-5 " value={subjectName.name} onChange={(e) => setSubjectName({ name: e.target.value })} placeholder="Enter Subject name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            {
                                                update ?
                                                    <>
                                                        <button type="button" class="bg-color btn px-5 border-0 btn-primary" data-bs-toggle="button" onClick={() => editData()} autocomplete="off" aria-pressed="true">
                                                            Edit
                                                        </button>
                                                        <button type="button" class="bg-color btn px-5 ml-5 border-0 btn-primary" data-bs-toggle="button" onClick={() => cancleEdit()} autocomplete="off" aria-pressed="true">
                                                            Cancle
                                                        </button>
                                                    </>
                                                    :
                                                    <button type="button" class="bg-color btn px-5 border-0 text-white d-inline" data-bs-toggle="button" onClick={() => handleAddData()} autocomplete="off" aria-pressed="true">
                                                        Add
                                                    </button>
                                            }
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
                                        <h2 className="fw-bold">Subject List</h2>
                                        <div className="card-body px-3 shadow-5 text-center align-items-center justify-content-center d-flex">
                                            <div className='w-100' style={{ maxHeight: "470px", overflow: "auto" }}>
                                                <table class="table table-bordered text-white">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col" style={{ width: "300px" }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            subjectList?.map((item, index) => (
                                                                <tr key={item?.id}>
                                                                    <th scope="row">{item?.id}</th>
                                                                    <td>{item?.name}</td>
                                                                    <td className='d-flex gap-3 justify-content-center'>
                                                                        <button type="button" class="card btn px-3 ml-1 border-0 btn-primary d-inline bg-primary" data-bs-toggle="button" onClick={() => handleEdit(item)} autocomplete="off" aria-pressed="true">
                                                                            Edit
                                                                        </button>
                                                                        <button type="button" class="card btn px-3 ml-1 border-0 btn-primary d-inline bg-danger" disabled={update} data-bs-toggle="modal" onClick={() => handledelete(item)} data-bs-target="#exampleModal">
                                                                            Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog text-dark">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Delete Subject
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body text-start" >Do you really want to delete the {selectedSub.name} subject data?</div>
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

        </section>
    )
}

export default AddSubject
