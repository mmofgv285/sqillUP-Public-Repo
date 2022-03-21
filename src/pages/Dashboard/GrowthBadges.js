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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import sunBadge from '../../assets/images/sun-badge.jpg';
import moonBadge from '../../assets/images/moon-badge.jpg';
import earthBadge from '../../assets/images/earth-badge.jpg';
import marsBadge from '../../assets/images/mars-badge.jpg';

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

class GrowthBadges extends React.Component {

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
            isOpenCreateBadges: false,
            isOpenEditBadges: false,
            isOpenDeleteDialog:false,
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

    openCreateBadges() {
        this.setState({ isOpenCreateBadges: true });
    }

    goBackInBadges() {
        this.setState({ isOpenCreateBadges: false });
    }

    openEditBadges() {
        this.setState({ isOpenEditBadges: true });
    }

    goBackInEditBadges(){
        this.setState({ isOpenEditBadges: false });
    }

    openDeleteBadges(flag){
        this.setState({ isOpenDeleteDialog: !flag });
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
                            {!this.state.isOpenEditBadges ?
                                <>
                                {!this.state.isOpenCreateBadges ?
                                    <CardContent>
                                        <Grid container>
                                            <Grid xs={10} md={10}>
                                                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'black', }}>
                                                    Badges
                                                </Typography>
                                            </Grid>
                                            <Grid xs={2} md={2}>
                                                <Typography variant="subtitle1" align='right' sx={{ mb: 1, color: 'black', }}>
                                                    <Button onClick={() => this.openCreateBadges()} variant={"outlined"} sx={{ textTransform: 'none', fontFamily: 'sans-serif', fontWeight: 'bold', mb: 2, color: 'black', borderColor: '#FFCA3A', backgroundColor: 'white', ":hover": { borderColor: '#FFCA3A', color: 'black', backgroundColor: 'white', } }}>
                                                        Create Badges <AddIcon />
                                                    </Button>
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Card variant="outlined" sx={{ borderColor: '#ffffff', outlineColor: '#ffffff', }}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid xs={2} md={2}>
                                                        <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={sunBadge} />
                                                        <Typography variant="subtitle2" sx={{ fontSize: 17, mt: 2, mb: 1, color: 'black', }}>
                                                            Sun Badge
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={moonBadge} />
                                                        <Typography variant="subtitle2" sx={{ fontSize: 17, mt: 2, mb: 1, color: 'black', }}>
                                                            Moon Badge
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={earthBadge} />
                                                        <Typography variant="subtitle2" sx={{ fontSize: 17, mt: 2, mb: 1, color: 'black', }}>
                                                            Earth Badge
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={marsBadge} />
                                                        <Typography variant="subtitle2" sx={{ fontSize: 17, mt: 2, mb: 1, color: 'black', }}>
                                                            Mars Badge
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={2} md={2}>
                                                        <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={sunBadge} />
                                                        <Typography variant="subtitle2" sx={{ fontSize: 17, mt: 2, mb: 1, color: 'black', }}>
                                                            Sun Badge
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>

                                            <CardContent>
                                                <Grid container>
                                                    <Grid xs={10} md={10}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'black', fontWeight: 'bold' }}>
                                                            customise badges
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid xs={2} md={2}>
                                                        <Card variant="outlined" sx={{ borderColor: '#707070', outlineColor: '#707070', }}>
                                                            <CardContent>
                                                                <Grid container sx={{ mb: 1 }}>
                                                                    <Grid xs={10} md={10}>
                                                                        <Typography variant="subtitle2" align='center' sx={{ fontSize: 13, color: '#999999', }}>
                                                                            Physics
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={2} md={2}>
                                                                        <Typography variant="subtitle2" align='right' sx={{ fontSize: 10, color: 'black', }}>
                                                                            <EditIcon sx={{ fontSize: 15, cursor: 'pointer' }} onClick={() => this.openEditBadges()} />
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container>
                                                                    <Grid xs={12} md={12}>
                                                                        <Typography variant="subtitle2" align='center'>
                                                                            <img src={sunBadge} width={'50'} height={'50'} style={{ cursor: 'pointer' }}></img>
                                                                            <Typography variant="subtitle2" sx={{ fontSize: 15, mt: 2, mb: 1, color: '#666666', }}>
                                                                                Self test badges
                                                                            </Typography>
                                                                            <Typography variant="subtitle2" sx={{ fontSize: 13, color: '#999999', }}>
                                                                                Score 20% in chapter 1
                                                                            </Typography>
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Card>
                                                        {/* <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={sunBadge} />
                                                        <Typography variant="subtitle2" sx={{ fontSize: 17, mt: 2, mb: 1, color: 'black', }}>
                                                            Sun Badge
                                                        </Typography> */}
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                    </CardContent>
                                    :
                                    <CardContent>
                                        <Grid container>
                                            <Grid xs={10} md={10}>
                                                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'black', }}>
                                                    Create Badges
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Card variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3', borderWidth: 2 }}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                            Select Student <span style={{ color: 'red', }}>*</span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={5} md={5}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="John"
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                            Select Subject <span style={{ color: 'red', }}>*</span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={5} md={5}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="John"
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                            Badges Name <span style={{ color: 'red', }}>*</span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={5} md={5}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="John"
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                            Badges Details <span style={{ color: 'red', }}>*</span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={5} md={5}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="John"
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                            Badges Image <span style={{ color: 'red', }}>*</span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={5} md={5}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="John"
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid xs={6} md={6}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 3, mb: 1, ml: 5, fontWeight: 'bold' }}>
                                                            <Button onClick={() => this.goBackInBadges()} variant={"outlined"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'black', borderColor: '#3AB9C1', backgroundColor: 'white', ":hover": { borderColor: '#3AB9C1', color: 'black', backgroundColor: 'white', } }}>
                                                                Back
                                                            </Button>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={6} md={6}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 15, mt: 4, ml: 2, fontWeight: 'bold', color: '#424B54' }}>
                                                            <Button onClick={() => this.goBackInBadges()} variant={"contained"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'white', borderColor: '#3AB9C1', backgroundColor: '#3AB9C1', ":hover": { borderColor: '#3AB9C1', color: 'white', backgroundColor: '#3AB9C1', } }}>
                                                                Create Badges
                                                            </Button>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                    </CardContent>
                                }
                                </>
                                :
                                <>
                                {this.state.isOpenEditBadges ?
                                <CardContent>
                                    <Grid container>
                                        <Grid xs={10} md={10}>
                                            <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'black', }}>
                                                Edit Badges
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Card variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3', borderWidth: 2 }}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid xs={3} md={3}>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                        Select Student <span style={{ color: 'red', }}>*</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Paper
                                                        component="form"
                                                        variant='outlined'
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="John"
                                                        />
                                                    </Paper>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Typography variant="subtitle1" align='right' className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                    <DeleteOutlineIcon onClick={() => this.openDeleteBadges(false)} />
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid xs={3} md={3}>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                        Select Subject <span style={{ color: 'red', }}>*</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Paper
                                                        component="form"
                                                        variant='outlined'
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="John"
                                                        />
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid xs={3} md={3}>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                        Badges Name <span style={{ color: 'red', }}>*</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Paper
                                                        component="form"
                                                        variant='outlined'
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="John"
                                                        />
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid xs={3} md={3}>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                        Badges Details <span style={{ color: 'red', }}>*</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Paper
                                                        component="form"
                                                        variant='outlined'
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="John"
                                                        />
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid xs={3} md={3}>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 16, mt: 2, mb: 1, ml: 5, mr: 2 }}>
                                                        Badges Image <span style={{ color: 'red', }}>*</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Paper
                                                        component="form"
                                                        variant='outlined'
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="John"
                                                        />
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid xs={6} md={6}>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 3, mb: 1, ml: 5, fontWeight: 'bold' }}>
                                                        <Button onClick={() => this.goBackInEditBadges()} variant={"outlined"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'black', borderColor: '#3AB9C1', backgroundColor: 'white', ":hover": { borderColor: '#3AB9C1', color: 'black', backgroundColor: 'white', } }}>
                                                            Back
                                                        </Button>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 15, mt: 4, ml: 2, fontWeight: 'bold', color: '#424B54' }}>
                                                        <Button onClick={() => this.goBackInEditBadges()} variant={"contained"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'white', borderColor: '#3AB9C1', backgroundColor: '#3AB9C1', ":hover": { borderColor: '#3AB9C1', color: 'white', backgroundColor: '#3AB9C1', } }}>
                                                            Update
                                                        </Button>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>

                                </CardContent>
                                :
                                   null }
                                </>
                            }
                            </Card>
                        </Grid>
                    </Grid>

                    <Dialog
                        open={this.state.isOpenDeleteDialog}
                        onClose={()=>this.openDeleteBadges(this.state.isOpenDeleteDialog)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{color:'#00AAB3'}}>
                        <Typography variant="h6" align='center'>
                        Delete Badges
                        </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" sx={{fontWeight:'bold', color:'black'}}>
                            Are you sure want to Delete this badges?
                            </DialogContentText>
                            <Typography variant="h6" align='center' sx={{mt:3, mb:0}}>
                            <Button className='signup-button' variant="outlined" sx={{ color:'black', ":hover":{borderColor: "#C2C2C2", color:'black', backgroundColor:'#C2C2C2'}, borderColor: "#C2C2C2", mt: 1, backgroundColor: "#C2C2C2", textTransform:'none', fontSize:17, mr:2 }}>Back</Button>
                            
                            <Button className='signup-button' variant="outlined" sx={{ color:'black', ":hover":{borderColor: "#00AAB3", color:'black', backgroundColor:'#00AAB3'}, borderColor: "#00AAB3", mt: 1, backgroundColor: "#00AAB3", textTransform:'none', fontSize:17, }}>Yes</Button>
                            </Typography>
                        </DialogContent>
                        
                        
                    </Dialog>
                </Container>
            </React.Fragment>
        )
    }
}
export default GrowthBadges;