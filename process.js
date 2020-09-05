function processForm() {
  document.getElementById("submit").innerHTML = "processing...";
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');

  formData.append("filetoupload", fileField.files[0]);

  fetch("https://pptxmanipulator.herokuapp.com/fileupload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
      document.getElementById("submit").innerHTML =
        "Done, make another request";
      document.getElementById("result").innerHTML = result;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("submit").innerHTML =
        "Ouch, Failed, make another request";
    });

  return false;
}
