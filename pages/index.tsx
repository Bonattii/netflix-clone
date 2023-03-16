import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

import useCurrentUser from '../hooks/useCurrentUser';

// Check if the user is logged, if its not redirect to the auth page
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // If the user is not logged will redirect to the auth page
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-2xl text-green-500">Netflix Clone</h1>
      <p className="text-white">Logged is as : {user?.name}</p>
      <button onClick={() => signOut()} className="h-10 w-full bg-white">
        Logout!
      </button>
    </>
  );
}
