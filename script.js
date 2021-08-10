
const reverseStr=(str)=>{
    var listOfChars=str.split('');
    var reverseChars=listOfChars.reverse();
    return reverseChars.join('');
}

const isPalindrome=(str)=>{
    var reverse=reverseStr(str);
    return str===reverse;
}