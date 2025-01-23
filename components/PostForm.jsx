import { usePopup } from "../context/popUp.context";

function PostForm({ title, setTitle, type , setType, content, setContent, visibility, setVisibility, handleSubmit }) {
 
  const { hidePopup } = usePopup();
 
 
  return (
    <div style={{padding: "20px"}}>
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      />
      <textarea
        className="form-control"
        name="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
      />
       <select
        className="form-control mt-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="gaming">Gaming</option>
        <option value="tech">Tech</option>
        <option value="news">News</option>
      </select>

      <select
        className="form-control mt-2"
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
      >
        <option value="general">General</option>
        <option value="members">Members</option>
      </select>
      <button type="submit" className="btn btn-primary mt-3" >
        Post
      </button>
    </form>
    </div>
  );
}

export default PostForm;