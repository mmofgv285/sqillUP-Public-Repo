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

class SubscriptionPlan extends React.Component {

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
                            <Grid container>
                                <Grid xs={12} md={12} >
                                    <Card elevation={5} variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3', borderWidth: 2, mb: 2 }}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid xs={1} md={1}>
                                                    <Avatar sx={{ width: 60, height: 60 }} alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
                                                </Grid>
                                                <Grid xs={11} md={11}>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, mb: 1, fontWeight: 'bold', color: '#00AAB3', }}>
                                                        Hello John Vender
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Card elevation={5} ref={this.myProfileCard} variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3', borderWidth: 2, }}>
                                <CardContent>
                                    <Grid container>
                                        <Grid xs={11} md={11}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, mb: 1, fontWeight: 'bold', color: 'black', }}>
                                                Plans
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                        <Card variant="outlined" sx={{ borderColor: '#E8E8E8', outlineColor: '#E8E8E8', borderWidth: 2 }}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 0, mb: 1, color: 'black', }}>
                                                            Yearly subscription (Pro)
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <CardContent>
                                                    <Grid container>
                                                        <Grid xs={12} md={12}>
                                                            <Grid container sx={{ p: 1 }}>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> 2+Student Account
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> Videos all chapter
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> Selftest all Chapter
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> All past paper pfd download
                                                                    </Typography>
                                                                </Grid>
                                                                
                                                            </Grid>

                                                            <Grid container sx={{ p: 1 }}>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> Challenges all chapter
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> Queries all chapter
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> Worksheet all chapter
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid xs={3} md={3}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 0, mb: 1, color: 'black', }}>
                                                                    <CheckCircleIcon color="success" /> Revision all chapter
                                                                    </Typography>
                                                                </Grid>
                                                                
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </CardContent>
                                                <Grid container>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 0, color: 'black', }}>
                                                        Plan Expires
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 0, mb: 1, color: '#707070', }}>
                                                        30 September 2022 at 11:57:54 GMT
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container sx={{mt:2}}>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 0, color: 'black', }}>
                                                        Auto Renewal : Off
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 0, mb: 1, color: '#707070', }}>
                                                        <LoadingButton variant="contained" sx={{ backgroundColor: "#3A8B8C", ":hover": { backgroundColor: "#3A8B8C", }, mt:1, textTransform: 'none', fontSize: 15, borderRadius:10 }}>Turn on auto Renewal</LoadingButton>
                                                        
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 3, mb: 1, color: '#424B54', fontWeight:'bold' }}>
                                                        Cancel subscription Early?
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
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
export default SubscriptionPlan;