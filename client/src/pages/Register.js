import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom'
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
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  disabledLink: {
    cursor: "not-allowed"
  }
}));

function Register() {
  const classes = useStyles();

  const [mail, setMail] = useState({
    error: false,
    errorText: ''
  });
  const [passwordMain, setPasswordMain] = useState({
    value: '',
    error: false
  });
  const [passwordConfirm, setPasswordConfirm] = useState({
    error: false,
    errorText: '',
    value: ''
  });

  const validateEmail = (event) => {
    const mail = {
      error: false,
      errorText: 'Entrez un mail valide'
    }

    if (event.target.value !== '') {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      mail.error = !re.test(event.target.value)
    }

    setMail(mail);
  }

  const validatePasswordConfirm = (event) => {
    if (event.target.id === 'passwordConfirm') {
      setPasswordConfirm({
        error: event.target.value !== passwordMain.value,
        errorText: 'Mots de passe non identique',
        value: event.target.value
      })
    } else {
      setPasswordMain({value: event.target.value});
      setPasswordConfirm({
        error: passwordConfirm.value !== '' && event.target.value !== passwordConfirm.value,
        errorText: 'Mots de passe non identique',
        value: passwordConfirm.value
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!mail.error && !passwordConfirm.error) {

      const mailError = event.target.email.value === ''
      const passwordMainError = event.target.passwordMain.value === ''
      const passwordConfirmError = event.target.passwordConfirm.value === ''

      setMail({
        error: mailError,
        errorText: 'Champs requis'
      });
      setPasswordMain({ error: passwordMainError });
      setPasswordConfirm({
        error: passwordConfirmError,
        errorText: 'Champs requis'
      });

      if (!mailError && !passwordMainError && !passwordConfirmError) {
        console.log('salut');
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
          Inscription
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
            name="passwordMain"
            label="Mot de passe"
            type="password"
            id="passwordMain"
            autoComplete="current-password"
            onChange={validatePasswordConfirm}
            error={passwordMain.error}
            helperText={passwordMain.error && "Champs requis"}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Confirmez le mot de passe"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
            onChange={validatePasswordConfirm}
            error={passwordConfirm.error}
            helperText={passwordConfirm.error && passwordConfirm.errorText}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Rester connecté"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled= {true}
            className={classes.submit}
          >
            Connexion
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" color="primary" underline="hover">
                Déjà un compte ? Connexion
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

export default Register;