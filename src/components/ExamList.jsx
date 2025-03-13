import React, { useEffect, useState } from 'react'
import { getRequest } from '../utils/api'
import { useAuth } from '../Context/AuthProvider';
import ButtonCom from '../CommonComponent/ButtonCom';

const ExamList = () => {
    const { token } = useAuth();
    const [exams, setExams] = useState([]);
    const handleExaView = () => {
        
    }
    const handleExaEdit = () => {
        
    }
    const handleExaDelete = () => {

    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest("dashboard/Teachers/viewExam", token);
            if (response?.statusCode === 200) {
                setExams(response.data)
            }
            else {
                console.log(response?.message);
            }
        }
        fetchData();
    },[])
  return (
    <div>
          <h1>ExamList</h1>
          {
              exams && exams.map((val, index) => (
                  <div key={index} style={{ maxWidth: "600px", border: '1px solid gray', padding: '20px', borderRadius: '10px' }}>
                      <div>
                          <h1>Subject Name
                              {val.subjectName}</h1>
                      </div>

                      <div>
                          <h1>Email {val.email}</h1>
                      </div>
                      <div>
                          <label>Notes</label>
                          {val.notes && val.notes.map((val, index) => (
                              <div key={index}>{val} || </div>
                           ))}
                      </div>
                      <div>
                          <label>version</label>
                          {val.__v}
                      </div>
                      <div style={{display:'flex', gap:'15px',padding:'10px', flexWrap:'wrap'}}>      
                          <ButtonCom text='View Exam' onClick={() => handleExaView(val._id)}/>
                          <ButtonCom text='Edit Exam' onClick={() => handleExaEdit(val._id)}/>
                          <ButtonCom text='Delete Exam' onClick={() => handleExaDelete(val._id)}/>
                      </div>

                  </div>
              ))
          }
    </div>
  )
}

export default ExamList
