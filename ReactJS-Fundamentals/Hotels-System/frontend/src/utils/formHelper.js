export default class FormHelper {
  static handleFormChange (event, object) {
    const target = event.target
    const field = target.name
    const value = target.value

    return Object.assign({}, object, {[field]: value})
  }

  static getFirstError (data) {
    let firstError = data.message
    if (data.errors) {
      firstError = Object
          .keys(data.errors)
          .map(k => data.errors[k])[0]
    }
    return firstError
  }
}
