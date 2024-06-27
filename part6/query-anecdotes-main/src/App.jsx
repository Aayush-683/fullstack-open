import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import { getAll } from './services/db';
import { useUpdateMutation } from './services/mutations';

const App = () => {
	const updateMutation = useUpdateMutation();

	const handleVote = (anecdote) => {
		let newObject = { ...anecdote, voteFs: anecdote.votes + 1 };
		updateMutation.mutate(newObject);
	};

	const { data: anecdotes, isError, isPending, error } = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAll,
		refetchOnWindowFocus: false,
		retyr: 3,
	});

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<>
				<div>Anecdote service not available due to problem with the server.</div>
				<br />
				{error.message ? <div>Error message: {error.message}</div> : null}
			</>
		);
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
