import React, { useState } from 'react'
import ButtonCom from '../CommonComponent/ButtonCom'
import InputCom from '../CommonComponent/InputCom';
import SingleQuestion from './SingleQuestion';
const totalQuestion = 15;

const TeacherForm = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const [page, setPage] = useState(1);
    const [questions, setQuestions] = useState({
        question: '',
        answer: '',
        options: new Array(4).fill(null)
    });
    const [data, setData] = useState({
        subjectName: '',
        questions: [new Array(15).fill(null)],
        notes: [new Array(2).fill(null)],
    })
    const handleCreateExam = () => {
        setDisplayForm(!displayForm);
    }
    const handlePrevious = () => {
        setPage(page - 1)
    }
    const handleNext = () => {
        setPage(page + 1)
    }
    return (
        <div>
            <div>
                <h1>CreateExam</h1>
                <div style={{ marginBottom: "10px" }}>
                    <ButtonCom text='Create Exam' onClick={handleCreateExam} />
                </div>
                {
                    displayForm &&
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px', }}>
                        <div style={{ minWidth: "700px" }}>
                            <label htmlFor='subjectName'>Subject Name</label>
                            <InputCom type='text' name='subjectName' id='subjectName' placeholder='Subject name' />
                            <label style={{ display: 'inline-block', margin: "20px 0px", fontSize: "20px" }}>Question: {page}</label>
                            <div>
                                <SingleQuestion />
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <ButtonCom disabled={(page === 1)} text='Previous' onClick={handlePrevious} /> <ButtonCom text='Next' disabled={(page === totalQuestion)} onClick={handleNext} />
                                </div>
                            </div>
                            <label htmlFor='notes'>Notes</label>
                            <InputCom type='text' name='notes' id='notes' />
                            <ButtonCom text='Submit' />
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default TeacherForm
