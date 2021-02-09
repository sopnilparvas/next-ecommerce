const valid = (name, email, password, c_password) => {
  if (!name || !email || !password || !c_password) return "Please fill all the fields!";

  if (!validateEmail(email)) return "Invalid email address!";

  if (password.length < 6) return "Must be 6 characters long!";

  if (password !== c_password) return "Password did not matched!";
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
