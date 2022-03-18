import Vue from 'vue';
import Firebase from 'firebase/app';
import store from '../store';
import 'firebase/auth';
import firebaseConfig from '../utils/firebaseConfig';
import { SET_USER } from '../store/mutation-types';
import { LOGIN } from '../store/action-types';
import { transformFirebaseUser } from '../utils/helpers';

const defineProvider = (socialMediaProvider) => {
  const google = ['google', 'google.com'];
  const facebook = ['facebook', 'facebook.com'];
  const twitter = ['twitter', 'twitter.com'];

  if (google.includes(socialMediaProvider)) {
    return new Firebase.auth.GoogleAuthProvider();
  }
  if (facebook.includes(socialMediaProvider)) {
    return new Firebase.auth.FacebookAuthProvider();
  }
  if (twitter.includes(socialMediaProvider)) {
    return new Firebase.auth.TwitterAuthProvider();
  }

  throw new Error('No social media provider');
};

const buildFirebaseCred = (rawCred) => {
  switch (rawCred.providerId) {
    // This case never happens as signing in with Google doesn't throw the
    // 'auth/account-exists-with-different-credential' error
    case 'google.com':
      return Firebase.auth.GoogleAuthProvider.credential(
        rawCred.oauthAccessToken,
      );
    case 'facebook.com':
      return Firebase.auth.FacebookAuthProvider.credential(
        rawCred.oauthAccessToken,
      );
    case 'twitter.com':
      return Firebase.auth.TwitterAuthProvider.credential(
        rawCred.oauthAccessToken,
        rawCred.oauthTokenSecret,
      );
    default:
      throw new Error('Provider unknown');
  }
};

Vue.use({
  // eslint-disable-next-line no-shadow,no-unused-vars
  install: (Vue, options) => {
    const firebase = Firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const onGetRedirectResult = async () => {
      try {
        const redirectRes = await auth.getRedirectResult();
        if (
          !redirectRes ||
          !Object.keys(redirectRes).length ||
          !redirectRes.user ||
          !auth.currentUser
        )
          return;

        const validPendingCred = buildFirebaseCred(
          JSON.parse(sessionStorage.getItem('pendingCred')),
        );

        await auth.currentUser.linkWithCredential(validPendingCred);
        await store.dispatch(`auth/${LOGIN}`);
      } catch (e) {
        console.error(e);
      }
    };
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$auth = {
      login(provider) {
        const prvd = defineProvider(provider);
        return auth.signInWithPopup(prvd);
      },
      async onAccExistsErr(error) {
        try {
          const providers = await auth.fetchSignInMethodsForEmail(error.email);
          const provider = defineProvider(providers[0]);
          provider.setCustomParameters({ login_hint: error.email });
          sessionStorage.setItem(
            'pendingCred',
            JSON.stringify(error.credential),
          );
          await auth.signInWithRedirect(provider);
        } catch (e) {
          console.error(e);
        }
      },
      logout() {
        return auth.signOut();
      },
      onIdTokenChanged(callback) {
        // This code updates store when a user changes. This way the user is always updated in the store
        auth.onIdTokenChanged((user) => {
          // if (user) {
          // console.log('onIdTokenChanged');
          store.commit(`auth/${SET_USER}`, transformFirebaseUser(user));
          onGetRedirectResult();
          callback();
          // }
        });
      },
      getUserIdToken(forceRefresh = false) {
        if (!auth.currentUser) return null;
        return auth.currentUser.getIdToken(forceRefresh);
      },
    };
  },
});
