export default class Validator {
  static validateLogin (user) {
    if (!user || user.email.trim().length === 0) {
      return {isValid: false, message: 'Please provide your email address.'}
    }

    if (!user || user.password.trim().length === 0) {
      return {isValid: false, message: 'Please provide your password.'}
    }

    return {isValid: true}
  }

  static validateRegistration (user) {
    if (!user || !user.email) {
      return {isValid: false, message: 'Please provide a correct email address.'}
    }

    if (!user || user.password.trim().length < 4) {
      return {isValid: false, message: 'Password must have at least 4 characters.'}
    }

    if (!user || user.name.trim().length === 0) {
      return {isValid: false, message: 'Please provide your name.'}
    }

    return {isValid: true}
  }
}
