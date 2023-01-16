import { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ toggleModal, src, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyClose);
    return () => {
      window.removeEventListener('keydown', handleKeyClose);
    };
  });

  const handleKeyClose = event => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };
  const handleClose = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };
  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img src={src} alt={tags} width="700px" />
      </div>
    </div>
  );
}

// export class oldModal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyClose);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyClose);
//   }

//   handleKeyClose = event => {
//     if (event.code === 'Escape') {
//       this.props.toggleModal();
//     }
//   };

//   handleClose = event => {
//     if (event.target === event.currentTarget) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
//     const { src, tags } = this.props;
//     return (
//       <div className={css.overlay} onClick={this.handleClose}>
//         <div className={css.modal}>
//           <img src={src} alt={tags} width="700px" />
//         </div>
//       </div>
//     );
//   }
// }
