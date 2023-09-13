import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await client.fetch(userQuery(userId));
        setUser(userData[0]);
      } catch (error) {
        // Handle any errors that occur during the fetch.
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        let pinsQuery;
        if (text === 'Created') {
          pinsQuery = userCreatedPinsQuery(userId);
        } else {
          pinsQuery = userSavedPinsQuery(userId);
        }
        
        const pinsData = await client.fetch(pinsQuery);
        setPins(pinsData);
      } catch (error) {
        // Handle any errors that occur during the fetch.
        console.error('Error fetching pins:', error);
      }
    };

    fetchPins();
  }, [text, userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) {
    return <Spinner message="Loading profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user?.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === user?._id && (
              <button
                type="button"
                className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={() => {
                  googleLogout();
                  handleLogout();
                }}
              >
                <AiOutlineLogout style={{ color: 'red', fontSize: '21px' }} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={() => {
              setText('Created');
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={() => {
              setText('Saved');
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
