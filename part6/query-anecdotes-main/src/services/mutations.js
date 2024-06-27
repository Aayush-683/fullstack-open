import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNew, update } from './db';
import { useNotification } from './notifications';

export const useCreateMutation = () => {
    const queryClient = useQueryClient();
    const { setNotification } = useNotification();
    return useMutation({
        mutationFn: createNew,
        onSuccess: (data) => {
            queryClient.setQueryData(['anecdotes'], (old) => [...old, data]);
            setNotification(`You created '${data.content}'`);
        },
        onError: (error) => {
            let msg = "Something went wrong";
            if (error.response && error.response.data && error.response.data.error) {
                msg = error.response.data.error;
            }
            setNotification(msg);
            console.error('Create mutation error:', error);
        }
    });
};

export const useUpdateMutation = () => {
    const queryClient = useQueryClient();
    const { setNotification } = useNotification();
    return useMutation({
        mutationFn: update,
        onSuccess: (data) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'],
                anecdotes.map((anecdote) =>
                    anecdote.id === data.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
                )
            );
            setNotification(`You voted for '${data.content}'`);
        },
        onError: (error) => {
            let msg = "Something went wrong";
            if (error.response && error.response.data && error.response.data.error) {
                msg = error.response.data.error;
            }
            setNotification(msg);
            console.error('Update mutation error:', error);
        }
    });
};
