import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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

class SignUp extends React.Component {

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
                    <Grid container spacing={4}>
                        <Grid xs={6} md={7}>
                            <Typography variant="p" color="inherit">
                                Lorem Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Erode, Integer eget orcil veligt. sed diam nonumy Erode, Integer eget orcil veligt.
                            </Typography>
                            <img src={signinScreen} width={600} height={600}></img>
                        </Grid>
                        <Grid xs={6} md={5}>
                            <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#EBEBEB" }}>
                                <CardContent sx={{mr:1}}>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }} align='center'>
                                        Personal Info
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14 }} align='center'>
                                        Sign Up to get Started!
                                    </Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2, color: '#00AAB3' }} align='center'>
                                        Sign Up
                                    </Typography>

                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb:1, fontWeight: 'bold' }}>
                                        Email ID
                                    </Typography>
                                    <Grid container>
                                        <Grid xs={1} md={1}>
                                            <Avatar sx={{ backgroundColor: "#00AAB3", width: 30, height: 30 }}>
                                                <EmailIcon sx={{ width: 25, height: 25 }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid xs={9} md={9}>
                                            <TextField fullWidth size="small" sx={{ ml: 1, backgroundColor: "white" }} />
                                        </Grid>
                                        <Grid xs={2} md={2}>
                                        <Button size='small' fullWidth variant="outlined" sx={{ borderColor: "#00AAB3", ml:2, backgroundColor: "white", p:0, }}>Send OTP</Button>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, mb:1, fontWeight: 'bold' }}>
                                        Enter Verification Code
                                    </Typography>
                                    <Grid container>
                                        <Grid xs={1} md={1}>
                                            <Avatar sx={{ backgroundColor: "#00AAB3", width: 30, height: 30 }}>
                                                <MarkEmailReadIcon sx={{ width: 25, height: 25 }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid xs={11} md={11}>
                                            <TextField fullWidth size="small" sx={{ ml: 1, backgroundColor: "white" }} />
                                        </Grid>
                                    </Grid>

                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb:1, fontWeight: 'bold' }}>
                                        Password
                                    </Typography>
                                    <Grid container>
                                        <Grid xs={1} md={1}>
                                            <Avatar sx={{ backgroundColor: "#00AAB3", width: 30, height: 30 }}>
                                                <LockIcon sx={{ width: 25, height: 25 }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid xs={11} md={11}>
                                            <OutlinedInput
                                            disabled
                                                sx={{ ml: 1, backgroundColor: "#C9C9C9"  }}
                                                fullWidth
                                                size='small'
                                                id="outlined-adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
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
                                        </Grid>
                                    </Grid>

                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb:1, fontWeight: 'bold' }}>
                                        Confirm Password
                                    </Typography>
                                    <Grid container>
                                        <Grid xs={1} md={1}>
                                            <Avatar sx={{ backgroundColor: "#00AAB3", width: 30, height: 30 }}>
                                                <LockIcon sx={{ width: 25, height: 25 }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid xs={11} md={11}>
                                            <OutlinedInput
                                            disabled
                                                sx={{ ml: 1, backgroundColor: "#C9C9C9" }}
                                                fullWidth
                                                size='small'
                                                id="outlined-adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
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
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid xs={1} md={1} >
                                        <Checkbox size='small' sx={{p:0, m:0}} />
                                        </Grid>
                                        <Grid xs={11} md={11}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, m:0, p:0, fontWeight: 'bold' }} >
                                            By clicking this, you will agree to our Terms of Use and our Privacy Policy.
                                            </Typography>
                                            <ReCAPTCHA
                                                sitekey="6LeBtrYdAAAAANrifnVZns2S81KfpCB0uv6pRQsP"
                                            />,
                                        </Grid>
                                    </Grid>

                                    <Button fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 2 }}>Sign In</Button>

                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 4, fontWeight: 'bold' }} align='center'>
                                        New to SqillUP ?
                                    </Typography>

                                    <Button fullWidth variant="outlined" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "white" }}>Sign UP</Button>

                                    <Typography variant="subtitle1" align='center' sx={{ mt: 4 }}>
                                        <Link href="#" underline="none" sx={{ mt: 2 }}>
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
export default SignUp;