import React, { useContext, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./poploginassureursstyle.css";


const PopLoginAssureurs = (props) => {
  const BASE_URL = 'https://insurance-api-bic3.onrender.com';
  const [errorLoginMsg, setErrorLoginMsg] = useState(null);
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post( `${BASE_URL}/api/auth/loginassureurs`, userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.reload();
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setErrorLoginMsg("identifiants incorrects");
    }
  };


  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="login" onSubmit={handleClick}>
          <div className="container-fluid">
            <div className="row no-gutter">
              <div className="col-md-6 d-none d-md-flex bg-image"></div>

              <div className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <button
                      className="close-btn button-popup-window"
                      onClick={() => props.setTrigger(false)}
                    >
                      <IoMdClose />
                    </button>
                    <div className="row">
                      <div className="col-lg-10 col-xl-7 mx-auto">
                        <h3 className="display-5">Vos identifiants</h3>
                        <form>
                          <div className="form-group mb-3">
                            <input
                              id="inputEmail"
                              type="email"
                              placeholder="Adresse email"
                              required=""
                              autofocus=""
                              ref={email}
                              class="form-control rounded-pill border-0 shadow-sm px-4"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <input
                              id="inputPassword"
                              type="password"
                              placeholder="Mot de passe"
                              required=""
                              ref={password}
                              minLength={8}
                              className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            />
                          </div>
                          
                          <p className="rederrormsg"> {errorLoginMsg} </p>
                          <button
                            type="submit"
                            className="btn btn-primary btn-block text-uppercase mb-2
                            rounded-pill shadow-sm"
                            disabled={isFetching}
                          >
                            {isFetching ? "Connexion" : "Se connecter"}{" "}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopLoginAssureurs;
