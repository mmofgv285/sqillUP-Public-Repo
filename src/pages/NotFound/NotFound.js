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

class NotFound extends React.Component {

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
                    window.location.href = 'billing';
                    that.setState({ signInLoading: false });
                    that.setState({ isNotValid: false }); 
                    that.setState({ validationEmailErrors: '' });
                    that.setState({ validationPasswordErrors: ''});
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
        this.setState({afterSendForgetPasswordLink: !value});
    }

    render() {
        return (
            <React.Fragment>
                <Container component="main" sx={{ pt: 8, pb: 6 }}>
                    <Grid container spacing={2}>
                        <Grid xs={6} md={8}>
                            <Typography variant="p" align='left' sx={{ width:'90%'}} className='font-google-p'>
                                404 Not Found.
                            </Typography>
                            
                        </Grid>
                    </Grid>

                </Container>
            </React.Fragment>
        )
    }
}
export default NotFound;