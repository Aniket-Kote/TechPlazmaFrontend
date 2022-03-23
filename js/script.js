var formsubmission = document.getElementById("formsubmission");
var error = document.querySelector(".error");
var submitbtn = document.querySelector(".submitbtn");
let loading = false;

formsubmission.addEventListener("submit", function (e) {
  // auto submission of form
  e.preventDefault();
  loading = true;

  setLoadingval(loading);
  let username = document.getElementById("username").value;
  let emailid = document.getElementById("emailid").value;
  let contactNumber = document.getElementById("contactNumber").value;
  let message = document.getElementById("message").value;
  contactNumber = contactNumber.toString();
  // post request
  // console.log(typeof(username));
  fetch("https://techplazma-backed-api.herokuapp.com/contact", {
    method: "POST",
    body: JSON.stringify({
      name: username,
      email: emailid,
      phoneno: contactNumber,
      visitormessage: message,
    }),
    headers: { "Content-Type": "application/json ; charset=utf-8" },
  })
    .then((response) => {
      loading = false;
      setLoadingval(loading);
        formsubmission.reset()
      return response.json();
    })
    .then((data) => {
        error.innerHTML = data.message;
        setTimeout(() => {
            error.innerHTML = " ";
        }, 3000);
      //   console.log(data);
      
    });
});

function setLoadingval(loading) {
  if (loading == true) {
    submitbtn.value = "Loading...";
  } else {
    submitbtn.value = "Submit";
  }
}
