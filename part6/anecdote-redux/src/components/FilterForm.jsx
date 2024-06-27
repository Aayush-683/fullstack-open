import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";

const FilterForm = () => {

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const f = event.target.value;
        dispatch(filter(f));
    }

    return (
        <div>
            <form>
                <label>Filter: </label>
                <input name="filter" onChange={handleChange} />
            </form>
        </div>
    );
}

export default FilterForm;