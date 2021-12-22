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
import LockIcon from '@mui/icons-material/Lock';
import signinScreen from '../../assets/images/signIn-screen.jpg';

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
                            <Typography variant="p" color="inherit">
                                Lorem Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Erode, Integer eget orcil veligt. sed diam nonumy Erode, Integer eget orcil veligt.
                            </Typography>
                            <img src={signinScreen} width={600} height={600}></img>
                        </Grid>
                        <Grid xs={6} md={4}>
                            <Card elevation={10} sx={{ minHeight: 600, backgroundColor: "#EBEBEB" }}>
                                <CardContent>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }} align='center'>
                                        Welcome To Family
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: 14 }} align='center'>
                                        A community of over hundreds of students keep ability to learn.
                                    </Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2, color: '#00AAB3' }} align='center'>
                                        Sign In as a parent
                                    </Typography>

                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb:1, fontWeight: 'bold' }}>
                                        Email ID or Mobile Number
                                    </Typography>
                                    <Grid container>
                                        <Grid xs={1} md={1}>
                                            <Avatar sx={{ backgroundColor: "#00AAB3", width: 30, height: 30 }}>
                                                <AccountCircle sx={{ width: 30, height: 30 }} />
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
                                                sx={{ ml: 1, backgroundColor: "white" }}
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
                                        <Grid xs={6} md={6}>
                                            <FormControlLabel
                                                value="end"
                                                control={<Checkbox size='small' />}
                                                label="Remember Me"
                                                labelPlacement="end"
                                                sx={{ fontSize: 12 }}
                                            />
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 1, fontWeight: 'bold' }} align='right'>
                                                Forget Password ?
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Button fullWidth variant="contained" sx={{ backgroundColor: "#00AAB3", mt: 2 }}>Sign In</Button>

                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 4, fontWeight: 'bold' }} align='center'>
                                        New to SqillUP ?
                                    </Typography>

                                    <Button href="signup" fullWidth variant="outlined" sx={{ borderColor: "#00AAB3", mt: 1, backgroundColor: "white" }}>Sign UP</Button>

                                    <Typography variant="subtitle1" align='center' sx={{ mt: 4 }}>
                                        <Link href='#' underline="none" sx={{ mt: 2 }}>
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