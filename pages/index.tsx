import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '../components/Navbar';
import Billboard from '../components/Billboard';

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
  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
}
