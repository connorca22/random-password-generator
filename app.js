var SetupUI = (function() {
    let generateButton = document.querySelector('#generate');
    let display = document.querySelector('#display');
    let rangeLength = document.querySelector('#rangeLength')
    let slider = document.querySelector('#customRange2');
    let copyPw = document.querySelector('#copy');
    let panel1 = document.querySelector('#panel-1');
    let navbar = document.querySelector('.navbar');
    var iconDiv = document.querySelector('#icon-div');
    
    copyPw.addEventListener('click', () => {
      copy()
    });
    
    generateButton.addEventListener('click', () => {
      pwGen()
    });
    
    slider.addEventListener('input', function() {
      pwGen();
      rangeLength.innerHTML = slider.value;
    }, false);
    
    function pwGen() {      //Event handler triggered whenever generate button is clicked
    //password options
    const pwLength = parseInt(customRange2.value);
    const symbol = symbols.checked;
    const number = numbers.checked
    const lower = lowercase.checked;
    const upper = uppercase.checked;
    
    //variables
    let charString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+|{}:\"<>?`\[\]-=\\;\',./';
    let removeStr = [];
    let charArr;
    let result = '';
    
    //if symbol, number, lower, and upper are all unselected, advise to select one and return undefined
    if(!symbol && !number && !lower && !upper) {
      display.value = 'Please select at least one option';
      return undefined
    }
    
    //if include's are ticked it adds them to removeStr
    if(!symbol) { removeStr = removeStr.concat(charString.match(/[-!\$%\^&\*\(\)_\+\|~@#=`{}\[\]:";'<>\?,\.\\\/]/g)) }
    if(!number) { removeStr = removeStr.concat(charString.match(/[0-9]/g)) }
    if(!lower)  { removeStr = removeStr.concat(charString.match(/[a-z]/g)) }
    if(!upper)  { removeStr = removeStr.concat(charString.match(/[A-Z]/g)) }
    
    //converts charString to array, stores it in charArr and filters out any values in removeStr
    charArr = charString.split('').filter((val) => removeStr.indexOf(val) === -1);
    //for loop asssigns random value from charArr array to result, i === selected pwLength
    for (let i = 0; i < pwLength; i++) { result += charArr[Math.floor(Math.random() * (charArr.length -1)) + 1] }
    //input field displays result
    display.value = result;
    
    //make this section it's own function & DRY
    
    
    function changeColour() {
    
    let bgColour = '';
    let faIcon = '';
    
    if (pwLength === 10) {
     bgColour = '#ff9123';
     faIcon = "<i class='far fa-flag' id='shield-icon'></i><p id='icon-text' class='d-inline'> Fairly Secure</p>";
    } else if(pwLength < 10) {
      bgColour = '#f74020';
      faIcon = "<i class='far fa-flag' id='shield-icon'></i><p id='icon-text' class='d-inline'> Non-Secure</p>";
    } else if(pwLength > 10) {
     bgColour = '#2DB138';
     faIcon = "<i class='fas fa-shield-alt' id='shield-icon'></i><p id='icon-text' class='d-inline'> Secure Password</p>";
    }
      panel1.style.backgroundColor= bgColour;
      navbar.style.backgroundColor= bgColour;
        display.style.backgroundColor= bgColour;
        generateButton.style.backgroundColor= bgColour;
        copyPw.style.backgroundColor= bgColour;
        iconDiv.innerHTML = faIcon;
      document.querySelector('body').style.backgroundColor= bgColour;
    }
      changeColour()
    }
    
    function copy() {
        display.select()
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
    
    pwGen();
    
    })()