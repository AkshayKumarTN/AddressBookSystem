class Contact {

    constructor(...params) {
      this.firstName = params[0];
      this.lastName = params[1];
      this.address = params[2];
      this.city = params[3];
      this.state = params[4];
      this.zip = params[5];
      this.phoneNo = params[6];
      this.email = params[7];
    }

    get firstName() {return this._firstName;}
    set firstName(firstName) { 
        const nameRegexPattern = RegExp("^[A-Z]{1}[a-z]{2,}$");
        if (nameRegexPattern.test(firstName)) this._firstName = firstName;
        else throw "Invalid First Name";
    }
    
    get lastName() {return this._lastName;}
    set lastName(lastName) {
        const nameRegexPattern = RegExp("^[A-Z]{1}[a-z]{2,}$");
        if (nameRegexPattern.test(lastName)) this._lastName = lastName;
        else throw "Invalid Last Name";
    }
    
    get address() {return this._address;}
    set address(address) {
        const locationRegex = RegExp("^[A-Z]{1}[a-z]{3,}$");
        if(locationRegex.test(address))this._address = address; 
        else throw "Invalid Address";
    }
    
    get city() {return this._city;}
    set city(city) {
        const locationRegex = RegExp("^[A-Z]{1}[a-z]{3,}$");
        if(locationRegex.test(city))this._city = city; 
        else throw "Invalid City";
    }
    
    get state() {return this._state;}
    set state(state) {
        const locationRegex = RegExp("^[A-Z]{1}[a-zA-Z ]{3,}$");
        if(locationRegex.test(state))this._state = state; 
        else throw "Invalid State";
    }
    
    get zip() {return this._zip;}
    set zip(zip) {
        const pinRegex = RegExp("^([1-9])(\\S){2}(\\s)?\\S{2}[0-9]$");
        if(pinRegex.test(zip))this._zip = zip;
        else throw "Zip is Invalid";
    }
    
    get phoneNo() {return this._phoneNo;}
    set phoneNo(phoneNo) {
        const phoneRegex = RegExp("^\\d{2} [1-9]\\d{9}$");
        if(phoneRegex.test(phoneNo)) this._phoneNo = phoneNo;
        else throw "Invalid Phone No";
    }
    
    get email() {return this._email;}
    set email(email) {
        const emailRegex = RegExp("^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$");
        if(emailRegex.test(email)) this._email = email;
        else throw "Invalid Email";
    }

    toString(){
        return "First Name : "+ this.firstName + ", Last Name : "+ this.lastName + ", Address : "+ this.address + 
        ", city : "+ this.city + ", State : "+ this.state +", Zip : "+ this.zip+ ", Phone No : "+ this.phoneNo + ", Email : "+ this.email;
    }
}  
let addressBookArr = new Array();
let contactsCityMap = new Map();
let contactsStateMap = new Map();
let countCityMap = new Map();
let countStateMap = new Map();

function contactExists(fName, lName){
    return addressBookArr.some(u => u.firstName == fName && u.lastName == lName);
}

function addContact(newContact){
    if(contactExists(newContact.firstName, newContact.lastName)){
        throw "Already Present";
    }else{
        addressBookArr.push(newContact);
    }
 }

function editContact(fName, lName, property, value){
    if(contactExists(fName, lName)){
    switch(property){
        case "address":
            addressBookArr.find((contact) => contact.firstName == fName).address = value;
            break;
        case "city":
            addressBookArr.find((contact) => contact.firstName == fName).city = value;
            break;
        case "state":
            addressBookArr.find((contact) => contact.firstName == fName).state = value;
            break;
        case "zip":
            addressBookArr.find((contact) => contact.firstName == fName).zip = value;
            break;
        case "phone":
            addressBookArr.find((contact) => contact.firstName == fName).phoneNo = value;
            break;
        case "email":
            addressBookArr.find((contact) => contact.firstName == fName).email = value;
            break;
        default:
            console.log("Enter valid property");
    }
  }else{
      console.log("Contact Does Not Exist");
  }
}

function deleteContact(fName, lName){
    if(contactExists(fName, lName)){
    addressBookArr = addressBookArr.filter((user) => user.firstName != fName && user.lastName != lName);
    }else{
        console.log("Contact Does Not Exist");
    }
}

function countContact(count) {
    count += 1;
    return count;
}

function searchContactByCity(city) {
    return addressBookArr.filter((contact) => contact.city == city);
  }
  
function searchContactByState(state) {
    return addressBookArr.filter((contact) => contact.state == state);
  }

function viewContactsByCity(){
    addressBookArr.filter((contact) => contactsCityMap.set(contact.city, searchContactByCity(contact.city)));
    return contactsCityMap;
}

function viewContactsByState(){
    addressBookArr.filter((contact) => contactsCityMap.set(contact.state, searchContactByCity(contact.state)));
    return contactsStateMap;
}

function countByCity(){
    addressBookArr.filter((contact) => countCityMap.set(contact.city, searchContactByCity(contact.city).length));
    return countCityMap;
}

function countByState(){
    addressBookArr.filter((contact) => countStateMap.set(contact.state, searchContactByCity(contact.state).length));
    return countStateMap;
}

function sortContact(property){
    switch(property){
        case "city":
            addressBookArr.sort((person1, person2) => (person1.city).localeCompare(person2.city));
            return addressBookArr;
            break;
        case "state":
            addressBookArr.sort((person1, person2) => (person1.state).localeCompare(person2.state));
            return addressBookArr;
            break;
        case "zip":
            addressBookArr.sort((person1, person2) => (person1.zip).localeCompare(person2.zip));
            return addressBookArr;
            break;
        default:
            console.log("Enter Valid Property");
    }
}

try
{
    let contact1 = new Contact("Guru", "Kumar", "Ramapuram", "Chennai", "TamilNadu", "600069", "91 9876543219", "guru@gmail.com");
    addressBookArr.push(contact1);
}
catch(e)
{
    console.error(e);
}
try
{
    let contact2 = new Contact("Max", "Willson", "Palanipet", "Chennai", "TamilNadu", "600069", "91 9876544598", "max@gmail.com");
    addressBookArr.push(contact2);
}
catch(e)
{
    console.error(e);
}
let contact3 = new Contact("Arijit", "Dey", "Sodepur", "Kolkata", "West Bengal", "123456", "91 9898989898", "arijit@gmail.com");
let contact4 = new Contact("Raj", "Pal", "Kalyani", "Kolkata", "West Bengal", "234567", "91 9898989897", "raj@gmail.com");
try{
    addressBookArr.push(contact3);
}
catch(e)
{
    console.error(e);
}
try
{
    addressBookArr.push(contact4);
}
catch(e)
{
    console.error(e);
}

console.log(addressBookArr);
editContact("Max", "Willson", "address", "Kandigai");
console.log(addressBookArr);
console.log("No of contacts : "+ addressBookArr.reduce(countContact, 0));
deleteContact("Raj", "Pal");
console.log(addressBookArr);
console.log("No of contacts : "+ addressBookArr.reduce(countContact, 0));
try{
    addContact(contact3);
    }catch(e){
        console.error(e);
}

console.log(searchContactByCity("Kolkata"));
console.log(viewContactsByCity("Kolkata"));
console.log(countByCity());

addressBookArr.sort((person1, person2) => (person1.firstName).localeCompare(person2.firstName));
console.log(addressBookArr);
console.log("******************sort Contact State*********************");
console.log(sortContact("state"));
console.log("******************sort Contact Zip*********************");
console.log(sortContact("zip"));