let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify({
     "id": 5,
     "date": "2024-03-10",
     "subject": "Test Note",
     "body": "This is a test note created for testing purposes."
    
   });
   
   let response = await fetch("https://localhost:9443/gnotes/api/gnotes/v1/notes/delete", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.text();
   console.log(data);
   