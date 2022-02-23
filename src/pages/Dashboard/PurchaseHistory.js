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
import GrowthCup from '../../assets/images/growth-cup.svg';
import GrowthGift from '../../assets/images/growth-gift.svg';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SideBar from '../Dashboard/SideBar';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CardHeader from '@mui/material/CardHeader';
import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Tooltip from '@mui/material/Tooltip';
import NativeSelect from '@mui/material/NativeSelect';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { color } from '@mui/system';

const rows = [
    createData('Pro', '20 Feb, 2021', '55.00', 'Stripe', '23rd August', 'Active'),
    createData('Pro', '20 Feb, 2021', '55.00', 'Stripe', '23rd August', 'Inactive'),
    createData('Pro', '20 Feb, 2021', '55.00', 'Stripe', '23rd August', 'Active'),
    createData('Pro', '20 Feb, 2021', '55.00', 'Master Card', '23rd August', 'Cancel'),
];

function createData(mySubscription, date, amount, paymentType, renewDate, status) {
    return { mySubscription, date, amount, paymentType, renewDate, status };
}

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

class GrowthRewards extends React.Component {

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
            isOpenViewReceipt: false,
            isOpenDeleteDialog: false,
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

    openViewReceipt() {
        this.setState({ isOpenViewReceipt: true });
    }

    closeViewReceipt(){
        this.setState({ isOpenViewReceipt: false });
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

    openCreateRewards() {
        this.setState({ isOpenCreateRewards: true });
    }

    openDeleteRewards(flag) {
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

                            {!this.state.isOpenViewReceipt ?
                                <>



                                    <Card elevation={5} ref={this.myProfileCard} variant="outlined" sx={{ borderColor: '#00AAB3', outlineColor: '#00AAB3', borderWidth: 2, }}>
                                        <CardContent>

                                            <Grid container>
                                                <Grid xs={11} md={11}>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, mb: 2, fontWeight: 'bold', color: 'black', }}>
                                                        Purchase history
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow sx={{ backgroundColor: '#F9F9F9', color: 'white' }}>
                                                            <TableCell sx={{ fontWeight: 'bold' }}>My subscription</TableCell>
                                                            <TableCell sx={{ fontWeight: 'bold' }} >Date</TableCell>
                                                            <TableCell sx={{ fontWeight: 'bold' }} >Amount</TableCell>
                                                            <TableCell sx={{ fontWeight: 'bold' }} >Payment Type</TableCell>
                                                            <TableCell sx={{ fontWeight: 'bold' }} >Renew Date</TableCell>
                                                            <TableCell sx={{ fontWeight: 'bold' }} >Status</TableCell>
                                                            <TableCell sx={{ fontWeight: 'bold' }} >Receipt</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows.map((row) => (
                                                            <TableRow
                                                                key={row.name}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {row.mySubscription}
                                                                </TableCell>
                                                                <TableCell >{row.date}</TableCell>
                                                                <TableCell >{row.amount}</TableCell>
                                                                <TableCell >{row.paymentType}</TableCell>
                                                                <TableCell >{row.renewDate}</TableCell>
                                                                <TableCell >
                                                                    {row.status == 'Active' ?
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 15, color: '#31C930', }}>
                                                                            {row.status}
                                                                        </Typography>
                                                                        : null}
                                                                    {row.status == 'Inactive' ?
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 15, color: '#0B92E8', }}>
                                                                            {row.status}
                                                                        </Typography>
                                                                        : null}
                                                                    {row.status == 'Cancel' ?
                                                                        <Typography variant="subtitle1" sx={{ fontSize: 15, color: '#F02121', }}>
                                                                            {row.status}
                                                                        </Typography>
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell >
                                                                    <Button onClick={() => this.openViewReceipt()} variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 2, fontWeight: 'bold', color: '#676767', ":hover": { cursor: 'pointer' }, textTransform: 'none' }}>
                                                                        View Receipt
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </CardContent>
                                    </Card>
                                </>
                                :
                                <>
                                    <Card elevation={5} variant="outlined" sx={{ borderColor: '#FFFFFF', outlineColor: '#FFFFFF', borderWidth: 2, }}>
                                        <CardContent>

                                            <Grid container>
                                                <Grid xs={4} md={4}>
                                                    <Card elevation={5} sx={{ backgroundColor: '#00AAB333', padding: 5, width: '35%' }}>
                                                        Sample
                                                    </Card>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 20, mt: 2, mb: 2, fontWeight: 'bold', color: 'black', }}>
                                                        Invoice
                                                    </Typography>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 13, mt: 1, color: '#666666', }}>
                                                        Invoice #: 9494657678512-54
                                                    </Typography>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 13, color: '#666666', }}>
                                                        Date: 20/2/2021
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Typography variant="subtitle1" align='right' sx={{ fontSize: 15, mt: 2, mb: 2, fontWeight: 'bold', color: 'black', }}>
                                                        <IconButton><DownloadIcon sx={{ color: '#FFCA3A' }} /></IconButton>
                                                        <IconButton onClick={()=> this.closeViewReceipt()}><CloseIcon sx={{ color: '#666666' }} /></IconButton>
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid xs={3} md={3}>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 2, mb: 2, fontWeight: 'bold', color: 'black', }}>
                                                        Address
                                                    </Typography>
                                                    <Typography variant="subtitle1" textAlign="justify" sx={{ fontSize: 13, mt: 2, color: '#666666', width: '50%' }}>
                                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 20, mt: 4, mb: 2, fontWeight: 'bold', color: 'black', }}>
                                                        Summary
                                                    </Typography>
                                                    <Grid container align='center'>
                                                        <Grid xs={3} md={3}>
                                                            <Typography variant="subtitle1" align='right' sx={{ fontSize: 13, mt: 1, color: '#666666', }}>
                                                                Class
                                                            </Typography>
                                                            <Divider sx={{ color: '#7E7E7E' }} />
                                                        </Grid>
                                                        <Grid xs={9} md={9}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, color: '#666666', }}>
                                                                Biology, Chemistry, Physics, Maths
                                                            </Typography>
                                                            <Divider sx={{ color: '#7E7E7E' }} />
                                                        </Grid>

                                                        <Grid xs={3} md={3}>
                                                            <Typography variant="subtitle1" align='right' sx={{ fontSize: 13, mt: 1, color: '#666666', }}>
                                                                Course duration
                                                            </Typography>
                                                            <Divider sx={{ color: '#7E7E7E' }} />
                                                        </Grid>
                                                        <Grid xs={9} md={9}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, color: '#666666', width: '100%' }}>
                                                                JAN - DEC 2021
                                                            </Typography>
                                                            <Divider sx={{ color: '#7E7E7E' }} />
                                                        </Grid>

                                                        <Grid xs={3} md={3}>
                                                            <Typography variant="subtitle1" align='right' sx={{ fontSize: 13, mt: 1, color: '#666666', }}>
                                                                Listed Amount
                                                            </Typography>
                                                            <Divider sx={{ color: '#7E7E7E' }} />
                                                        </Grid>
                                                        <Grid xs={9} md={9}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, color: '#666666', width: '100%' }}>
                                                                £ 860.00
                                                            </Typography>
                                                            <Divider sx={{ color: '#7E7E7E' }} />
                                                        </Grid>

                                                        <Grid xs={3} md={3}>
                                                            <Typography variant="subtitle1" align='right' sx={{ fontSize: 13, mt: 1, color: '#666666', }}>
                                                                VAT (10%)
                                                            </Typography>
                                                            <Divider sx={{ color: '00AAB3' }} />
                                                        </Grid>
                                                        <Grid xs={9} md={9}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, color: '#666666', width: '100%' }}>
                                                                £ 90.40
                                                            </Typography>
                                                            <Divider sx={{ color: '00AAB3' }} />
                                                        </Grid>

                                                        <Grid xs={3} md={3}>
                                                            <Typography variant="subtitle1" align='right' sx={{ fontSize: 15, mt: 1, color: '#00AAB3', }}>
                                                                Total
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={9} md={9}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 1, color: '#00AAB3', width: '100%' }}>
                                                                £ 950.40
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={3} md={3} align='right'>
                                                    <Typography variant="subtitle1" align='right' sx={{ fontSize: 15, mt: 2, mb: 2, fontWeight: 'bold', color: 'black', }}>
                                                        Recipient details:
                                                    </Typography>
                                                    <Typography variant="subtitle1" textAlign="justify" sx={{ fontSize: 13, mt: 2, color: '#666666', width: '50%' }}>
                                                        John Smith johnsmith@gmail.com sed diam nonumy eirmod
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container align="center">
                                                <Grid xs={12} md={12}>
                                                    <Button sx={{ textTransform: 'none', fontWeight: 'bold', mt: 5, color: '#00AAB3', backgroundColor: 'white', ":hover": { borderColor: '#FFCA3A', color: '#00AAB3', backgroundColor: 'white', } }}>
                                                    Contact admin
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </>}
                        </Grid>
                    </Grid>

                    <Dialog
                        open={this.state.isOpenDeleteDialog}
                        onClose={() => this.openDeleteRewards(this.state.isOpenDeleteDialog)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ color: '#00AAB3' }}>
                            <Typography variant="h6" align='center'>
                                Delete Reward
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" sx={{ fontWeight: 'bold', color: 'black' }}>
                                Are you sure want to Delete this reward?
                            </DialogContentText>
                            <Typography variant="h6" align='center' sx={{ mt: 3, mb: 0 }}>
                                <Button className='signup-button' variant="outlined" sx={{ color: 'black', ":hover": { borderColor: "#C2C2C2", color: 'black', backgroundColor: '#C2C2C2' }, borderColor: "#C2C2C2", mt: 1, backgroundColor: "#C2C2C2", textTransform: 'none', fontSize: 17, mr: 2 }}>Back</Button>

                                <Button className='signup-button' variant="outlined" sx={{ color: 'black', ":hover": { borderColor: "#00AAB3", color: 'black', backgroundColor: '#00AAB3' }, borderColor: "#00AAB3", mt: 1, backgroundColor: "#00AAB3", textTransform: 'none', fontSize: 17, }}>Yes</Button>
                            </Typography>
                        </DialogContent>


                    </Dialog>
                </Container>
            </React.Fragment>
        )
    }
}
export default GrowthRewards;