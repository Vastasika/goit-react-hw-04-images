import css from './Modal.module.css'
import { useEffect } from 'react'
import PropTypes from 'prop-types';
export const Modal = ({ url, closeModal }) => {

  useEffect(() => {
    const handlePressESC = (e) => {

      if (e.code === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handlePressESC)
    return () => {
      window.removeEventListener('keydown', handlePressESC)
    }
  }, [closeModal])

  const handleClick = e => {
    if (e.target.nodeName === 'DIV') closeModal()
  }


  return (
    <div data-set='overlay' className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={url} alt="" />
      </div>
    </div>
  )

}
Modal.propTypes = {
  url: PropTypes.string,
  closeModal: PropTypes.func
}