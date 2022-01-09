const reverseStr = (str) => {
  const listOfChars = str.split("");
  const reverseChars = listOfChars.reverse();
  return reverseChars.join("");
};

const isPalindrome = (str) => {
  var reverse = reverseStr(str);
  return str === reverse;
};

const convertDateToStr = (date) => {
  const dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) dateStr.day = "0" + date.day;
  else dateStr.day = date.day.toString();

  if (date.month < 10) dateStr.month = "0" + date.month;
  else dateStr.month = date.month.toString();

  dateStr.year = date.year.toString();
  return dateStr;
};

const getAllDateFormats = (date) => {
  const dateStr = convertDateToStr(date);
  //   console.log(dateStr);

  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllFormats = (date) => {
  const listOfPalindromes = getAllDateFormats(date);

  let flag = false;

  for (let palindrome of listOfPalindromes) {
    if (isPalindrome(palindrome)) {
      flag = true;
      break;
    }
  }

  return flag;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
};

const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year };
};

const getPrevDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      day = 28;
      month--;
    }
  } else {
    if (day < 1) {
      month--;
      day = daysInMonth[month];
    }
  }
  if (month < 1) {
    month = 12;
    year--;
  }

  return { day: day, month: month, year: year };
};

const getNextPalindrome = (date) => {
  let ctrNext = 0;
  let nextDate = getNextDate(date);

  while (1) {
    ctrNext++;
    let isPalindrome = checkPalindromeForAllFormats(nextDate);
    if (isPalindrome) break;
    nextDate = getNextDate(nextDate);
  }

  return [ctrNext, nextDate];
};

const getPrevPalindrome = (date) => {
  let ctrPrev = 0;
  let prevDate = getPrevDate(date);

  while (1) {
    ctrPrev++;
    let isPalindrome = checkPalindromeForAllFormats(prevDate);
    if (isPalindrome) break;
    prevDate = getPrevDate(prevDate);
  }

  return [ctrPrev, prevDate];
};

// date = {
//   day: 1,
//   month: 3,
//   year: 2021,
// };

// console.log(getPrevDate(date));

// console.log(checkPalindromeForAllFormats(date));
// console.log(getNextDate(date));
// console.log(getNextPalindrome(date));

const bdayInput = document.querySelector("#bday-input");
const showBtn = document.querySelector("#show-btn");
const output = document.querySelector("#result");

// console.log(showBtn);

const clickHandler = () => {
  let bdayStr = bdayInput.value;
  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");
    // console.log(listOfDate);
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    // console.log(date);
    const isPalindrome = checkPalindromeForAllFormats(date);
    // console.log(isPalindrome);

    if (isPalindrome) {
      output.innerText = `Yay! your birthday is a palindrome!!`;
    } else {
      const [ctrNext, nextDate] = getNextPalindrome(date);
      const [ctrPrev, prevDate] = getPrevPalindrome(date);
      // console.log(ctrNext);
      // console.log(ctrPrev);

      if (ctrNext < ctrPrev) {
        output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctrNext} days!`;
      } else {
        output.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed  it by ${ctrPrev} days!`;
      }
    }
  }
};
showBtn.addEventListener("click", clickHandler);
