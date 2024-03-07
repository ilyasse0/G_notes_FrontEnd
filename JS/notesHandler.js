// Function to fetch and display all notes
async function fetchAndDisplayNotes() {
    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };

    try {
        let response = await fetch("http://localhost:9080/gnotes/api/gnotes/v1/notes/fetchAllNotes?id=70", {
            method: "GET",
            headers: headersList
        });

        const notesData = await response.json();

        // Get the table body element
        const tableBody = document.getElementById("noteTableBody");

        // Clear existing table rows
        tableBody.innerHTML = "";

        // Iterate over each note and create a table row
        notesData.forEach(note => {
            const row = createNoteRow(note);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
        // Handle error
    }
}

// Function to create a table row for a note
function createNoteRow(note) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${note.id}</td>
        <td>${note.date}</td> <!-- Display date -->
        <td>${note.subject}</td> <!-- Display subject -->
        <td>${note.body}</td> <!-- Display body -->
        <td>
            <button class="btn btn-danger" onclick="deleteNote(${note.id})">Delete</button>
            <button class="btn btn-primary" onclick="openUpdateModal(${note.id}, '${note.body}')">Update</button>
        </td>
    `;
    return row;
}


// Function to delete a note
async function deleteNote(noteId) {
    console.log("Deleting note with ID:", noteId);

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    };
    const bodyContent = JSON.stringify({
        "noteId": noteId
    });
    try {
        const response = await fetch("http://localhost:9080/gnotes/api/gnotes/v1/notes/delete", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        const data = await response.text();
        console.log("Deletion response:");
        console.log(data);

        // Refresh the table after deleting the note
        fetchAndDisplayNotes();
    } catch (error) {
        console.error("Error deleting note:", error);
        // Handle error
    }
}

// Call the fetchAndDisplayNotes function when the page loads
window.addEventListener("load", fetchAndDisplayNotes);
