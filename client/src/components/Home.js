import React from 'react';
import { Container, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className='app-home'>
      <Container>
        <div className='home-container'>
          <h1 className='text-light'>Welcome to Quiz App</h1>
          <div>
            <Button className='btn btn-lg btn-primary part-btn'>
              Participate
            </Button>
            {'  '}
            <Button className='btn btn-lg btn-danger make-btn'>
              Make Quiz
            </Button>
          </div>
          <p className='text-muted'>
            <NavLink to='/login'>Log in to Continue</NavLink>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Home;
