export default class Utils {
  static urldecode(str: string) {
    if (!str) {
      return '';
    }
    return decodeURIComponent(
      str
        .replace(/\+/g, '%20')
        .replace(/\%21/g, '!')
        .replace(/\%27/g, "'")
        .replace(/\%28/g, '(')
        .replace(/\%29/g, ')')
        .replace(/\%2A/g, '*')
        .replace(/\%7E/g, '~')
    );
  }

  static urlencode(str: string) {
    return encodeURIComponent(str)
      .replace(/\%20/g, '+')
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/\~/g, '%7E');
  }

  static validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
