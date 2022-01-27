import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Divider from '@mui/material/Divider';
// import { Link } from 'react-router-dom';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      userDetails: [],
    };

  }

  componentDidMount() {
    let data = localStorage.getItem('userDetails');
    console.log("User data",data);
    if(data != null){
      this.setState({userDetails: JSON.parse(data).user});
    }
    
  }

  handleClick = (event) =>{
    this.setState({anchorEl: event.currentTarget});
    this.setState({open: Boolean(event.currentTarget)});
  }

  handleClose = () => {
    this.setState({anchorEl: null});
    this.setState({open: false});
  }

  signOutProcess(){
    localStorage.removeItem("userDetails");
    this.setState({userDetails: null});
    window.location.href = "signin";
  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="static"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: '#3A8B8C' }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              SqillUP
            </Typography>
            <nav>

            </nav>
            {window.location.pathname != "/signin" ?
              <>
                {localStorage.getItem('userDetails') == null ?
                  <>
                    <Button href="/signin" variant="contained" sx={{ my: 1, mx: 1.5, color: '#2D3E50', backgroundColor:'#FFCA3A', ":hover": { color: '#2D3E50',  backgroundColor:'#FFCA3A', }, textTransform: 'none' }}>
                      Sign In
                    </Button>
                  </>
                  :
                  <>
                    <Button variant="text" onClick={this.handleClick} sx={{ my: 1, mx: 1.5, color: 'white', ":hover": { color: 'white' }, textTransform: 'none' }} startIcon={<Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />}>
                      <KeyboardArrowDownIcon/>
                    </Button>
                  </>
                }
              </>
              :
              <>
                <Button href="/" variant="contained" sx={{ my: 1, mx: 1.5, color: 'white', backgroundColor:'#FFCA3A', ":hover": { color: 'white', backgroundColor:'#FFCA3A', }, textTransform: 'none' }} startIcon={<AccountCircleIcon />}>
                  Sign Up
                </Button>
              </>
            }
          </Toolbar>
        </AppBar>

        <Menu
        anchorEl={this.state.anchorEl}
        open={this.state.open}
        onClose={this.handleClose}
        onClick={this.handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{alignSelf:'center', justifyContent:'center', pl:5, pr:5,}}>
        <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
        </MenuItem>
        <Typography variant='h6' align='center' justifyContent='center' sx={{pl:5, pr:5}}>
          {this.state.userDetails.first_name}
        </Typography>
        <Typography variant='subtitle2' sx={{mb:2, pl:5, pr:5}} align='center' justifyContent='center'>
        {this.state.userDetails.email}
        </Typography>
        <Divider />
        <Typography variant='subtitle2' sx={{mb:2}} align='center' justifyContent='center'>
        <Button onClick={()=>this.signOutProcess()} variant="outlined" sx={{ mt:2, mx:5, color: '#3A8B8C', borderColor:'#00AAB3', ":hover": { color: '#3A8B8C', borderColor:'#00AAB3' }, textTransform: 'none', }} startIcon={<ExitToAppIcon />}>
          Sign Out
        </Button>
        </Typography>
      </Menu>
      </React.Fragment>
    );
  }
}

export default NavBar;