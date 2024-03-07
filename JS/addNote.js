// Function to add a new note
async function addNote() {
    // Retrieve form inputs
    let date = document.getElementById("noteDateTime").value;
    let subject = document.getElementById("noteSubject").value;
    let body = document.getElementById("noteContent").value;
    let userId = 70; // Assuming you have a fixed userId
    
    // Construct the request body
    let requestBody = {
        "date": date,
        "subject": subject,
        "body": body,
        "idUser": userId
    };

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    };
    
    try {
        let response = await fetch("http://localhost:9080/gnotes/api/gnotes/v1/notes/add", { 
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: headersList
        });
        
        let data = await response.text();
        console.log(data);
        
        // Call function to fetch and display notes
        fetchAndDisplayNotes();
        
        // Close the modal
        const modal = document.getElementById("addNoteModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
        
        // Reset form fields
        document.getElementById("noteDateTime").value = "";
        document.getElementById("noteSubject").value = "";
        document.getElementById("noteContent").value = "";
    } catch (error) {
        console.error("Error adding note:", error);
        // Handle error
    }
}

// Call the addNote function when the form is submitted
document.getElementById("addNoteForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    addNote(); // Call the addNote function to add the note
});
