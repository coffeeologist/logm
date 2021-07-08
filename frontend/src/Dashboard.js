import React, {Component} from 'react';
// import { Container, Flex, Box, Heading } from 'rebass';
// const Dashboard = () => {
class Dashboard extends Component {
 render() {
    return (
        <div>
            <p>Welcome! To dashboard </p>
            <div>Logged in?: {this.props.authenticated.toString()} |</div>
            <div>Logged in with email address: {this.props.userCredential.email}</div>
        </div>
    );
    }
};
export default Dashboard;