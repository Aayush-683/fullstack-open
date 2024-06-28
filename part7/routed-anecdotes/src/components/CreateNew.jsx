import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = ({ addNew, notify }) => {
	const content = useField('text');
	const author = useField('text');
	const info = useField('text');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
		navigate('/');
		notify(`a new anecdote "${content.value}" was created!`);
		setTimeout(() => {
			notify('');
		}, 5000);
	};

	const resetFields = () => {
        content.reset();
        author.reset();
        info.reset();
	};

    const { reset: _, ...contentProps } = content;
    const { reset: __, ...authorProps } = author;
    const { reset: ___, ...infoProps } = info;

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content: <input {...contentProps} />
				</div>
				<div>
					author: <input {...authorProps} />
				</div>
				<div>
					url for more info: <input {...infoProps} />
				</div>
				<button type="submit">create</button>
				<button type="reset" onClick={resetFields}>clear</button>
			</form>
		</div>
	);
};

export default CreateNew;
