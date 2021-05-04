import {categories,difficulty} from "../data/data";

const Settings = props => {

    return (
        <form>
            <div className="row my-4">
                        <label className="col-sm-5 col-md-3 col-form-label my-label" htmlFor="category">Category </label>
                        <div className="col-sm-7 col-md-9">
                            <select className="form-select" id="category" value={props.category}
                                    onChange={e => props.updateParams({
                                        category: e.target.value,
                                        amount: props.amount,
                                        difficulty: props.difficulty
                                    })}>
                                <option value="any">any</option>
                                {
                                    categories.map((category, index) =>
                                        <option value={category.id}>{category.name}</option>
                                    )
                                }

                            </select>
                        </div>
                    </div>

                    <div className="row my-4">
                        <label className="col-sm-5 col-md-3  col-form-label my-label " htmlFor="difficulty"><small>Difficulty</small></label>
                        <div className="col-sm-7 col-md-9">
                        <select className="form-select" id="difficulty" value={props.difficulty}
                                onChange={e => props.updateParams({
                                    category: props.category,
                                    amount: props.amount,
                                    difficulty: e.target.value
                                })}>
                            {
                                difficulty.map((choice, index) =>
                                    <option value={choice}>{choice}</option>
                                )
                            }

                        </select>
                    </div>
                </div>

            <div className="row my-4">
                    <label className="col-sm-5 col-md-3 my-label col-form-label" htmlFor="numbers"><small>Number of Questions </small></label>
                <div className="col-sm-7 col-md-9">      
                <input type="number" id="numbers" min="1" max="50" step="0" value={props.amount}
                           onChange={e => props.updateParams({
                               category: props.category,
                               amount: e.target.value,
                               difficulty: props.difficulty
                           })}/>

                </div>
            </div>
        </form>

    )
}

export default Settings;