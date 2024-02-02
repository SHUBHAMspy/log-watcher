const formatDate = () => {
  const currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month because it's zero-based
  let day = ('0' + currentDate.getDate()).slice(-2);
  let hours = ('0' + currentDate.getHours()).slice(-2);
  let minutes = ('0' + currentDate.getMinutes()).slice(-2);
  let seconds = ('0' + currentDate.getSeconds()).slice(-2);

  const dateTimeString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  return dateTimeString
}

module.exports = formatDate