import Settings from "../components/Settings";
import {useState, useEffect} from 'react';
import Loading from "../components/loading";
import TriviaBlock from "../components/TriviaBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi, faLightbulb, faSadTear,faDog} from "@fortawesome/free-solid-svg-icons";


const STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAIL: "fail"
}

const requestActivity = async userParams => {
    const BASE_URL = "https://opentdb.com/api.php"
    let url = BASE_URL + createQueryString(userParams);
    let response = await fetch(url);
    let activityData = await response.json();
    return activityData
}

const createQueryString = userParams => {
    let params = [];
    for (let p in userParams) {
        if (userParams[p] !== "any") {
            params.push(p + "=" + userParams[p]);
        }
    }
    return params.length === 0 ? "" : "?" + params.join("&");
}

const App = () =>{
    const [status, setStatus] = useState(STATUS.LOADING);
    const [params, setParams] = useState({
        category: "any",
        amount: "2",
        difficulty:"any"
    });
    const [activity, setActivity] = useState(null);
    // Set button for the first page
    const [initialView,updateInitialView]=useState(true)


    const clickStart =()=>{
        setStatus(STATUS.LOADING)
        updateInitialView(false)

    }

    useEffect(() => {
        if (status === STATUS.LOADING) {
            requestActivity(params).then(data => {
                setStatus(STATUS.SUCCESS);
                setActivity(data);
            }).catch(error => {
                setStatus(STATUS.FAIL);
                console.log(error);
            })
        }
    }, [status,params]);
    console.log(activity)


    return(
        <div className="container">
            <div className="title">
                <h1>Zitao's Trivia App <FontAwesomeIcon icon={faLightbulb} /></h1>
            </div>
            <div className="row">
                <h2 className="subTitle"><FontAwesomeIcon icon={faDog} />Questions will be ...</h2>
                <Settings {...params} updateParams={setParams} />
            </div>
            {
                initialView ?
                    (<div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary mt-4"
                                onClick={() => clickStart()}>
                            Let's start
                        </button>
                    </div>) : status === STATUS.LOADING ?
                    <Loading />
                        :
                        <>
                            {
                                status === STATUS.SUCCESS ?
                                    <TriviaBlock {...activity} triviaNumber={params.amount} setStatus={()=>setStatus(STATUS.LOADING)}/>
                                    :
                                    (
                                        <div >
                                            <div className="iconDefine"><FontAwesomeIcon icon={faWifi} /></div>
                                            <p >Something went wrong. Check your Wi-Fi connection, please try again.</p>
                                        </div>
                                    )
                            }

                        </>
            }


        </div>
    )

}

export default App;