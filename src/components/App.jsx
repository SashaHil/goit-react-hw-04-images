import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchImages } from 'api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query !== '') {
      fetchImagesFunc(query, page);
    }
  }, [page, query]);

  const fetchImagesFunc = async (query, page) => {
    try {
      setLoading(true);
      const data = await fetchImages(query, page);
      if (data.hits.length === 0) {
        return toast.error("We didn't find anything");
      }
      setImages(prevState => [...prevState, ...data.hits]);
      setTotal(data.totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const totalPage = total / images.length;

  return (
    <Layout>
      <SearchBar onSubmit={handleSubmit} />

      {images.length !== 0 && (
        <ImageGallery onOpenModal={onOpenModal} images={images} />
      )}

      {loading && <Loader />}

      {totalPage > 1 && !loading && images.length !== 0 && (
        <Button onClick={onClickLoadMore} />
      )}

      {showModal && (
        <Modal
          largeImage={largeImage}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}

      {error && <p>We didn't find anything</p>}
      <ToastContainer />
    </Layout>
  );
};
