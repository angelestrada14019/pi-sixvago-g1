import "./userWelcome.css";

const UserWelcome = ({ handleLogout }) => {
  return (
    <div className="user-loggedIn-main-container">
      <div className="user-avatar-container">
        <h2>
          {`
                ${JSON.parse(localStorage.getItem("user")).username.slice(
                  0,
                  1
                )}${JSON.parse(localStorage.getItem("user")).lastname.slice(
            0,
            1
          )}
                `}
        </h2>
      </div>
      <div className="user-welcome-container">
        <li type="none">
          <ul>
            <p>Hola, </p>
          </ul>
          <ul className="user-welcome-username">
            <p>{`
                    ${JSON.parse(localStorage.getItem("user")).username}
                    ${JSON.parse(localStorage.getItem("user")).lastname}        
                    `}</p>
          </ul>
        </li>
        <div className="user-logout-container" onClick={handleLogout}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default UserWelcome;
