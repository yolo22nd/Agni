import React, { useContext ,useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box ,TextField} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';import { styled } from '@mui/system';

function SidebarContent() {
  return (
    <div className="bg-slate-900 text-white w-64 h-screen fixed top-0 left-0 ">
      <ul className='mt-12'>
        <li className='p-4'>Profile</li>
        <li className='p-4'>Events</li>
        <li className='p-4'>Settings</li>
      </ul>
    </div>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <MenuOutlinedIcon className="mr-4 cursor-pointer z-100" onClick={toggleSidebar} />
      {isOpen && <SidebarContent />}
      {isOpen && (
        <CloseOutlinedIcon
        className="mr-4 cursor-pointer z-10 absolute top-6 left-52" 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}



const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <AppBar position="static" style={{backgroundColor:'black'}}>
      <Toolbar>
      {/* <MenuOutlinedIcon className='mr-4 cursor-pointer'/> */}
      <Sidebar/>
        {/* <Button color="inherit" component={RouterLink} to="/memes">
          Home
        </Button> */}
        {/* <Button color="inherit" component={RouterLink} to="/saved">
          Saved Memes
        </Button> */}
        <Box sx={{ flexGrow: 0.42 }} />
        {user && <Typography variant="h6">Hello {user.username} !</Typography>}
        <Box sx={{ flexGrow: 0.58 }} />
        <SearchOutlinedIcon fontSize='medium'/>
        <Box className="search px-4 py-2">
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput} 
          className='p-2 rounded-full text-black-100 bg-slate-600'
          />
      </Box>
        {user ? (
            <Button color="inherit" onClick={logOutUser}>
            Logout
          </Button>
        ) : (
            <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
