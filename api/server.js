const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

const dataPath = './subject.json';
const QuizPath = './quiz.json'
const MarkPath = './result.json'

app.get('/api/get/all/subject', (req, res) => {
    const rawData = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(rawData);
    res.json(jsonData);
});

app.post('/api/add/subject', (req, res) => {
    const newData = req.body;

    const rawData = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(rawData);

    const newId = (jsonData.length + 1).toString();

    newData.id = newId;
    jsonData.push(newData);

    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

    res.json({ status: 200, message: 'Data added successfully', id: newId });
});

app.put('/api/update/subject/:id', (req, res) => {
    const updatedName = req.body.name;
    const subjectId = req.params.id;

    const rawData = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(rawData);

    const existingSubject = jsonData.find(subject => subject.id === subjectId);

    if (existingSubject) {
        // Update the subject's name with the new name
        existingSubject.name = updatedName;

        fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

        res.json({ status: 200, message: 'Data updated successfully' });
    } else {
        res.status(404).json({ status: 404, message: 'Subject not found' });
    }
});


app.delete('/api/delete/subject/:id', (req, res) => {
    const subjectId = req.params.id;

    const rawData = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(rawData);

    const existingSubjectIndex = jsonData.findIndex(subject => subject.id === subjectId);

    if (existingSubjectIndex !== -1) {
        // Remove the subject from the array
        jsonData.splice(existingSubjectIndex, 1);

        fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

        res.json({ status: 200, message: 'Data deleted successfully' });
    } else {
        res.status(404).json({ status: 404, message: 'Subject not found' });
    }
});


// Quiz

app.get('/api/get/all/questions', (req, res) => {
    const rawData = fs.readFileSync(QuizPath);
    const questionsData = JSON.parse(rawData);
    res.json(questionsData);
});

app.post('/api/add/questions', (req, res) => {
    const newQuestion = req.body;

    const rawData = fs.readFileSync(QuizPath);
    const questionsData = JSON.parse(rawData);

    const newId = (questionsData.length + 1).toString();

    newQuestion.id = newId;

    questionsData.push(newQuestion);

    fs.writeFileSync(QuizPath, JSON.stringify(questionsData, null, 2));

    res.json({ status: 200, message: 'Question added successfully', id: newId });
});

app.delete('/api/delete/questions/:id', (req, res) => {
    const questionId = req.params.id;

    const rawData = fs.readFileSync(QuizPath);
    const questionsData = JSON.parse(rawData);

    const questionIndex = questionsData.findIndex(question => question.id === questionId);

    if (questionIndex !== -1) {
        questionsData.splice(questionIndex, 1);

        fs.writeFileSync(QuizPath, JSON.stringify(questionsData, null, 2));

        res.json({ status: 200, message: 'Question deleted successfully' });
    } else {
        res.status(404).json({ status: 404, message: 'Question not found' });
    }
});

app.put('/api/update/questions/:id', (req, res) => {
    const questionId = req.params.id;
    const updatedData = req.body;

    const rawData = fs.readFileSync(QuizPath);
    const questionsData = JSON.parse(rawData);

    const questionIndex = questionsData.findIndex(question => question.id === questionId);

    if (questionIndex !== -1) {
        // Preserve the existing ID while updating other fields
        updatedData.id = questionsData[questionIndex].id;

        // Update the existing question data
        questionsData[questionIndex] = updatedData;

        fs.writeFileSync(QuizPath, JSON.stringify(questionsData, null, 2));

        res.json({ status: 200, message: 'Question updated successfully' });
    } else {
        res.status(404).json({ status: 404, message: 'Question not found' });
    }
});

// mark

app.get('/api/get/all/Marks', (req, res) => {
    const rawData = fs.readFileSync(MarkPath);
    const questionsData = JSON.parse(rawData);
    res.json(questionsData);
});

app.post('/api/add/Marks', (req, res) => {
    const marksData = req.body;

    const rawData = fs.readFileSync(MarkPath);
    const questionsData = JSON.parse(rawData);

    const nextId = questionsData.length + 1;

    marksData.id = nextId.toString();

    questionsData.push(marksData);

    fs.writeFileSync(MarkPath, JSON.stringify(questionsData, null, 2));

    res.json({ status: 200, message: 'Marks data saved successfully', id: marksData.id });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
