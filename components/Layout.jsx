import Navbar from "./Navbar";

const styles = {
  layout: {
    display: "flex",
   
    justifyContent: "flex-start",
    minHeight: "100vh",
  },
  navbar: {
    
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
   
  },
  content: {
    flex: '1',
    display: "flex",
    justifyContent: "flex-start",
    padding: "15px",
    backgroundColor: "#f0f0f0"
  },
  footer: {
    backgroundColor: "#343a40", 
    color: "#ffffff", 
    textAlign: "center",
    padding: "10px 0"
  }
};

function Layout({ children }) {
  
  return (
   
    <div style={styles.layout}>
       <main style={styles.content}>
      <div style={styles.navbar}>
        <Navbar />
      </div>

      {/* Contenido principal */}
     
        
          {children || <p>Sin contenido disponible</p>}
          
      </main>

      
    </div>
  );
}

export default Layout;
