import React, { useState } from "react";
import "./../ShoppingList/PopUp.css";
import { useUser } from "../../UserContext";
import {  AddPharmacyItemAPI, AddHouseholdItemAPI, AddGroceryItemAPI } from "../../callAPI";

const AddItemInterface= ({
  isGVisible,
  isHVisible,
  isPVisible,
  onClose,
}) => {
  const [IName, setIName] = useState("");
  const [Iprice, setIPrice] = useState("");
  const [Iaisle, setIAisle] = useState("");
  const [Iamount, setIAmount] = useState("");
  const [Isupplier, setISupplier] = useState("");
  const [category, setCategory] = useState("");

  ////grocery
  const [expiryDate, setExpiryDate] = useState("");
  const [allergies, setAllergies] = useState("");
  const [special, setSpecial] = useState("");


  ///pharmacy
  const [genName, setGenName] = useState("");
  const [brandName, setBrandName] = useState("");

  if (!isGVisible&&!isHVisible&&!isPVisible) {
    return null;
  }
  console.log(isGVisible);

  // handles the confirmation of updating the item
  const handleOkClick = async (e) => {
    e.preventDefault();
    if(isGVisible==true &&(expiryDate==="" || IName === "" || Iprice === ""  || Iaisle === "" || Iamount === "" || Isupplier === ""|| category === "" )){
      alert('Cannot have blanks');
    }
    else if (isHVisible===true &&(
      IName === "" || Iprice === ""  || Iaisle === "" || Iamount === "" || Isupplier === "" || category === ""
    )) {
      alert('Cannot have blanks');
    }else if(isPVisible===true &&(IName === "" || Iprice === ""  || Iaisle === "" || Iamount === "" || Isupplier === "" || genName === ""|| brandName ==="")){
      alert('Cannot have blanks');
    } else {
      try {
        if (isGVisible==true){
          const response = await AddGroceryItemAPI(IName,Iprice,Iaisle,Iamount,Isupplier,expiryDate,allergies,category,special);
        }else if(isHVisible==true){
          const response = await AddHouseholdItemAPI(IName,Iprice,Iaisle,Iamount,Isupplier,category);
        }else if(isPVisible){
          const response = await AddPharmacyItemAPI(IName,Iprice,Iaisle,Iamount,Isupplier,genName,brandName);
        }
        setIName("");
        setIPrice("");
        setIAisle("");
        setIAmount("");
        setISupplier("");
        setCategory("");
        setExpiryDate("");
        setAllergies("");
        setSpecial("");
        setGenName("");
        setBrandName("");
        handleCloseClick();
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
        <div className={`Edit-Profile-Pop-Up ${(isGVisible||isHVisible||isPVisible) ? "visible" : ""}`}>
          <h2>Add Item</h2>
          <form>
       

            <label >
              <b>Item Name:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="text"
              value={IName}
              onChange={(e) => setIName(e.target.value)}
            />
            <br />
            <label >
              <b>Item Price:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="number"
              step="0.01"
              value={Iprice}
              onChange={(e) => setIPrice(e.target.value)}
            />
            <br />
            <label >
              <b>Aisle:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="text"
              value={Iaisle}
              onChange={(e) => setIAisle(e.target.value)}
            />
            <br />
            <label >
              <b>Amount:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="number"
              value={Iamount}
              onChange={(e) => setIAmount(e.target.value)}
            />
            <br />
            <label >
              <b>Supplier:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="number"
              value={Isupplier}
              onChange={(e) => setISupplier(e.target.value)}
            />
            <br />
            {/*conditionals here for grocery, household, pharmacy */}
            {isGVisible === true?(
              <>
                <label >
                <b>Expiry Date:</b>
                </label> 
                <br /> 
                <input
                  id="name_input"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <br/>
                <label >
                <b>Allergies:</b>
                </label> 
                <br /> 
                <input
                  id="name_input"
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
                <label >
                <b>Category:</b>
                </label> 
                <br/>
                <select id="cats" name="categories" onChange={(e) => setCategory(e.target.value)}>
                  <option value="frozen">Frozen</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="bakery">Bakery</option>
                  <option value="deli">Deli</option>
                  <option value="drinks">Drinks</option> 
                  <option value="seafood">Seafood</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="snacks">Snacks</option>
                  <option value="produce">Produce</option>
                </select>
                <br/>
                <label >
                <b>Special:</b>
                </label> 
                <br /> 
                <input
                  id="name_input"
                  type="text"
                  value={special}
                  onChange={(e) => setSpecial(e.target.value)}
                />
                <br/>
              </>
            ):isHVisible === true?(
              <>
              <label >
                <b>Category:</b>
                </label> 
                <br /> 
                <select id="cats" name="categories" onChange={(e) => setCategory(e.target.value)}>
                  <option value="baby">Baby</option>
                  <option value="home">Home</option>
                  <option value="hygiene">Hygiene</option>
                </select>
              <br/>
            </>
            ):isPVisible === true?(
              <>
                <label >
                <b>Generic Name:</b>
                </label> 
                <br /> 
                <input
                  id="name_input"
                  type="text"
                  value={genName}
                  onChange={(e) => setGenName(e.target.value)}
                />
                <br/>
                <label >
                <b>Brand Name:</b>
                </label> 
                <br /> 
                <input
                  id="name_input"
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
                <br/>
              </>
            ):(
              null
            )
            }
  
            <br />
            <br/>
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

export default AddItemInterface;
