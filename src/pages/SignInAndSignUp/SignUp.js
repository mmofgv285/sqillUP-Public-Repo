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
import AddStudent from '../../assets/images/add-student.png';
import ToolTipSignUp from '../../assets/images/tooltip-sign-up.svg';
import stripCardImg from '../../assets/images/strip.png';
import visaCardImg from '../../assets/images/visa.png';
import masterCardImg from '../../assets/images/mastercard.png';
import signinPasswordImg from '../../assets/images/signin-password.png';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            nextButtonPosition: 1,
            selectMobileCode: 44,
            signUpEmailValue: '',
            signUpVerifyEmailDisabled: true,
            signUpVerifyValue: '',
            reqOTPCode: '',
            isPasswordSectionDisabled: true,
            signUpPasswordValue: '',
            signUpConfirmPasswordValue: '',
            isCheckedTandC: false,
            isOTPValid: 'pending',
            signUpFullName: '',
            signUpLastName: '',
            signUpMobileNumber: '',
            submitButtonLoading: false,
            validationEmailText: '',
            validationConfPasswordText: '',
            validPasswordAndConf: false,
            selectSubscribeDetails: null,
            currentStep: 1,
            isOpenAddStudentForm: false,

        };
    }

    componentDidMount() {
        let data = localStorage.getItem('selectSubscribePackDetails');
        this.setState({ selectSubscribeDetails: JSON.parse(data) });
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

    openAddStudentForm() {
        this.setState({ isOpenAddStudentForm: true });
    }

    changeSubmitPosition(positionValue, state) {
        let that = this;
        that.setState({ submitButtonLoading: true });
        axios.post("https://api.smartht.co.uk/api/parentauth/signup",
            {
                email: state.signUpEmailValue,
                password: state.signUpPasswordValue,
                full_name: state.signUpFullName,
                phone: state.signUpMobileNumber,
                country_code: state.selectMobileCode
            })
            .then(function (response) {
                if (response.data.success) {
                    let realValue = positionValue + 1;
                    that.setState({ nextButtonPosition: realValue });
                    that.setState({ submitButtonLoading: false });
                    that.setState({ currentStep: realValue });
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
                if (parseInt(value.nativeEvent.data) >= 6) {
                    this.setState({ validationConfPasswordText: '' });
                    this.setState({ signUpPasswordValue: value.target.value });
                } else {
                    this.setState({ validationConfPasswordText: 'The password must be at least 6 characters' });
                    this.setState({ signUpPasswordValue: value.target.value });
                }
                break;
            case 'confirmPassword':
                this.setState({ signUpConfirmPasswordValue: value.target.value });
                break;
            case 'firstName':
                this.setState({ signUpFullName: value.target.value });
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

    handleSignUpConfirmPasswordValues(value, password) {
        this.setState({ signUpConfirmPasswordValue: value.target.value });
        if (value.target.value == password) {
            this.setState({ validationConfPasswordText: '' });
            this.setState({ validPasswordAndConf: true });
        } else {
            this.setState({ validationConfPasswordText: 'Password and Confirm Password are not matching' });
            this.setState({ validPasswordAndConf: false });
        }
    }

    // Send OTP Code for Email
    sendOTPCodeForEmail(email) {
        let that = this;
        axios.post("https://api.smartht.co.uk/api/parentauth/requestOtp", { email: email })
            .then(function (response) {
                console.log(response.data);
                that.setState({ reqOTPCode: response.data.data.otp });
                that.setState({ signUpVerifyEmailDisabled: false });
                that.setState({ validationEmailText: '' });
            })
            .catch(function (error) {
                console.log(error.response);
                that.setState({ validationEmailText: '' });
                switch (error.response.data.status_code) {
                    case 422:
                        that.setState({ validationEmailText: error.response.data.errors.email[0] });
                        break;

                    default:
                        break;
                }
            });
    }

    // Verify OTP code
    verifyOTPCode(typeOTP) {
        let that = this;
        axios.post("https://api.smartht.co.uk/api/parentauth/verifyOtp", { otp: typeOTP })
            .then(function (response) {
                if (response.data.success) {
                    that.setState({ isOTPValid: 'true' });
                    that.setState({ isPasswordSectionDisabled: false });
                } else {
                    that.setState({ isOTPValid: 'false' });
                    that.setState({ isPasswordSectionDisabled: true });
                }
            })
            .catch(function (error) {

                if (error.response.data.success == false) {
                    that.setState({ isOTPValid: 'false' });
                    that.setState({ isPasswordSectionDisabled: true });
                }
            });
    }

    changeTandCCheck(value) {
        if (value.target.checked) {
            this.setState({ isCheckedTandC: true });
        } else {
            this.setState({ isCheckedTandC: false });
        }
    }

    verifyReCaptchaCallback(value) {
        console.log(value);
    }

    changeCurrentPosition(value) {
        this.setState({ nextButtonPosition: value });
        this.setState({ currentStep: value });
    }

    gotoNextViewIsPayment() {
        this.setState({ currentStep: 3 });
        this.setState({ nextButtonPosition: 3 });
    }

    gotoNextViewIsFinish() {
        this.setState({ currentStep: 5 });
        this.setState({ nextButtonPosition: 5 });
    }

    gotoBackViewIsBilling() {
        this.setState({ currentStep: 2 });
        this.setState({ nextButtonPosition: 2 });
    }


    render() {

        return (
            <React.Fragment>
                <Container component="main" maxWidth="xl" sx={{ pt: 1, pb: 1, backgroundColor: '#EBEBEB' }}>
                    <Grid container>
                        <Grid xs={12} md={12} sx={{ p: 5 }}>
                            <Stepper nonLinear activeStep={this.state.currentStep} alternativeLabel>
                                <Step key={0}>
                                    <StepLabel sx={{ '& .MuiSvgIcon-root': { color: '#FFCA3A' } }}>
                                        <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#6D6E70', }}>
                                            Plan
                                        </Typography>
                                    </StepLabel>
                                </Step>

                                <Step key={1}>
                                    {this.state.nextButtonPosition > 1 ?
                                        <StepButton onClick={() => this.changeCurrentPosition(1)} sx={{ '& .MuiSvgIcon-root': { color: '#FFCA3A' } }}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: "#6D6E70", }}>
                                                Personal Info
                                            </Typography>
                                        </StepButton>
                                        :
                                        <StepButton onClick={() => this.changeCurrentPosition(1)}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: "#6D6E70", }}>
                                                Personal Info
                                            </Typography>
                                        </StepButton>
                                    }
                                </Step>

                                <Step key={2}>
                                    {this.state.nextButtonPosition > 2 ?
                                        <StepButton onClick={() => this.changeCurrentPosition(2)} sx={{ '& .MuiSvgIcon-root': { color: '#FFCA3A' } }}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#6D6E70', }}>
                                                Billing Info
                                            </Typography>
                                        </StepButton>
                                        :
                                        <StepButton onClick={() => this.changeCurrentPosition(2)}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#6D6E70', }}>
                                                Billing Info
                                            </Typography>
                                        </StepButton>
                                    }

                                </Step>

                                <Step key={3}>
                                    {this.state.nextButtonPosition > 3 ?
                                        <StepLabel sx={{ '& .MuiSvgIcon-root': { color: '#FFCA3A' } }}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: "#6D6E70", }}>
                                                Payment
                                            </Typography>
                                        </StepLabel>
                                        :
                                        <StepLabel>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: "#6D6E70", }}>
                                                Payment
                                            </Typography>
                                        </StepLabel>
                                    }

                                </Step>

                                <Step key={4}>
                                    {this.state.nextButtonPosition > 4 ?
                                        <StepButton onClick={() => this.changeCurrentPosition(4)} sx={{ '& .MuiSvgIcon-root': { color: '#FFCA3A' } }}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#6D6E70', }}>
                                                Add student
                                            </Typography>
                                        </StepButton>
                                        :
                                        <StepButton onClick={() => this.changeCurrentPosition(4)}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#6D6E70', }}>
                                                Add student
                                            </Typography>
                                        </StepButton>
                                    }
                                </Step>

                                <Step key={5}>
                                    <StepLabel >
                                        <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#6D6E70', }}>
                                            Welcome to sqillup
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>

                        </Grid>
                    </Grid>
                </Container>
                <Container component="main" maxWidth="xl" sx={{ pt: 0, pb: 6, backgroundColor: "#EBEBEB" }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                            {this.state.nextButtonPosition === 1 ?
                                <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '65%', pl: 10, pr: 10 }}>
                                    <CardContent sx={{ mr: 1 }}>

                                        <>

                                            <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2, color: '#00AAB3' }} align='center'>
                                                Sign Up
                                            </Typography>
                                            {this.state.nextButtonPosition === 1 ?
                                                <>
                                                    <Grid container sx={{ p: 2 }}>
                                                        <Grid xs={3} md={3}>
                                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                Full Name <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={8} md={8}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#EBEBEB', mt: 1 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    value={this.state.signUpFullName}
                                                                    onChange={(e) => { this.handleSignUpChangeOfValues(e, 'firstName') }}
                                                                    placeholder="Enter Your Full Name"
                                                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                                                />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 2 }}>
                                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                Mobile Number <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={8} md={8} sx={{ mt: 2 }}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#EBEBEB', mt: 1 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    value={this.state.signUpMobileNumber}
                                                                    onChange={(e) => { this.handleSignUpChangeOfValues(e, 'mobileNumber') }}
                                                                    placeholder="Enter Your Mobile Number"
                                                                    startAdornment={<InputAdornment position="start">
                                                                        <Select
                                                                            variant='standard'
                                                                            value={this.state.selectMobileCode}
                                                                            size='small'
                                                                            sx={{ ":hover": { outlineColor: 'white', borderColor: 'white' }, height: 20, p: 2 }}
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
                                                        </Grid>
                                                        <Grid xs={1} md={1} sx={{ mt: 2 }}>
                                                            <Typography variant="subtitle1" align='left' sx={{ mt: 1 }}>
                                                                <Tooltip arrow title="Give Us a valid mobile number, so that we can Connect with you." placement="right-start">
                                                                    <IconButton><img src={ToolTipSignUp}></img></IconButton>
                                                                </Tooltip>

                                                            </Typography>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 2 }}>
                                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                Email <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={8} md={8} sx={{ mt: 2 }}>
                                                            <Paper
                                                                component="form"
                                                                fullWidth
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#EBEBEB', mt: 1 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    value={this.state.signUpEmailValue}
                                                                    onChange={(e) => { this.handleSignUpChangeOfValues(e, 'email') }}
                                                                    placeholder="Enter Your Email ID"
                                                                    startAdornment={<InputAdornment position="start"><img src={signupEmail}></img></InputAdornment>}
                                                                    endAdornment={
                                                                        <InputAdornment position="end">
                                                                            <Button onClick={() => this.sendOTPCodeForEmail(this.state.signUpEmailValue)} size='small' variant="outlined" sx={{ borderColor: "white", color: '#00AAB3', ":hover": { borderColor: 'white' }, ml: 2, backgroundColor: "white", p: 0, textTransform: 'none' }}>Send OTP</Button>
                                                                        </InputAdornment>
                                                                    }
                                                                />
                                                            </Paper>
                                                            {this.state.validationEmailText != '' ?
                                                                <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 12, mt: 1, mb: 1, color: 'red' }}>
                                                                    {this.state.validationEmailText}
                                                                </Typography>
                                                                :
                                                                null
                                                            }
                                                        </Grid>
                                                        <Grid xs={1} md={1} sx={{ mt: 2 }}>
                                                            <Typography variant="subtitle1" align='left' sx={{ mt: 1 }}>
                                                                <Tooltip arrow title="We will ask each time when you sign in." placement="right-start">
                                                                    <IconButton><img src={ToolTipSignUp}></img></IconButton>
                                                                </Tooltip>

                                                            </Typography>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 2 }}>
                                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 1, mb: 1, fontWeight: 'bold' }}>
                                                                Enter Verification Code <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={8} md={8} sx={{ mt: 2 }}>
                                                            <Paper
                                                                component="form"
                                                                fullWidth
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#EBEBEB', mt: 1, backgroundColor: this.state.signUpVerifyEmailDisabled ? "#EEEEEE" : 'white' }}
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
                                                                                <Button disabled={this.state.signUpVerifyEmailDisabled} onClick={() => this.verifyOTPCode(this.state.signUpVerifyValue)} size='small' variant="outlined" sx={{ borderColor: "white", color: '#00AAB3', ":hover": { borderColor: 'white' }, ml: 2, backgroundColor: this.state.signUpVerifyEmailDisabled ? "#C9C9C9" : "white", p: 0, textTransform: 'none' }}>Verify</Button>
                                                                            }
                                                                            {this.state.isOTPValid == 'true' ? <CheckCircleIcon color="success" /> : null}
                                                                            {this.state.isOTPValid == 'false' ? <CancelIcon color="error" /> : null}
                                                                        </InputAdornment>
                                                                    }
                                                                />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={3} md={3} sx={{ mt: 2 }}>
                                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                Password <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={8} md={8} sx={{ mt: 2 }}>
                                                            <Paper
                                                                component="form"
                                                                fullWidth
                                                                variant='outlined'
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#EBEBEB', mt: 1, backgroundColor: this.state.isPasswordSectionDisabled ? "#EEEEEE" : 'white' }}
                                                            >
                                                                <InputBase
                                                                    type={this.state.showPassword ? 'text' : 'password'}
                                                                    disabled={this.state.isPasswordSectionDisabled}
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    value={this.state.signUpPasswordValue}
                                                                    onChange={(e) => { this.handleSignUpChangeOfValues(e, 'password') }}
                                                                    placeholder="Enter Password"
                                                                    startAdornment={<InputAdornment position="start"><LockIcon sx={{ width: 15, height: 15 }} /></InputAdornment>}
                                                                    endAdornment={
                                                                        <InputAdornment position="end" sx={{ mr: 1 }}>
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
                                                                <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 12, mt: 1, mb: 1, color: 'red' }}>
                                                                    {this.state.validationConfPasswordText}
                                                                </Typography>
                                                                :
                                                                null
                                                            }
                                                        </Grid>
                                                        <Grid xs={1} md={1} sx={{ mt: 2 }}>
                                                            <Typography variant="subtitle1" align='left' sx={{ mt: 1 }}>
                                                                <Tooltip arrow title="Use 8 character with Upperand lower case with no space." placement="right-start">
                                                                    <IconButton><img src={ToolTipSignUp}></img></IconButton>
                                                                </Tooltip>

                                                            </Typography>
                                                        </Grid>


                                                        {/* <Grid container> */}
                                                        <Grid xs={12} md={12} alignContent="start" sx={{ mt: 2, }}>
                                                            <ReCAPTCHA
                                                                sitekey="6LeF1MQdAAAAAAWGwYsWP7JlbRoAzddgmymvQ6bY"
                                                                onChange={(e) => this.verifyReCaptchaCallback(e)}
                                                            />
                                                        </Grid>

                                                        <Grid xs={1} md={1} >
                                                            <Checkbox size='small' sx={{ p: 0, mt: 1 }} checked={this.state.isCheckedTandC} onChange={(e) => this.changeTandCCheck(e)} />
                                                        </Grid>
                                                        <Grid xs={11} md={11}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, p: 0 }} >
                                                                By clicking this, you will agree to our <b> Terms of Use and our Privacy Policy.</b>
                                                            </Typography>
                                                        </Grid>

                                                        <Grid xs={12} md={12}>
                                                            {this.state.signUpFullName != '' && this.state.signUpMobileNumber != '' && this.state.isCheckedTandC == true && this.state.signUpPasswordValue != '' ?
                                                                <LoadingButton loading={this.state.submitButtonLoading} loadingPosition="start" fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 2, ":hover": { backgroundColor: "#00AAB3", }, textTransform: 'none', fontSize: 17 }} onClick={() => this.changeSubmitPosition(2, this.state)}>Sign Up</LoadingButton>
                                                                :
                                                                <LoadingButton disabled fullWidth variant="contained" sx={{ backgroundColor: "#C9C9C9", mt: 2, ":hover": { backgroundColor: "#C9C9C9", }, textTransform: 'none', fontSize: 17 }} onClick={() => this.changeSubmitPosition(2, this.state)}>Sign Up</LoadingButton>
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </> : null
                                            }

                                            <Grid container sx={{ p: 2 }}>
                                                <Grid xs={12} md={12}>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, fontWeight: 'bold' }} align='center'>
                                                        Existing User
                                                    </Typography>

                                                    <Button fullWidth href="/signin" variant="outlined" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "white", color: 'black', ":hover": { borderColor: "#00AAB3", }, textTransform: 'none', fontSize: 17 }}>Sign In</Button>

                                                    <Typography variant="subtitle1" align='center' sx={{ mt: 1 }}>
                                                        <Link href="/signin" underline="none" sx={{ mt: 2, color: '#0B92E8', fontSize: 18 }}>
                                                            Sign In as a Student
                                                        </Link>
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        </>

                                    </CardContent>
                                </Card>
                                :
                                null}

                            {this.state.nextButtonPosition === 2 ?
                                <>
                                    <Grid container>
                                        <Grid xs={8} md={8} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>

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

                                                    <Grid xs={1} md={1}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 3, mb: 1, ml: 5, fontWeight: 'bold' }}>
                                                            <Checkbox size='medium' sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 40, color: '#C9C9C9' } }} checked={this.state.isCheckedTandC} onChange={(e) => this.changeTandCCheck(e)} />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={11} md={11}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 15, mt: 4, ml: 2, fontWeight: 'bold', color: '#424B54' }}>
                                                            Save this address for future payment
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                            </Card>

                                        </Grid>

                                        <Grid xs={4} md={4} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>

                                            <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '100%', }}>

                                                <Grid container sx={{ backgroundColor: '#6D6E70', p: 1 }}>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="h5" sx={{ mt: 1, mb: 1, ml: 1, color: '#FFFFFF' }}>
                                                            Summery
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                                <Grid container sx={{ p: 1 }}>
                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 1, mb: 1, ml: 2, }}>
                                                            Package
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 1, mb: 1, mr: 2, }}>
                                                            Pro
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={12} md={12}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 3, p: 1, ml: 2, mr: 2 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="Enter coupon code"
                                                            />
                                                        </Paper>
                                                    </Grid>

                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" align='center' sx={{ mt: 2, mb: 1, ml: 2, mr: 2, color: '#424B54' }}>
                                                            <Button fullWidth variant="outlined" sx={{ borderColor: "#00AAB34D", mt: 1, color: 'black', ":hover": { borderColor: "#00AAB34D", }, textTransform: 'none', fontSize: 17 }}>Apply coupon</Button>
                                                        </Typography>
                                                        <Divider></Divider>
                                                    </Grid>

                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, ml: 2, }}>
                                                            Sub total
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, mr: 2, }}>
                                                            £ 25.00
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, ml: 2, }}>
                                                            Coupon discounts
                                                        </Typography>
                                                        <Divider></Divider>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, mr: 2, }}>
                                                            £ 00.00
                                                        </Typography>
                                                        <Divider></Divider>
                                                    </Grid>



                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, ml: 2, }}>
                                                            Total
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, mr: 2, }}>
                                                            £ 25.00
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={12} md={12}>
                                                        <Typography sx={{ mt: 2, mb: 1, mr: 2, ml: 2 }}>
                                                            <Button onClick={() => this.gotoNextViewIsPayment()} fullWidth variant="contained" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "#00AAB3", color: 'white', ":hover": { borderColor: "#00AAB3", backgroundColor: '#00AAB3' }, textTransform: 'none', fontSize: 17 }}>Next</Button>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={12} md={12}>
                                                        <Typography sx={{ mt: 2, mb: 1, mr: 2, ml: 2 }}>
                                                            <Button fullWidth variant="outlined" sx={{ borderColor: "#00AAB3", backgroundColor: "white", color: '#4C545D', ":hover": { borderColor: "#00AAB3", backgroundColor: '#white' }, textTransform: 'none', fontSize: 17 }}>Back</Button>
                                                        </Typography>
                                                    </Grid>


                                                </Grid>
                                            </Card>

                                        </Grid>
                                    </Grid>
                                </> :
                                null
                            }

                            {this.state.nextButtonPosition === 3 ?
                                <>
                                    <Grid container>
                                        <Grid xs={8} md={8} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>

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

                                                    <Grid xs={1} md={1}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 3, mb: 1, ml: 5, fontWeight: 'bold' }}>
                                                            <Checkbox size='medium' sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 40, color: '#C9C9C9' }, }} checked={this.state.isCheckedTandC} onChange={(e) => this.changeTandCCheck(e)} />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={11} md={11}>
                                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 15, mt: 4, ml: 2, fontWeight: 'bold', color: '#424B54' }}>
                                                            Save this address for future payment
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                            </Card>

                                        </Grid>

                                        <Grid xs={4} md={4} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>

                                            <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '100%', }}>

                                                <Grid container sx={{ backgroundColor: '#6D6E70', p: 1 }}>
                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="h5" sx={{ mt: 1, mb: 1, ml: 1, color: '#FFFFFF' }}>
                                                            Summery
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                                <Grid container sx={{ p: 1 }}>
                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 1, mb: 1, ml: 2, }}>
                                                            Package
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 1, mb: 1, mr: 2, }}>
                                                            Pro
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={12} md={12}>
                                                        <Paper
                                                            component="form"
                                                            variant='outlined'
                                                            fullWidth
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2', borderWidth: 2, mt: 3, p: 1, ml: 2, mr: 2 }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="Enter coupon code"
                                                            />
                                                        </Paper>
                                                    </Grid>

                                                    <Grid xs={12} md={12}>
                                                        <Typography variant="subtitle1" align='center' sx={{ mt: 2, mb: 1, ml: 2, mr: 2, color: '#424B54' }}>

                                                            <Button fullWidth variant="outlined" sx={{ borderColor: "#00AAB34D", mt: 1, color: 'black', ":hover": { borderColor: "#00AAB34D", }, textTransform: 'none', fontSize: 17, }}>Apply coupon</Button>

                                                        </Typography>
                                                        <Divider></Divider>
                                                    </Grid>

                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, ml: 2, }}>
                                                            Sub total
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, mr: 2, }}>
                                                            £ 25.00
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, ml: 2, }}>
                                                            Coupon discounts
                                                        </Typography>
                                                        <Divider></Divider>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, mr: 2, }}>
                                                            £ 00.00
                                                        </Typography>
                                                        <Divider></Divider>
                                                    </Grid>



                                                    <Grid xs={9} md={9}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, ml: 2, }}>
                                                            Total
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={3} md={3}>
                                                        <Typography variant="h6" sx={{ mt: 2, mb: 1, mr: 2, }}>
                                                            £ 25.00
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={12} md={12}>
                                                        <Typography sx={{ mt: 2, mb: 1, mr: 2, ml: 2 }}>
                                                            <Button onClick={() => this.gotoNextViewIsPayment()} fullWidth variant="contained" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "#00AAB3", color: 'white', ":hover": { borderColor: "#00AAB3", backgroundColor: '#00AAB3' }, textTransform: 'none', fontSize: 17 }}>Confirm payment</Button>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={12} md={12}>
                                                        <Typography sx={{ mt: 2, mb: 1, mr: 2, ml: 2 }}>
                                                            <Button onClick={() => this.gotoBackViewIsBilling()} fullWidth variant="outlined" sx={{ borderColor: "#00AAB3", backgroundColor: "white", color: '#4C545D', ":hover": { borderColor: "#00AAB3", backgroundColor: '#white' }, textTransform: 'none', fontSize: 17 }}>Back</Button>
                                                        </Typography>
                                                    </Grid>


                                                </Grid>
                                            </Card>

                                        </Grid>
                                    </Grid>
                                </> :
                                null
                            }

                            {this.state.nextButtonPosition === 4 ?
                                <>
                                    {!this.state.isOpenAddStudentForm ?
                                        <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '65%', pl: 10, pr: 10 }}>
                                            <CardContent sx={{ mr: 1 }}>

                                                <>

                                                    <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 20, fontWeight: 'bold' }} align='center'>
                                                        <img src={Success} width={80} height={80}></img>
                                                    </Typography>

                                                    <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 5, fontWeight: 'bold', color: '#424B54' }} align='center'>
                                                        Payment Confirm
                                                    </Typography>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, color: '#424B54' }} align='center'>
                                                        John You have Successfully paid .
                                                    </Typography>


                                                    <Grid container sx={{ p: 2 }}>
                                                        <Grid xs={12} md={12}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 20, mt: 10, fontWeight: 'bold' }} align='center'>
                                                                <Button variant='outlined' sx={{ color: 'black', backgroundColor: "white", borderColor: 'white', ":hover": { backgroundColor: "white", borderColor: 'white', }, textTransform: 'none', fontWeight: 'bold', fontSize: 18 }} onClick={() => this.openAddStudentForm()}><img src={AddStudent} width={20} height={20}></img> &nbsp; Add Student</Button>
                                                                {/* <img src={AddStudent} width={20} height={20}></img> Add Student */}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                </>

                                            </CardContent>
                                        </Card>
                                        :
                                        <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '80%', pl: 5, pr: 5 }}>
                                            <CardContent sx={{ mr: 1 }}>

                                                <>

                                                    <Typography variant="subtitle1" sx={{ fontSize: 18, mt: 3, mb: 5, fontWeight: 'bold', color: 'black' }} align='center'>
                                                        Add Student
                                                    </Typography>

                                                    <Grid container sx={{ mb: 3 }}>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                Full Name <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mr: 3, borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="Enter your student fullname"
                                                                />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                School Name <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="Enter your school name"
                                                                />
                                                            </Paper>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container sx={{ mb: 3 }}>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                Student Username <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mr: 3, borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="Enter your student username"
                                                                />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                Exam Board <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="Exam board (eg. AQA)"
                                                                />
                                                            </Paper>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container sx={{ mb: 3 }}>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                Password <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mr: 3, borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="Enter Password"
                                                                />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                Key stage <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="Grade (eg. KS-3)"
                                                                />
                                                            </Paper>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container sx={{ mb: 3 }}>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                Date of Birth <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mr: 3, borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="DD/MM/YYYY"
                                                                />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid xs={2} md={2}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                Class <span style={{ color: 'red', }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} md={4}>
                                                            <Paper
                                                                component="form"
                                                                variant='outlined'
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#A2A2A2', mt: 2 }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="Grade (eg. 7)"
                                                                />
                                                            </Paper>
                                                        </Grid>
                                                    </Grid>



                                                    <Grid container sx={{ p: 2 }}>
                                                        <Grid xs={12} md={12}>
                                                            <Typography sx={{ mt: 5, mb: 1, mr: 2, ml: 2 }}>
                                                                <Button onClick={() => this.gotoNextViewIsFinish()} fullWidth variant="contained" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "#00AAB3", color: 'white', ":hover": { borderColor: "#00AAB3", backgroundColor: '#00AAB3' }, textTransform: 'none', fontSize: 17 }}>Submit</Button>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                </>

                                            </CardContent>
                                        </Card>}
                                </>
                                :
                                null
                            }

                            {this.state.nextButtonPosition === 5 ?

                                <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#FFFFFF", width: '40%', pl: 4, pr: 4 }}>
                                    <CardContent sx={{ mr: 1 }}>

                                        <>

                                            <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 20, fontWeight: 'bold' }} align='center'>
                                                <img src={Success} width={100} height={100}></img>
                                            </Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: 22, mt: 3, color: 'black' }} align='center'>
                                                Success
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: 15, mt: 1, color: '#424B54' }} align='center'>
                                                Woo hoo! John. You have Successfully <br/> added student.
                                            </Typography>


                                            <Grid container sx={{ p: 2 }}>
                                                <Grid xs={12} md={12}>
                                                    <Typography sx={{ mt: 5, mb: 1, mr: 2, ml: 2 }}>
                                                        <Button href="/my-profile" fullWidth variant="contained" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "#00AAB3", color: 'white', ":hover": { borderColor: "#00AAB3", backgroundColor: '#00AAB3', color:'white' }, textTransform: 'none', fontSize: 17 }}>Go to profile</Button>
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        </>

                                    </CardContent>
                                </Card>

                                : null}

                        </Grid>
                    </Grid>

                </Container>
            </React.Fragment>
        )
    }
}
export default SignUp;