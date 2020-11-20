const firstName = document.querySelector("#FNAME")
const lastName = document.querySelector("#LNAME")
const eMail = document.querySelector("#Email")
const phone = document.querySelector("#Phone")
const male = document.querySelector("#Male")
const female = document.querySelector("#Female")
const skills = document.querySelector("#skills")
const html = document.querySelector("#HTML")
const css = document.querySelector("#CSS")
const js = document.querySelector("#JavaScript")
const ajax = document.querySelector("#AJAX")
const position = document.querySelector("#position")
const button = document.querySelector("#submitForm")

let submitObject = {
  FName: "Sergey",
  LName: "Ivanov",
  Email: "s-ivanow@gmail.com",
  Phone: phone.value,
  Sex: (male.checked && male.value) || (female.checked && female.value),
  Skills: "",
  Department: "",
}

let stringUrl = ""

// first task

const createArraySkills = () => {
  return Array.from(skills.children)
    .filter((item) => item.children[0].checked)
    .map((item) => item.innerText.trim())
}

const createArrayPosition = () => {
  return Array.from(position.children)
    .filter((item) => item.selected)
    .map((item) => item.innerText.trim())
}

const createSubmitObject = () => {
  let arraySkills = createArraySkills()
  let arrayPositions = createArrayPosition()

  submitObject = {
    ...submitObject,
    FName: firstName.value,
    LName: lastName.value,
    Email: eMail.value,
    Phone: phone.value,
    Sex: (male.checked && male.value) || (female.checked && female.value),
    Skills: arraySkills.length ? arraySkills : "",
    Department: arrayPositions.length ? arrayPositions : "",
  }

  for (const key in submitObject) {
    if (!submitObject[key]) delete submitObject[key]
  }

  console.log(JSON.stringify(submitObject))
}

//  second task

const createStringUrl = () => {
  const stringSkills =
    (submitObject.Skills && submitObject.Skills.length) > 0
      ? submitObject.Skills.join("|")
      : ""
  const stringDepartment =
    (submitObject.Department && submitObject.Department.length) > 0
      ? submitObject.Department.join("|")
      : ""

  stringUrl = `submit-form__test/?FName=${submitObject.FName || ""}&LName=${
    submitObject.LName || ""
  }&Email=${submitObject.Email || ""}&Phone=${submitObject.phone || ""}&Sex=${
    submitObject.Sex || ""
  }&Skills=${stringSkills}&Department=${stringDepartment}`

  const url = new URL(stringUrl, "https://ihartsykala.github.io/")
  console.log(url.toString())

  history.pushState(null, null, url.toString())
}

button.addEventListener("click", (e) => {
  e.preventDefault(), createSubmitObject(), createStringUrl()
})

// third task

const fillObjectFields = () => {
  const params = new URLSearchParams(window.location.search)
  for (const param of params) {
    submitObject[param[0]] = param[1]
  }

  firstName.value = submitObject.FName || ""
  lastName.value = submitObject.LName || ""
  eMail.value = submitObject.Email || ""
  phone.value = submitObject.value || ""

  if (submitObject.Sex === "Female") female.checked = true
  if (submitObject.Sex === "Male") male.checked = true
  submitObject.Skills.split("|")

  let arrayCurrentSkills = Array.from(skills.children).filter(
    (item) => submitObject.Skills.indexOf(item.children[0].name) !== -1
  )
  arrayCurrentSkills = arrayCurrentSkills.map(
    (item) => (item.children[0].checked = true)
  )

  let arrayCurrentDepartaments = Array.from(position.children).filter(
    (item) => submitObject.Department.indexOf(item.value) !== -1
  )
  arrayCurrentDepartaments = arrayCurrentDepartaments.map(
    (item) => (item.selected = true)
  )
}

window.addEventListener("load", (e) => {
  fillObjectFields()
})
