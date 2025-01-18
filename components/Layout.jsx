import Navbar from "./Navbar";

function Layout({ children }) {

    return (
        <div className="d-flex flex-column vh-100">
        {/* Navbar externo */}
        <header className="navbar navbar-light bg-light fixed-top justify-content-center ">
          <Navbar />
        </header>
  
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="container h-100 w-100 d-flex justify-content-center align-items-center">
            {children || <p className="text-muted">Sin contenido disponible</p>}
          </div>
        </main>
  
        {/* Footer fijo */}
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          © 2025 Mute - Todos los derechos reservados.
        </footer>
      </div>
    );
  }
  
  export default Layout;