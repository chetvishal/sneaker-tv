import './App.css';
import {useState} from 'react';
import { Navbar } from './Components/index';
import {PlaylistPg, Library, PlayVideo, Home} from './Pages/index';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [searchTxt, setSearchTxt] = useState('');

  return (
    <div className="App">
      <Navbar setSearchTxt={setSearchTxt}/>
      <Routes>
        <Route path="/" element={<Home searchKeyword={searchTxt}/>}/>
        <Route path="/video/:id" element={<PlayVideo />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:playlistId" element={<PlaylistPg />} />
      </Routes>
    </div>
  );
}

export default App;
