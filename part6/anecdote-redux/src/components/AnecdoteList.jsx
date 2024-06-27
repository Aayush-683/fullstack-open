import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const dispatch = useDispatch();

	const voteHandler = (id) => {
		dispatch(voteAnecdote(id));
	};

	const filterText = useSelector((state) => state.filter) || "";

	const list = [...anecdotes].sort((a, b) => b.votes - a.votes);

	return (
		<div>
			<br />
			{filterText === "" ? null : <div>Filter: {filterText}</div>}
			{list.map((anecdote) => {
				if (anecdote.content.toLowerCase().includes(filterText.toLowerCase())) {
					return (
						<div key={anecdote.id}>
							<div>{anecdote.content}</div>
							<div>has {anecdote.votes}</div>
							<button onClick={() => voteHandler(anecdote.id)}>vote</button>
							<hr />
						</div>
					);
				}
			})}
		</div>
	);
};

export default AnecdoteList;
