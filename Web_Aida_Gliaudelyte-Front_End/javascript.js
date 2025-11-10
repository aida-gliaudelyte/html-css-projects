//Function to allow menu bar functionality
function openMenu() {
    var x = document.getElementById("menuLinks");
    if (x.className === "menu") 
    {
        x.className += " visible";
    } else 
    {
        x.className = "menu";
    }
}

//Function to allow genre menu button functionality
function openMenu2(){
    var x=document.getElementById("genreLinks");
    if (x.className === "genre") 
    {
        x.className += " visible";
    } else 
    {
        x.className = "genre";
    }
}

//Function to load xml document and prepare for reading
function loadXMLDoc(ind,pages) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this,ind,pages);
        }
    };
    xmlhttp.open("GET", "products.xml", true);
    xmlhttp.send();
}

//Function to read xml content and pass it to html
function myFunction(xml,ind,pages) {
    var i;
    var booksPerPage = pages;
    var titleId;
    var authorId;
    var priceId;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("BOOK");
    for (i = ind-1; i <ind+booksPerPage; i++) { 
        title= x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
        author=x[i].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue;
        price =x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue;
        titleId = "title"+ind;
        authorId = "author"+ind;
        priceId = "price"+ind;
        document.getElementById(titleId).innerHTML = title;
        document.getElementById(authorId).innerHTML = author;
        document.getElementById(priceId).innerHTML ="£"+ price;
        ind++;    
    }
}


//To help make slideshows i used example from:
//https://www.w3schools.com/howto/howto_js_slideshow.asp
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto
//https://www.w3schools.com/w3css/w3css_slideshow.asp

//Manual slideshow function to read users input which slide to show
function currentSlide(n) {
    clearTimeout(t);
    var img = document.getElementById("img1");
    img.style.display="none";
    showSlide(slideIndex = n);   
}

//Manual slideshow function that shows the required slide
function showSlide(n) {
    var i;
    var a = document.getElementsByClassName("caption");
    var x = document.getElementsByClassName("allSlides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        a[i].style.display = "none";
    } 
    x[slideIndex-1].style.display = "block";
    a[slideIndex-1].style.display = "block";
    t= setTimeout(moveToNextSlide, 3000,slideIndex-1);
}

//Automatic slideshow function
var names=  [1,2,3,4,5,6];
function moveToNextSlide(ind){
    var i;
    var index=ind;
    var x = document.getElementsByClassName("allSlides");
    var a = document.getElementsByClassName("caption");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        a[i].style.display = "none";
    }
    if (index >= names.length - 1)
    {
        index=-1;
    }
    var img = document.getElementById("img1");
    img.style.display = "block";   
    index = index + 1;
    a[index].style.display = "block";
    var slideName="images/img" + names[index] + ".jpeg";
    img.src=slideName;
    t= setTimeout(moveToNextSlide, 3000,index);
}

//Function to validate registration form inputs
function formValidation() {
    var name = document.forms["regForm"]["FirstName"].value;
    var lname = document.forms["regForm"]["LastName"].value;
    var email = document.forms["regForm"]["Email"].value;
    var password = document.forms["regForm"]["Password"].value;
    var password2 = document.forms["regForm"]["Password2"].value;
    var phone = document.forms["regForm"]["Phone"].value;
    var city = document.forms["regForm"]["City"].value;
    //Letter validation pattern is taken from: https://stackoverflow.com/questions/9289451/regular-expression-for-alphabets-with-spaces
    var letters =  /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
    //Email validation pattern is taken from: https://www.w3resource.com/javascript/form/email-validation.php
    var mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //Password validation pattern is taken from: https://www.the-art-of-web.com/javascript/validate-password/
    var passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    var phonePattern= /[0-9]{12}/;
    if (!(name.match(letters))) {
        alert("Incorrect name input.Name can only contain letters and spaces.");
        return false;
    }
    if (!(lname.match(letters))) {
        alert("Incorrect last name input.Last name can only contain letters and spaces.");
        return false;
    }
    if (!(email.match(mailPattern))) {
        alert("Incorrect email input. Please follow required pattern: E.g john.smith@gmail.com\n Special characters ! # $ % & ‘ * + – / = ? ^ ` . { | } ~ are not allowed");
        return false;
    }
    if (!(password.match(passwordPattern))) {
        alert("Incorrect password input. Password must be at least 8 characters and contain at least one:\nUpper case letter\nLower case letter\nNumber");
        return false;
    }
    if (password != password2) {
        alert("Incorrect repeat password input. Passwords must match!");
        return false;
    }
    if (!(phone.match(phonePattern))) {
        alert("Incorrect phone input. Please follow the required pattern: E.g +447874044526");
        return false;
    }
    if (!(city.match(letters))) {
        alert("Incorrect city input. City can only contain letters and spaces.");
        return false;
    }    
}

//Function to validate sign in form inputs
function logFormValidation() {
    var email = document.forms["logForm"]["Email"].value;
    var password = document.forms["logForm"]["Password"].value;
    //Email validation pattern is taken from: https://www.w3resource.com/javascript/form/email-validation.php
    var mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //Password validation pattern is taken from: https://www.the-art-of-web.com/javascript/validate-password/
    var passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!(email.match(mailPattern))) {
        alert("Incorrect email input. Please follow required pattern: E.g john.smith@gmail.com\n Special characters ! # $ % & ‘ * + – / = ? ^ ` . { | } ~ are not allowed");
        return false;
    }
    if (!(password.match(passwordPattern))) {
        alert("Incorrect password input. Password must be at least 8 characters and contain at least one:\nUpper case letter\nLower case letter\nNumber");
        return false;
    }
}

//Function to validate contact-us form input
function contactValidation() {
    var email = document.forms["contactForm"]["Email"].value;
    //Email validation pattern is taken from: https://www.w3resource.com/javascript/form/email-validation.php
    var mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!(email.match(mailPattern))) {
        alert("Incorrect email input. Please follow required pattern: E.g john.smith@gmail.com\n Special characters ! # $ % & ‘ * + – / = ? ^ ` . { | } ~ are not allowed");
        return false;
    }
}