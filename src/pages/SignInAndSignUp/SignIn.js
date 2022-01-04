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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            email:'',
            signInLoading:false,
            appearForgetPassword: false,
            forgetPasswordEmail: '',
            afterSendForgetPasswordLink: false,
            isNotValid: false,
            validationEmailErrors: '',
            validationPasswordErrors: '',
            validationCommonErrors: '',
            errorStatusCode:'',
        };
    }

    handleSignInChangeOfValues(value, sectionName){
        switch (sectionName) {
            case 'email':
                this.setState({ email: value.target.value });
                break;
            case 'password':
                this.setState({ password: value.target.value });
                break;
            case 'forgetPasswordEmail':
                this.setState({ forgetPasswordEmail: value.target.value });
                break;
            default:
                break;
        }
    }

    signInProcess(state){
        let that = this;
        that.setState({ signInLoading: true });
        axios.post("https://api.smartht.co.uk/api/parentauth/login", 
        { email: state.email,
            password: state.password
        })
            .then(function (response) {
                if (response.data.success) {
                    that.setState({ signInLoading: false });
                    that.setState({ isNotValid: false }); 
                    that.setState({ validationEmailErrors: '' });
                    that.setState({ validationPasswordErrors: ''});
                    localStorage.setItem('userDetails', response.data);
                    console.log("RESPONCE",response.data);
                    window.location.href = 'billing';
                }
                
                that.setState({ signInLoading: false });
                console.log("RESPONCE",response.data);
            })
            .catch(function (error) {
                that.setState({ signInLoading: false });
                that.setState({ validationEmailErrors: ''});
                that.setState({ validationPasswordErrors: ''});
                that.setState({ validationCommonErrors: ''});
                that.setState({ isNotValid: true });
                switch (error.response.data.status_code) {
                    case 403:
                        that.setState({ validationCommonErrors: error.response.data.message});
                        break;
                    case 429:
                        that.setState({ validationCommonErrors: error.response.data.errors.email[0]});
                        break;
                    case 422:
                        that.setState({ validationEmailErrors: error.response.data.errors.email[0]});
                        that.setState({ validationPasswordErrors: error.response.data.errors.password[0]});
                        break;
                
                    default:
                        break;
                }
                console.log("ERROR",error.response);
            });
    }

    handleClickShowPassword(value) {
        this.setState({ showPassword: !value });
    }

    appearForgetPassword(value){
        this.setState({appearForgetPassword: !value});
    }

    sendForgetPasswordLink(value){
        let that = this;
        that.setState({ signInLoading: true });
        axios.post("https://api.smartht.co.uk/api/parentauth/recovery", 
        { email: value.forgetPasswordEmail,
            redirect_url: 'https://test.smartht.co.uk'
        })
            .then(function (response) {
                that.setState({afterSendForgetPasswordLink: !value.afterSendForgetPasswordLink});
            })
            .catch(function (error) {
                that.setState({afterSendForgetPasswordLink: !value.afterSendForgetPasswordLink});
            });
        
    }

    render() {
        return (
            <React.Fragment>
                <Container component="main" sx={{ pt: 8, pb: 6 }}>
                    <Grid container spacing={2}>
                        <Grid xs={6} md={8}>
                            <Grid container sx={{p:1}}>
                                <Grid xs={12} md={12}>
                                    <Typography variant="p" align='left' sx={{ width:'90%'}} className='font-google-p'>
                                        Lorem Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Erode, Integer eget orcil veligt. sed diam nonumy Erode, Integer eget orcil veligt.
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12}>
                                    <img src={signinScreen} width='98%' height={600}></img>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid xs={6} md={4}>
                            <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#EBEBEB" }}>
                                {this.state.appearForgetPassword == false ?
                                <>
                                <CardContent>
                                    <Typography variant='h6' className='font-google-heading6' align='center'>
                                        Welcome To Family
                                    </Typography>
                                    <Typography variant="subtitle1" className='font-google-subtitle' sx={{mt:2}} align='center'>
                                        A community of over hundreds of students keep ability to learn.
                                    </Typography>
                                    <Typography variant='h6' className='font-google-600' sx={{ fontWeight: 'bold', mt: 2, color:"#00AAB3" }} align='center'>
                                        Sign In as a parent
                                    </Typography>

                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1 }}>
                                        Email ID
                                    </Typography>
                                    <Paper
                                    fullWidth
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1  }}
                                            value={this.state.email}
                                            onChange={(e) => {this.handleSignInChangeOfValues(e, 'email')}}
                                            placeholder="Enter Email"
                                            startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                        />
                                        
                                    </Paper>
                                    {this.state.validationEmailErrors != '' ?
                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 12, mt: 1, mb: 1, color:'red' }}>
                                           {this.state.validationEmailErrors}
                                        </Typography>
                                        :
                                        null
                                        }
                                    {/* <OutlinedInput
                                        fullWidth
                                        className='input-white'
                                        placeholder='Enter Email'
                                        sx={{ backgroundColor: "white" }}
                                        size='small'
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                    /> */}


                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1, }}>
                                        Password
                                    </Typography>
                                    <Paper
                                    component="form"
                                    fullWidth
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                    >
                                        
                                        <InputBase
                                        type={this.state.showPassword ? 'text' : 'password'}
                                            sx={{ ml: 1, flex: 1 }}
                                            value={this.state.password}
                                            onChange={(e) => {this.handleSignInChangeOfValues(e, 'password')}}
                                            placeholder="Enter Password"
                                            startAdornment={<InputAdornment position="start"><img src={signinPassword}></img></InputAdornment>}
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
                                    {this.state.validationPasswordErrors != '' ?
                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 12, mt: 1, mb: 1, color:'red' }}>
                                           {this.state.validationPasswordErrors}
                                        </Typography>
                                        :
                                        null
                                        }

                                        {this.state.validationCommonErrors != '' ?
                                        <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 12, mt: 1, mb: 1, color:'red' }}>
                                           {this.state.validationCommonErrors}
                                        </Typography>
                                        :
                                        null
                                        }

                                    <Grid container>
                                        <Grid xs={6} md={6}>
                                            <FormControlLabel
                                                value="end"
                                                control={<Checkbox size='small' />}
                                                label="Remember Me"
                                                labelPlacement="end"
                                                sx={{ fontSize: 11, color:'#999999' }}
                                            />
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 1, fontWeight: 'bold' }} align='right'>
                                                <Link onClick={()=>this.appearForgetPassword(this.state.appearForgetPassword)} underline="none" sx={{ mt: 2, color:'black', ":hover":{color:'black'}, cursor:'pointer' }}>
                                                    Forget Password?
                                                </Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <LoadingButton loading={this.state.signInLoading} onClick={()=>this.signInProcess(this.state)} fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover":{backgroundColor: "#00AAB3",}, mt: 2, textTransform:'none', fontSize:17 }}>Sign In</LoadingButton>

                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 4}} align='center'>
                                        New to SqillUP?
                                    </Typography>

                                    <Button href="/" fullWidth className='signup-button' variant="outlined" sx={{ color:'black', ":hover":{borderColor: "#00AAB3", color:'black'}, borderColor: "#00AAB3", mt: 1, backgroundColor: "white", textTransform:'none', fontSize:17 }}>Sign Up</Button>

                                    <Typography variant="subtitle1" align='center' sx={{ mt: 4 }}>
                                        <Link href='#' underline="none" sx={{ mt: 2, color:'#0B92E8', fontSize:18 }}>
                                            Sign In as a Student
                                        </Link>
                                    </Typography>

                                </CardContent>
                                </>
                                :
                                <>
                                <CardContent>
                                    { this.state.afterSendForgetPasswordLink == false ?
                                    <>
                                    <Typography variant='h6' className='font-google-heading6' align='center'>
                                    Forget Password
                                    </Typography>
                                    <Typography variant="subtitle1" className='font-google-subtitle' sx={{mt:2}} align='center'>
                                    Enter your registered email to get the link.
                                    </Typography>
                                    
                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 2, mb: 1 }}>
                                        Email ID
                                    </Typography>
                                    <Paper
                                    fullWidth
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            value={this.state.forgetPasswordEmail}
                                            onChange={(e) => {this.handleSignInChangeOfValues(e, 'forgetPasswordEmail')}}
                                            placeholder="Enter Your Email ID"
                                            startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                        />
                                    </Paper>

                                    <LoadingButton onClick={()=>this.sendForgetPasswordLink(this.state)} fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover":{backgroundColor: "#00AAB3",}, mt: 2, textTransform:'none', fontSize:17 }}>Send Link</LoadingButton>

                                    <Button onClick={() => this.appearForgetPassword(this.state.appearForgetPassword)} fullWidth className='signup-button' variant="outlined" sx={{ color:'black', ":hover":{borderColor: "#00AAB3", color:'black'}, borderColor: "#00AAB3", mt: 1, backgroundColor: "white", textTransform:'none', fontSize:17 }}>Back</Button>
                                    </>
                                    :
                                    <>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 15 }} align='center'>
                                            Forget Password
                                            </Typography>
                                            <Typography align='center'>
                                                <img src={Success} width={100} height={100} style={{ marginTop: 20 }}></img>
                                            </Typography>
                                            <Typography variant='subtitle2' sx={{ fontSize:14, mt: 5, color:'#666666' }} align='center'>
                                            A link to reset your password has been sent to your registered email Id.
                                            </Typography>
                                            {/* <Button href="billing" fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 5, color: "white", ":hover":{backgroundColor: "#00AAB3", color:'white'}, textTransform:'none', fontSize:17 }}>Proceed for payment</Button> */}

                                    </>
                                    }
                                </CardContent>
                                </>
                                }
                            </Card>
                        </Grid>
                    </Grid>

                </Container>
            </React.Fragment>
        )
    }
}
export default SignIn;