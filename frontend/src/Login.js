import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Container, Flex, Box,  Button, Subhead, Text } from 'rebass';
// import {Input} from '@rebass/forms';
import firebase from './firebase.utils';
import { signInWithGoogle } from './firebase.utils.js';
class Login extends Component {
 state = {
   email: '',
   password: '',
   error: null,
   userCredential: null
 };
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
handleFormSubmit = (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then((user) => {
       this.props.history.push('/');
     })
     .catch((error) => {
       this.setState({ error: error });
     });
 };
 render() {
   const { email, password, error } = this.state;
//    const { authenticated } = this.props.authenticated;
   return (
    //  <Container>
    // this.props.authenticated ? 
    // <p> already logged in. </p> 
    // :
    <div>
       {/* <Flex>
         <Box>
           <Heading>Log In</Heading>
         </Box>
       </Flex> */}
       <p>Log In</p>
       {error ? (
           <p>{error.message}</p>
        //  <Flex> <Box>
        //      <Text>{error.message}</Text>
        //    </Box>
        //  </Flex>
       ) : null}
       <div>
           <form onSubmit={this.handleFormSubmit}>
             <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
             <button children="Log In" />
           </form>

       </div>
       <div>
            <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
       </div>
       </div>
    //  </Container>
   );
 }
}
export default withRouter(Login);