import {useState} from "react";

const TriviaAnswer = props =>{
    const [userChoice,updateUserChoice]=useState({
            choice: ""
        }
    )

    const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

    const onUserChoiceChange = event => {
        updateUserChoice({
            choice: event.target.id,
        })

    }

    const canSubmit=()=>{
        return (userChoice.choice !== "" );
    }

    const callBack=()=>{
        props.view();
        props.agreeCheck(userChoice.choice);
        updateUserChoice({
            choice:""})
    }


    return(
        <div>
            {
               props.triviaChoice.map ((choice,index)=>

                   (
                       <div className="row my-2 ">
                               <input type="radio" className="btn-check" name="options-outlined" id={choice}
                                      checked={userChoice.choice===choice}
                                      onChange={e => onUserChoiceChange(e)}
                               />
                               <label className="btn btn-outline-success" htmlFor={choice}>{parseEntities(choice)}</label>
                        </div>

                   )

               )

            }
            <div className="row my-2">
                <div className="col text-end">
                    <button className="btn btn-primary" type="submit" disabled={!canSubmit()} onClick={()=>callBack()} color={canSubmit? "primary" : "secondary"}>Submit</button>
                </div>
            </div>

        </div>
        )

}

export default TriviaAnswer