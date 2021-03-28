
import { useEffect } from 'react';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../config/firebase';
import Loader from '../components/Loader/Loader';


import Login from './login';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {

    if (user) {
      db
        .collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoUrl: user.photoURL
        }, {
          merge: true // update the db else it will overide it (merge with new data)
        });
    }

  }, [user]);

  if (loading) return <Loader />;
  if (!user) return <Login />;  
  return <Component {...pageProps} />;

};

export default MyApp;
