document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("done hete so far")

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    };

    const bodyContent = JSON.stringify({
        "email": email,
        "password": password
    });

    try {
        const response = await fetch("http://localhost:9080/gnotes/api/gnotes/v1/users/auth", {
            method: "POST",
            body: bodyContent,
            headers: headersList,
            //credentials: 'include' // Include cookies
        });

        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
            if (responseData.isAdmin) {
                console.log("Redirecting to admin page");
                localStorage.setItem("userId", responseData.id);
                localStorage.setItem("mail", responseData.email);


                window.location.href = "adminMainPage.html";
            } else {
                console.log("User is not admin");
                localStorage.setItem("userId", responseData.id);
                localStorage.setItem("mail", responseData.email);
                // Redirect to user page or display a message
                window.location.href = "userMainpage.html";
            }
        } else {
            console.error("Error response:", response.status);

            // Handle error response
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "An error occurred. Please try again later.";
    }
});
