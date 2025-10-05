import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-5">404</h1>
      <p className="lead">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
