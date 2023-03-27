import { useEffect, useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchData } from "./FetchData";
import { Searchbar } from "./Searchbar/Searchbar";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from "./Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [imgURL, setImgURL] = useState('');
  const [search, setSearch] = useState('');
  const [showBTN, setShowBTN] = useState('')
  useEffect(() => {
    if (!search) return
    setIsLoading(true)
    fetchData(search, page).then((data => {
      let totalHits = data.data.totalHits;
      if (totalHits !== 0) {
        const hits = data.data.hits;
        setGallery((prevState) => (
          [...prevState, ...hits]
        ))
        setShowBTN(page < Math.ceil(totalHits / 12))
      }
      else return Promise.reject(`We can't find foto ${search}`)
    }))
      .catch((error) => { Notify.failure(error) })
      .finally(() => {
        setIsLoading(false)
      })
  }, [page, search])
  const handleSubmit = (handleSearch) => {
    if (handleSearch !== search) {
      setSearch(handleSearch);
      setPage(1);
      setGallery([]);
      setShowBTN(false);
    }
    return
  };
  const handleImgClick = (e) => {
    setIsModal(!isModal)
    setImgURL(e.target.dataset.set)
  }
  const handleBtnClick = () => {
    setPage(page + 1);
  };
  const handleCloseModal = () => {
    setIsModal(!isModal);

  }
  return (
    <div
      style={{
        display: 'flex',
        gridGap: 16,
        paddingBottom: 24,
        flexDirection: 'column',
      }}
    >
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery galleryImg={gallery} imgClick={handleImgClick} />
      {isLoading && <Loader />}
      {showBTN && <Button btnClick={handleBtnClick} />}
      {isModal && <Modal url={imgURL} closeModal={handleCloseModal} />}
    </div >
  )
}