import css from './NotesPage.module.css';
import NotesClient from './Notes.client';
import {Metadata} from 'next';
import {Note} from '../../../../../types/note';
import {getServerNotes} from '../../../../../lib/api/serverApi';


interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

type Props = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const category = await params;
  
  return {
    title: `NoteHub | ${category.slug[0]}`,
    description: "NoteHub | Category",
    openGraph: {
      title: `NoteHub | ${category.slug[0]}`,
      description: "NoteHub | Category",
      url: `https://notehub.com/notes/${category.slug[0]}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note App image",
        },
      ],
      type: "article",
    },
  };
}

const NotesPage = async ({params}: Props) => {
  const {slug} = await params;
  const tag = slug[0] === "All" ? "" : slug[0];

  const response: NotesHttpResponse = await getServerNotes("", 1, tag);

  return (
    <section className={css.app}>
      <NotesClient initialValue={response} tag={tag} />
    </section>
  );
};

export default NotesPage;