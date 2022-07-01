import { useLocation, useNavigate } from "react-router-dom";
import "./headingAdm.css";

const HeadingAdm = () => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const navigate = useNavigate();

    const handleBack = () => {
        if (currentLocation.indexOf(`/administracion`) === -1) {
            navigate(`/`);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="headerProducto">
            <section className="lodging-section">
                <div className="descriptionLodging">
                    <div className="section">
                        <h2>Administración</h2>
                    </div>
                    <button className="backButton" onClick={handleBack}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HeadingAdm;
