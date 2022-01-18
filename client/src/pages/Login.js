import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom'
import { login } from '../utils/backend'
import authContext from '../utils/authContext'
import Copyright from '../components/Copyright'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative'
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  disabledLink: {
    cursor: "not-allowed"
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16
  }
}));

function Login() {
  const classes = useStyles();
  const auth = useContext(authContext)
  
  const [mail, setMail] = useState({
    error: false,
    errorText: ''
  });
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(undefined);
  const [isLoading, setIsloading] = useState(false);

  const validateEmail = (event) => {
    const mail = {
      error: false,
      errorText: 'Entrez un mail valide'
    }

    if (event.target.value !== '') {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      mail.error = !re.test(event.target.value);
    }

    setMail(mail);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!mail.error) {

      const mailError = event.target.email.value === ''
      const passwordError = event.target.password.value === ''

      setMail({
        error: mailError,
        errorText: 'Champs requis'
      });

      setPasswordError(passwordError)

      if (!mailError && !passwordError) {
        setIsloading(true);
        login(event.target.email.value, event.target.password.value)
        .then(() => {
          setLoginError(undefined);

          auth.signin((err) => {
            if (err) {
              setIsloading(false);
              setLoginError(err);
            }
          })
        })
        .catch(err => {
          setLoginError(err);
          setIsloading(false);
          event.target.password.value = '';
        })
      }
      
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h3" className={classes.title}>
          Dark Coin
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Connexion
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Adresse mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={validateEmail}
            error={mail.error}
            helperText={mail.error && mail.errorText}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordError && "Champs requis"}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Rester connecté"
          /> */}
          <Typography component="p" variant="body2" color="error" align="center">
            {loginError}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={classes.submit}
          >
            {isLoading && <CircularProgress 
              className={classes.loader} 
              color='secondary' 
              size={32}
            /> }
            Connexion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" className={classes.disabledLink} underline="hover">
                Mot de passe oublié ? 
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" color="primary" underline="hover">
                {"Pas de compte ? S'inscrire"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;