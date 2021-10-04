// Assignment Code
const generateBtn = document.querySelector("#generate");
const rChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?';
//generate password function (called on line 66)
function generatePassword(passLength,lowerCase,upperCase,numeric,specialChars){
  let nuArray = []; //create temp array which will hold our available characters
  let i = 0;
  //#region add char modes
  if (upperCase){ //add capitals
    for (i = 0; i < 26; i++) nuArray.push(rChars.charAt(i));
  }
  if (lowerCase){ //add lowercases
    for (i = 26; i < 52; i++) nuArray.push(rChars.charAt(i));
  }
  if (numeric){ //add numbers
    for (i = rChars.length-19; i < rChars.length-9; i++) nuArray.push(rChars.charAt(i));
  }
  if (specialChars){ //add special characters
    for (i = rChars.length-9; i < rChars.length; i++) nuArray.push(rChars.charAt(i));
  }
  console.log(nuArray);
  //#endregion
  let password = ""; //default string type
  let nuArrayL = nuArray.length; //so we don't have to get the length everytime
  for (i = 0; i < passLength; i++){
    password += nuArray[Math.floor(Math.random() * nuArrayL)]; //concat random index of temp array
  }
  return password;
}
// Write password to the #password input
function writePassword() {
  //#region get arguments for generator function
  let passLength = 0;
  while (isNaN(Number(passLength)) || passLength < 8 || passLength > 128){
    passLength = window.prompt("Type a password length that's at least 8 characters and no more than 128 characters long.");
    if (isNaN(Number(passLength))) window.alert("Enter a number!");
    else if (passLength < 8) window.alert("Too short!");
    else if (passLength > 128) window.alert("Too long!");
  }
  let lowerCase = false;
  let upperCase = false;
  let noLetters = false; //short hand bool to ask user if they don't want letters **OPTIONAL**
  while ((!lowerCase && !upperCase) && !noLetters){
    lowerCase = window.confirm("Should the password contain lowercase letters?");
    upperCase = window.confirm("What about uppercase letters?");
    if (!lowerCase && !upperCase){
      noLetters = window.confirm("If no lower case or upper case letters, use no letters?");
    }
  }
  //below is a few lines longer than it needs to be, but makes a more 'human' experience IMO
  let numeric = window.confirm("Should it contain numbers?");
  let specialChars = window.confirm("How about special characters?");
  if (noLetters && !numeric && !specialChars){ //if no letters,numbers,or specials, what are we doing here?
    while (!numeric && !specialChars && !lowerCase && !upperCase){
      noLetters = window.confirm("Then do you still want no letters?"); //assume ignorance
      if (!noLetters){
        lowerCase = window.confirm("Should the password contain lowercase letters?");
        upperCase = window.confirm("What about uppercase letters?");
      }
      else{
        numeric = window.confirm("Should it contain numbers?");
        specialChars = window.confirm("How about special characters?");
      }
    }
  }
  //#endregion
  let password = generatePassword(passLength,lowerCase,upperCase,numeric,specialChars);
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
