import React, { useId } from 'react'

const RadioCom = ({ text, name,value, onChange }) => {
  const id = useId();
  return (
    <><div >

      <input style={{ height: '24px', width: '24px', verticalAlign: 'middle', margin: '0px 4px 0px 0px', }} type='radio' id={id} name={name} onChange={onChange} value={value} />
      <label htmlFor={id}>{text}</label>
    </div>
    </>
  )
}

export default RadioCom
