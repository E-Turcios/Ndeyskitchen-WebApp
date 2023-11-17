import { React } from 'react';
import Loader from '../components/Loader';
import ProfilePageNavbar from '../components/Profile/ProfilePageNavbar';
import ProfilePageContent from '../components/Profile/ProfilePageContent';
import useFetchedUserData from '../hooks/useFetchedUserData';

export default function Profile() {
  const { userInformation, isLoading } = useFetchedUserData();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="profile-container">
      <ProfilePageNavbar />
      <ProfilePageContent userInformation={userInformation} />
    </div>
  );
}
