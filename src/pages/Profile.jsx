// HITO 8: Perfil real (muestra email y permite cerrar sesión)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuth, email, profile, fetchProfile, logout, loading } = useUser();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate]);

  useEffect(() => {
    // HITO 8: trae perfil si no existe
    if (isAuth && !profile) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="container py-4">
      <h2>Mi perfil</h2>
      <p className="mb-1"><strong>Email:</strong> {email || profile?.email}</p>
      {loading && <div className="text-muted">Cargando perfil...</div>}

      <button
        className="btn btn-outline-danger mt-3"
        onClick={() => {
          logout(); // HITO 8: cierra sesión
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
