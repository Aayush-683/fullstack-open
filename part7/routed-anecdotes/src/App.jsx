import { useState } from 'react';
import { BrowserRouter, Route, Link, Routes, useParams, Navigate, useNavigate } from 'react-router-dom';
import About from './components/About';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import Menu from './components/Menu';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1,
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2,
		},
	]);

	const [notification, setNotification] = useState('');

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setAnecdotes(anecdotes.concat(anecdote));
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	return (
		<BrowserRouter>
			<div>
				<h1>Software anecdotes</h1>
				<Menu />
        <Notification message={notification} />
				<Routes>
					<Route path="/anecdotes/:id" element={<AnecdoteList anecdotes={anecdotes} />} />
					<Route exact path="/" element={<AnecdoteList anecdotes={anecdotes} vote={vote} />} />
					<Route path="/create" element={<CreateNew addNew={addNew} notify={setNotification} />} />
					<Route path="/about" element={<About />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
