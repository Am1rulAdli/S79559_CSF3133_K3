// Error 1 (grade.html, Line 9): onsubmit="checkMark()" is missing 'return', so the form submits and reloads the page even when checkMark() returns false. Fixed to onsubmit="return checkMark()".
// Error 2 (grade.html, Line 17): onclick="showtable()" uses wrong casing; JavaScript is case-sensitive. Fixed to onclick="showTable()".
// Error 3 (grade.html, Line 19): <script src="grades.js"> has the wrong filename, so the script does not load. Fixed to src="grade.js".
// Error 4 (grade.js, Line 5): if (name = "") uses assignment (=) instead of comparison (===), so an empty name is never caught. Fixed to if (name === "").
// Error 5 (grade.js, Line 9): isNan(mark) uses wrong casing and throws a ReferenceError. Fixed to isNaN(mark).
// Error 6 (grade.js, Line 14): if (mark < 0 && mark > 100) uses && (impossible to be both < 0 and > 100). Fixed to || (mark < 0 || mark > 100).
// Error 7 (grade.js, Line 28): document.getElementByID("result") uses wrong casing (ID instead of Id). Fixed to document.getElementById("result").
// Error 8 (grade.js, Line 30): style.colour uses British spelling instead of CSS/JS property style.color. Fixed to style.color.
// Error 9 (grade.js, Line 31): return true allows the form to submit and reload the page, making the result disappear immediately. Fixed to return false.
// Error 10 (grade.js, Line 38): for (let i = 1; i < grades.length; i++) starts at index 1 instead of 0, skipping grade "A". Fixed to let i = 0.
// Error 11 (grade.js, Line 42): .innerHtml uses wrong casing, so the table never displays. Fixed to .innerHTML.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extension Step 5: Check for empty mark
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate numeric value
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    let mark = parseInt(markInput, 10);

    // Validate mark range (0 to 100)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and colour (Extension Step 6)
    let grade;
    let color;
    if (mark >= 80) {
        grade = "A";
        color = "green";
    } else if (mark >= 65) {
        grade = "B";
        color = "green";
    } else if (mark >= 50) {
        grade = "C";
        color = "orange";
    } else {
        grade = "F";
        color = "red";
    }

    // Display grade result with colour
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = color;

    // Extension Step 8: Display date and time checked below the result
    let timeEl = document.getElementById("checkedTime");
    timeEl.innerHTML = "Checked on: " + Date();
    timeEl.style.color = color;

    // Prevent form reload so result stays visible
    return false;
}

// Extension Step 7: Generate a random whole number from 0 to 100
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Display all four grades in a styled table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}