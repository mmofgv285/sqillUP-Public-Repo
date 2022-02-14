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
import CardHeader from '@mui/material/CardHeader';
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
import ToolTipSignUp from '../../assets/images/tooltip-sign-up.svg';
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CardTitle } from 'reactstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import masterCardImg from '../../assets/images/mastercard.png';
import AddIcon from '@mui/icons-material/Add';
import visaCardImg from '../../assets/images/visa.png';
import signinPasswordImg from '../../assets/images/signin-password.png';
import stripCardImg from '../../assets/images/strip.png';

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

class SubscriptionBilling extends React.Component {

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
            isOpenAutoRenewal: false,
            isOpenCancelSubscription: false,

            isOpenAddBillingSection: false,
            isOpenBillingSection:true,
            isOpenSelectPaymentSection: false,
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

    isOpenAutoRenewal(flag) {
        this.setState({ isOpenAutoRenewal: !flag });
    }

    openAddBillingInfo() {
        this.setState({ isOpenAddBillingSection: true });
        this.setState({ isOpenBillingSection: false});
    }

    goNextInBilling(){
        this.setState({ isOpenSelectPaymentSection: true });
        this.setState({ isOpenAddBillingSection: false });
    }

    goBackInBilling(){
        this.setState({ isOpenBillingSection: true });
        this.setState({ isOpenAddBillingSection: false });
    }

    goBackInSelectPaymentType(){
        this.setState({ isOpenSelectPaymentSection: false });
        this.setState({ isOpenAddBillingSection: true });
    }

    goNextInSelectPaymentType(){
        this.setState({ isOpenSelectPaymentSection: false });
        this.setState({ isOpenBillingSection: true });
    }

    isOpenCancelSubscription(flag) {
        this.setState({ isOpenCancelSubscription: !flag });
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

                            {this.state.isOpenBillingSection == true ?
                                <Card elevation={5} ref={this.myProfileCard} variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3', borderWidth: 2, }}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid xs={11} md={11}>
                                                <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, mb: 1, fontWeight: 'bold', color: 'black', }}>
                                                    Billing
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Card variant="outlined" sx={{ borderColor: '#FFFFFF', outlineColor: '#FFFFFF', borderWidth: 2 }}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid xs={8} md={8}>
                                                        <Card variant="outlined" sx={{ borderColor: '#E8E8E8', outlineColor: '#E8E8E8', borderWidth: 2, backgroundColor: '#00AAB3' }}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 16, color: 'white', ml: 2 }}>
                                                                Default payment method
                                                            </Typography>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, pl: 2, fontWeight: 'bold', backgroundColor: 'white' }}>
                                                                <Grid container>
                                                                    <Grid xs={1} md={1}>
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                                            defaultValue="female"
                                                                            name="radio-buttons-group"
                                                                            sx={{ mt: 4 }}
                                                                        >
                                                                            <FormControlLabel value="card-payment" checked control={<Radio />} label=" " sx={{ fontWeight: 'bold' }} />
                                                                        </RadioGroup>
                                                                    </Grid>
                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                            <img src={masterCardImg} width={'50%'} height={'auto'} style={{ cursor: 'pointer' }}></img>
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={8} md={8}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, fontWeight: 'bold' }}>
                                                                            Ending in 2482
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 15, color: '#707070' }}>
                                                                            Expires: 05/2024
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, color: '#707070' }}>
                                                                            John Borden
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                <Grid container sx={{ mt: 2 }}>
                                                    <Grid xs={8} md={8}>
                                                        <Card variant="outlined" sx={{ borderColor: '#E8E8E8', outlineColor: '#E8E8E8', borderWidth: 2, backgroundColor: '#00AAB3' }}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 16, color: 'white', ml: 2 }}>
                                                                Payment method
                                                            </Typography>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, pl: 2, fontWeight: 'bold', backgroundColor: 'white' }}>
                                                                <Grid container>
                                                                    <Grid xs={1} md={1}>
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                                            defaultValue="female"
                                                                            name="radio-buttons-group"
                                                                            sx={{ mt: 4 }}
                                                                        >
                                                                            <FormControlLabel value="card-payment" control={<Radio />} label=" " sx={{ fontWeight: 'bold' }} />
                                                                        </RadioGroup>
                                                                    </Grid>
                                                                    <Grid xs={3} md={3}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                            <img src={masterCardImg} width={'50%'} height={'auto'} style={{ cursor: 'pointer' }}></img>
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs={8} md={8}>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, fontWeight: 'bold' }}>
                                                                            Ending in 2482
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 15, color: '#707070' }}>
                                                                            Expires: 05/2024
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 14, color: '#707070' }}>
                                                                            John Borden
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>

                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 0, mb: 1, color: '#707070', }}>
                                                <LoadingButton onClick={() => this.openAddBillingInfo()} variant="outlined" sx={{ borderColor: "#222222", backgroundColor: "#FFFFFF", ":hover": { backgroundColor: "#FFFFFF", borderColor: "#222222", }, mt: 1, textTransform: 'none', fontSize: 15, borderRadius: 10, pl: 5, pr: 5, color: "#707070" }}>Add new payment method</LoadingButton>

                                            </Typography>
                                        </Card>

                                    </CardContent>
                                </Card>
                                :
                                null
                            }

                            {this.state.isOpenAddBillingSection == true ?
                                <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '100%' }}>

                                    <Grid container sx={{ backgroundColor: '#6D6E70', p: 1 }}>
                                        <Grid xs={10} md={10}>
                                            <Typography variant="h5" sx={{ mt: 1, mb: 1, ml: 1, color: '#FFFFFF' }}>
                                                Add Billing Information
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} md={2}>
                                            <Typography variant="h5" sx={{ mt: 2, mb: 1, mt: 1, color: '#FFFFFF' }}>
                                                Auto fill <Checkbox size='medium' sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 40, color: 'white' } }} checked={this.state.isCheckedTandC} onChange={(e) => this.changeTandCCheck(e)} />
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container sx={{ p: 3, pr: 5 }}>
                                        <Grid xs={5} md={5}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                First Name <span style={{ color: 'red', }}>*</span>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} md={7}>
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

                                        <Grid xs={5} md={5}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Last Name <span style={{ color: 'red', }}>*</span>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} md={7}>
                                            <Paper
                                                component="form"
                                                variant='outlined'
                                                fullWidth
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                            >
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="Borden"
                                                />
                                            </Paper>
                                        </Grid>

                                        <Grid xs={5} md={5}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Address line 1 <span style={{ color: 'red', }}>*</span>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} md={7}>
                                            <Paper
                                                component="form"
                                                variant='outlined'
                                                fullWidth
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                            >
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="Lorem ipsum dolor sit"
                                                />
                                            </Paper>
                                        </Grid>

                                        <Grid xs={5} md={5}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Address line 2 <span style={{ color: 'red', }}>*</span>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} md={7}>
                                            <Paper
                                                component="form"
                                                variant='outlined'
                                                fullWidth
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                            >
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="Lorem ipsum dolor sit"
                                                />
                                            </Paper>
                                        </Grid>

                                        <Grid xs={5} md={5}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                City <span style={{ color: 'red', }}>*</span>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} md={7}>
                                            <Paper
                                                component="form"
                                                variant='outlined'
                                                fullWidth
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                            >
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="London"
                                                />
                                            </Paper>
                                        </Grid>

                                        <Grid xs={5} md={5}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Country <span style={{ color: 'red', }}>*</span>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} md={7}>
                                            <Paper
                                                component="form"
                                                variant='outlined'
                                                fullWidth
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                            >
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="London"
                                                />
                                            </Paper>
                                        </Grid>

                                        <Grid xs={5} md={5}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Postal code <span style={{ color: 'red', }}>*</span>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} md={7}>
                                            <Paper
                                                component="form"
                                                variant='outlined'
                                                fullWidth
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                            >
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="London"
                                                />
                                            </Paper>
                                        </Grid>

                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" align='right' className='font-google-600' sx={{ fontSize: 13, mt: 3, mb: 1, ml: 5, fontWeight: 'bold' }}>
                                                <Button onClick={()=>this.goBackInBilling()} variant={"outlined"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'black', borderColor: '#3AB9C1', backgroundColor: 'white', ":hover": { borderColor: '#3AB9C1', color: 'black', backgroundColor: 'white', } }}>
                                                    Back
                                                </Button>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" align='right' className='font-google-600' sx={{ fontSize: 15, mt: 4, ml: 2, fontWeight: 'bold', color: '#424B54' }}>
                                                <Button onClick={()=>this.goNextInBilling()} variant={"contained"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'white', borderColor: '#3AB9C1', backgroundColor: '#3AB9C1', ":hover": { borderColor: '#3AB9C1', color: 'white', backgroundColor: '#3AB9C1', } }}>
                                                    Next
                                                </Button>
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Card>
                                :
                                null
                            }

                            {this.state.isOpenSelectPaymentSection == true ?
                                <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '100%' }}>

                                <Grid container sx={{ backgroundColor: '#6D6E70', p: 1 }}>
                                    <Grid xs={12} md={12}>
                                        <Typography variant="h5" sx={{ mt: 1, mb: 1, ml: 1, color: '#FFFFFF' }}>
                                            Select payment method
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container sx={{ p: 3, pr: 5 }}>
                                    <Grid xs={12} md={12}>
                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel value="card-payment" checked control={<Radio />} label="Add debit / credit card" sx={{ fontWeight: 'bold' }} />
                                            </RadioGroup>
                                        </Typography>
                                    </Grid>

                                    <Grid container>
                                        <Grid xs={2} md={2}>

                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                <img src={masterCardImg} width={'100%'} height={'auto'} style={{ cursor: 'pointer' }}></img>
                                            </Typography>

                                        </Grid>
                                        <Grid xs={2} md={2}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                <img src={visaCardImg} width={'100%'} height={'auto'}></img>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} md={2}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                <img src={stripCardImg} width={'100%'} height={'auto'}></img>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Card holder name <span style={{ color: 'red', }}>*</span>
                                                <Paper
                                                    component="form"
                                                    variant='outlined'
                                                    fullWidth
                                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                >
                                                    <InputBase
                                                        sx={{ ml: 1, flex: 1 }}
                                                        placeholder="John borden"
                                                    />
                                                </Paper>
                                            </Typography>
                                        </Grid>

                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Card Number <span style={{ color: 'red', }}>*</span>
                                                <Paper
                                                    component="form"
                                                    variant='outlined'
                                                    fullWidth
                                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                >
                                                    <InputBase
                                                        sx={{ ml: 1, flex: 1 }}
                                                        placeholder="1234 4567 8903 4567"
                                                        endAdornment={<img src={signinPasswordImg} width={'4%'} height={'auto'}></img>}
                                                    />
                                                </Paper>
                                            </Typography>
                                        </Grid>

                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                Expiry Date <span style={{ color: 'red', }}>*</span>
                                                <Grid container>
                                                    <Grid xs={6} md={6}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="04"
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                    <Grid xs={6} md={6}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="2022"
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                </Grid>

                                            </Typography>
                                        </Grid>

                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, ml: 5, mr: 2, fontWeight: 'bold' }}>
                                                CVV Number <span style={{ color: 'red', }}>*</span>
                                                <Paper
                                                    component="form"
                                                    variant='outlined'
                                                    fullWidth
                                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 1 }}
                                                >
                                                    <InputBase
                                                        sx={{ ml: 1, flex: 1 }}
                                                        placeholder="CVV"
                                                    />
                                                </Paper>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" align='right' className='font-google-600' sx={{ fontSize: 13, mt: 3, mb: 1, ml: 5, fontWeight: 'bold' }}>
                                                <Button onClick={()=>this.goBackInSelectPaymentType()} variant={"outlined"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'black', borderColor: '#3AB9C1', backgroundColor: 'white', ":hover": { borderColor: '#3AB9C1', color: 'black', backgroundColor: 'white', } }}>
                                                    Back
                                                </Button>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" align='right' className='font-google-600' sx={{ fontSize: 15, mt: 4, ml: 2, fontWeight: 'bold', color: '#424B54' }}>
                                                <Button onClick={()=>this.goNextInSelectPaymentType()} variant={"contained"} sx={{ width: '30%', textTransform: 'none', mb: 2, color: 'white', borderColor: '#3AB9C1', backgroundColor: '#3AB9C1', ":hover": { borderColor: '#3AB9C1', color: 'white', backgroundColor: '#3AB9C1', } }}>
                                                    Save
                                                </Button>
                                            </Typography>
                                        </Grid>

                                </Grid>
                            </Card>
                                :
                                null
                            }


                        </Grid>
                    </Grid>

                    {/* Turn On Auto Renewal Start */}
                    <Dialog
                        open={this.state.isOpenAutoRenewal}
                        onClose={() => this.isOpenAutoRenewal(this.state.isOpenAutoRenewal)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        maxWidth="lg"
                    >
                        <DialogContent>
                            <Grid container>
                                <Grid xs={6} md={6} sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontSize: 23, mt: 3, mb: 1, color: '#424B54', }}>
                                        Keep Enjoying pro Until 30 September 2020
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 3, mb: 2, color: '#424B54', }}>
                                        Since you are an annual subscriber, you will get to keep these benefits until the end of your plan. Leave auto renewal on to keep the benefits going Even after that.
                                    </Typography>

                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> 1 Student Account
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> Videos 1 per chapter
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> Selftest 1 per Chapter
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> Worksheet 1 per chapter
                                    </Typography>

                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> All past paper pfd download
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> Revision 1 per chapter
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> Challenges 1 per chapter
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14, mt: 1, mb: 1, color: 'black', }}>
                                        <CheckCircleIcon color="success" /> Queries 1 per chapter
                                    </Typography>

                                </Grid>

                                <Grid xs={6} md={6} sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontSize: 23, mt: 3, mb: 1, color: '#424B54', }}>
                                        Are you sure you want to turn Auto renewal off?
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 3, mb: 2, color: '#424B54', }}>
                                        Disabling auto renewal means your plan will expire on 30 September 2022 at 11:57:54 GMT. You will continue to be billed next year for your plan.
                                    </Typography>
                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 13, mt: 0, mb: 1, color: '#707070', }}>
                                        <LoadingButton variant="contained" sx={{ backgroundColor: "#3A8B8C", ":hover": { backgroundColor: "#3A8B8C", }, mt: 1, textTransform: 'none', fontSize: 15, borderRadius: 10, pl: 5, pr: 5 }}>Keep On</LoadingButton>

                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 3, mb: 1, color: '#424B54', fontWeight: 'bold' }}>
                                        Otherwise tell us why you want to turn it off: <span style={{ color: 'red', }}>*</span>
                                    </Typography>

                                    <FormControl sx={{ minWidth: 80 }} fullWidth>
                                        <InputLabel id="demo-simple-select-autowidth-label">Select an option</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            autoWidth
                                            label="Select an option"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={1}>I don’t like automatic billing</MenuItem>
                                            <MenuItem value={2}>I want to cancel my plan</MenuItem>
                                            <MenuItem value={3}>I don’t understand how auto renewal works</MenuItem>
                                            <MenuItem value={4}>My needs have changed</MenuItem>
                                            <MenuItem value={22}>Other</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 3, mb: 1, color: '#3AB9C1', }}>
                                        Continue to turn off auto renewal
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.isOpenAutoRenewal(this.state.isOpenAutoRenewal)}>Close</Button>
                        </DialogActions>
                    </Dialog>
                    {/* Turn On Auto Renewal End  */}

                    {/* Cancel Subscription Start */}
                    <Dialog
                        open={this.state.isOpenCancelSubscription}
                        onClose={() => this.isOpenCancelSubscription(this.state.isOpenCancelSubscription)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogContent>
                            <Grid container>
                                <Grid xs={12} md={12} sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontSize: 23, mt: 3, mb: 1, color: '#424B54', }}>
                                        Oh! You want to cancel subscription early?
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 16, mt: 3, mb: 2, color: '#424B54', }}>
                                        You are currently subscribed to annual pro plan, which offers discounts. Cancellation of subscription early not incur plan price adjustment If you cancel your subscription your students account also will be deleted. To cancel , visit to our enquiry page
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 0, mb: 1, color: '#707070', }}>
                                        <LoadingButton variant="contained" sx={{ backgroundColor: "#3A8B8C", ":hover": { backgroundColor: "#3A8B8C", }, mt: 1, textTransform: 'none', fontSize: 15, borderRadius: 10, pl: 5, pr: 5 }}>Go to FAQ <ArrowForwardIcon sx={{ ml: 2 }} /></LoadingButton>

                                    </Typography>

                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.isOpenCancelSubscription(this.state.isOpenCancelSubscription)}>Close</Button>
                        </DialogActions>
                    </Dialog>
                    {/* Cancel Subscription End */}
                </Container>
            </React.Fragment>
        )
    }
}
export default SubscriptionBilling;