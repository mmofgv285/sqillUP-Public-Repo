import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import signinScreen from '../../assets/images/signIn-screen.png';
import signinEmail from '../../assets/images/signin-email.png';
import signinPassword from '../../assets/images/signin-password.png';
import LoadingButton from '@mui/lab/LoadingButton';
import '../../assets/css/SignInAndSignUp/fontStyleSignIn.css';
import axios from "axios";
import Success from '../../assets/images/success.png';
import { borderColor } from '@mui/lab/node_modules/@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            email: '',
            signInLoading: false,
            appearForgetPassword: false,
            forgetPasswordEmail: '',
            afterSendForgetPasswordLink: false,
            isNotValid: false,
            validationEmailErrors: '',
            validationPasswordErrors: '',
            validationCommonErrors: '',
            errorStatusCode: '',

            appearSuccessOfAddStudent: false,
            expanded: true,
        };
    }

    handleSignInChangeOfValues(value, sectionName) {

    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Grid container>
                        <Grid xs={3} md={3} sx={{ p: 5 }}>
                            <Card elevation={5}>
                                <CardContent>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="My Profile" />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DraftsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Student Profile" />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="My Subscription" />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DraftsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Growth" />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Assignment" />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DraftsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Sign Out" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid xs={9} md={9} sx={{ p: 5 }}>
                            <Card elevation={5}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, mb: 1, fontWeight: 'bold', color: 'black', }}>
                                        My Details
                                    </Typography>
                                    <Card elevation={5}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid xs={11} md={11}>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                        Basic Details
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={1} md={1}>
                                                    <ExpandMore
                                                        expand={this.state.expanded}
                                                        onClick={() => this.handleExpandClick()}
                                                        aria-expanded={this.state.expanded}
                                                        aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>

                                                </Grid>
                                            </Grid>
                                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Grid container>
                                                        <Grid xs={1} md={1}>
                                                            <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
                                                        </Grid>
                                                        <Grid xs={11} md={11}>
                                                            <Grid container sx={{p:2}}>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black',  }}>
                                                                        Name
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={9} md={9}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight:'bold' }}>
                                                                        John Vender
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black',  }}>
                                                                        Email
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={9} md={9}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight:'bold' }}>
                                                                    john.smith@email.com
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black',  }}>
                                                                        Phone
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={9} md={9}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight:'bold' }}>
                                                                    +44 1234567890
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black',  }}>
                                                                        Gender
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={9} md={9}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight:'bold' }}>
                                                                        Male
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black',  }}>
                                                                        Address
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={9} md={9}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight:'bold' }}>
                                                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black',  }}>
                                                                        Country
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={9} md={9}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight:'bold' }}>
                                                                    England
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black',  }}>
                                                                        City
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={9} md={9}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight:'bold' }}>
                                                                    London
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Collapse>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}
export default MyProfile;