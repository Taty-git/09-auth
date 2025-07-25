import css from './NoteList.module.css';
import type {Note} from '../../types/note';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteNote} from '../../lib/api/clientApi';
import Link from 'next/link';

interface NoteListProps {
    notes: Note[];
}

const NoteList = ({notes}: NoteListProps) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
    });
   
    return (
        <ul className={css.list}>
	        {notes.map((note) => (
                <li className={css.listItem} key={note.id}>
                    <h2 className={css.title}>{note.title}
                        <Link href={`/notes/${note.id}`}>{note.title}</Link>
                    </h2>
                        <p className={css.content}>{note.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{note.tag}</span>
                                
                            <button
                                onClick={() => mutation.mutate(note.id)}
                                className={css.button}
                                >Delete
                            </button>
                            
                        </div>
                </li>
            ))}
        </ul>
    )
}
export default NoteList;