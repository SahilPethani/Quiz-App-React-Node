import axios from "axios";
export const BASE_URL = "http://localhost:3001/api/";

export const getSubjectData = async () => {
    try {
        let response = await axios({
            method: "GET",
            url: `${BASE_URL}get/all/subject`,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addSubjectData = async (subject) => {
    try {
        let response = await axios({
            method: "POST",
            url: `${BASE_URL}add/subject`,
            data: subject
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateSubjectData = async (subjectId , name) => {
    try {
        let response = await axios({
            method: "PUT",
            url: `${BASE_URL}update/subject/${subjectId}`,
            data: name
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteSubjectData = async (subject) => {
    try {
        let response = await axios({
            method: "DELETE",
            url: `${BASE_URL}delete/subject/${subject}`,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Quiz

export const getAllQuestionsData = async () => {
    try {
        let response = await axios({
            method: "GET",
            url: `${BASE_URL}get/all/questions`,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addQuestionsData = async (questions) => {
    try {
        let response = await axios({
            method: "POST",
            url: `${BASE_URL}add/questions`,
            data: questions
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateQuestionsData = async (Id , data) => {
    try {
        let response = await axios({
            method: "PUT",
            url: `${BASE_URL}update/questions/${Id}`,
            data: data
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteQuestionsData = async (id) => {
    try {
        let response = await axios({
            method: "DELETE",
            url: `${BASE_URL}delete/questions/${id}`,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// save mark

export const getAllMarkData = async () => {
    try {
        let response = await axios({
            method: "GET",
            url: `${BASE_URL}get/all/Marks`,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addMarkData = async (marksData) => {
    try {
        let response = await axios({
            method: "POST",
            url: `${BASE_URL}add/Marks`,
            data: marksData
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};