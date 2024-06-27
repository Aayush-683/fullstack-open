import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdoteForm = () => {
    
    const dispatch = useDispatch();
    const handleForm = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        if (content === '') return;
        event.target.anecdote.value = '';
        dispatch(addAnecdote(content));
    };

	return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleForm}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default NewAnecdoteForm;
