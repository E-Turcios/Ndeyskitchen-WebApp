const userFields = [
  {
    tag: 'Name',
    data: `${userInformation.firstName + ' ' + userInformation.lastName}`,
  },
  {
    tag: 'Email',
    data: `${userInformation.email}`,
  },
  {
    tag: 'Country Code',
    data: `${userInformation.countryCode}`,
  },
  {
    tag: 'Phone number',
    data: `${userInformation.number}`,
    isButtonClicked: isButtonClicked.editButton,
  },
  {
    tag: 'Address',
    data: `${userInformation.residence}`,
    isButtonClicked: isButtonClicked.editButton,
  },
];

module.exports = { userFields };
