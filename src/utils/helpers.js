export const transformFirebaseUser = (firebaseUser) => {
  if (!firebaseUser || !Object.keys(firebaseUser)) return null;

  const storeUser = {};
  const userProperties = [
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'photoURL',
    'providerData',
    'providerId',
    'refreshToken',
    'uid',
    'isAdmin',
    'xa',
  ];

  // eslint-disable-next-line array-callback-return
  userProperties.map((prop) => {
    if (prop in firebaseUser) {
      storeUser[prop] = firebaseUser[prop];
    }
  });

  return storeUser;
};
