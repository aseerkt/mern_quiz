import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../redux/actions/errorActions';
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardFooter,
  Alert,
  Spinner,
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { loginUser } from '../redux/actions/userActions';
import { LOGIN_FAIL } from '../redux/actions/types';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  // Component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);

  const error = useSelector((state) => state.error);

  useEffect(() => {
    console.log('UseEffect');
    dispatch(clearErrors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    dispatch(loginUser(email, password, history));
    setSpinner(true);
  };

  return (
    <Container className='col-md-6 mt-4'>
      <Card className='m-auto'>
        <CardHeader className='text-center'>
          <h3>
            <i className='fas fa-sign-in-alt'></i> Login
          </h3>
        </CardHeader>
        <CardBody>
          {error?.label === LOGIN_FAIL ? (
            <Alert color='warning'>{error.msg}</Alert>
          ) : spinner ? (
            <div style={{ textAlign: 'center' }}>
              <Spinner color='secondary' />
            </div>
          ) : null}
          <Form method='POST' onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button block color='danger'>
              Login
            </Button>
          </Form>
        </CardBody>
        <CardFooter>
          <p className='text-muted'>
            Do not have account? <NavLink to='/register'>Register</NavLink>
          </p>
        </CardFooter>
      </Card>
    </Container>
  );
}

export default Login;
