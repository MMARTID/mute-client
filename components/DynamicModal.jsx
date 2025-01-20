import { useState } from 'react';
import { usePopup } from '../context/popUp.context.jsx';
import { useEffect } from 'react';
import service from '../services/config.services.js';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';


function SendPost() {
  const { loggedUserId } = useContext(AuthContext)
  const { isVisible, formType, hidePopup } = usePopup();
  const [content, setContent] = useState('');  
  const [title, setTitle] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formType === 'post'){
      console.log(`Submitting ${formType}: ${content}`, content)
      service.post(`/posts//${loggedUserId}`, {content : content, title : title})
      setContent('');
      setTitle('')
      hidePopup()
      return
    }
    if(formType === 'comment'){
      console.log(`Submitting ${formType}: ${content}`)
      service.post(`/comments/${loggedUserId}`,{content : content})
      setContent('');
      setTitle('')
      hidePopup()
      return
    }

    ; // Cierra el popup después de enviar
  };
console.log(formType , content)
  
 if (!isVisible) return null
 
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {formType === 'post' ? 'Create a Post' : 'Create a Comment'}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={hidePopup}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
            {formType === 'post' ? (
              <input 
              className='form-control mb-2'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />

              
              ) : (
              'Create a Comment'
              )
            }
              <textarea
                className="form-control"
                name="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={formType === 'post' ? "What's on your mind?" : 'Add a comment...'}
                rows="4"
              />
              <button type="submit" className="btn btn-primary mt-3">
                {formType === 'post' ? 'Post' : 'Comment'}
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={hidePopup}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendPost;