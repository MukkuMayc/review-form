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

form.addEventListener("submit", handleSubmit);