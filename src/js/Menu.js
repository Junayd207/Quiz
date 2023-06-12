import React, {useState} from "react"
import "../css/Menu.css"

export default function Menu({numOfQuestions, setNumOfQuestions, category, setCategory, difficulty, setDifficulty, setMenu}){
    const handleNumOfQuestionsChange = (event) => {
        if (event.target.value === ''  || !/\./.test(event.target.value) && (parseFloat(event.target.value) <= 20 && parseFloat(event.target.value) >=1)) {
            setNumOfQuestions(event.target.value)
        }
        console.log(numOfQuestions)
    }
    
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
        console.log(category)
    }

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value)
        console.log(difficulty)
    }

    return(
        <main className="menu-container">
            <div className="menu-hero-container">
                <h2 className="quiz-text">QuizMaster</h2>
                <div className="form-container">
                    <div className="form-option">
                        <h1 className="form-text">No. Of Questions:</h1>
                        <input
                            className="form-input-field"
                            type="number"
                            onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                            onChange={handleNumOfQuestionsChange}
                            value={numOfQuestions}
                            min="1"
                            max="20"
                            step="1"
                        />
                    </div>
                    <div className="form-option">
                        <h1 className="form-text">Category:</h1>
                        <select className="form-input-field" id="category" onChange={handleCategoryChange} value={category}>
                            <option value="">Any</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals & Theatre</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime & Manga</option>
                            <option value="32">Entertainment: Cartoon & Animations</option>
                        </select>
                    </div>
                    <div className="form-option">
                        <h1 className="form-text">Difficulty:</h1>
                        <select className="form-input-field" id="category" onChange={handleDifficultyChange} value={difficulty}>
                            <option value="">Any</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
                <button className="enter-button" onClick={() => setMenu(false)}>Enter</button>
            </div>
        </main>
    )
}