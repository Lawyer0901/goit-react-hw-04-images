import { Component } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
export class Searchbar extends Component {
  state = {
    search: '',
  };

  // Controlled Input

  handleInputValue = e => {
    const { value } = e.currentTarget;
    this.setState({ search: value });
  };

  // Submit Form
  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { search } = this.state;
    if (search.trim() === '') {
      return;
    }
    onSubmit(search);
    this.setState({ search: '' });
  };

  // Render of Form
  render() {
    const { search } = this.state;
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css['searchForm-button']}>
            <span className={css['button-labe']}>
              <ImSearch className={css.icon} />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            value={search}
            placeholder="Search images and photos"
            onChange={this.handleInputValue}
          />
        </form>
      </header>
    );
  }
}

// key=31605839-858af090e8e0e31dbfed95a6b
