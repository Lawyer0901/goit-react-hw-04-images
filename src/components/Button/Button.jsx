import css from './Button.module.css';
export function Button({ loadMore }) {
  return (
    <button className={css.buttonLoad} type="button" onClick={loadMore}>
      Load more
    </button>
  );
}
