import React, { useState, useEffect } from "react"

import Menu from "./js/Menu"
import Quiz from "./js/Quiz"
import './App.css'

export default function App() {
    const [category, setCategory] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [numOfQuestions, setNumOfQuestions] = useState(5)
    const [URL, setURL] = useState("https://opentdb.com/api.php?amount=5&type=multiple")
    const [menu, setMenu] = useState(true)

    useEffect(() => {
        let categoryURL = ""
        let DifficultyURL = ""
        if(category.length > 0){
            categoryURL = `&category=${category}` 
        }
        if(difficulty.length > 0){
            DifficultyURL = `&difficulty=${difficulty}` 
        }
        setURL(`https://opentdb.com/api.php?amount=${numOfQuestions}${categoryURL}${DifficultyURL}&type=multiple`)
    },[category,difficulty,numOfQuestions])

    return (
        <div>
            {menu && <Menu numOfQuestions={numOfQuestions} setNumOfQuestions={setNumOfQuestions} category={category} setCategory={setCategory} difficulty={difficulty} setDifficulty={setDifficulty} setMenu={setMenu}/>}
            {!menu && <Quiz URL={URL} setMenu={setMenu} numOfQuestions={numOfQuestions}/>}
        </div>
    )
}
 
