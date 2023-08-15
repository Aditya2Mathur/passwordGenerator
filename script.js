const displayPassword = document.querySelector("[displayPassword]");
const copyBtn = document.querySelector("[copyBtn]");
const dataCopyMsg = document.querySelector("[data-copyMsg]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = " ";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set indicator color 
setIndicator("#ccc")

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    // slider color persentage
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100/(max - min)) +  "100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "10px 20px 30px blue";
}

function genRandomInteger(min, max) {
   return  Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return genRandomInteger(0, 9);
}

function generateUpparcase() {
    return String.fromCharCode(genRandomInteger(65, 91));
}

function generateLowercase() {
    return String.fromCharCode(genRandomInteger(97, 122));
}

function generateSymbol() {
    return String.fromCharCode(genRandomInteger(33, 42));
}


function calcStrength() {
    let hasUppar = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUppar = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;

    if (hasUppar && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("red")
    }
    else if ((hasLower || hasUppar)
     && (hasNum || hasSym)
     && passwordLength >= 6)
    {
        setIndicator("#ff0");
    }
    //  day - 38
    else {
        setIndicator("green");
    }
}

function shufflePassword(array) {
    // Fisher Yates method 
    for (let i = Array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = Array[temp];
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}
// Copy Button
async function copyContent() {
    try {
        await navigator.clipboard.writeText(displayPassword.value);
        dataCopyMsg.innerText = "COPIED";

    }
    catch (e) {
        dataCopyMsg.innerText = "NOT COPY";
    }

    dataCopyMsg.classList.add("active");

    setTimeout(() => {
        dataCopyMsg.classList.remove("active");
    }, 2000);
}

// eventListener'

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked)
            checkCount++;
    })

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (displayPassword.value > 0) {
        copyContent();
    }
})

// copyBtn.addEventListener('click', () => {
//     if(displayPassword.value)
//         copyContent();
// })
generateBtn.addEventListener('click', () => {
    if (checkCount == 0) {
        return;
    };

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    };
    // Start Password 
    console.log('Starting');
    password = "";

    // checked password length is not zero
    let functionArray = [];

    if(uppercaseCheck.checked) 
        functionArray.push(generateUpparcase);

    if(lowercaseCheck.checked) {
        functionArray.push(generateLowercase);
    }
    if(numberCheck.checked) {
        functionArray.push(generateRandomNumber);
    }
    if(symbolCheck.checked) {
        functionArray.push(generateSymbol);
    }

    for (let i = 0; i < functionArray.length; i++) {
        password += functionArray[i]();
    }
    console.log("Compulsory addition ");

    for(let i=0; i<passwordLength-functionArray.length; i++) {
        let randIndex = genRandomInteger(0 , functionArray.length);
        console.log("randIndex" + randIndex);
        password += functionArray[randIndex]();
    }functionArray
    console.log("remaining addition ")
    // suffle  password

    password = shufflePassword(Array.from(password));
    console.log('shufflePassword');
    
    displayPassword.value = password;
    console.log("Password showing in display");
    console.log(password);

    calcStrength();
});