// Import the newly created file Header.js and Content.js and Footer.js
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';
import { apiUrl } from "./credentials/Credentials.js";

function App() {
  //const API_URL = 'http://localhost:3500/items'
  const API_URL = apiUrl + '/todolist';
  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch]  = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

// Only load the data at load time using useEffect
// async will not work in useEffect the direct way
// useEffect(async () => { -> this will not work
useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      // a response.ok is a 200 OK
      if (!response.ok) {
        throw Error('Did not receive expected Data')
      }
      const listItems = await response.json();
      setItems(listItems);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

    fetchItems();
    
}, [])

  const addItem = async (item) => {
    // If there are items, grap the id of the last item and set id for the new item to that + 1
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [... items, myNewItem];
    setItems(listItems);

    // Add the item to the JSON server
    const postOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    console.log(`key: ${id}`);
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
    setItems(listItems);

    // Modify the checkbox on the JSON server
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result);
  }

const handleDelete = async (id) => {
    console.log(`key: ${id}`);
    const listItems = items.filter((items) => items.id !== id);
    setItems(listItems);

    // Delete an item on the JSON server
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result);
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    //addItem
    console.log(newItem)
    addItem(newItem);
    setNewItem('');
    }

  // Render Block
  return (
    <div className="App">
      {/* pass in prop(ertie)s to the function, like a title*/}
      <Header title="Boodschappen"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}  
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {/* If fetchError is true */}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {/* If fetchError is false and isLoading is false, show the list*/}
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
