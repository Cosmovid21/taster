export function validateName(name: string) {
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
}

export function validateEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address.";
  }
}

export function passwordChecks(password: string) {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least one letter", met: /[a-zA-Z]/.test(password) },
    { label: "At least one number", met: /[0-9]/.test(password) },
  ];
}

export function validatePassword(password: string) {
  const unmet = passwordChecks(password).filter((check) => !check.met);
  if (unmet.length > 0) {
    return `Password needs: ${unmet.map((check) => check.label.toLowerCase()).join(", ")}.`;
  }
}
