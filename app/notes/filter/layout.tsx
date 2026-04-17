import css from './LayoutNotes.module.css';

interface NotesLayoutProps{
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

function NotesLayout({children, sidebar}: NotesLayoutProps){
    return (<div className={css.container}>
        <aside className={css.sidebar}>
          {sidebar}
        </aside>

        <div className={css.notesWrapper}>
          {children}
        </div>
      </div>)
}

export default NotesLayout;