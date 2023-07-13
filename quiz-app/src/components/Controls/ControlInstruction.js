import './control.css';
const Control = () =>{

    return (
    <div className="control">
        <ul className="control-elements">
            <li className="control-item">
                Up Arrow - Move forward
            </li>
            <li className="control-item">
                Down Arrow - Break
            </li>
            <li className="control-item">
                Right Arrow - Turning Right
            </li>
            <li className="control-item">
                Left Arrow - Turning Left
            </li>
        </ul>
    </div> 
    )
}

export default Control;