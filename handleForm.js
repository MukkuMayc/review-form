var form = document.getElementById("review-form");
var formWrapper = document.getElementById("review-form-wrapper");
console.log(form);
function handleSubmit(e) {
  e.preventDefault();
  let formData = new FormData(form);
  fetch('http://localhost:8080/review', {
    body: JSON.stringify({
        reviewtext: formData.get('reviewtext')
    }),
    headers: {
        "Content-Type": "application/json",
    },
    method: "post"
  }).then(res => {
    showMessage(res.ok);
    // res.ok ? showSuccess() : showError();
  })
}

var messageNode;

function showMessage(ok) {
  if (messageNode) {
    formWrapper.removeChild(messageNode);
  }
  messageNode = document.createElement("div");
  messageNode.classList.add("alert");

  messageNode.textContent = ok ? "Success!" : "Error!";
  messageNode.classList.add(ok ? "alert-success" : "alert-danger");

  formWrapper.appendChild(messageNode);
}

function showSuccess() {
  if (errorNode) {
    formWrapper.removeChild(errorNode);
  }

  if (!successNode) {
    successNode = document.createElement("div");
    successNode.classList.add("alert", "alert-success");
    let text = document.createTextNode("Success!");
    successNode.appendChild(text);
  }

  formWrapper.appendChild(successNode);
}
function showError() {
  if (!errorNode) {
    var errorNode = document.createElement("div");
    errorNode.classList.add("alert", "alert-danger");
    let text = document.createTextNode("Error!");
    errorNode.appendChild(text);
  }

  if (successNode) {
    formWrapper.removeChild(successNode);
  }

  formWrapper.appendChild(errorNode);
}

form.addEventListener("submit", handleSubmit);