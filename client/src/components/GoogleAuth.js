import React from 'react';
import ApiKey from './apiKeys/GoogleApi';
import { connect } from 'react-redux'
import {signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        // gapi는 window 상에서 사용가능한 변수이기때문에
        // 앞에 window를 붙여준다.
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: ApiKey.ClientId,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        }); 
    };

    onAuthChange = isSignedIn => {
        console.log(isSignedIn);
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    };

    render() {
        return <div>{this.renderAuthButton()}</div>;
    };
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn};
}

export default connect(
    mapStateToProps,
    { signIn, signOut}
)(GoogleAuth);