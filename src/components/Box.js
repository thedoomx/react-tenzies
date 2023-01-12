import './Box.css';

export default function Box(props) {
    return (
        <div 
        onClick={(event) => props.handleClick(event, props.item.number, props.index)} 
        className={`number-box ${props.item.isLocked && "locked"}`}>
            {props.item.number}
        </div>
    )
}