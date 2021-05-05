const messages = (value) => {
  switch (value) {
    case 'low':
      return 'You can do it better!';
    case 'good':
      return 'Very good, but you can still improve it.';
    case 'high':
      return 'Well done!!!';
    default:
      break;
  }
};

export default messages;
