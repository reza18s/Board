type UserRegistrationProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
  autoComplete?: string;
};

export const USER_REGISTRATION_FORM: UserRegistrationProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Full name",
    name: "fullname",
    type: "text",
    autoComplete: "name",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    autoComplete: "off",
  },
];

export const USER_LOGIN_FORM: UserRegistrationProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
    autoComplete: "email",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
  },
];
