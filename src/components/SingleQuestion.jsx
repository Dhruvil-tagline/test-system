import React, { useId, useState } from 'react'
import InputCom from '../CommonComponent/InputCom';
import ButtonCom from '../CommonComponent/ButtonCom';
import RadioCom from '../CommonComponent/RadioCom';

const SingleQuestion = () => {
    const [data, setData] = useState({
        question: '',
        answer: '',
        options: [],
    });
    const [option, setOption] = useState('');

    const handleAdd = () => {
        if (!option) {
            alert('option is required')
        }
        else if (data.options.length >= 4) {
            alert('you can only add four option');
            console.log(data.answer)
            console.log(data.options)
        }
        else {
            setData((prev) => ({
                ...prev,
                options: [...prev.options, option]
            }))
        }
    }
    const handleChange = (e) => {
        console.log(e)

    }
    const id = useId();
    return (
        <div style={{ border: '1px solid gray', padding: '15px', borderRadius: "10px" }}>
            <div>
                <label htmlFor={`${id}question`}>Question</label>
                <InputCom name='question' type='text' id={`${id}question`} value={data.question} onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
            </div>
            <div style={{ padding: '20px 0px' }}>
                <label htmlFor={`${id}ans`}>Answer: </label>{data.answer}
            </div>
            <div>
                <label htmlFor={`${id}addOption`}>AddOption</label>
                <InputCom name='addOption' type='text' id={`${id}addOption`} value={option} onChange={(e) => setOption(e.target.value)} />
                <ButtonCom text='Add Option' onClick={handleAdd} />
            </div>
            <label>Options</label>
            <div style={{ display: 'flex', alignItems: "center", gap: '10px', padding: '10px 0px' }}>
                {
                    !!data.options.length &&
                    data.options.map((val, index) => (
                        <RadioCom key={index} name='option' text={val} value={val} onChange={(e) => setData((prev) => ({ ...prev, answer: e.target.value }))} />)
                }
                {/* <RadioCom name='option' text='option1' />
                <RadioCom name='option' text='option2' />
                <RadioCom name='option' text='option3' />
                <RadioCom name='option' text='option4' /> */}
            </div>
            <ButtonCom text='Add Question' />
        </div>
    )
}

export default SingleQuestion
