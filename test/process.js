function processForm() {
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');

  formData.append("filetoupload", fileField.files[0]);

  fetch("http://localhost:3000/fileupload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return false;
}
