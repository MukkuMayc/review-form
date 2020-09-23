var form = document.getElementById("review-form");
var formWrapper = document.getElementById("review-form-wrapper");
console.log(form);
function handleSubmit(e) {
  e.preventDefault();
  let formData = new FormData(form);
  (async () => {
    var isOk = false;
    await fetch('http://localhost:8080/review', {
      body: JSON.stringify({
          reviewtext: formData.get('reviewtext')
      }),
      headers: {
          "Content-Type": "application/json",
      },
      method: "post"
    })
    .then(res => {
      isOk = res.ok;
      return res.text();
    })
    .then(text => {
      showMessage(isOk, text);
    })
    .catch(e => {
      console.error('Error:', e);
    });
  })()
}

var messageNode;

function showMessage(ok, res) {
  if (messageNode) {
    formWrapper.removeChild(messageNode);
  }
  messageNode = document.createElement("div");
  messageNode.classList.add("alert");

  messageNode.textContent = (ok ? "Success! " : "Error! ") + res;
  messageNode.classList.add(ok ? "alert-success" : "alert-danger");

  formWrapper.appendChild(messageNode);
}

form.addEventListener("submit", handleSubmit);