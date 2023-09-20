import React, { useEffect, useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './components/Login';
import Dashbord from './components/Dashbord';
import Subject from './components/subject';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashbord from './components/Admin/AdminDashbord';
import AddSubject from './components/Admin/AddSubject';
import { addMarkData, getAllQuestionsData, getSubjectData } from './components/config/ApiCall';
import AddQuiz from './components/Admin/AddQuiz';
import ResultList from './components/ResultList';

function App() {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [subQuizs, setSubQuizs] = useState([])
  const [subject, setSubject] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  const [marksData, setMarksData] = useState({
    marks: 0,
    outOf: 0,
    subject: '',
    details: [],
  });

  const [selectSubject, setSelectSubject] = useState('')
  const [allResult, setAllresult] = useState([])

  // Display Controlling States
  const [showlogin, setLogin] = useState(false);
  const [showDashbord, setDashbord] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showResultList, setShowResultList] = useState(false);


  // Admin Display Controlling States
  const [showAdminDashbord, setShowAdminDashbord] = useState(false);
  const [showAddSubject, setAddSubject] = useState(false);
  const [showAddQuiz, setShowAddQuiz] = useState(false);

  // login cradentiol
  const studentId = [
    {
      id: "01",
      name: "testUser",
      role: "01",
      password: "12345678"
    },
    {
      id: "02",
      name: "adminUser",
      role: "02",
      password: "12345"
    }
  ]

  // Load JSON Data
  useEffect(() => {
    // fetch('quiz.json')
    //   .then(res => res.json())
    //   .then(data => setQuizs(data))
    getAllQuiz()
    const data2 = window.localStorage.getItem("userDetail")
    const user = JSON.parse(data2)
    if (user?.role === "01") {
      setDashbord(true)
    }
    if (user?.role === "02") {
      setShowAdminDashbord(true)
    }

    if (user === null) {
      setLogin(true)
    }
  }, []);

  const getAllQuiz = async () => {
    const result = await getAllQuestionsData()
    setQuizs(result)
  }

  // Set a Single Question
  useEffect(() => {
    if (subQuizs.length > questionIndex) {
      setQuesion(subQuizs[questionIndex]);
    }
  }, [subQuizs, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    if (selectSubject) {
      const data = quizs.filter((item) => item?.subject === selectSubject?.name)
      if (data.length === 0) {
        setShowStart(false);
        setShowSubject(true)
      } else {
        setShowStart(false);
        setShowQuiz(true);
        setSubQuizs(data)
      }
    }
  }

  // after login
  const showDash = (data) => {
    if (data.username !== "" && data.password !== "") {
      const user = studentId.find((item, ind) => item.name === data.username && item.password === data.password)
      if (user?.role === "01") {
        window.localStorage.setItem("userDetail", JSON.stringify(user))
        setLogin(false)
        toast.success("LogIn successfully")
        setDashbord(true)
      }
      if (user?.role === "02") {
        window.localStorage.setItem("userDetail", JSON.stringify(user))
        setLogin(false)
        toast.success("Admin LogIn successfully")
        setShowAdminDashbord(true)
      }
      if (user === undefined) {
        toast.error("invalid username and Password")
      }
    } else {
      toast.error("Enter username and Password")
    }
  }

  // select subject
  const showsubject = async () => {
    const result = await getSubjectData()
    setSubject(result)
    setDashbord(false)
    setShowSubject(true)
  }

  // show Result List 
  const showresultList = async () => {
    setDashbord(false)
    setShowResultList(true)
  }

  // show start
  const satrt = (sub) => {
    setSelectSubject(sub)
    setShowSubject(false)
    setShowStart(true);
  }

  const backButton = (num) => {
    if (num === 1) {
      setShowSubject(false)
      setDashbord(true)
    }

    if (num === 2) {
      setShowStart(false);
      setShowSubject(true)
    }

    if (num === 3) {
      setAddSubject(false)
      setShowAdminDashbord(true);
    }

    if (num === 4) {
      setShowAddQuiz(false)
      setShowAdminDashbord(true);
    }

    if (num === 5) {
      setShowResultList(false)
      setDashbord(true)
    }
  }

  // Check Answer
  // const checkAnswer = (event, selected) => {
  //   if (!selectedAnswer) {
  //     setCorrectAnswer(question.answer);
  //     setSelectedAnswer(selected);

  //     if (selected === question.answer) {
  //       event.target.classList.add('bg-success');
  //       setMarks(marks + 5);
  //     } else {
  //       event.target.classList.add('bg-danger');
  //     }
  //   }
  // }

  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      const isCorrect = selected === question.answer;
      const marksToAdd = isCorrect ? 5 : 0;

      // Update the total marks and details
      setMarksData((prevMarksData) => ({
        marks: prevMarksData.marks + marksToAdd,
        outOf: subQuizs.length * 5,
        subject: selectSubject?.name,
        details: [
          ...prevMarksData.details,
          {
            question: question.question,
            subject: question.subject,
            selectedAnswer: selected,
            isCorrect: isCorrect,
            marks: marksToAdd,
          },
        ],
      }));

      setSelectedAnswer(selected);

      if (isCorrect) {
        event.target.classList.add('bg-success');
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  };

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  }

  // Show Result
  const showTheResult = async () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);

    const result = await addMarkData(marksData)
    if (result?.status === 200) {
      toast.success(result?.message)

    } else {
      toast.error(result?.message)
    }
  }

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setMarksData({
      marks: 0,
      outOf: 0,
      details: [],
    })
    setSelectSubject('')
    // setShowQuiz(true);
    setDashbord(true)
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  const logout = () => {
    window.localStorage.removeItem("userDetail")
    setDashbord(false)
    setShowAdminDashbord(false)
    toast.success("Log Out successfully")
    setLogin(true)
  }

  const AddSubjects = () => {
    setShowAdminDashbord(false)
    setAddSubject(true)
  }

  const ShowAddQuiz = () => {
    setShowAdminDashbord(false)
    setShowAddQuiz(true)
  }

  return (
    <>
      <ToastContainer theme="dark" />
      {/* log in page */}
      <Login
        showDash={showDash}
        showlogin={showlogin}
      />

      {/* dashbord and subject */}
      <Dashbord
        logout={logout}
        showsubject={showsubject}
        showresultList={showresultList}
        dashbord={showDashbord}
      />

      {/* subject page */}
      <Subject
        backButton={backButton}
        satrt={satrt}
        subject={subject}
        showSubject={showSubject}
      />

      {/* result List page */}
      <ResultList
        showResultList={showResultList}
        backButton={backButton}
      />

      {/* Welcome Page */}
      <Start
        backButton={backButton}
        startQuiz={startQuiz}
        showStart={showStart}
        selectSubject={selectSubject}
      />

      {/* Quiz Page */}
      <Quiz
        showQuiz={showQuiz}
        question={question}
        subQuizs={subQuizs}
        checkAnswer={checkAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
      />

      {/* Result Page */}
      <Result
        showResult={showResult}
        subQuizs={subQuizs}
        marks={marksData.marks}
        startOver={startOver} />

      {/* admin dashbord */}
      <AdminDashbord
        logout={logout}
        AddSubject={AddSubjects}
        ShowAddQuiz={ShowAddQuiz}
        showAdminDashbord={showAdminDashbord}
      />

      {/* addmin add subject */}
      <AddSubject
        showAddSubject={showAddSubject}
        backButton={backButton}
      />

      {/* admin add Quiz */}
      <AddQuiz
        showAddQuiz={showAddQuiz}
        backButton={backButton}
      />
    </>
  );
}

export default App;
