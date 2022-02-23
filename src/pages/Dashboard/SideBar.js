import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
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
import { Link } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';

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

class SideBar extends React.Component {

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
            activeLinkName: '',
            collapseOpenGrowth: false,
            collapseOpenSubscription:false,
            currentPathName: "",
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

        let currentRouteName = window.location.pathname;
        console.log(currentRouteName);
        this.setState({ currentPathName: currentRouteName });
        
        switch (currentRouteName) {
            case '/my-profile':
                this.setState({ activeLinkName: 'my-profile' });
                break;

            case '/student-profile':
                this.setState({ activeLinkName: 'student-profile' });
                break;

            case '/subscription-plan':
                this.setState({ activeLinkName: 'subscription-plan' });
                this.setState({ collapseOpenSubscription: true });
                break;

            case '/subscription-billing':
                this.setState({ activeLinkName: 'subscription-billing' });
                this.setState({ collapseOpenSubscription: true });
                break;

            case '/growth-rewards':
                this.setState({ activeLinkName: 'growth-rewards' });
                this.setState({ collapseOpenGrowth: true });
                break;

            case '/growth-score':
                this.setState({ activeLinkName: 'growth-score' });
                this.setState({ collapseOpenGrowth: true });
                break;

            case '/purchase-history':
                this.setState({ activeLinkName: 'purchase-history' });
                this.setState({ collapseOpenSubscription: true });
                break;

            default:
                break;
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

    collapseGrowth(flag) {
        this.setState({ collapseOpenGrowth: !flag });
    }

    collapseSubscription(flag){
        this.setState({ collapseOpenSubscription: !flag });
    }

    render() {
        return (
            <React.Fragment>
                <Card elevation={5} sx={{ maxWidth: '95%', height: '774px' }}>
                    <CardContent sx={{ p: 0, m: 0 }}>
                        <List sx={{ p: 0, m: 0 }}>
                            <ListItem disablePadding selected={this.state.activeLinkName == 'my-profile' ? true : false} sx={{
                                color: 'black', '& .Mui-selected': {
                                    backgroundColor: '#6ECACD',
                                    color:'#6ECACD'
                                },
                            }}>
                                <ListItemButton component={Link} to="/my-profile" >
                                    <ListItemIcon sx={{ pr: 0, mr: 0 }}>
                                        <img src={MyProfileSideBarIMG} style={{ width: 15, height: 15 }}></img>
                                    </ListItemIcon>
                                    <ListItemText sx={{ pl: 0, ml: 0 }} primary="My Profile" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding selected={this.state.activeLinkName == 'student-profile' ? true : false} sx={{
                                color: 'black', '& .MuiListItem-root.Mui-selected': {
                                    backgroundColor: '#6ECACD',
                                },
                            }}>
                                <ListItemButton component={Link} to="/student-profile">
                                    <ListItemIcon>
                                        <img src={StudentProfileSideBarIMG} style={{ width: 15, height: 15 }}></img>
                                    </ListItemIcon>
                                    <ListItemText primary="Student Profile" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => this.collapseSubscription(this.state.collapseOpenSubscription)}>
                                    <ListItemIcon>
                                        <img src={MySubscriptionSideBarIMG} style={{ width: 15, height: 15 }}></img>
                                    </ListItemIcon>
                                    <ListItemText primary="My Subscription" />
                                    {this.state.collapseOpenSubscription ? <ExpandLess /> : <ExpandMoreIcon />}
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={this.state.collapseOpenSubscription}>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }} component={Link} to="/subscription-plan" selected={this.state.activeLinkName == 'subscription-plan' ? true : false}>
                                        <ListItemIcon>
                                    </ListItemIcon>
                                            <ListItemText primary="Plan" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} component={Link} to="/subscription-billing" selected={this.state.activeLinkName == 'subscription-billing' ? true : false}>
                                        <ListItemIcon>
                                    </ListItemIcon>
                                            <ListItemText primary="Billing" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} component={Link} to="/purchase-history" selected={this.state.activeLinkName == 'purchase-history' ? true : false}>
                                        <ListItemIcon>
                                    </ListItemIcon>
                                            <ListItemText primary="Purchase History" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => this.collapseGrowth(this.state.collapseOpenGrowth)}>
                                    <ListItemIcon>
                                        <img src={GrowthSideBarIMG} style={{ width: 15, height: 15 }}></img>
                                    </ListItemIcon>
                                    <ListItemText primary="Growth" />
                                    {this.state.collapseOpenGrowth ? <ExpandLess /> : <ExpandMoreIcon />}
                                </ListItemButton>
                                
                            </ListItem>
                            <Collapse in={this.state.collapseOpenGrowth}>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }} component={Link} to="/growth-score" selected={this.state.activeLinkName == 'growth-score' ? true : false}>
                                        <ListItemIcon>
                                    </ListItemIcon>
                                            <ListItemText primary="Score" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} component={Link} to="/growth-rewards" selected={this.state.activeLinkName == 'growth-rewards' ? true : false}>
                                        <ListItemIcon>
                                    </ListItemIcon>
                                            <ListItemText primary="Rewards" />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                    </ListItemIcon>
                                            <ListItemText primary="Badges" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <img src={AssignmentSideBarIMG} style={{ width: 15, height: 15 }}></img>
                                    </ListItemIcon>
                                    <ListItemText primary="Assignment" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <img src={SignOutSideBarIMG} style={{ width: 20, height: 15 }}></img>
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Out" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}
export default SideBar;