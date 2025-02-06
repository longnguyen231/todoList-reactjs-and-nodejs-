const getErrorMessage = (err) => {
  const msg =
    (err.response && err.response.data) || err.message || err.toString();
  return msg;
};

export default getErrorMessage;
