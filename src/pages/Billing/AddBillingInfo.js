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
import LoadingButton from '@mui/lab/LoadingButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Success from '../../assets/images/success.png';
import AddStudent from '../../assets/images/add-student.png';

class AddBillingInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            currentStep: 0,
        };
    }
    
    componentDidMount() {
        let data = localStorage.getItem('userDetails');
        if(data == 'null' || data == null){
            window.location.href = "signin";
        }else{
            this.setState({userDetails: data});
        }

        
      }

    changeNextStep(value) {
        let currentStepValue = value + 1;
        this.setState({ currentStep: currentStepValue });
    }

    changeBackStep(value) {
        let currentStepValue = value - 1;
        this.setState({ currentStep: currentStepValue });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.currentStep < 2 ?
                    <>
                        <Container maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>

                            <Typography variant='subtitle1' className='font-google-600' sx={{ mt: 1, color: '#00AAB3', fontSize: 17 }}>
                                Add Billing Information
                            </Typography>

                            <Card elevation={8} sx={{ maxWidth: '100%' }}>
                                <CardContent>
                                    <Grid container>
                                        <Grid xs={9} md={9} sx={{ p: 5 }}>
                                            <Stepper activeStep={this.state.currentStep} alternativeLabel>
                                                <Step key={0}>
                                                    <StepLabel >
                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#00AAB3', }}>
                                                    Billing Info
                                                    </Typography>
                                                        </StepLabel>
                                                </Step>

                                                <Step key={1}>
                                                    <StepLabel>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: this.state.currentStep > 0 ? '#00AAB3' : "#C9C9C9", }}>
                                                    Payment
                                                    </Typography>
                                                        </StepLabel>
                                                </Step>

                                                <Step key={2}>
                                                    <StepLabel >
                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold', color: '#C9C9C9', }}>
                                                    Successfully paid
                                                    </Typography>
                                                        </StepLabel>
                                                </Step>
                                            </Stepper>

                                            {this.state.currentStep == 0 ?
                                                <>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Country / Region*
                                                    </Typography>
                                                    <Paper
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', outlineColor: '#A2A2A2', }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1, borderColor: '#A2A2A2' }}
                                                            placeholder="London"
                                                        />

                                                    </Paper>

                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Full Name*
                                                    </Typography>
                                                    <Paper
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="John borden"
                                                        />

                                                    </Paper>

                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Mobile Number*
                                                    </Typography>
                                                    <Paper
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="+44 123456789098"
                                                        />

                                                    </Paper>

                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Address / City*
                                                    </Typography>
                                                    <Paper
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="London"
                                                        />

                                                    </Paper>

                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Zip code / Postal Code*
                                                    </Typography>
                                                    <Paper
                                                        fullWidth
                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                    >
                                                        <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="82600"
                                                        />

                                                    </Paper>

                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Checkbox size='medium' />}
                                                        label="Save this address for future payment"
                                                        labelPlacement="end"
                                                        sx={{ fontSize: 11, color: '#999999', mt: 5 }}
                                                    />
                                                </> : null}

                                            {this.state.currentStep == 1 ?
                                                <>
                                                    <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                        Add debit / credit card
                                                    </Typography>
                                                    <Grid container gap={1} sx={{ mt: 2 }}>
                                                        <Grid xs={2} md={2}>
                                                            <Card elevation={10} sx={{ position: 'relative', display: 'inline-flex' }}>
                                                                <CardContent>
                                                                    IMG
                                                                </CardContent>
                                                                <CheckCircleIcon style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, }} />
                                                                {/* <img src={signinScreen} width='12px' height='12px' style={{position:'absolute', top:0, right:0, zIndex:1,}}></img> */}
                                                            </Card>
                                                        </Grid>
                                                        <Grid xs={2} md={2}>
                                                            <Card elevation={10}>
                                                                <CardContent>
                                                                    IMG
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                        <Grid xs={2} md={2}>
                                                            <Card elevation={10}>
                                                                <CardContent>
                                                                    IMG
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container gap={1} sx={{ mt: 2 }}>
                                                        <Grid xs={5} md={5}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                Card holder name *
                                                            </Typography>
                                                            <Paper
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="John borden"
                                                                />

                                                            </Paper>
                                                        </Grid>
                                                        <Grid xs={5} md={5}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                Card number *
                                                            </Typography>
                                                            <Paper
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="1234 4567 8903 4567"
                                                                />

                                                            </Paper>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container gap={1} sx={{ mt: 2 }}>
                                                        <Grid xs={5} md={5}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                                Expiry date *
                                                            </Typography>
                                                            <Grid container gap={1} sx={{ mt: 2 }}>
                                                                <Grid xs={5} md={5}>
                                                                    <Paper
                                                                        fullWidth
                                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                                    >
                                                                        <InputBase
                                                                            sx={{ ml: 1, flex: 1 }}
                                                                            placeholder="John borden"
                                                                        />

                                                                    </Paper>
                                                                </Grid>
                                                                <Grid xs={5} md={5}>
                                                                    <Paper
                                                                        fullWidth
                                                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                                    >
                                                                        <InputBase
                                                                            sx={{ ml: 1, flex: 1 }}
                                                                            placeholder="John borden"
                                                                        />

                                                                    </Paper>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid xs={5} md={5}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: 13, mt: 3, mb: 1, fontWeight: 'bold' }}>
                                                                CVC number *
                                                            </Typography>
                                                            <Paper
                                                                fullWidth
                                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                                            >
                                                                <InputBase
                                                                    sx={{ ml: 1, flex: 1 }}
                                                                    placeholder="CVC"
                                                                />

                                                            </Paper>
                                                        </Grid>
                                                    </Grid>

                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Checkbox size='medium' />}
                                                        label="Save this address for future payment"
                                                        labelPlacement="end"
                                                        sx={{ fontSize: 11, color: '#999999', mt: 5 }}
                                                    />
                                                </>
                                                : null}
                                        </Grid>
                                        <Grid xs={3} md={3}>
                                            <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#00AAB3' }}>
                                                Summary
                                            </Typography>
                                            <Grid container gap={1} sx={{ mt: 2 }}>
                                                <Grid xs={5} md={5}>
                                                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        Package -
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        Pro
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                            <Grid container gap={1} sx={{ mt: 2 }}>
                                                <Grid xs={5} md={5}>
                                                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        Sub total -
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        £ 25
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container gap={1}>
                                                <Grid xs={5} md={5}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        Add - on :
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={5} md={5}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        Coupon
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Paper
                                                fullWidth
                                                sx={{ mt:1, p: '2px 4px', display: 'flex', alignItems: 'center', borderColor: '#A2A2A2' }}
                                            >
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="Enter coupon code"
                                                />

                                            </Paper>

                                            <LoadingButton disabled fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#C9C9C9", ":hover": { backgroundColor: "#C9C9C9", }, mt: 2, textTransform: 'none', fontSize: 17 }}>Apply coupon</LoadingButton>
                                            <Divider sx={{mt:3}}/>

                                            <Grid container gap={1} sx={{ mt: 2 }}>
                                                <Grid xs={6} md={6}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                    Sub total -
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        £ 25
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container gap={1}>
                                                <Grid xs={6} md={6}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                    Discounts -
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        £ 0
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container gap={1}>
                                                <Grid xs={6} md={6}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                    Coupon discounts -
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        £ 0
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{mt:3}}/>
                                            <Grid container gap={1} sx={{ mt: 2 }}>
                                                <Grid xs={6} md={6}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                    Total Amount -
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 'bold', color: 'black' }}>
                                                        £ 25
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            {this.state.currentStep == 1 ?
                                                <LoadingButton onClick={() => this.changeNextStep(this.state.currentStep)} fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover": { backgroundColor: "#00AAB3", }, mt: 2, textTransform: 'none', fontSize: 17 }}>Confirm Payment</LoadingButton>
                                                :
                                                <LoadingButton onClick={() => this.changeNextStep(this.state.currentStep)} fullWidth variant="contained" className='signin-button' sx={{ backgroundColor: "#00AAB3", ":hover": { backgroundColor: "#00AAB3", }, mt: 2, textTransform: 'none', fontSize: 17 }}>Next</LoadingButton>
                                            }
                                            {this.state.currentStep != 0 ?
                                                <Button onClick={() => this.changeBackStep(this.state.currentStep)} fullWidth className='signup-button' variant="outlined" sx={{ color: 'black', ":hover": { borderColor: "#00AAB3", color: 'black' }, borderColor: "#00AAB3", mt: 1, backgroundColor: "white", textTransform: 'none', fontSize: 17 }}>Back</Button>
                                                :
                                                null
                                            }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </>
                    :
                    <>
                        <Container maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                            <Card elevation={8} sx={{ maxWidth: '100%' }}>
                                <CardContent>
                                    <Grid container>
                                        <Grid xs={12} md={12} sx={{ p: 5 }}>
                                            <Stepper activeStep={3} alternativeLabel>
                                                <Step key={0}>
                                                    <StepLabel sx={{ color: '#00AAB3' }}>Billing Info</StepLabel>
                                                </Step>

                                                <Step key={1}>
                                                    <StepLabel >Payment</StepLabel>
                                                </Step>

                                                <Step key={2}>
                                                    <StepLabel >Successfully paid</StepLabel>
                                                </Step>
                                            </Stepper>
                                        </Grid>
                                    </Grid>
                                    <Typography align='center'>
                                        <img src={Success} width={100} height={100} style={{ marginTop: 20 }}></img>
                                    </Typography>
                                    <Typography align='center' variant='subtitle1' sx={{ color: '#424B54', mt: 2 }}>
                                        Payment Done
                                    </Typography>
                                    <Typography align='center' variant='subtitle2' sx={{ color: '#424B54', mt: 1 }}>
                                        John You have Successfully paid
                                    </Typography>
                                    <Typography align='center' variant='subtitle1' sx={{ color: '#424B54', mt: 3 }}>
                                        <Button href="add-student" variant="text" sx={{ my: 1, mx: 1.5, color: 'black', ":hover": { color: 'black' }, textTransform: 'none' }} startIcon={<img src={AddStudent} width={20} height={20}></img>}>
                                            Add Student
                                        </Button>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Container>
                    </>
                }
            </React.Fragment>
        )
    }
}
export default AddBillingInfo;