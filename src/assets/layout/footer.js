import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

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

  class Footer extends React.Component {
    render() {
        return (
          <React.Fragment>
            
            {/* Footer */}
            <Container
              maxWidth="100%"
              component="footer"
              sx={{
                backgroundColor: '#3A8B8C',
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt:0,
                py: [3, 6],
              }}
            >
              <Typography variant="h4" color="white" gutterBottom sx={{ fontWeight: 'bold' }}>
                SqillUP
              </Typography>
              <Grid container spacing={4} justifyContent="space-evenly">
                {footers.map((footer) => (
                  <Grid item xs={6} sm={3} key={footer.title}>
                    <Typography variant="h6" color="white" gutterBottom>
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item) => (
                        <li key={item}>
                          <Typography variant="p" variant="subtitle1" color="white">
                            {item}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ mt: 5, color: 'white', height: 5 }} />
              <Copyright sx={{ mt: 2, color: 'white' }} />
            </Container>
            {/* End footer */}
          </React.Fragment>
        );
      }
    }
    
    export default Footer;