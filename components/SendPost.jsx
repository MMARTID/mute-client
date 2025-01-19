function SendPost() {
  return (
    <>
    <div >
    <form action="submit" style={{flexDirection: "column", display: 'flex'}}>
    <label htmlFor="title">Title</label>
    <input type="text" name="title" id="title" />
    <label htmlFor="content">Content</label>
    <input type="text" name="content" id="content" />
    <button 
      type="submit"
      style={{
        marginTop: 20
      }}
      >
        Submit
        </button>
 </form> 
    </div>
   
</>
  )
}
export default SendPost