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

const rows = [
    createData('56', 159, 6.0, 24, 4.0),
    createData('85', 237, 9.0, 37, 4.3),
    createData('61', 262, 16.0, 24, 6.0),
    createData('86', 305, 3.7, 67, 4.3),
    createData('47', 356, 16.0, 49, 3.9),
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

class GrowthScore extends React.Component {

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

                            <Grid container sx={{ p: 2 }} gap={1}>
                                <Grid xs={2} md={2}>
                                    <Card elevation={5}>
                                        <CardContent>
                                            <InputLabel sx={{color:'#3A8B8C'}}>Select Student</InputLabel>
                                            <Select
                                                size='small'
                                                variant='filled'
                                                fullWidth
                                                id="demo-simple-select"
                                                label="Select Student"
                                            >
                                                <MenuItem value={10}>Lusifer</MenuItem>
                                                <MenuItem value={20}>Ameera</MenuItem>
                                                <MenuItem value={30}>Pavithra</MenuItem>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid xs={2} md={2}>
                                    <Card elevation={5}>
                                        <CardContent>
                                            <InputLabel sx={{color:'#3A8B8C'}}>Select Subject</InputLabel>
                                            <Select
                                                size='small'
                                                variant='filled'
                                                fullWidth
                                                id="demo-simple-select"
                                                label="Select Student"
                                            >
                                                <MenuItem value={10}>All</MenuItem>
                                                <MenuItem value={20}>Maths</MenuItem>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid xs={2} md={2}>
                                    <Card elevation={5}>
                                        <CardContent>
                                            <InputLabel sx={{color:'#3A8B8C'}}>Exam Type</InputLabel>
                                            <Select
                                                size='small'
                                                variant='filled'
                                                fullWidth
                                                id="demo-simple-select"
                                                label="Select Student"
                                            >
                                                <MenuItem value={10}>Self Test</MenuItem>
                                                <MenuItem value={20}>Worksheet</MenuItem>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid xs={2} md={2}>
                                    <Card elevation={5}>
                                        <CardContent>
                                            <InputLabel sx={{color:'#3A8B8C'}}>Chapter</InputLabel>
                                            <Select
                                                size='small'
                                                variant='filled'
                                                fullWidth
                                                id="demo-simple-select"
                                                label="Select Student"
                                            >
                                                <MenuItem value={10}>Chapter 1</MenuItem>
                                                <MenuItem value={20}>Chapter 2</MenuItem>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid xs={3} md={3}>
                                    <Typography align='right' variant="subtitle1" sx={{ fontSize: 18, mt: 2, mb: 1, color: '#3A8B8C', }}>
                                        Total Score: 00
                                    </Typography>
                                </Grid>
                            </Grid>


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{backgroundColor:'#3A8B8C', color:'white'}}>
                                            <TableCell sx={{color:'white'}}>Chemistry</TableCell>
                                            <TableCell sx={{color:'white'}} align="right">Biology</TableCell>
                                            <TableCell sx={{color:'white'}} align="right">Physics</TableCell>
                                            <TableCell sx={{color:'white'}} align="right">Maths</TableCell>
                                            <TableCell sx={{color:'white'}} align="right">Total score</TableCell>
                                            <TableCell sx={{color:'white'}} align="right">Average score</TableCell>
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
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}
export default GrowthScore;