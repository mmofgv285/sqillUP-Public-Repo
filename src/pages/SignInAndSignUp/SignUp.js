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
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ReCAPTCHA from "react-google-recaptcha";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import signinScreen from '../../assets/images/signIn-screen.jpg';
import signupEmail from '../../assets/images/signup-email.png';
import signinEmail from '../../assets/images/signin-email.png';
import LK from '../../assets/images/lk.png';
import UK from '../../assets/images/uk.png';
import Success from '../../assets/images/success.png';
import Select from '@mui/material/Select';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import '../../assets/css/SignInAndSignUp/fontStyleSignUp.css';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            nextButtonPosition: 1,
            selectMobileCode: 44,
            signUpEmailValue: ''
        };
    }

    changeValue(value) {
        this.setState({ password: value });
    };

    handleClickShowPassword(value) {
        this.setState({ showPassword: !value });
    }

    changeNextPosition(positionValue) {
        let realValue = positionValue + 1;
        this.setState({ nextButtonPosition: realValue });
    }

    changeBackPosition(positionValue) {
        let realValue = positionValue - 1;
        this.setState({ nextButtonPosition: realValue });
    }

    changeCountryCode(countryCode) {
        this.setState({ selectMobileCode: countryCode });
    }

    // storre All Values for Sign up form
    handleSignUpChangeOfValues(value, sectionName) {
        switch (sectionName) {
            case 'email':
                this.setState({ signUpEmailValue: value.target.value });
                break;

            default:
                break;
        }

    }

    // Send OTP Code for Email
    sendOTPCodeForEmail(email) {
        let that = this;
        axios.post("https://api.smartht.co.uk/api/parentauth/requestOtp", { email: email })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <Container component="main" sx={{ pt: 8, pb: 6 }}>
                    <Grid container spacing={2}>
                        <Grid xs={6} md={7}>
                            <Grid container sx={{ p: 1 }}>
                                <Grid xs={12} md={12}>
                                    <Typography variant="p" className='font-google-p' align='left' sx={{ width: '90%' }}>
                                        Lorem Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Erode, Integer eget orcil veligt. sed diam nonumy Erode, Integer eget orcil veligt.
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12}>
                                    <Typography fullWidth>
                                        <img src={signinScreen} width='98%' height={600}></img>
                                    </Typography>
                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid xs={6} md={5}>
                            <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#EBEBEB" }}>
                                <CardContent sx={{ mr: 1 }}>
                                    {this.state.nextButtonPosition <= 2 ?
                                        <>
                                            <Typography variant='h6' className='font-google-heading6' sx={{ fontWeight: 'bold' }} align='center'>
                                                Personal Info
                                            </Typography>
                                            <Typography variant="subtitle1" className='font-google-subtitle' sx={{ fontSize: 14 }} align='center'>
                                                Sign Up to get Started!
                                            </Typography>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2, color: '#00AAB3' }} align='center'>
                                                Sign Up
                                            </Typography>
                                            {this.state.nextButtonPosition === 1 ?
                                                <>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Email ID
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            value={this.state.signUpEmailValue}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'email') }}
                                                            placeholder="Enter Your Email ID"
                                                            startAdornment={<InputAdornment position="start"><img src={signupEmail}></img></InputAdornment>}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <Button onClick={() => this.sendOTPCodeForEmail(this.state.signUpEmailValue)} size='small' variant="outlined" sx={{ borderColor: "#00AAB3", ml: 2, backgroundColor: "white", p: 0, }}>Send OTP</Button>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </Paper>

                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 1, mb: 1, fontWeight: 'bold' }}>
                                                        Enter Verification Code
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            value={this.state.signUpEmailValue}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'email') }}
                                                            placeholder="Enter OTP"
                                                            startAdornment={<InputAdornment position="start"><img src={signupEmail}></img></InputAdornment>}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <Button size='small' variant="outlined" sx={{ borderColor: "#00AAB3", ml: 2, backgroundColor: "white", p: 0, }}>Verify</Button>
                                                                    <CheckCircleIcon color="success" />
                                                                    <CancelIcon color="error" />
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </Paper>

                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Password
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: "#C9C9C9" }}
                                                    >
                                                        <InputBase
                                                        disabled
                                                            sx={{ ml: 1, flex: 1}}
                                                            value={this.state.signUpEmailValue}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'email') }}
                                                            placeholder="Enter Password"
                                                            startAdornment={<InputAdornment position="start"><LockIcon sx={{ width: 15, height: 15 }} /></InputAdornment>}
                                                            endAdornment={
                                                                <InputAdornment position="end" sx={{mr:1}}>
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => this.handleClickShowPassword(this.state.showPassword)}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </Paper>
                                                   

                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Confirm Password
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: "#C9C9C9" }}
                                                    >
                                                        <InputBase
                                                        disabled
                                                            sx={{ ml: 1, flex: 1}}
                                                            value={this.state.signUpEmailValue}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'email') }}
                                                            placeholder="Re-enter Password"
                                                            startAdornment={<InputAdornment position="start"><LockIcon sx={{ width: 15, height: 15 }} /></InputAdornment>}
                                                            endAdornment={
                                                                <InputAdornment position="end" sx={{mr:1}}>
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => this.handleClickShowPassword(this.state.showPassword)}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </Paper>
                                                    

                                                    <Grid container>
                                                        <Grid xs={12} md={12} alignContent="start" sx={{ mt: 2, }}>
                                                            <ReCAPTCHA
                                                                sitekey="6LeF1MQdAAAAAAWGwYsWP7JlbRoAzddgmymvQ6bY"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid xs={1} md={1} >
                                                            <Checkbox size='small' sx={{ p: 0, m: 0 }} />
                                                        </Grid>
                                                        <Grid xs={11} md={11}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, m: 0, p: 0 }} >
                                                                By clicking this, you will agree to our <b> Terms of Use and our Privacy Policy.</b>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>


                                                </> :
                                                <>
                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        First Name
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1}}
                                                            placeholder="Enter Your First Name"
                                                            startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                                        />
                                                    </Paper>

                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Last Name
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1}}
                                                            placeholder="Enter Your Last Name"
                                                            startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                                        />
                                                    </Paper>

                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Mobile Number
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1}}
                                                            placeholder="Enter Your Mobile Number"
                                                            startAdornment={<InputAdornment position="start">
                                                            <Select
                                                            variant='standard'
                                                                value={this.state.selectMobileCode}
                                                                size='small'
                                                                sx={{ ":hover": { outlineColor: 'white', borderColor:'white' }, height: 20, p: 2 }}
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                onChange={() => this.changeCountryCode(this.state.selectMobileCode === 44 ? 94 : 44)}
                                                            >
                                                                <MenuItem value={44}><img src={UK} width={20} height={15}></img> &nbsp; UK +44</MenuItem>
                                                                <MenuItem value={94}><img src={LK} width={20} height={15}></img> &nbsp; SL +94</MenuItem>
                                                            </Select>
                                                            
                                                        </InputAdornment>}
                                                        />
                                                    </Paper>
                                                    
                                                </>
                                            }

                                            <Button fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 2, ":hover":{backgroundColor: "#00AAB3",}, textTransform:'none', fontSize:17 }} onClick={() => this.changeNextPosition(this.state.nextButtonPosition)}>Next</Button>
                                            {this.state.nextButtonPosition != 1 ?
                                                <Button fullWidth variant="outlined" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "white",":hover":{borderColor: "#00AAB3",}, color:'black', textTransform:'none', fontSize:17 }} onClick={() => this.changeBackPosition(this.state.nextButtonPosition)}>Back</Button>
                                                :
                                                null
                                            }
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 4, fontWeight: 'bold' }} align='center'>
                                                Existing User
                                            </Typography>

                                            <Button fullWidth variant="outlined" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "white", color:'black',":hover":{borderColor: "#00AAB3",}, textTransform:'none', fontSize:17 }}>Sign In</Button>

                                            <Typography variant="subtitle1" align='center' sx={{ mt: 1 }}>
                                                <Link href="#" underline="none" sx={{ mt: 2, color:'#0B92E8', fontSize:18 }}>
                                                    Sign In as a Student
                                                </Link>
                                            </Typography>
                                        </> :
                                        <>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 15 }} align='center'>
                                                Sign Up Successful
                                            </Typography>
                                            <Typography align='center'>
                                                <img src={Success} width={100} height={100} style={{ marginTop: 20 }}></img>
                                            </Typography>
                                            <Button href="billing" fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 5, color: "white", ":hover":{backgroundColor: "#00AAB3", color:'white'}, textTransform:'none', fontSize:17 }}>Proceed for payment</Button>

                                        </>
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
export default SignUp;