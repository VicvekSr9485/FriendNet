import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import sharedVideo from '../assets/share.mp4';
import Logo from '../assets/logowhite.png';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    try {
      localStorage.setItem('user', JSON.stringify(response.profileObj));

      var decodedHeader = jwt_decode(response.credential);
      console.log(decodedHeader);
      // Destructure some of the props from that response
      const { name, picture, sub } = decodedHeader;

      const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
      };

      client
        .createIfNotExists(doc)
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((error) => console.log(error));
    } catch (e) {
      localStorage.removeItem('user'); // Remove the 'user' key if the JWT is not valid
      console.log(e); // For debugging
    }
  };

  // Check for an authenticated user on component mount
  useEffect(() => {
    const userToken = localStorage.getItem('user');
    console.log('User data stored in localStorage:', userToken);
    if (userToken) {
      // User is already authenticated, redirect to the home page
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Render the login form if 'user' key is not found in localStorage
  if (!localStorage.getItem('user')) {
    return (
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
        <video
          src={sharedVideo}
          type="video/mp4"
          muted
          loop
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={Logo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl ">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className=" bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                >
                  <FcGoogle className="mr-4 " />
                  Sign In with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onError={() => console.log('Error')}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
      </div>
    );
  }

  return null; // Return null when the user is authenticated
};

export default Login;
