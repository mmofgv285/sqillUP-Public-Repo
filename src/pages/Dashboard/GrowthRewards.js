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

const rows = [
    createData('Lucifer', 'Biology', 'Self test', 'Outing', 'After getting 100 point in self test.'),
];

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
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
            isOpenCreateRewards: false,
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

    openDeleteRewards(flag){
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

                            {!this.state.isOpenCreateRewards ?
                                <>
                                    <Grid container sx={{ pt: 2, mb: 2 }} gap={10}>
                                        <Grid xs={2} md={2} sx={{ position: 'relative', }}>
                                            <Card elevation={5} >
                                                <Typography variant="subtitle1" align='center' sx={{ backgroundColor: '#00AAB3', pt: 2, pb: 2, color: 'white' }}>
                                                    Score Point 200
                                                </Typography>
                                                <img src={GrowthCup} style={{ position: 'absolute', top: -20, right: 0, zIndex: 1, }}></img>
                                                <CardContent>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Flat ` 100 Off On Amazon Book purchase
                                                    </Typography>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 14, mt: 1 }}>
                                                        Coupen code: ******
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid xs={2} md={2} sx={{ position: 'relative', }}>
                                            <Card elevation={5} >
                                                <Typography variant="subtitle1" align='center' sx={{ backgroundColor: '#00AAB3', pt: 2, pb: 2, color: 'white' }}>
                                                    Score Point 250
                                                </Typography>
                                                <img src={GrowthGift} style={{ position: 'absolute', top: -20, right: 0, zIndex: 1, }}></img>
                                                <CardContent>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Redeem coupon of Kids zone worth ` 500
                                                    </Typography>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 14, mt: 1 }}>
                                                        Coupen code: ******
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid xs={2} md={2} sx={{ position: 'relative', }}>
                                            <Card elevation={5} >
                                                <Typography variant="subtitle1" align='center' sx={{ backgroundColor: '#00AAB3', pt: 2, pb: 2, color: 'white' }}>
                                                    Score Point 300
                                                </Typography>
                                                <img src={GrowthCup} style={{ position: 'absolute', top: -20, right: 0, zIndex: 1, }}></img>
                                                <CardContent>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Flat ` 200 Off On Firstcry school item purchase
                                                    </Typography>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 14, mt: 1 }}>
                                                        Coupen code: ******
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid xs={2} md={2} sx={{ position: 'relative', }}>
                                            <Card elevation={5} >
                                                <Typography variant="subtitle1" align='center' sx={{ backgroundColor: '#00AAB3', pt: 2, pb: 2, color: 'white' }}>
                                                    Score Point 500
                                                </Typography>
                                                <img src={GrowthGift} style={{ position: 'absolute', top: -20, right: 0, zIndex: 1, }}></img>
                                                <CardContent>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Redeem coupon of Kids zone worth ` 500
                                                    </Typography>
                                                    <Typography variant="subtitle1" align='center' sx={{ fontSize: 14, mt: 1 }}>
                                                        Coupen code: ******
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>

                                    <Button onClick={() => this.openCreateRewards()} variant={"outlined"} sx={{ textTransform: 'none', fontFamily: 'sans-serif', fontWeight: 'bold', mb: 2, color: 'black', borderColor: '#FFCA3A', backgroundColor: 'white', ":hover": { borderColor: '#FFCA3A', color: 'black', backgroundColor: 'white', } }}>
                                        Create Reward <AddIcon />
                                    </Button>


                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: '#F9F9F9', color: 'white' }}>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }} >subject</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }} >Category</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }} >type</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }} >Detail</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }} >Score Point</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }} ></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell >{row.calories}</TableCell>
                                                        <TableCell >{row.fat}</TableCell>
                                                        <TableCell >{row.carbs}</TableCell>
                                                        <TableCell >{row.protein}</TableCell>
                                                        <TableCell >100</TableCell>
                                                        <TableCell >
                                                            <IconButton><EditIcon /></IconButton>
                                                            <IconButton onClick={()=> this.openDeleteRewards(this.state.isOpenDeleteDialog)}><DeleteIcon /></IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                                : null}

                            {this.state.isOpenCreateRewards ?
                                <Grid container>
                                    <Grid xs={12} md={12}>
                                        <Card elevation={5} sx={{ mt: 2 }}>
                                            <Typography variant="h6" sx={{ pt: 2, pb: 2, ml: 2,  }}>
                                                Create Rewards
                                            </Typography>
                                            <Card variant='outlined' elevation={5} sx={{ m: 2, borderColor: '#00AAB3', outlineColor: '#00AAB3' }}>
                                                <CardContent >
                                                    <Grid container>
                                                        <Grid xs={3} md={3}>
                                                            <Typography variant="subtitle1" sx={{}}>
                                                                Select Student *
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={9} md={9}>
                                                            <Paper
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '50%' }}
                                                            >
                                                                <NativeSelect sx={{ ml: 1, flex: 1 }}>
                                                                    <option></option>
                                                                    <option>Lucifer</option>
                                                                    <option>Abram</option>
                                                                    <option>Scarlet</option>
                                                                </NativeSelect>
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 1 }}>
                                                            <Typography variant="subtitle1" sx={{}}>
                                                                Select Subject *
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={9} md={9} sx={{ mt: 1 }}>
                                                            <Paper
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '50%' }}
                                                            >
                                                                <NativeSelect sx={{ ml: 1, flex: 1 }}>
                                                                    <option></option>
                                                                    <option>Physics</option>
                                                                    <option>Chemistry</option>
                                                                    <option>Math</option>
                                                                    <option>Biology</option>
                                                                </NativeSelect>
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 1 }}>
                                                            <Typography variant="subtitle1" sx={{}}>
                                                                Reward Category *
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={9} md={9} sx={{ mt: 1 }}>
                                                            <Paper
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '50%' }}
                                                            >
                                                                <NativeSelect sx={{ ml: 1, flex: 1 }}>
                                                                    <option></option>
                                                                    <option>Self test</option>
                                                                    <option>Worksheet</option>
                                                                    <option>Chapter paper</option>
                                                                    <option>Challenges</option>
                                                                </NativeSelect>
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 1 }}>
                                                            <Typography variant="subtitle1" sx={{}}>
                                                                Reward Type *
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={9} md={9} sx={{ mt: 1 }}>
                                                            <Paper
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '50%' }}
                                                            >
                                                                <NativeSelect sx={{ ml: 1, flex: 1 }}>
                                                                    <option></option>
                                                                    <option>Entertainment</option>
                                                                    <option>Outing</option>
                                                                    <option>Tv time</option>
                                                                    <option>Music</option>
                                                                    <option>Vacation</option>
                                                                </NativeSelect>
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 1 }}>
                                                            <Typography variant="subtitle1" sx={{}}>
                                                                Rewards Details *
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={9} md={9} sx={{ mt: 1 }}>
                                                            <Paper
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', width: '50%' }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 1 }}>
                                                            <Typography variant="subtitle1" sx={{}}>
                                                                Points *
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4} sx={{ mt: 1 }}>
                                                            <Paper
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                />
                                                            </Paper>
                                                        </Grid>
                                                        <Grid xs={5} md={5} sx={{ mt: 1 }}>
                                                            <Typography variant="subtitle1" align='left'>
                                                                <Tooltip title="type upto 100 point" placement="right-start">
                                                                    <IconButton><QuestionMarkIcon /></IconButton>
                                                                </Tooltip>

                                                            </Typography>
                                                        </Grid>



                                                        <Grid xs={9} md={9} sx={{ mt: 1 }}>
                                                            <Typography variant="subtitle1" align='center'>
                                                                <LoadingButton variant="contained" size='medium' className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover": { backgroundColor: "#00AAB3", }, ml: 2, textTransform: 'none', fontSize: 14 }}>Create Rewards</LoadingButton>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Card>
                                    </Grid>
                                </Grid>
                                : null}
                        </Grid>
                    </Grid>

                    <Dialog
                        open={this.state.isOpenDeleteDialog}
                        onClose={()=>this.openDeleteRewards(this.state.isOpenDeleteDialog)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{color:'#00AAB3'}}>
                        <Typography variant="h6" align='center'>
                        Delete Reward
                        </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" sx={{fontWeight:'bold', color:'black'}}>
                            Are you sure want to Delete this reward?
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
export default GrowthRewards;