import css from './ImageGalleryItem.module.css';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

export function ImageGalleryItem({ webURL, tags, largeImageURL }) {
  const [largeURL, setLargeURL] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
    return;
  };

  const handleClickOnImage = () => {
    setLargeURL(largeImageURL);
    handleToggleModal();
    return;
  };

  return (
    <>
      <li className={css['photo-card']}>
        <img src={webURL} alt={tags} onClick={handleClickOnImage} />
        {isOpen && (
          <Modal src={largeURL} tags={tags} toggleModal={handleToggleModal} />
        )}
      </li>
    </>
  );
}

// export class oldImageGalleryItem extends Component {
//   state = {
//     largeURL: '',
//     isOpen: false,
//   };

//   handleToggleModal = () => {
//     this.setState(prevState => ({ isOpen: !prevState.isOpen }));
//     return;
//   };

//   handleClickOnImage = () => {
//     this.setState({ largeURL: this.props.largeURL });
//     this.handleToggleModal();
//     return;
//   };

//   render() {
//     const { webURL, tags } = this.props;
//     const { isOpen, largeURL } = this.state;
//     return (
//       <>
//         <li className={css['photo-card']}>
//           <img src={webURL} alt={tags} onClick={this.handleClickOnImage} />
//           {isOpen && (
//             <Modal
//               src={largeURL}
//               tags={tags}
//               toggleModal={this.handleToggleModal}
//             />
//           )}
//         </li>
//       </>
//     );
//   }
// }
