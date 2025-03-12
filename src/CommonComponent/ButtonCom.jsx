import { Padding } from "@mui/icons-material"

const ButtonCom = ({ onClick, text, type, disabled }) => {
  return (
    <div style={{padding:'10px 0px'}}>
          <button disabled={disabled} style={{ border: '1px solid  transparent', borderRadius: '8px', padding: '0.6em 2em', fontSize: '1em', background:'#1a1a1a',cursor:'pointer', }} type={type} onClick={onClick}>{text}</button>
    </div>
  )
}

export default ButtonCom


// button {
//     border - radius: 8px;
//     border: 1px solid transparent;
//     padding: 0.6em 1.2em;
//     font - size: 1em;
//     font - weight: 500;
//     font - family: inherit;
//     background - color: #1a1a1a;
//     cursor: pointer;
//     transition: border - color 0.25s;
// }
// button:hover {
//     border - color: #646cff;
// }