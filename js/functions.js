/* Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.*/
function checkStrLength(str, maxLength) {
  return str.length <= maxLength;
}

checkStrLength('', 0);

/* Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.  */
function isPalindrome(inputStr) {
  const str = inputStr.replaceAll(' ', '').toLowerCase();
  let startIndex = 0;
  let endIndex = str.length - 1;

  while(startIndex <= endIndex) {
    if (str[startIndex++] !== str[endIndex--]) {
      return false;
    }
  }

  return true;
}

isPalindrome('');

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN. */
function getNumber(str) {
  let strNum = '';

  for(let i = 0; i < str.length; i++) {
    if(!isNaN(str[i])) {
      strNum += str[i];
    }
  }

  strNum = strNum.replaceAll(' ', '');
  return strNum === '' ? NaN : Number(strNum);
}

getNumber('');
