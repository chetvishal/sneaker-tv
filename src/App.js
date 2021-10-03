import './App.css';
import { useState } from 'react';
import { Navbar, Footer } from './Components/index';
import { PlaylistPg, Library, PlayVideo, Home, Login, User, Signup } from './Pages/index';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './Api/PrivateRoute'

function App() {

  const [searchTxt, setSearchTxt] = useState('');
  const [hideMenu, setHideMenu] = useState(false)

  const toggleHideMenu = () => {
    setHideMenu(() => true)
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <div className="App">
        <Navbar setSearchTxt={setSearchTxt} setHideMenu={setHideMenu} hideMenu={hideMenu} />
        <div onClick={toggleHideMenu}>
          <Routes>
            <Route path="/" element={<Home searchKeyword={searchTxt} toggleHideMenu={toggleHideMenu} />} />
            <PrivateRoute path="/video/:id" element={<PlayVideo />} />
            <PrivateRoute path="/library" element={<Library />} />
            <PrivateRoute path="/library/:playlistId" element={<PlaylistPg />} />
            <PrivateRoute path="/user" element={<User />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Routes>
  );
}

export default App;
