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
import MyProfileSideBarIMG from '../../assets/images/my-profile.png';
import StudentProfileSideBarIMG from '../../assets/images/student-profile.png';
import MySubscriptionSideBarIMG from '../../assets/images/my-subscription.png';
import GrowthSideBarIMG from '../../assets/images/growth.png';
import AssignmentSideBarIMG from '../../assets/images/assignment.svg';
import SignOutSideBarIMG from '../../assets/images/sign-out.png';

import EditMyProfileImg from '../../assets/images/edit-my-profile.png';
import GoToProfileImg from '../../assets/images/goto-profile.svg';
import CancelSubscriptionImg from '../../assets/images/cancel-subscription.png';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LinearProgress from '@mui/material/LinearProgress';
import SideBar from '../Dashboard/SideBar';
import Switch from '@mui/material/Switch';

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

class StudentProfile extends React.Component {

    constructor(props) {
        super(props);
        this.myProfileCard = React.createRef();
        this.imgFileUpload = React.createRef();
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
            expandedChangePassword: false,
            userProfileDetails: [],
            isOpenEditView: false,
        };
    }

    handleSignInChangeOfValues(value, sectionName) {

    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
        this.setState({ expandedChangePassword: false });
    };

    handleExpandChangePasswordClick = () => {
        this.setState({ expandedChangePassword: !this.state.expandedChangePassword });
        this.setState({ expanded: false });
    };

    componentDidMount() {
        let data = localStorage.getItem("userDetails");
        if (data != null) {
            this.setState({ userProfileDetails: JSON.parse(data).user });
        } else {
            window.location.href = "signin";
        }
    }

    openEditView() {
        this.setState({ isOpenEditView: true });
    }

    closeEditWindow() {
        this.setState({ isOpenEditView: false });
    }

    openImageUploadWindow() {
        this.imgFileUpload.current.click();
    }

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="xl" component="main" sx={{ pt: 2, pb: 6, backgroundColor: '#EBEBEB' }}>
                    <Grid container>
                        <Grid xs={2} md={2} >
                            <SideBar />
                        </Grid>

                        <Grid xs={10} md={10}>
                            <Card elevation={5} ref={this.myProfileCard}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, mb: 1, fontWeight: 'bold', color: 'black', }}>
                                        Student Account Details
                                    </Typography>
                                    {!this.state.isOpenEditView ?
                                        <Card variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3' }}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid xs={11} md={11}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>

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
                                                                <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src="https://t3.ftcdn.net/jpg/02/45/28/14/360_F_245281469_8BxP6VT7st0gj6qNfLUVVq1UJt0NfFEd.jpg" />
                                                            </Grid>
                                                            <Grid xs={11} md={11}>
                                                                <Grid container sx={{ p: 2 }}>
                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            User Name
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            Lucifer MorningStar
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={1} md={1}>
                                                                        <Typography variant="subtitle1" align='right'>
                                                                            <IconButton aria-label="delete" size="small">
                                                                                <img src={GoToProfileImg} style={{ width: 20, height: 18 }}></img>
                                                                            </IconButton>
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={1} md={1}>
                                                                        <Typography variant="subtitle1" align='right'>
                                                                            <IconButton aria-label="delete" size="small" onClick={() => this.openEditView()}>
                                                                                <img src={EditMyProfileImg} style={{ width: 20, height: 18 }}></img>
                                                                            </IconButton>
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={1} md={1}>
                                                                        <Typography variant="subtitle1" align='right'>
                                                                            <Switch defaultChecked size="small" color='success' />
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Password
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            ******* <Typography variant="subtitle1" sx={{ fontSize: 9, color: '#00AAB3', fontWeight: 'bold' }}>
                                                                                Change Password
                                                                            </Typography>
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Date of Birth
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            20/06/2005
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            School Name
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            St. Andrews High School
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Exam Board
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            IGSCE Edexcel
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Grade
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            KS 3
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Class
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            Class - 8
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Package
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                                            Pro <LoadingButton variant="contained" size='small' className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover": { backgroundColor: "#00AAB3", }, ml: 2, textTransform: 'none', fontSize: 12 }}>Upgrade</LoadingButton>
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Collapse>
                                            </CardContent>
                                        </Card>
                                        :
                                        <Card variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3' }}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid xs={11} md={11}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                            Basic Details Edit
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
                                                            <Grid xs={1} md={1} sx={{ position: 'relative', display: 'inline-flex' }}>
                                                                <Avatar onClick={() => this.openImageUploadWindow()} sx={{ width: 80, height: 80 }} alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
                                                                <CameraAltIcon style={{ position: 'absolute', top: 50, right: 0, zIndex: 1, }} />
                                                                <input
                                                                    ref={this.imgFileUpload}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    accept="image/*"
                                                                />
                                                            </Grid>
                                                            <Grid xs={11} md={11}>
                                                                <Grid container sx={{ p: 2 }}>
                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Name
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Paper
                                                                            variant='outlined'
                                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                        >
                                                                            <InputBase
                                                                                sx={{ ml: 1, flex: 1 }}
                                                                                value={this.state.userProfileDetails.first_name + " " + this.state.userProfileDetails.last_name}
                                                                            />

                                                                        </Paper>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Email
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Paper
                                                                            variant='outlined'
                                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                        >
                                                                            <InputBase
                                                                                sx={{ ml: 1, flex: 1 }}
                                                                                value={this.state.userProfileDetails.email}
                                                                            />

                                                                        </Paper>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Phone
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Paper
                                                                            variant='outlined'
                                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                        >
                                                                            <InputBase
                                                                                sx={{ ml: 1, flex: 1 }}
                                                                                value={"+" + this.state.userProfileDetails.country_code + "" + this.state.userProfileDetails.phone}
                                                                            />

                                                                        </Paper>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Gender
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Paper
                                                                            variant='outlined'
                                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                        >
                                                                            <InputBase
                                                                                sx={{ ml: 1, flex: 1 }}
                                                                                value={"Male"}
                                                                            />

                                                                        </Paper>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Address
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Paper
                                                                            variant='outlined'
                                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                        >
                                                                            <InputBase
                                                                                sx={{ ml: 1, flex: 1, height: 50 }}
                                                                                value={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed"}
                                                                            />

                                                                        </Paper>
                                                                    </Grid>

                                                                    <Grid xs={3} md={3} >
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            Country
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9} sx={{ mt: 1 }}>
                                                                        {this.state.userProfileDetails.country_code == 44 ?
                                                                            <Paper
                                                                                variant='outlined'
                                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                            >
                                                                                <InputBase
                                                                                    sx={{ ml: 1, flex: 1 }}
                                                                                    value={"England"}
                                                                                />

                                                                            </Paper> :
                                                                            <Paper
                                                                                variant='outlined'
                                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                            >
                                                                                <InputBase
                                                                                    sx={{ ml: 1, flex: 1 }}
                                                                                    value={" Sri Lanka"}
                                                                                />

                                                                            </Paper>
                                                                        }
                                                                    </Grid>

                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 2, mb: 1, color: 'black', }}>
                                                                            City
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={9} md={9}>
                                                                        <Paper
                                                                            variant='outlined'
                                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '40%' }}
                                                                        >
                                                                            <InputBase
                                                                                sx={{ ml: 1, flex: 1 }}
                                                                                value={"London"}
                                                                            />

                                                                        </Paper>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Typography variant="subtitle1" align='left' sx={{ fontSize: 14, mb: 1, color: 'black', }}>
                                                        <LoadingButton onClick={() => this.closeEditWindow()} variant="outlined" size='small' className='signin-button' sx={{ mt: 2, mr: 2, ml: 20, textTransform: 'none', fontSize: 17 }}>Cancel</LoadingButton>
                                                        <LoadingButton variant="contained" size='small' className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover": { backgroundColor: "#00AAB3", }, mt: 2, ml: 2, textTransform: 'none', fontSize: 17 }}>Save</LoadingButton>

                                                    </Typography>
                                                </Collapse>
                                            </CardContent>

                                        </Card>
                                    }
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}
export default StudentProfile;