import { React } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileNavbar from './MobileNavbar';
import ComputerNavbar from './ComputerNavbar';

export default function Navbar() {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });
  return isBigScreen ? <ComputerNavbar /> : <MobileNavbar />;
}
