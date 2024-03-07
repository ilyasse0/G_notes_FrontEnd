// Wrap the code inside an async function
async function fetchData() {
  let headersList = {
      "Accept": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  };
  
  try {
      let response = await fetch("http://localhost:9080/gnotes/api/gnotes/v1/notes/fetchAllNotes?id=70", {
          method: "GET",
          headers: headersList
      });
      
      let notesData = await response.json(); // Parse JSON data
      
      // Get the table body element
      let tableBody = document.getElementById("noteTableBody");
      
      // Clear existing table rows
      tableBody.innerHTML = "";
      
      // Iterate over each note and create a table row
      notesData.forEach(note => {
          let row = createNoteRow(note);
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
  }
}

// Function to create a table row for a note
function createNoteRow(note) {
  let row = document.createElement("tr");
  row.innerHTML = `
      <td>${note.id}</td>
      <td>${note.date}</td> <!-- Updated column for date -->
      <td>${note.subject}</td> <!-- Updated column for subject -->
      <td>${note.body}</td> <!-- Updated column for body -->
      <td>
          <button class="btn btn-danger" onclick="deleteNote(${note.id})">Delete</button>
          <button class="btn btn-primary" onclick="openUpdateModal(${note.id}, '${note.body}')">Update</button>
      </td>
  `;
  return row;
}

// Call the fetchData function when the page loads
window.addEventListener("load", fetchData);
