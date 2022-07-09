document.querySelector("form#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = event.target.querySelector("input#email").value;
    const password = event.target.querySelector("input#password").value;
    console.log(email, password);
    const response = await fetch("//localhost:3001/api/v1/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    console.log(response);
    if (response.status == 200) {
        // window.location.href = "/dashboard";
        alert(" Login Successful!");
    } else {
        alert("Invalid email or password");
    }
});