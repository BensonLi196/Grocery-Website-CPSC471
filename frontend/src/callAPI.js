import axios from "axios";
const BASE_URL = "http://localhost:5000";

///////////////////////////////////////////////////USER APIS
// Endpoint to login
export const LoginAPI = async (Email, password) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/login`,
      {
        email: `${Email}`,
        Upassword: `${password}`,
      },
      options
    );
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Login failed. Please try again.");
    throw error;
  }
};

// Endpoint to Register
export const RegisterAPI = async (First,Last,Email,password) => {
  const response = await axios
    .post(`${BASE_URL}/api/user/register`, {
        FName: `${First}`,
        lName: `${Last}`,
        email: `${Email}`,
        Upassword: `${password}`,
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Registration failed. Please try again.");
      }
    });
    console.log("response:", response.data);
  return response.data;
};

///////////////////////////////ORDER APIS
// Endpoint to Make an order
export const MakeOrderAPI = async (managerID, supplierID, items) => {
  console.log("order items: ",items);
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  const response = await axios
    .post(`${BASE_URL}/api/order/`, {
        mgrID: `${managerID}`,
        supID: supplierID,
        items: items,
    },
    options)
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Order failed. Please try again.");
      }
    });
    console.log("response:", response.data);
  return response.data;
};



// Endpoint to get all orders
export const getAllOrdersAPI = async () => {
  const { data } = await axios
    .get(`${BASE_URL}/api/order/`, {
      headers: {
      },
    })
    .catch((error) => {
      if (error.response)
        console.log("get orders error: ", error.response.data.message);
    });
  console.log("get orders: ", data);
  return data;
};

///////////////////////////////////////////////SHOPPING APIS
// Endpoint to make a list
export const MakeListAPI = async (name, id) => {
  console.log("Make response id:", id);
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/api/shopping/make`,
      {
        listName: `${name}`,
        userID: `${id}`,
      },
    );
    console.log("Make response:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("List could not be made. Please try again.");
    throw error;
  }
};

// Endpoint to get all lists
export const getAllListsAPI = async (id) => {
  const { data } = await axios
    .get(`${BASE_URL}/api/shopping/${id}`, {
      headers: {
      },
    })
    .catch((error) => {
      if (error.response)
        console.log("get lists error: ", error.response.data.message);
    });
  return data;
};

// Endpoint to Delete a list
export const DeleteListAPI = async (lId,uId) => {
  console.log("list id: and user"+lId);
  console.log(" user:"+uId);
  const response = axios
    .delete(`${BASE_URL}/api/shopping/deletelist`, {
      data: {
        listID: lId,
        userID: uId,
      },
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Delete list failed. Please try again.");
      }
    });
    console.log("response:", response);
  return response;
};



// Endpoint to Delete an item in a list
export const DeleteListItemAPI = async (lId,iId) => {
  console.log("list id: and user"+lId);
  console.log(" user:"+iId);
  const response = axios
    .delete(`${BASE_URL}/api/shopping/deleteitem`, {
      data: {
        listID: lId,
        itemID: iId,
      },
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Delete item failed. Please try again.");
      }
    });
    console.log("response:", response);
  return response;
};

// Endpoint to update an item
export const AddItemToListAPI = async (list,item,num) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/shopping/add`,
      {
        listID: `${list}`,
        itemID: `${item}`,
        amount: `${num}`,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 400){
      alert("Item already exists in that list.");
    }else{
      alert("Item could not be added to list. Please try again.");
    }
    throw error;
  }
};


//////////////////////////ITEM APIS
// Endpoint to get all grocery items
export const getAllGroceryItemsAPI = async () => {
  const { data } = await axios
    .get(`${BASE_URL}/api/items/grocery`, {
      headers: {
      },
    })
    .catch((error) => {
      if (error.response)
        console.log("get grocery items error: ", error.response.data.message);
    });
  console.log("get grocery items: ", data);
  return data;
};

// Endpoint to get all grocery items
export const getAllHouseholdItemsAPI = async () => {
  const { data } = await axios
    .get(`${BASE_URL}/api/items/household`, {
      headers: {
      },
    })
    .catch((error) => {
      if (error.response)
        console.log("get household items error: ", error.response.data.message);
    });
  console.log("get household items: ", data);
  return data;
};

// Endpoint to get all grocery items
export const getAllPharmacyItemsAPI = async () => {
  const { data } = await axios
    .get(`${BASE_URL}/api/items/pharmacy`, {
      headers: {
      },
    })
    .catch((error) => {
      if (error.response)
        console.log("get pharmacy items error: ", error.response.data.message);
    });
  console.log("get pharmacy items: ", data);
  return data;
};


// Endpoint to get all grocery items
export const getSearchItemsAPI = async (item) => {
  const { data } = await axios
    .get(`${BASE_URL}/api/items/search?q=${item}`
    )
    .catch((error) => {
      if (error.response)
        console.log("get search items error: ", error.response.data.message);
    });
  console.log("get search items: ", data);
  return data;
};



/////////////////////////// MANAGE APIS
// Endpoint to update an item
export const UpdateItemAPI = async (id,name,p,d,ai,am,sup) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/manage/update`,
      {
        itemID: `${id}`,
        itemName: `${name}`,
        price: `${p}`,
        discount: `${d}`,
        aisle: `${ai}`,
        amount: `${am}`,
        supplier: `${sup}`,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Item could not be updated. Please try again.");
    throw error;
  }
};

// Endpoint to Delete an item
export const DeleteItemAPI = async (id) => {

  const response = axios
    .delete(`${BASE_URL}/api/manage/removeItem`, {
      data: {
        itemID: id,
      },
    })
    .catch((error) => {
      if (error.response)
      {
        console.error(error);
        alert("Delete item failed. Please try again.");
      }
    });
    console.log("response:", response);
  return response;
};


///endpoint to add Grocery item
export const AddGroceryItemAPI = async (name,p,ai,am,sup,ed,al,cat,spec) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/manage/addGrocery`,
      {
        itemName: `${name}`,
        price: `${p}`,
        aisle: `${ai}`,
        amount: `${am}`,
        supplier: `${sup}`,
        expiryDate: `${ed}`,
        allergies: `${al}`,
        category: `${cat}`,
        special: `${spec}`,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Item could not be added. Please try again.");
    throw error;
  }
};

///endpoint to add Grocery item
export const AddHouseholdItemAPI = async (name,p,ai,am,sup,cat) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/manage/addHousehold`,
      {
        itemName: `${name}`,
        price: `${p}`,
        aisle: `${ai}`,
        amount: `${am}`,
        supplier: `${sup}`,
        category: `${cat}`,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Item could not be added. Please try again.");
    throw error;
  }
};

///endpoint to add Grocery item
export const AddPharmacyItemAPI = async (name,p,ai,am,sup,gname,bname) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/manage/addPharmacy`,
      {
        itemName: `${name}`,
        price: `${p}`,
        aisle: `${ai}`,
        amount: `${am}`,
        supplier: `${sup}`,
        genName: `${gname}`,
        brandName: `${bname}`,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Item could not be added. Please try again.");
    throw error;
  }
};