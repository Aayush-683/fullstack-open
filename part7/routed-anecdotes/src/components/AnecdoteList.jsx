import { Link, useParams } from "react-router-dom";

const AnecdoteList = ({ anecdotes, vote }) => {
	let id = useParams().id;
	let anecdote = null;
	if (id) {
		anecdote = anecdotes.find((a) => a.id === Number(id));
	}
	let component = (
		<div>
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<li key={anecdote.id}>
						<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            <button onClick={() => vote(anecdote.id)}>vote</button>
					</li>
				))}
			</ul>
		</div>
	);
  if (anecdote) {
    component = (
      <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>
          for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </p>
      </div>
    );
  }
	return component;
};

export default AnecdoteList;