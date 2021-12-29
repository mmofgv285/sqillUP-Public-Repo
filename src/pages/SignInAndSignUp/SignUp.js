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
import signinScreen from '../../assets/images/signIn-screen.png';
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
import LoadingButton from '@mui/lab/LoadingButton';
import '../../assets/css/SignInAndSignUp/fontStyleSignUp.css';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            nextButtonPosition: 1,
            selectMobileCode: 44,
            signUpEmailValue: '',
            signUpVerifyEmailDisabled:true,
            signUpVerifyValue:'',
            reqOTPCode:'',
            isPasswordSectionDisabled:true,
            signUpPasswordValue: '',
            signUpConfirmPasswordValue: '',
            isCheckedTandC: false,
            isOTPValid:'pending',
            signUpFirstName:'',
            signUpLastName:'',
            signUpMobileNumber:'',
            submitButtonLoading:false,
            validationEmailText: '',
            validationConfPasswordText: '',

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

    changeSubmitPosition(positionValue, state) {
        let that = this;
        that.setState({ submitButtonLoading: true });
        axios.post("https://api.smartht.co.uk/api/parentauth/signup", 
        { email: state.signUpEmailValue,
            password: state.signUpPasswordValue,
            first_name: state.signUpFirstName,
            last_name: state.signUpLastName,
            phone: state.signUpMobileNumber,
            conf_password: state.signUpConfirmPasswordValue,
            country_code: state.selectMobileCode
        })
            .then(function (response) {
                if (response.data.success) {
                    let realValue = positionValue + 1;
                    that.setState({ nextButtonPosition: realValue });
                    that.setState({ submitButtonLoading: false });
                }
                that.setState({ submitButtonLoading: false });
                console.log(response.data);
            })
            .catch(function (error) {
                that.setState({ submitButtonLoading: false });
                console.log(error);
            });
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
            case 'otp':
                this.setState({ signUpVerifyValue: value.target.value });
                break;
            case 'password':
                this.setState({ signUpPasswordValue: value.target.value });
                break;
            case 'confirmPassword':
                this.setState({ signUpConfirmPasswordValue: value.target.value });
                break;
            case 'firstName':
                this.setState({ signUpFirstName: value.target.value });
                break;
            case 'lastName':
                this.setState({ signUpLastName: value.target.value });
                break;
            case 'mobileNumber':
                this.setState({ signUpMobileNumber: value.target.value });
                break;
    

            default:
                break;
        }

    }

    handleSignUpConfirmPasswordValues(value, password){
        this.setState({ signUpConfirmPasswordValue: value.target.value });
        if (value.target.value == password) {
            this.setState({ validationConfPasswordText: '' });
        }else{
            this.setState({ validationConfPasswordText: 'Password and Confirm Password are not matching' });
        }
    }

    // Send OTP Code for Email
    sendOTPCodeForEmail(email) {
        let that = this;
        axios.post("https://api.smartht.co.uk/api/parentauth/requestOtp", { email: email })
            .then(function (response) {
                console.log(response.data);
                that.setState({reqOTPCode : response.data.data.otp});
                that.setState({signUpVerifyEmailDisabled : false});
                that.setState({ validationEmailText: ''});
            })
            .catch(function (error) {
                console.log(error.response);
                that.setState({ validationEmailText: ''});
                switch (error.response.data.status_code) {
                    case 422:
                        that.setState({ validationEmailText: error.response.data.errors.email[0]});
                        break;
                
                    default:
                        break;
                }
            });
    }

    // Verify OTP code
    verifyOTPCode(typeOTP){
        let that = this;
        axios.post("https://api.smartht.co.uk/api/parentauth/verifyOtp", { otp: typeOTP })
            .then(function (response) {
                if(response.data.success){
                    that.setState({isOTPValid: 'true'});
                    that.setState({isPasswordSectionDisabled: false});
                }else{
                    that.setState({isOTPValid: 'false'});
                    that.setState({isPasswordSectionDisabled: true});
                }
            })
            .catch(function (error) {
                
                if(error.response.data.success == false){
                    that.setState({isOTPValid: 'false'});
                    that.setState({isPasswordSectionDisabled: true});
                }
            });
    }

    changeTandCCheck(value){
        if (value.target.checked) {
            this.setState({isCheckedTandC: true});
        }else{
            this.setState({isCheckedTandC: false});
        }
    }

    verifyReCaptchaCallback(value) {
        console.log(value);
    }
    

    render() {
        
        return (
            <React.Fragment>
                <Container component="main" sx={{ pt: 8, pb: 6 }}>
                    <Grid container spacing={2}>
                        <Grid xs={6} md={7}>
                            <Grid container sx={{ p: 1 }}>
                                <Grid xs={12} md={12}>
                                    <Typography variant="p" className='font-google-p' align='justify' sx={{ width: '90%' }}>
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
                                                                    <Button onClick={() => this.sendOTPCodeForEmail(this.state.signUpEmailValue)} size='small' variant="outlined" sx={{ borderColor: "white", color:'#00AAB3', ":hover":{borderColor:'white'}, ml: 2, backgroundColor: "white", p: 0, textTransform:'none' }}>Send OTP</Button>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </Paper>
                                                    {this.state.validationEmailText != '' ?
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 12, mt: 1, mb: 1, color:'red' }}>
                                                        {this.state.validationEmailText}
                                                        </Typography>
                                                        :
                                                        null
                                                    }

                                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 1, mb: 1, fontWeight: 'bold' }}>
                                                        Enter Verification Code
                                                    </Typography>
                                                    <Paper
                                                        component="form"
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: this.state.signUpVerifyEmailDisabled ? "#C9C9C9" : 'white' }}
                                                    >
                                                        <InputBase
                                                        disabled={this.state.signUpVerifyEmailDisabled}
                                                            sx={{ ml: 1, flex: 1 }}
                                                            value={this.state.signUpVerifyValue}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'otp') }}
                                                            placeholder="Enter OTP"
                                                            startAdornment={<InputAdornment position="start"><img src={signupEmail}></img></InputAdornment>}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    {this.state.signUpVerifyEmailDisabled ? 
                                                                    null
                                                                    :
                                                                    <Button disabled={this.state.signUpVerifyEmailDisabled} onClick={() => this.verifyOTPCode(this.state.signUpVerifyValue)} size='small' variant="outlined" sx={{ borderColor: "white", color:'#00AAB3', ":hover":{borderColor:'white'}, ml: 2, backgroundColor: this.state.signUpVerifyEmailDisabled ? "#C9C9C9" :"white", p: 0, textTransform:'none' }}>Verify</Button>
                                                                    }
                                                                    {this.state.isOTPValid == 'true' ? <CheckCircleIcon color="success" /> : null }
                                                                    {this.state.isOTPValid == 'false' ? <CancelIcon color="error" /> : null }
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
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: this.state.isPasswordSectionDisabled ? "#C9C9C9" : 'white' }}
                                                    >
                                                        <InputBase
                                                        type={this.state.showPassword ? 'text' : 'password'}
                                                        disabled={this.state.isPasswordSectionDisabled}
                                                            sx={{ ml: 1, flex: 1}}
                                                            value={this.state.signUpPasswordValue}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'password') }}
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
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: this.state.isPasswordSectionDisabled ? "#C9C9C9" : 'white' }}
                                                    >
                                                        <InputBase
                                                        type={this.state.showPassword ? 'text' : 'password'}
                                                        disabled={this.state.isPasswordSectionDisabled}
                                                            sx={{ ml: 1, flex: 1}}
                                                            placeholder="Re-enter Password"
                                                            value={this.state.signUpConfirmPasswordValue}
                                                            onChange={(e) => { this.handleSignUpConfirmPasswordValues(e, this.state.signUpPasswordValue) }}
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
                                                    {this.state.validationConfPasswordText != '' ?
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 12, mt: 1, mb: 1, color:'red' }}>
                                                        {this.state.validationConfPasswordText}
                                                        </Typography>
                                                        :
                                                        null
                                                    }

                                                    

                                                    <Grid container>
                                                        <Grid xs={12} md={12} alignContent="start" sx={{ mt: 2, }}>
                                                            <ReCAPTCHA
                                                                sitekey="6LeF1MQdAAAAAAWGwYsWP7JlbRoAzddgmymvQ6bY"
                                                                onChange={(e) => this.verifyReCaptchaCallback(e)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid xs={1} md={1} >
                                                            <Checkbox size='small' sx={{ p: 0, m: 0 }} checked={this.state.isCheckedTandC} onChange={(e) => this.changeTandCCheck(e)}/>
                                                        </Grid>
                                                        <Grid xs={11} md={11}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, m: 0, p: 0 }} >
                                                                By clicking this, you will agree to our <b> Terms of Use and our Privacy Policy.</b>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    { this.state.validationConfPasswordText == '' && this.state.isCheckedTandC == true && this.state.nextButtonPosition == 1 ?
                                                <Button fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 2, ":hover":{backgroundColor: "#00AAB3",}, textTransform:'none', fontSize:17 }} onClick={() => this.changeNextPosition(1)}>Next</Button>
                                                :
                                                <Button disabled fullWidth variant="contained" sx={{ backgroundColor: "#C9C9C9", mt: 2, ":hover":{backgroundColor: "#C9C9C9",}, textTransform:'none', fontSize:17 }} onClick={() => this.changeNextPosition(1)}>Next</Button>
                                                }


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
                                                            value={this.state.signUpFirstName}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'firstName') }}
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
                                                            value={this.state.signUpLastName}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'lastName') }}
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
                                                            value={this.state.signUpMobileNumber}
                                                            onChange={(e) => { this.handleSignUpChangeOfValues(e, 'mobileNumber') }}
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
                                                    
                                                    {this.state.signUpFirstName != '' && this.state.signUpLastName != '' && this.state.signUpMobileNumber != '' && this.state.nextButtonPosition == 2 ?
                                                <LoadingButton loading={this.state.submitButtonLoading} loadingPosition="start" fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 2, ":hover":{backgroundColor: "#00AAB3",}, textTransform:'none', fontSize:17 }} onClick={() => this.changeSubmitPosition(2, this.state)}>Submit</LoadingButton>
                                                :
                                                <LoadingButton  disabled fullWidth variant="contained" sx={{ backgroundColor: "#C9C9C9", mt: 2, ":hover":{backgroundColor: "#C9C9C9",}, textTransform:'none', fontSize:17 }} onClick={() => this.changeSubmitPosition(2, this.state)}>Submit</LoadingButton>
                                                }
                                                    
                                                </>
                                            }
                                            
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