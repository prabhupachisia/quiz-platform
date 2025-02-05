function showForm(role) {
    if (role === "admin") {
        document.getElementById("admin-form").style.display = "block";
        document.getElementById("user-form").style.display = "none";
    } else {
        document.getElementById("admin-form").style.display = "none";
        document.getElementById("user-form").style.display = "block";
    }
}

let adminsubmit = document.getElementById("admin-submit");
let usersubmit = document.getElementById("user-submit");
adminsubmit.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "admin.html";
});

usersubmit.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "quiz/start.html";
});

