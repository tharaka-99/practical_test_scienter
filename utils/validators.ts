export const validateLogin = (data: { username: string; password: string }) => {
  const errors: Record<string, string> = {};

  // Username validation
  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  }

  if (data.password && !validatePassword(data.password)) {
    errors.password = errors.password =
      "Password must:\n" +
      "• Be 8-30 characters long\n" +
      "• Include uppercase & lowercase letters\n" +
      "• Include at least 1 number\n" +
      "• Include at least 1 special character (-!@#$%^&*+)";
  }

  return errors;
};

export const validateSignUp = (form: any) => {
  const errors: any = {};

  // Required field validations
  if (!form.firstName) errors.firstName = "First Name is required";
  if (!form.lastName) errors.lastName = "Last Name is required";
  if (!form.gender) errors.gender = "Gender is required";

  // Mobile validation
  if (!form.mobile) {
    errors.mobile = "Mobile No is required";
  } else if (!validatePhone(form.mobile)) {
    errors.mobile = "Please enter a valid 10-digit mobile number";
  }

  // Email validation
  if (!form.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(form.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!form.country) errors.country = "Country is required";
  if (!form.password) errors.password = "Password is required";
  if (!form.agreeTerms)
    errors.agreeTerms = "You must agree to the terms and conditions";

  // Password validation
  if (form.password && !validatePassword(form.password)) {
    errors.password = errors.password =
      "Password must:\n" +
      "• Be 8-30 characters long\n" +
      "• Include uppercase & lowercase letters\n" +
      "• Include at least 1 number\n" +
      "• Include at least 1 special character (-!@#$%^&*+)";
  }

  // Confirm password validation
  if (!form.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (form.password && form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
  const phoneRegex = /^[0-9]{10}$/; // Validates 10-digit phone numbers
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+])[A-Za-z\d!@#$%^&*+]{8,30}$/;
  return passwordRegex.test(password);
};
