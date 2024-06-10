import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ImCross } from "react-icons/im";
import { MdDone } from "react-icons/md";
import "./contentstyle.css";
import { AuthContext } from "../../context/AuthContext";
import Swal from 'sweetalert2';
import JSZip from "jszip";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const Content = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const IN = "https://firebasestorage.googleapis.com/v0/b/assurance-storage-6514b.appspot.com/o/images%2F";
  const END = "?alt=media";
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order

  const PRIME_ACCOUNT_ID = process.env.REACT_APP_PRIME_ACCOUNT; // Replace with your environment variable if needed

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((item) => {
    return (
      item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.police.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assurance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nature.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.etat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleSortOrder = () => {
    // Toggle sort order
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    // Sort posts based on sort order
    const sortedPosts = [...posts].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.request.localeCompare(b.request);
      } else {
        return b.request.localeCompare(a.request);
      }
    });

    setPosts(sortedPosts);
  };

  const GetPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/posts`);
      if (response.status === 200) {
        if (user?._id === PRIME_ACCOUNT_ID) {
          // If prime account, show all posts
          setPosts(response.data);
        } else {
          // Otherwise, filter posts by user's assurance
          const result = response.data.filter((y) => y.assurance === user?.assureur);
          setPosts(result);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    GetPosts();
  }, []);

  const downloadImagesAsZip = async (imageUrls) => {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");
  
    await Promise.all(
      imageUrls.map(async (imageUrl, index) => {
        try {
          console.log("Fetching image:", imageUrl);
          const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
          if (response.data && response.data.byteLength > 0) {
            const filename = `image_${index}.jpg`;
            imgFolder.file(filename, response.data, { binary: true });
          } else {
            console.error("Empty response for image:", imageUrl);
          }
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      })
    );
  
    // Generate and download the ZIP file
    zip.generateAsync({ type: "blob" }).then((content) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(content);
      downloadLink.download = "images.zip";
      downloadLink.click();
    });
  };

  const downloadImagesForTd = (imageUrls) => {
    // Construct absolute URLs for images
    const absoluteImageUrls = imageUrls.map((imgUrl) => IN + imgUrl + END);
    console.log("Absolute Image URLs:", absoluteImageUrls); // Log absolute image URLs
    // Call the function to download images as a ZIP file
    downloadImagesAsZip(absoluteImageUrls);
  };

  const DeleteRequest = async (postIdToDelete) => {
    const apiUrl = `${BASE_URL}/api/posts/${postIdToDelete}`;
    try {
      const response = await axios.delete(apiUrl);
      console.log('Post deleted successfully:', response);
      window.location.reload();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const UpdateRequest = async (postIdToUpdate) => {
    const updatedData = { request: "done" };
    const apiUrl = `${BASE_URL}/api/posts/${postIdToUpdate}`;
    try {
      const response = await axios.put(apiUrl, updatedData);
      console.log('Post updated successfully:', response);
      window.location.reload();
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const DeleteIt = (postId) => {
    Swal.fire({
      title: "Etes-vous sûr de vouloir supprimer ce document ?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Supprimer!",
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteRequest(postId);
        Swal.fire({ title: "Supprimé!", text: "Votre fichier a été supprimé.", icon: "success" });
      }
    });
  };

  const UpdateIt = (postId) => {
    Swal.fire({
      title: "Etes-vous sûr de vouloir terminer cette demande ?",
      text: "Cette action est irréversible!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#43d630",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Terminer!",
      allowOutsideClick: false,
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        UpdateRequest(postId);
        Swal.fire({ title: "Terminé!", text: "Votre demande a été close", icon: "success" });
      }
    });
    return false;
  };

  return (
    <div className="mesdemandes__bigcontainer">
      {user ? (
        <div className="userdemands__box">
          <h1>Mes Demandes</h1>
          <div className="search-bar-input">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>  
          <div className="table-responsive text-nowrap">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prenom</th>
                  <th scope="col">Police d'assurance</th>
                  <th scope="col" onClick={toggleSortOrder}>Etat {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</th>
                  <th scope="col">Assurance</th>
                  <th scope="col">eff/exp</th>
                  <th scope="col">Garanties</th>
                  <th scope="col">Date et lieu de l'accident</th>
                  <th scope="col">Nature de l'accident</th>
                  <th scope="col">Etat du vehicule</th>
                  <th scope="col">Photos associées a l'accident</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.police}</td>
                    <td className="li-demands-popup">
                      {item.request === 'notyet' ? (
                        <p className="statereq-inside">
                          En cours <ImCross className="notdone" />
                        </p>
                      ) : (
                        <p className="statereq-inside">
                          Terminée <MdDone className="done" />
                        </p>
                      )}
                    </td>
                    <td>{item.assurance}</td>
                    <td>{item.effexp[0]} - {item.effexp[1]}</td>
                    <td>
                      {item.garanties.filter((garant) => garant !== "").map((garant, ind) => (
                        <li key={ind}>{garant}</li>
                      ))}
                    </td>
                    <td>{item.datelieu[0]} à {item.datelieu[1]}</td>
                    <td>{item.nature}</td>
                    <td>{item.etat}</td>
                    <td key={index} className="img-display-center">
                      <div className="flex-images">
                        {item.img.map((imgUrl, imgIndex) => (
                          <li key={imgIndex} className="li-demands-popup">
                            <a href={IN + imgUrl + END} target="_blank" rel="noreferrer">
                              <img
                                className="imgdemandes"
                                src={IN + imgUrl + END}
                                alt={`Image ${imgIndex}`}
                              />
                            </a>
                          </li>
                        ))}
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => downloadImagesForTd(item.img)}
                        >
                          Télécharger les images
                        </button>
                      </div>
                    </td>
                    <td className="btn-actions">
                      <button
                        type="button"
                        className="btn btn-success"
                        disabled={item.request === 'done'}
                        onClick={() => UpdateIt(item._id)}
                      >
                        Terminer
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => DeleteIt(item._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      ) : (
        <div className="ifnoacc">
          <p>Veuillez vous connecter pour acceder aux demandes, ou inscrivez vous en appelant notre service clientéle et en demandant un compte.</p>
        </div>
      )}
    </div>
  );
};

export default Content;
