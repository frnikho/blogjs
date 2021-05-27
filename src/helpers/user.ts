const USERNAME_REGEX: RegExp = new RegExp("^(?=.{5,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$");
const EMAIL_REGEX: RegExp = new RegExp(/^\S+@\S+$/);

export function checkUsernameSyntax(username: string): boolean {
    return USERNAME_REGEX.test(username);
}

export function checkEmailIsValid(email: string) {
    return EMAIL_REGEX.test(email);
}

export function checkPasswordIsValid(password: string): boolean {
    return password.length >= 6;
}
