import React, { useState } from 'react'
import ButtonCom from '../CommonComponent/ButtonCom'
import InputCom from '../CommonComponent/InputCom';
import RadioCom from '../CommonComponent/RadioCom';
import { validateEmpty } from '../utils/validation';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthProvider';
import { postRequest } from '../utils/api';
const TeacherForm = () => {

    const { token } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [allQuestionError, setAllQuestionError] = useState(Array(15).fill(false))
    const [questionsError, setQuestionsError] = useState({ questionError: "", answerError: '', optionsError: "" });
    const [error, setError] = useState({
        subjectError: '', queError: '', noteError: ""
    })
    const [examData, setExamData] = useState({
        subjectName: "",
        questions: Array(15)
            .fill()
            .map(() => ({
                question: "",
                answer: "",
                options: ["", "", "", ""],
            })),
        notes: ["", ""],
    });


    const handleInputChange = (index, field, value) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const handleQueValidate = (index) => {
        const errors = {};
        errors.optionsError = '';
        const updatedQuestions = [...examData.questions];
        errors.questionError = validateEmpty(updatedQuestions[index]?.question, 'Question');
        errors.answerError = validateEmpty(updatedQuestions[index]?.answer, 'Answer');
        updatedQuestions[index]?.options.forEach((val) => {
            if (!val) {
                errors.optionsError = '4 option is required for each question';
            }
        })
        setQuestionsError(errors);
        return Object.values(errors).every((val) => !val);
    }

    const handleQuestionSave = (index, page) => {
        if (handleQueValidate(index)) {
            const output = allQuestionError.map((val, arrIndex) => arrIndex === index ? true : val);
            setAllQuestionError(output);
            (page === 'previous') && setCurrentQuestion(currentQuestion - 1);
            (page === 'next') && setCurrentQuestion(currentQuestion + 1);
        }
        else {
            const output = allQuestionError.map((val, arrIndex) => arrIndex === index ? false : val);
            setAllQuestionError(output);
        }
    }

    const handleOptionChange = (qIndex, optIndex, value) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[qIndex].options[optIndex] = value;
        updatedQuestions[qIndex].answer = '';
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const handleAnswerChange = (index, value) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[index].answer = value;
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const handleNoteChange = (index, value) => {
        const updatedNotes = [...examData.notes];
        updatedNotes[index] = value;
        setExamData({ ...examData, notes: updatedNotes });
    };

    const handleValidate = () => {
        const errors = {};
        errors.noteError = '';
        errors.queError = '';
        errors.subjectError = validateEmpty(examData.subjectName, 'Subject name');
        examData.notes.map((val) => {
            if (!val) {
                errors.noteError = 'Notes is required'
            }
        });
        if (!allQuestionError.every((val) => val)) {
            errors.queError = 'Please fill out all the question'
        }
        setError(errors)
        return Object.values(errors).every((val) => !val);

    }

    const handleSubmit = async () => {
        handleQuestionSave(currentQuestion);
        if (handleValidate()) {
            const response = await postRequest("dashboard/Teachers/Exam", examData, { 'access-token': `${token}` });
            if (response) {
                console.log(response)
                toast.success("Exam Created Successfully!");
            }
            else {
                toast.error(response?.message);
            }

        }
    }
    return (
        <div>
            <div>
                <h1>CreateExam</h1>

                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px', }}>
                    <div style={{ minWidth: "700px" }}>
                        <label htmlFor='subjectName' style={{ fontSize: '20px' }}>Subject Name</label> <span style={{ color: 'red' }}>{error.subjectError}</span>
                        <InputCom type='text' name='subjectName' id='subjectName' value={examData.subjectName} onChange={(e) => setExamData({ ...examData, subjectName: e.target.value })} placeholder='Subject Name' />
                        <label style={{ display: 'inline-block', margin: "20px 0px", fontSize: "20px" }}>Question</label><span style={{ color: 'red' }}>{error.queError}</span>
                        <div>
                            <div style={{ border: '1px solid gray', padding: '15px', borderRadius: "10px" }}>
                                <div>
                                    <label htmlFor='question'>Question {currentQuestion + 1}</label> <span style={{ color: 'red' }}>{questionsError.questionError}</span>
                                    <InputCom name='question' type='text' placeholder="Enter question" id='question' value={examData.questions[currentQuestion].question} onChange={(e) => handleInputChange(currentQuestion, "question", e.target.value)} />
                                </div>
                                <div style={{ padding: '20px 0px' }}>
                                    <label>Select Correct Answer:  {examData?.questions[currentQuestion]?.answer}</label>
                                    <span style={{ color: 'red' }}>{questionsError.answerError}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }} >
                                    {examData.questions[currentQuestion].options.map((opt, idx) => {
                                        if (!opt) return
                                        return (
                                            <div key={idx} style={{ display: "flex", width: "100%", }}>
                                                <RadioCom
                                                    name={`answer-${currentQuestion}`}
                                                    value={opt}
                                                    checked={examData.questions[currentQuestion].answer === opt}
                                                    onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                                                    text={opt}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                <span style={{ color: 'red' }}>{questionsError.optionsError}</span>
                                <div style={{ display: 'flex', alignItems: "center", gap: '10px', padding: '10px 0px' }}>
                                    {examData.questions[currentQuestion].options.map((opt, idx) => (
                                        <div key={idx} >
                                            <InputCom
                                                type="text"
                                                placeholder={`Option ${idx + 1}`}
                                                value={opt}
                                                onChange={(e) => handleOptionChange(currentQuestion, idx, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <ButtonCom disabled={currentQuestion === 0} text='Previous' onClick={() => { handleQuestionSave(currentQuestion, 'previous') }} />
                                <ButtonCom text='Next' disabled={currentQuestion === 14} onClick={() => { handleQuestionSave(currentQuestion, 'next') }} />
                            </div>
                        </div>
                        <label style={{ fontSize: '20px' }}>Notes</label><span style={{ color: 'red' }}>{error.noteError}</span>
                        {examData.notes.map((note, index) => (
                            <InputCom
                                key={index}
                                type="text"
                                placeholder={`Note ${index + 1}`}
                                value={note}
                                onChange={(e) => handleNoteChange(index, e.target.value)}
                            />
                        ))}
                        <ButtonCom text='Submit' onClick={handleSubmit} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TeacherForm
