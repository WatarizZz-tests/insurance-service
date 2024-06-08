import React, { useRef, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import "./toppagestyle.css";
import PopLoginAssureurs from "../login/PopLoginAssureurs";

const TopPage = () => {
  const { user } = useContext(AuthContext);
  const [loginPopup, setLoginPopup] = useState(false);
  const PRIME_ACCOUNT_ID = '66646b06e6db92659aa0ac2b';

  const ClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <div className="Container-1">
          <div className="header__top__left">
            <span>Service Clients</span>
            <span className="header__top__help">
              <i className="ri-phone-fill"></i> +213-779-214-002
            </span>
          </div>
          {user ? (
            <div className="user-on-con">
              {user._id === PRIME_ACCOUNT_ID ? (
                <>
                  <Link className="ctrl-panel-link" to="/controlpanel">Gerer les comptes</Link> - {user.username}
                </>
              ) : (
                <>-{user.username}</>
              )}
              <button onClick={() => ClearStorage()} className="logoff-btn">
                <IoIosLogOut />
              </button>
            </div>
          ) : (
            <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
              <Link
                onClick={() => setLoginPopup(true)}
                className=" d-flex align-items-center gap-1"
              >
                <i>
                  <FiLogIn className="marginicon" />
                </i>{" "}
                Se Connecter
              </Link>
              <PopLoginAssureurs trigger={loginPopup} setTrigger={setLoginPopup} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopPage;
