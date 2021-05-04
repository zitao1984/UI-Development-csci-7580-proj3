import TriviaAnswer from "./TriviaAnswer";
import {useState} from "react";

const Trivia = props=> {

    const[agree, updateAgree]=useState(false)
    const[userAnswer, updateUserAnswer]=useState("")

    const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

    const agreeCheck= userOption=>{
        if (userOption===props.trivia["correct_answer"]){
           updateAgree(true);
            props.agreeListUpdate();
        }
        else {
            updateAgree(false);
            updateUserAnswer(userOption)
        }

    }

    const shuffleArray = a =>{
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = a[i];
            a[i] = a[j];
            a[j] = temp;
        }
        return a;
    }

    let questionChoice =  JSON.parse(JSON.stringify(props.trivia["incorrect_answers"]));
    let answer = props.trivia["correct_answer"];
    questionChoice.push(answer);
    questionChoice = shuffleArray(questionChoice);



    return (
        <div className="card border-success mb-3 border-2 rounded-2" >
            <div className="card-header ">
                <h4>Difficulty: <span className="text">{props.trivia.difficulty}</span></h4>
                <h4 >Category: <span className="text">{props.trivia.category}</span></h4>
            </div>
            <div  className="card-body text-dark">
                <h3 className="card-title myTitle">{parseEntities(props.trivia.question)}</h3>

            {
                props.answerView?

                    (<div >
                            {
                            agree?
                                <h4 className="card-text text-success response">Congratulation, you are correct!</h4>:
                                (
                                    <div>
                                        <h4 className="card-text text-danger response">The choice: {userAnswer} is incorrect</h4>
                                        <h4 className="card-text text-success response">The correct choice is : {parseEntities(answer)}</h4>
                                    </div>
                                )
                            }

                                    <div className="row my-2">
                                        <div className="col text-end">
                                            <button className="btn btn-primary" type="submit" onClick={() =>props.triviaNext()} >Next</button>
                                        </div>
                                    </div>
                                </div>

                )
                    :
                    <TriviaAnswer triviaChoice={questionChoice}  answer={answer} view={()=>props.viewChange()} agreeCheck={(userOption)=>agreeCheck(userOption)}/>

            }
            </div>

        </div>
    )


}
export default Trivia