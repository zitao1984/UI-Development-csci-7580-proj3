import {useState} from 'react';
import Trivia from "./Trivia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadTear,faGrinStars,faGrinBeamSweat} from "@fortawesome/free-solid-svg-icons";



const TriviaBlock = props =>{
    const [currentTriviaIndex, triviaSelected] = useState(0);
    const [answerView,updateAnswerView]=useState(false)
    const [agreeTotal,updateAgreeTotal]=useState(0)


    // chang to answer mode after submit
    const viewChange=()=>{
        updateAnswerView(true)
    }

    //check if the selected answer is same as the corrected answer
    const agreeListUpdate=()=>{
        updateAgreeTotal(agreeTotal+1)
    }

    // Move to next trivia
    const triviaNext=()=>{
        if(currentTriviaIndex<props.results.length){
            updateAnswerView(false)
            triviaSelected(currentTriviaIndex+1)
        }
    }

    const startFunction=()=>{
        props.setStatus()
    }

    if (props.response_code===0 && currentTriviaIndex<props.results.length)
        return (
            <div className="triviaCard">
                <h2>#{currentTriviaIndex+1}</h2>
                <Trivia trivia={props.results[currentTriviaIndex]} triviaNext={()=>triviaNext()}
                        answerView={answerView} viewChange={()=>viewChange()} agreeListUpdate={()=>agreeListUpdate()}/>

            </div>
        )

    else if (props.response_code===1){
        return (
            <div className="triviaCard">
                <div>
                    <div className="iconDefine"><FontAwesomeIcon icon={faSadTear} /></div>
                <p>
                    Sorry, we don't have enough questions that match your criteria. Please
                    change the category, difficulty or decrease the number of questions and try again.
                </p>
                </div>
               <div className="d-grid gap-2">
                            <button type="button" className="btn btn-primary mt-4"
                                    onClick={() => startFunction()}>
                                Wanna try it again
                            </button>
                        </div>
            </div>
        )
    }
    else{
        return(
            <div className="triviaCard">
                <h2>Your results</h2>
                <div id="resultSentence">
                    <p >Your final score is {agreeTotal} out of {props.results.length}</p>
                    {
                        agreeTotal<props.results.length/2?
                            (<>
                                <div className="iconDefine"><FontAwesomeIcon icon={faGrinBeamSweat} /></div>
                            <p>Don't be frustrated, you can do it!</p>
                                </>):
                            (<>
                                <div className="iconDefine"><FontAwesomeIcon icon={faGrinStars} /></div>
                                <p>Awesome job!</p>
                            </>)
                    }
                </div>
                <div className="d-grid gap-2">
                            <button type="button" className="btn btn-primary mt-4"
                                    onClick={() => startFunction()}>
                                Wanna try it again
                            </button>
                        </div>
            </div>

        )
    }

}
export default TriviaBlock