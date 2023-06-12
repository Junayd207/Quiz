import React, {useState, useEffect} from "react"
import "../css/Quiz.css"
import {nanoid} from "nanoid"
import axios from "axios"

import Answers from "./Answers"

export default function Quiz({URL, setMenu, numOfQuestions}){
    const [allQuestions, setAllQuestions] = useState([])
    const [questionsAnswered, setQuestionsAnswered] = useState(true)
    const [correct, setCorrect] = useState(0)
    const [checked, setChecked] = useState(false)
    const [count, setCount] = useState(0)
    const [noQuestions, setNoQuestions] = useState(false)

    const fetchData = async() => {
        console.log(URL)
        const {data} = await axios.get(URL)
        let q = []
        if(data.response_code === 1){
            setNoQuestions(true)
        }
        else{
            data.results.forEach(question =>{
                q.push({
                    ...question,
                    key: nanoid(),
                    selected: "",
                    checked: false})
            })
        }
        setAllQuestions(q)
    }

    useEffect(() => {
        fetchData()
    },[count])

    const decodeEntities = (function() { 
        const element = document.createElement('div');
        function decodeHTMLEntities (str) {
            if(str && typeof str === 'string') {
                str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
                str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                element.innerHTML = str;
                str = element.textContent;
                element.textContent = '';
            }
        return str;
        }
        return decodeHTMLEntities;
    })();

    function handleClickAnswer(key, answer) {
        setAllQuestions(questions => questions.map(question => {
            if(question.key === key && question.selected === answer){
                return {...question, selected: ""}
            }
            else if(question.key === key){
                return {...question, selected: answer}
            }
            else{
                return question
            }
        }))
    }

    function checkAnswers(){
        setQuestionsAnswered(true)
        let correct = 0
        let allQuestionsAnswered = true;
        allQuestions.forEach(question =>{
            if(question.selected === ""){
                allQuestionsAnswered = false
            }
        })
        if(allQuestionsAnswered === false){
            setQuestionsAnswered(false)
            return
        }
        allQuestions.forEach(question =>{
            if(question.selected === question.correct_answer){
                correct+=1
            }
        })
        setCorrect(correct)
        setChecked(true)
    }

    function playAgain(){
        setAllQuestions([])
        setCount(count+1)
        setChecked(false)
    }

    console.log(allQuestions)
    const questionElements = allQuestions.length > 0 ? allQuestions.map(question => {
        return(<div key={nanoid} className="question-container">
            <h4 key={nanoid} className="quiz-question">{decodeEntities(question.question)}</h4>
            <Answers
                key={question.key}
                question={question}
                decoder={decodeEntities}
                handleClickAnswer={handleClickAnswer}
                checked={checked}
            />
        </div>) 
    }) : (noQuestions ? <h1 className="error-text">Sorry, Not enough questions for this filter</h1> : <h1 className="error-text">Loading...</h1>)

    return(
        <div>
            <header className="quiz-header">
                <h2 className="quiz-header-title">QuizMaster</h2>
                <button className="quiz-header-return" onClick={() => setMenu(true)}>Return</button>
            </header>
            <main className="quiz-hero-container">
                {questionElements}
                {!questionsAnswered && <h1 className="bottom-message">Please Answer All Questions</h1>}
                {checked && <h1 className="bottom-message">You got {correct}/{numOfQuestions}</h1>}
                {allQuestions.length > 0 && <button className="check-answers-button" onClick={checked ? playAgain : checkAnswers}>{checked ? "Play Again" : "Check Answers"}</button>}
            </main>

        </div>
    )
}