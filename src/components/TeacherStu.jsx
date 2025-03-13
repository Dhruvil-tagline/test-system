import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import { getRequest } from '../utils/api';
import ButtonCom from '../CommonComponent/ButtonCom';

const TeacherStu = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest('dashboard/Teachers', token);
      if (response.statusCode === 200) {
        console.log(response.data);
        setStudents(response.data);
      }
      else {
        console.log(response?.message)
      }
    }
    fetchData();
  }, [])
  return (
    <div>
      <h1>Teacher page of student list</h1>
      <div style={{display:"flex", flexWrap:'wrap', gap:'10px'}}>
        {students && students.map((student, index) => (
          <div key={student._id} style={{ display: "flex", border: '1px solid gray', padding: '20px', flexDirection: 'column', borderRadius: '10px', marginBottom: '20px', maxWidth: "500px" }}>
            <h2>Email: {student.email}</h2>
            <div style={{ display: "flex", verticalAlign: 'middle' }}>
              <div style={{ display: 'flex',alignItems:'center',gap:'10px', padding:'10px',}}>
                <span>name: {student.name}</span>||
                <span>status: {student.status}</span>
              </div>
              <ButtonCom text='Personal Details' id={student._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeacherStu
