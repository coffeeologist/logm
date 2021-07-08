import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Container, Flex, Box, Button, Subhead, Text } from 'rebass';
// import Input from '@rebass/forms';
import firebase from './firebase.utils';
class Register extends Component {
 state = {
   email: '',
   password: '',
   error: null,
 };
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
handleSubmit = (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((user) => {
       this.props.history.push('/');
     })
     .catch((error) => {
       this.setState({ error: error });
     });
 };
 render() {
   const { email, password, error } = this.state;
   return (
    //  <Container>
    <div>
        <p>Register</p>
       {/* <Flex>
         <Box>
           <Heading>Register</Heading>
         </Box>
       </Flex> */}
       {error ? (
           <p>{error.message }</p>
        //  <Flex>
        //    <Box>
        //      <Text>{error.message}</Text>
        //    </Box>
        //  </Flex>
       ) : null}
       <div>
           <form onSubmit={this.handleSubmit}>
             <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
             <button children="Register" />
           </form>

       </div>
       </div>
    //  </Container>
   );
 }
}
export default withRouter(Register);