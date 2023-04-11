import React, { useState } from "react";
import "./../ShoppingList/PopUp.css";
import { useUser } from "../../UserContext";
import {  UpdateItemAPI, DeleteItemAPI } from "../../callAPI";

const UpdateItem= ({
  isVisible,
  onClose,
  itemName,
  price,
  discount,
  aisle,
  amount,
  supplier,
  itemID
}) => {
  const [IName, setIName] = useState(itemName);
  const [Iprice, setIPrice] = useState(price);
  const [Idiscount, setIDiscount] = useState(discount);
  const [Iaisle, setIAisle] = useState(aisle);
  const [Iamount, setIAmount] = useState(amount);
  const [Isupplier, setISupplier] = useState(supplier);



  if (!isVisible) {
    return null;
  }

    // handles the delete of the item
    const handleDeleteItemClick = async (e) => {
      e.preventDefault();
      const confirmed = window.confirm("Are you sure you want to delete this item?");

      if (confirmed) {
        await DeleteItemAPI(itemID)
        console.log(`Deleting item: ${itemID}`);
        window.location.reload()
      }
    };

  // handles the confirmation of updating the item
  const handleOkClick = async (e) => {
    e.preventDefault();

    if (
      IName === "" || Iprice === "" || Idiscount=== "" || Iaisle === "" || Iamount === "" || Isupplier === "" 
    ) {
      alert('Cannot have blanks');
    } else {
      try {
        const response = await UpdateItemAPI(itemID,IName,Iprice,Idiscount,Iaisle,Iamount,Isupplier);
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
          <h2>Update Item</h2>
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
              <b>Item Discount:</b>
            </label>
            <br />
            <input
              id="name_input"
              type="number"
              step="0.01"
              value={Idiscount}
              onChange={(e) => setIDiscount(e.target.value)}
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
            <br />
            <button className="change-btn" onClick={handleDeleteItemClick} style={{ color: 'red' }}>
              <b>Delete Item</b>
            </button>
            <br/>
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

export default UpdateItem;
