import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import { clearErrors, returnErrors } from '../../redux/actions/errorActions';
import { REGISTER_FAIL } from '../../redux/actions/types';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false); // modal
  const [visible, setVisible] = useState(true); // alert
  // Form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const toggle = (e) => {
    setModal(!modal);
    dispatch(clearErrors());
  };
  const onDismiss = (e) => setVisible(false);

  // Form Error State
  const errorMessage = useSelector((state) => state.error.msg);
  const errorLabel = useSelector((state) => state.error.label);

  const submitForm = (e) => {
    e.preventDefault();
    setVisible(true); // alert visibility
    if (password !== confirm) {
      return dispatch(returnErrors('Password Mismatch', 400, REGISTER_FAIL));
    }
    dispatch(registerUser(name, email, password));
    if (errorMessage) {
      setEmail('');
      setPassword('');
      setConfirm('');
    }
  };

  return (
    <div>
      <NavLink href='#' onClick={toggle}>
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className='heading-4' toggle={toggle}>
          <i className='fas fa-user-plus'></i> Register
        </ModalHeader>
        <ModalBody>
          {errorLabel === REGISTER_FAIL ? (
            <Alert color='warning' isOpen={visible} toggle={onDismiss}>
              {errorMessage}
            </Alert>
          ) : null}
          <Form onSubmit={submitForm}>
            <FormGroup>
              <Label htmlFor='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Name...'
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
                placeholder='Enter Email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                name='password'
                placeholder='Enter Password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='confirm'>Confirm Password</Label>
              <Input
                type='password'
                name='confirm'
                placeholder='Confirm confirm...'
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </FormGroup>
            <Button color='primary' block>
              Register
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
