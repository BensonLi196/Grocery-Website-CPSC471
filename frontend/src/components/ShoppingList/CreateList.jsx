import React, { useState } from "react";
import "./PopUp.css";
import { useUser } from "../../UserContext";
import { MakeListAPI } from "../../callAPI";

const CreateList = ({
  isVisible,
  onClose,
}) => {
  const [Name, setName] = useState("");
  const {userId}= useUser();


  if (!isVisible) {
    return null;
  }


  // handles the name of shoppting List
  const handleOkClick = async (e) => {
    e.preventDefault();

    if (!userId){
      alert('Login to make a list.');
    }
    else if (
      Name === "" 
    ) {
      alert('Cannot have a blank name');
    } else {
      try {
        const response = await MakeListAPI(Name,userId);
        setName("");
        handleCloseClick();
        window.location.reload()
      } catch (error) {
        console.error(error);
      }
    }
  };

  //// hides the pop-up
  const handleCloseClick = () => {
    onClose(); // hide the pop-up
  };

  return (
    <div className="popup">
      <div className="inside-pop">
        <div className={`Edit-Profile-Pop-Up ${isVisible ? "visible" : ""}`}>
          <h2>Create a Shopping List</h2>
          <form>
       
            <label >
              <b>Shopping List Title:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <button className="change-btn" onClick={handleOkClick}>
              <b>OK</b>
            </button>

            <br />
          </form>
        </div>
        <button className="close-btn" onClick={handleCloseClick}>
          <b>X</b>
        </button>
      </div>
    </div>
  );
};

export default CreateList;
