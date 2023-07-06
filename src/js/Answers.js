import React, { useState } from "react"
import { nanoid } from "nanoid"
import "../css/Answers.css"


export default function Answers(props){
    function shuffleArray(array){
        for(let i=array.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const [answers, setAnswers] = useState(shuffleArray([props.question.correct_answer, ...props.question.incorrect_answers]));
    function handleClick(answer){
        if(props.question.checked){
            return
        }
        if(props.checked === true){
            return
        }
        props.handleClickAnswer(props.question.key, answer);
    }

    const answersElement = answers && answers.map(answer => {
        let className=""
        if(!props.checked && answer === props.question.selected){
            className="answer-button selected"
        }
        else if(props.checked && answer === props.question.selected && answer !== props.question.correct_answer){
            className="answer-button wrong"
        }
        else if(props.checked && answer === props.question.correct_answer){
            className="answer-button selected"
        }
        else{
            className="answer-button"
        }

        return(
            <button 
                className={className} 
                key={nanoid()}
                onClick={() => handleClick(answer)}
            >{props.decoder(answer)}</button>
        )
    })

    return(
        <div className="answers-container" key={nanoid()}>
            {answersElement}
        </div>
    )
}