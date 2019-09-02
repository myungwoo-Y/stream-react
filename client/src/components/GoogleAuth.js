import React from 'react';


class GoogleAuth extends React.Component {
    state = { isSignedIn: null };
    componentDidMount() {
        // gapi는 window 상에서 사용가능한 변수이기때문에
        // 앞에 window를 붙여준다.
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1722646757-rcli88ibs77bmrfsga0bdaq8uqg56si4.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;