const USERNAME_REGEX: RegExp = new RegExp("^(?=.{5,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$");
const EMAIL_REGEX: RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export function checkUsernameSyntax(username: string): boolean {
    return USERNAME_REGEX.test(username);
}

export function checkEmailIsValid(email: string) {
    return EMAIL_REGEX.test(email);
}

export function checkPasswordIsValid(password: string): boolean {
    return password.length >= 6;
}
