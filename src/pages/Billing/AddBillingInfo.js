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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
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
import '../../assets/css/Billing/fontStyleAddBilling.css';

class AddBillingInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
        };
    }

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>

                    <Typography variant='subtitle1' className='font-google-600' sx={{ mt: 1, color: '#00AAB3', fontSize: 17 }}>
                        Add Billing Information
                    </Typography>

                    <Card sx={{ maxWidth: '100%' }}>
                        <CardContent>
                            <Grid container>
                                <Grid xs={9} md={9} sx={{p:5}}>
                                <Stepper activeStep={0} alternativeLabel>
                                        <Step key={0}>
                                        <StepLabel sx={{color:'#00AAB3'}}>Billing Info</StepLabel>
                                        </Step>

                                        <Step key={1}>
                                        <StepLabel >Payment</StepLabel>
                                        </Step>

                                        <Step key={2}>
                                        <StepLabel >Successfully paid</StepLabel>
                                        </Step>
                                </Stepper>
                                </Grid>
                                <Grid xs={3} md={3}>
                                Sample new
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}
export default AddBillingInfo;