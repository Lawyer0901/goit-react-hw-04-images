import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages, PER_PAGE } from './service/API';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export function App() {
  const [querry, setQuerry] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      return;
    }
    setStatus('pending');
    fetchImages(page, querry)
      .then(({ totalHits, hits }) => {
        if (hits.length === 0) {
          throw new Error('We have nothing for this query');
        }
        if (page > 1) {
          const totalPages = Math.ceil(totalHits / PER_PAGE);

          setImages(prevImages => {
            return [
              ...prevImages,
              ...hits.map(({ id, webformatURL, largeImageURL, tags }) => {
                return { id, webformatURL, largeImageURL, tags };
              }),
            ];
          });
          setStatus('resolved');
          if (totalPages === page) {
            throw new Error('You loaded all images');
          }
          return;
        }

        setImages(
          hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          })
        );
        setStatus('resolved');
        return;
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
    return;
  }, [querry, page, isFirstLoad]);

  const handleSubmit = async search => {
    if (querry === search) {
      return;
    }
    setIsFirstLoad(false);
    setImages([]);
    setPage(1);
    setQuerry(search);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {!isFirstLoad && images.length > 0 && <ImageGallery images={images} />}
      {images.length === 0 && status === 'rejected' && (
        <div>
          <img
            width="400px"
            src="https://www.meme-arsenal.com/memes/7a2e9f67e58e929277003ca53ab4d1cb.jpg"
            alt="Nothung to show"
          />
        </div>
      )}
      {!isFirstLoad && images.length >= PER_PAGE && status === 'resolved' && (
        <Button loadMore={handleLoadMore} />
      )}
      {status === 'pending' && <Loader />}
    </>
  );
}

// export class App extends Component {
//   state = {
//     search: '',
//     images: [],
//     status: 'idle',
//     page: 1,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { page, search } = this.state;

//     try {
//       if (prevState.search !== search || prevState.page !== page) {
//         this.setState({ status: 'pending' });
//       }
//       if (prevState.search !== search) {
//         const images = await getImages(page, search);
//         if (!images.totalHits) {
//           throw new Error('We have nothing for this query');
//         }

//         this.setState({
//           images: [
//             ...images.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
//               return { id, webformatURL, largeImageURL, tags };
//             }),
//           ],
//           status: 'resolved',
//         });
//         return;
//       }
//       if (prevState.page !== page && page !== 1) {
//         const images = await getImages(page, search);
//         this.setState({
//           images: [
//             ...prevState.images,
//             ...images.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
//               return { id, webformatURL, largeImageURL, tags };
//             }),
//           ],
//           status: 'resolved',
//         });
//         if (
//           images.totalHits === this.state.images.length ||
//           images.hits.length < PER_PAGE
//         ) {
//           throw new Error('You loaded all images');
//         }
//         return;
//       }
//     } catch (error) {
//       console.log(error);

//       this.setState({ status: 'rejected' });
//     }
//   }

//   handleSubmit = async search => {
//     this.setState(prevState => {
//       if (prevState.search === search) {
//         return;
//       }
//       return { images: [], page: 1, search };
//     });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleClickOnImage = () => {
//     this.setState(prevState => ({ isOpen: !prevState.isOpen }));
//   };

//   // Рендер всех элементов

//   render() {
//     const { images, status } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleSubmit} />
//         {images.length > 0 && (
//           <ImageGallery images={images} onClick={this.handleClickOnImage} />
//         )}
//         {images.length === 0 && status === 'rejected' && (
//           <div>
//             <img
//               width="400px"
//               src="https://www.meme-arsenal.com/memes/7a2e9f67e58e929277003ca53ab4d1cb.jpg"
//               alt="Nothung to show"
//             />
//           </div>
//         )}
//         {images.length > 0 &&
//           images.length >= PER_PAGE &&
//           status === 'resolved' && <Button loadMore={this.handleLoadMore} />}
//         {status === 'pending' && <Loader />}
//       </>
//     );
//   }
// }
