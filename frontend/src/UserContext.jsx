import {createContext, useContext, useState, useEffect} from 'react';


const UserContext = createContext();

export function UserProvider(props) {
  const [userId, setUserId] = useState(null);
  const [manager, setManager] = useState(false);

  useEffect(() => {
    // Load token from local storage
    const id = localStorage.getItem('id');
    const manager = localStorage.getItem('manager');

    if (id) {
        setUserId(id);
        setManager(manager);
        console.log('Hey this is the token id:', id);
        console.log('Hey this is the token manager:', manager);

    }else{
        console.log('Token doesnt exist:');
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, manager, setManager}}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}