import { usePopup } from "../context/popUp.context.jsx";
import PostCard from "./PostCard.jsx";
import CommentsSection from "./CommentsSection.jsx";
import EditProfile from "./EditProfile.jsx";
import PostForm from "./PostForm.jsx";
import { TfiClose } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";
import { useSendPostLogic } from "../hooks/useSendPostLogic.js";

function SendPost() {
  const { isVisible, formType, postDetails, userProfile, setUserProfile, hidePopup } = usePopup();
  const {
    content, setContent,
    title, setTitle,
    type, setType,
    visibility, setVisibility,
    errorMessage, setErrorMessage,
    comments, setComments,
    handleSubmit,
    handleDelete
  } = useSendPostLogic();

  if (!isVisible) return null;

  const renderContent = {
    post: () => (
      <PostForm
        title={title}
        setTitle={setTitle}
        type={type}
        setType={setType}
        content={content}
        setContent={setContent}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        visibility={visibility}
        setVisibility={setVisibility}
        handleSubmit={handleSubmit}
      />
    ),
    viewPost: () => (
      <>
        <PostCard post={postDetails} />
        <CommentsSection postId={postDetails} comments={comments} setComments={setComments} />
      </>
    ),
    editProfile: () => (
      <form onSubmit={handleSubmit}>
        <EditProfile user={userProfile} setUser={setUserProfile} />
      </form>
    ),
  }[formType];

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h4>
              {formType === "post" && "Create a Post"}
              {formType === "viewPost" && postDetails?.title}
              {formType === "editProfile" && "Edit Profile"}
            </h4>

            <div className="buttons-container">
              {postDetails?.author?._id === userProfile?._id && (
                <button className="btn-close" onClick={handleDelete}>
                  <MdDeleteOutline />
                </button>
              )}

              <button className="btn-close" onClick={hidePopup}>
                <TfiClose />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="modal-body p-0">
            {renderContent?.()}
          </div>

          {/* FOOTER */}
          {formType === "viewPost" && (
            <div className="modal-footer">
              <input
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment"
              />
              <button className="btn btn-primary" onClick={handleSubmit}>add</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SendPost;
