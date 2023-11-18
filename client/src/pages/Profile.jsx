import { React } from 'react';
import Loader from '../components/Loader';
import ProfilePageNavbar from '../components/ProfileAndOrderPagesNavbar';
import ProfilePageContent from '../components/profile/ProfilePageContent';
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
