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
import { borderColor } from '@mui/lab/node_modules/@mui/system';


class SideBar extends React.Component {

    constructor(props) {
        super(props);
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

            appearSuccessOfAddStudent:false,
        };
    }

    handleSignInChangeOfValues(value, sectionName) {
        
    }

    signInProcess(state) {

    }

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Card elevation={5}>
                        <CardContent>
                        <Typography align='center' variant='h6' sx={{ color: 'black', mt: 2 }}>
                        <img src={Success} width={100} height={100} style={{ marginTop: 20 }}></img>
                        </Typography>
                        <Typography align='center' variant='h6' sx={{ color: 'black', mt: 2 }}>
                        Success
                        </Typography>
                        <Typography align='center' variant='subtitle2' sx={{ color: 'black', }}>
                        Woo hoo! John. You have Successfully added student.
                        </Typography>
                            <LoadingButton fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover":{backgroundColor: "#00AAB3",}, mt: 5, textTransform:'none', fontSize:17 }}>Go to profile</LoadingButton>
                        </CardContent>
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}
export default SideBar;