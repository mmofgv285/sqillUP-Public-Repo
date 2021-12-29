import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import downarrow from '../../assets/images/down-arrow.png';
import uparrow from '../../assets/images/up-arrow.png';

import axios from "axios";
import "../../assets/scss/toggleButton.css";
import { StylesProvider } from "@material-ui/core/styles";
import { hover } from '@testing-library/user-event/dist/hover';
import { Elevator } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SqillUP.UK
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '1 Student Account',
      'Videos 1 per chapter',
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '20',
    description: [
      '1 Student Account',
      'Videos 1 per chapter',
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'contained',
  },
  {
    title: 'Pro Plus',
    price: '25',
    description: [
      '2+ Student Account',
      'Videos all chapter',
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'WHAT WE OFFER',
    description: ['For Schools', 'For Home', 'Science', 'Maths', 'Free Resources'],
  },
  {
    title: 'ABOUT',
    description: [
      'Company',
      'Mission',
      'Curriculum',
      'Careers',
      'Blog',
      'Testimonials',
    ],
  },
  {
    title: 'HELP',
    description: ['FAQ', 'Contact Us', 'Technical Support', 'Legals'],
  },
  {
    title: 'GET THE APP ON',
    description: ['Google Play', 'App Store'],
  },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('One', 159, 6.0, 24),
  createData('More Than One', 237, 9.0, 37),
];

class PricePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planDuration: 'monthly',
      moreView: false,
      pricePlanDetails: [],
      restStudentAccountDetails: [],
    };
  }


  componentDidMount() {
    this.getPricePlanDetails();
    this.setState({ planDuration: 'monthly' });
  }

  getPricePlanDetails() {
    let that = this;
    axios.post("https://api.smartht.co.uk/api/auth/viewPlans")
      .then(function (response) {
        console.log(response.data);
        that.setState({ pricePlanDetails: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  changeMoreView(flag) {
    this.setState({ moreView: !flag });
  }

  handlePriceDuration(value) {
    this.setState({ planDuration: value });
  }

  render() {

    // const handlePriceDuration = (event, newAlignment) => {
    //   this.setState({ planDuration: newAlignment });
    // };
    return (
      <React.Fragment>
        {/* Hero unit */}
        {/* <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6, backgroundColor:'#EBEBEB' }}> */}
        <div style={{ paddingTop: 20, paddingBottom: 20, marginBottom:20, backgroundColor:'#EBEBEB' }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            The right plan for your children
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" component="p">
            Choose plan that works best for you children future
          </Typography>

          <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{ mt: 2 }}>
            <ButtonGroup variant="outlined" sx={{backgroundColor:'white'}}>
              {this.state.planDuration === "monthly" ?
                <>
                  <Button sx={{ color: 'white', backgroundColor: "#3A8B8C", ":hover": { backgroundColor: "#3A8B8C" } }} onClick={() => this.handlePriceDuration('monthly')}>Monthly</Button>
                  <Button sx={{color:'black'}} onClick={() => this.handlePriceDuration('annually')}>Annually</Button>
                </> :
                <>
                  <Button sx={{color:'black'}} onClick={() => this.handlePriceDuration('monthly')}>Monthly</Button>
                  <Button sx={{ color: 'white', backgroundColor: "#3A8B8C", ":hover": { backgroundColor: "#3A8B8C" } }} onClick={() => this.handlePriceDuration('annually')}>Annually</Button>
                </>
              }
            </ButtonGroup>
            {/* <ToggleButtonGroup
              value={this.state.planDuration}
              exclusive
              size='small'
              onChange={handlePriceDuration}
              aria-label="text alignment"
            >
              <ToggleButton value="monthly" aria-label="left aligned">
                Monthly
              </ToggleButton>
              <ToggleButton value="annually" aria-label="right aligned">
                Annually
              </ToggleButton>
            </ToggleButtonGroup> */}
          </Typography>
          </div>
        {/* </Container> */}

        {/* End hero unit */}
        <Container maxWidth="md" component="main">

          <Grid container spacing={5} alignItems="flex-end">
            {this.state.pricePlanDetails.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.id}
                xs={12}
                sm={6}
                md={4}
              >
                {this.state.planDuration === "monthly" ?
                  // ****************** Monthly Plan ************************
                  <>
                    <Card sx={{ height: 310, ":hover": { boxShadow: 15 } }}>
                      <CardHeader
                        title={tier.name}
                        subheader={tier.name === "Pro" ? "Most Popular" : null}
                        titleTypographyProps={{ align: 'center' }}
                        action={tier.name === 'Pro' ? <StarIcon /> : null}
                        subheaderTypographyProps={{
                          align: 'center',
                          color: 'white'
                        }}
                        sx={{
                          backgroundColor: '#3AB9C1',
                          color: 'white'
                        }}
                      />

                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >

                          {tier.name != 'Free' ?
                            <>
                              <Typography component="h2" variant="h3" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                £{Math.floor(parseInt(tier.monthly_price))}
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                /month
                              </Typography>
                            </> :
                            <>
                              <Typography component="h2" variant="h3" color="text.primary" sx={{ fontWeight: 'bold' }}>
                              £00
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                /month
                              </Typography>
                            </>
                          }
                        </Box>
                        <ul>
                          {/* {tier.description.map((line) => ( */}
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="left"
                            key={tier.id}
                          >
                            {tier.name === "Pro Plus" ?
                              <>
                                <CheckCircleIcon color="success" /> {"1+ Student Account"}</> :
                              <>
                                <CheckCircleIcon color="success" /> {tier.max_students + " Student Account"}</>
                            }
                          </Typography>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="left"
                            key={tier.id}
                          >
                            <CheckCircleIcon color="success" /> {tier.restrictions.video_per_chapter === null ? "Videos All Chapter" : "Videos " + tier.restrictions.video_per_chapter + " Per Chapter"}
                          </Typography>
                          {/* ))} */}
                        </ul>
                      </CardContent>
                      {tier.name === "Free" ?
                        <>
                          <br />
                        </> :
                        null}

                      {tier.name === "Pro Plus" ?
                        <>
                          <br />
                        </> :
                        null}
                      <CardActions>

                        <Button href="signup" fullWidth variant={"outlined"} sx={{textTransform:'none', color:'black', borderColor:'#FFCA3A', ":hover":{borderColor:'#FFCA3A', color:'black'}}}>
                          Subscribe Now
                        </Button>
                      </CardActions>
                    </Card>
                  </> :
                  // ****************** Annualy Plan ************************
                  <>
                    <Card sx={{ height: 340, ":hover": { boxShadow: 15 } }}>
                      <CardHeader
                        title={tier.name}
                        subheader={tier.name === "Pro" ? "Most Popular" : null}
                        titleTypographyProps={{ align: 'center' }}
                        action={tier.name === 'Pro' ? <StarIcon /> : null}
                        subheaderTypographyProps={{
                          align: 'center',
                          color: 'white'
                        }}
                        sx={{
                          backgroundColor: '#3AB9C1',
                          color: 'white'
                        }}
                      />

                      <CardContent>
                        {tier.yearly_discount != 0 ?
                          <Typography sx={{ fontWeight: 'bold' }} align='right'>
                            <Chip sx={{ alignSelf: 'center' }} variant="outlined" color="success" icon={<LocalOfferIcon />} label={tier.yearly_discount + " % Save"} />
                          </Typography> :
                          null
                        }
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >
                          {tier.name != 'Free' ?
                            <>
                              <Typography component="h2" variant="h3" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                £{Math.floor(parseInt(tier.yearly_price))}
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                /Year
                              </Typography>
                            </> :
                            <>
                              <Typography component="h2" variant="h3" color="text.primary" sx={{ fontWeight: 'bold' }}>
                              £00
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                /Year
                              </Typography>
                            </>
                          }
                        </Box>
                        <ul>
                          {/* {tier.description.map((line) => ( */}
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="left"
                            key={tier.id}
                          >
                            {tier.name === "Pro Plus" ?
                              <>
                                <CheckCircleIcon color="success" /> {"1+ Student Account"}</> :
                              <>
                                <CheckCircleIcon color="success" /> {tier.max_students + " Student Account"}</>
                            }
                          </Typography>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="left"
                            key={tier.id}
                          >
                            <CheckCircleIcon color="success" /> {tier.restrictions.video_per_chapter === null ? "Videos All Chapter" : "Videos " + tier.restrictions.video_per_chapter + " Per Chapter"}
                          </Typography>
                          {/* ))} */}
                        </ul>
                      </CardContent>
                      {tier.name === "Free" ?
                        <>
                          <br />
                          <br />
                        </> :
                        null}

                      {tier.name === "Pro Plus" ?
                        <>
                          <br />
                        </> :
                        null}
                      <CardActions>
                        <Button href="signup" fullWidth variant={"outlined"} sx={{textTransform:'none', color:'black', borderColor:'#FFCA3A', ":hover":{borderColor:'#FFCA3A', color:'black'}}}>
                          Subscribe Now
                        </Button>
                      </CardActions>
                    </Card>
                  </>
                }
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              mt: 2,
            }}
          >
            {!this.state.moreView ?
              <Fab size='small' sx={{ backgroundColor: 'white', ":hover": { backgroundColor: 'white', boxShadow:0 }, boxShadow:0 }} color="primary" aria-label="add" onClick={() => this.changeMoreView(this.state.moreView)}>
                {/* <ArrowCircleDownIcon /> */}
                <Avatar
                  alt="Remy Sharp"
                  src={downarrow}
                  sx={{ width: 40, height: 40, mt: 1 }}
                />
              </Fab> :
              <Fab size='small' sx={{ backgroundColor: 'white', ":hover": { backgroundColor: 'white', boxShadow:0 }, boxShadow:0 }} color="primary" aria-label="add" onClick={() => this.changeMoreView(this.state.moreView)}>
                <Avatar
                  alt="Remy Sharp"
                  src={uparrow}
                  sx={{ width: 40, height: 40, mb: 1 }}
                />
              </Fab>
            }
          </Box>
        </Container>
{/* Restriction Details Start */}
        {this.state.moreView ?
          <div style={{backgroundColor:'#EBEBEB', marginTop:5,}}>
          {/* Student Account */}
            <Typography variant="h6" align="center" sx={{mt:2}} component="p">
              Student Account
            </Typography>
            <Grid container columns={20}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                      One
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2, mb:0 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.max_students >= 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.max_students >= 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.max_students >= 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            <Grid container columns={20} sx={{mt:1}}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    More Than One
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.max_students > 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.max_students > 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.max_students > 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            {/* Class Videos */}
            <Typography variant="h6" align="center" sx={{mt:2}} component="p">
              Class Videos
            </Typography>
            <Grid container columns={20}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    One Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2, mb:0 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.video_per_chapter >= 1 || row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.video_per_chapter >= 1 || row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.video_per_chapter >= 1 || row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            <Grid container columns={20} sx={{mt:1}}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    All Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            {/* Self Test */}
            <Typography variant="h6" align="center" sx={{mt:2}} component="p">
              Self Test
            </Typography>
            <Grid container columns={20}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    One Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2, mb:0 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.self_test_per_chapter >= 1 || row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.self_test_per_chapter >= 1 || row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.self_test_per_chapter >= 1 || row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            <Grid container columns={20} sx={{mt:1}}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    All Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            {/* Worksheet */}
            <Typography variant="h6" align="center" sx={{mt:2}} component="p">
              Worksheet
            </Typography>
            <Grid container columns={20}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    One Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2, mb:0 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.work_sheet_per_chapter >= 1 || row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.work_sheet_per_chapter >= 1 || row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.work_sheet_per_chapter >= 1 || row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            <Grid container columns={20} sx={{mt:1}}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    All Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            {/* Past Paper */}
            <Typography variant="h6" align="center" sx={{mt:2}} component="p">
              Past Paper
            </Typography>
            <Grid container columns={20}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    PDF Download
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2, mb:0 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.past_paper_year_pdf >= 1 || row.restrictions.past_paper_year_pdf === null || row.restrictions.past_paper_marking_scheme_pdf >= 1 || row.restrictions.past_paper_marking_scheme_pdf === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.past_paper_year_pdf >= 1 || row.restrictions.past_paper_year_pdf === null || row.restrictions.past_paper_marking_scheme_pdf >= 1 || row.restrictions.past_paper_marking_scheme_pdf === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.past_paper_year_pdf >= 1 || row.restrictions.past_paper_year_pdf === null || row.restrictions.past_paper_marking_scheme_pdf >= 1 || row.restrictions.past_paper_marking_scheme_pdf === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            {/* Queries */}
            <Typography variant="h6" align="center" sx={{mt:2}} component="p">
              Queries
            </Typography>
            <Grid container columns={20}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    General Queries
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2, mb:0 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            <Grid container columns={20} sx={{mt:1}}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    All Queries
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            {/* Challenges */}
            <Typography variant="h6" align="center" sx={{mt:2}} component="p">
              Challenges
            </Typography>
            <Grid container columns={20}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    One Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2, mb:0 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.chalanges_per_chapter >= 1 || row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.chalanges_per_chapter >= 1 || row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.chalanges_per_chapter >= 1 || row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>

            <Grid container columns={20} sx={{mt:1, pb:5}}>
              <Grid xs={4} md={4}>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    All Chapter
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
              <Grid xs={4} md={4}>
              {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <>
                <Card sx={{ ml: 2, mr: 2 }}>
                  <CardContent>
                    <Typography align='center'>
                    {row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Typography>
                  </CardContent>
                </Card>
                </>:
                null))}
              </Grid>
            </Grid>
          </div> :
          null
        }
        {/* Restriction Details End */}

      </React.Fragment>
    );
  }
}

export default PricePlan;