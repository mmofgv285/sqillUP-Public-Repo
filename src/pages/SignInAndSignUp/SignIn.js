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
import signinScreen from '../../assets/images/signIn-screen.jpg';
import signinEmail from '../../assets/images/signin-email.png';
import signinPassword from '../../assets/images/signin-password.png';
import '../../assets/css/SignInAndSignUp/fontStyleSignIn.css';

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
        };
    }

    changeValue(value) {
        this.setState({ password: value });
    };

    handleClickShowPassword(value) {
        this.setState({ showPassword: !value });
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
                                    component="form"
                                    fullWidth
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Enter Email"
                                            startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                        />
                                    </Paper>
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
                                                Forget Password?
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Button fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover":{backgroundColor: "#00AAB3",}, mt: 2, textTransform:'none', fontSize:17 }}>Sign In</Button>

                                    <Typography variant="subtitle1" className='font-google-600' sx={{ fontSize: 13, mt: 4}} align='center'>
                                        New to SqillUP?
                                    </Typography>

                                    <Button href="signup" fullWidth className='signup-button' variant="outlined" sx={{ color:'black', ":hover":{borderColor: "#00AAB3", color:'black'}, borderColor: "#00AAB3", mt: 1, backgroundColor: "white", textTransform:'none', fontSize:17 }}>Sign Up</Button>

                                    <Typography variant="subtitle1" align='center' sx={{ mt: 4 }}>
                                        <Link href='#' underline="none" sx={{ mt: 2, color:'#0B92E8', fontSize:18 }}>
                                            Sign In as a Student
                                        </Link>
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </Container>
            </React.Fragment>
        )
    }
}
export default SignIn;