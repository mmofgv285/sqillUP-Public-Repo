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


class AddStudent extends React.Component {

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
                    {this.state.appearSuccessOfAddStudent == false ?
                    <>
                    <Card elevation={5}>
                        <Typography align='center' variant='h6' sx={{ color: 'black', mt: 2 }}>
                            Add Student
                        </Typography>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                Full Name
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Enter your student fullname"
                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                Student Username
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Enter your student username"
                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                Password
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    type={'password'}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Enter Password"
                                    startAdornment={<InputAdornment position="start"><img src={signinPassword}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                Confirm Password
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    type={'password'}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Re-enter Password"
                                    startAdornment={<InputAdornment position="start"><img src={signinPassword}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                            Date of Birth
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="DD/MM/YYYY"
                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                            School Name
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Enter your school name"
                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                            Exam Board
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Exam Board (eg. AQA)"
                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                            Key Stage
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Grade (eg. KS - 3)"
                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                />

                            </Paper>

                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                            Class
                            </Typography>
                            <Paper
                                fullWidth
                                variant='outlined'
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Grade (eg. 7)"
                                    startAdornment={<InputAdornment position="start"><img src={signinEmail}></img></InputAdornment>}
                                />

                            </Paper>

                            <LoadingButton fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover":{backgroundColor: "#00AAB3",}, mt: 5, textTransform:'none', fontSize:17 }}>Submit</LoadingButton>
                        </CardContent>
                    </Card>
                    </>
                    :
                    <>
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
                    </>
    }
                </Container>
            </React.Fragment>
        )
    }
}
export default AddStudent;