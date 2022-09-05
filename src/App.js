import logo from './logo.svg';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './App.css';
import './InfoList';
import InfoList from './InfoList';
import FacebookLogin from '@greatsumini/react-facebook-login';

function App() {

  const [user, setUser] = useState({ userName: "", email: "", imgUrl: "" });

  const [authBy, setAuthBy] = useState(null)

  function handleCallbackResponse(res) {
    console.log("Encoded JWF ID Token: " + res.credential)
    const userObject = jwtDecode(res.credential)
    setUser({
      userName: userObject.family_name,
      email: userObject.email,
      imgUrl: userObject.picture
    });
    setAuthBy("Authenticated By Google")
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "660065279401-el3q43qnc9hb1dkjrqv9bf5b1c99pcd4.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )

  }, [])

  function handleFBCallbackResponse(res) {
    setUser({
      userName: res.name,
      email: res.email,
      imgUrl: res.picture.data.url
    });
    setAuthBy("Authenticated By Facebook");
  }

  return (
    <div className="App">
      <div id="signInDiv"></div>
      <FacebookLogin
        appId="404054385147778"
        onSuccess={(response) => {
          console.log(response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          handleFBCallbackResponse(response);
        }}
      />
      <InfoList user={user} authBy={authBy}></InfoList>
    </div>
  );
}

export default App;
