import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearErrors } from '../redux/actions/errorActions';
import { registerUser } from '../redux/actions/userActions';
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardFooter,
  Button,
  Alert,
  Spinner,
} from 'reactstrap';
import { REGISTER_FAIL } from '../redux/actions/types';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  // Form entry states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  // Redux State
  const error = useSelector((state) => state.error);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    dispatch(registerUser(name, email, password, confirm, history));

    setSpinner(true);
  };

  return (
    <Container className='col-md-6 mt-4'>
      <Card className='m-auto'>
        <CardHeader className='text-center'>
          <h3>
            <i className='fas fa-user-plus'></i> Register
          </h3>
        </CardHeader>
        <CardBody>
          {error?.label === REGISTER_FAIL ? (
            <Alert color='warning'>{error.msg}</Alert>
          ) : spinner ? (
            <div style={{ textAlign: 'center' }}>
              <Spinner color='secondary' />
            </div>
          ) : null}
          <Form method='POST' onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
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
            <FormGroup>
              <Label htmlFor='confirm'>Confirm Password</Label>
              <Input
                type='password'
                name='confirm'
                id='confirm'
                placeholder='Confirm Password'
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </FormGroup>
            <Button type='submit' block color='danger'>
              Register
            </Button>
          </Form>
        </CardBody>
        <CardFooter>
          <p className='text-muted'>
            Have an account? <NavLink to='/login'>Login</NavLink>
          </p>
        </CardFooter>
      </Card>
    </Container>
  );
}

export default Register;
