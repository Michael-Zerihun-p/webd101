let email = document.getElementById('email')
email.addEventListener('input', () => validate(email))

let submit = document.getElementById('submit')
submit.addEventListener('click', () => validate(email))

let dob = document.getElementById('dob')
submit.addEventListener('click', () => ageValidate(dob))


function getAge(today, birthDate) {
    let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

let dateELE = document.getElementById("dob");

dateELE.addEventListener("change", () => {
    let [year, month, date] = document.getElementById("dob").value.split("-");
  
    let dob = new Date(year, month, date);
    let Today = new Date();
  
    age = getAge(Today, dob);
  
    dateELE.style.border = "2px solid rgba(0, 0, 0, 0.4)";
    if (age < 18 || age > 55) {
      dateELE.setCustomValidity("Your age is not lies between 18 and 55");
      dateELE.style.border = "2px solid red";
      return;
    } else {
      dateELE.setCustomValidity("");
    }
  });

function validate(element){
    if(element.validity.typeMismatch ){
        element.setCustomValidity('The email is not in the right format:/')
        element.reportValidity()
    } else {
        element.setCustomValidity('')
    }
}

// ================================================================================

let userForm = document.getElementById('reg-form')  
let userEntries = []

let retriveEntries = () => {
   let locEntries = localStorage.getItem('user-entries')
   if (locEntries) {
       locEntries = JSON.parse(locEntries)
   } else {
       locEntries = []
   }
   return locEntries
}

let displayEntries = () => {
   let entries = retriveEntries()

   let tableEntries = entries.map((entry) => {
       let nameCell = `<td>${entry.name}</td>`
       let emailCell = `<td>${entry.email}</td>`
       let passwordCell = `<td>${entry.password}</td>`
       let dobCell = `<td>${entry.dob}</td>`
       let acceptTermsCell = `<td>${entry.acceptedTerms}</td>`

       let row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}`
       return row
   }).join('\n')

   let title = `<tr> <th scope="col">Name</th>
<th scope="col">Email</th>
<th scope="col">Password</th>
<th scope="col">Dob</th>
<th scope="col">Accepted terms?</th>
</tr>`
   
   let tableHtml = title + tableEntries
   let table = document.getElementById('localStorage')
   console.log(tableHtml)
   table.innerHTML = tableHtml + ' '
}
let saveUserForm = (event) => {
   event.preventDefault()
   let name = document.getElementById('name').value
   let email = document.getElementById('email').value
   let password = document.getElementById('password').value
   let dob = document.getElementById('dob').value
   
   let acceptedTerms = document.getElementById('acceptTerm').checked

   let entry = {
                   name,
                   email,
                   password,
                   dob,
                   acceptedTerms
   }

   userEntries.push(entry)
   localStorage.setItem('user-entries', JSON.stringify(userEntries))
   displayEntries()
}
userForm.addEventListener('submit', saveUserForm)


