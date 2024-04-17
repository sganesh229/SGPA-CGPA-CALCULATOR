let subjectsMarks = [];

function addSubjects() {
    const calculationType = document.getElementById("calculationType").value;
    const semester = document.getElementById("semester").value;
    const subjectsDiv = document.getElementById("subjects");
    subjectsDiv.innerHTML = "";
    subjectsMarks = [];
    
    for (let i = 1; i <= semester; i++) {
        const subjectDiv = document.createElement("div");
        
        const marksInput = document.createElement("input");
        marksInput.type = "number";
        marksInput.placeholder = `Enter marks for SGPA Calculation/Enter SGPA for CGPA Calculation ${i}`;
        marksInput.id = `marks${i}`;
        marksInput.min = 0;
        marksInput.max = 100;
        
        const creditsInput = document.createElement("input");
        creditsInput.type = "number";
        creditsInput.placeholder = `Enter Credits for Subject ${i}`;
        creditsInput.id = `credits${i}`;
        creditsInput.min = 0;
        creditsInput.max = 10;
        
        subjectDiv.appendChild(marksInput);
        if (calculationType === "sgpa") {
            subjectDiv.appendChild(creditsInput);
        }
        subjectsDiv.appendChild(subjectDiv);
    }
    
    document.getElementById("semesterInput").style.display = "none";
    document.getElementById("subjects").style.display = "block";
}

function calculate() {
    const calculationType = document.getElementById("calculationType").value;
    
    if (calculationType === "sgpa") {
        calculateSGPA();
    } else if (calculationType === "cgpa") {
        calculateCGPA();
    }
}

function calculateSGPA() {
    const semester = document.getElementById("semester").value;
    let totalCredits = 0;
    let totalPoints = 0;
    let invalidInput = false;

    for (let i = 1; i <= semester; i++) {
        const marks = parseFloat(document.getElementById(`marks${i}`).value);
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        
        if (isNaN(marks) || isNaN(credits) || marks < 0 || marks > 100 || credits < 0 || credits > 10) {
            invalidInput = true;
            break;
        }

        totalCredits += credits;
        let points = 0;

        if (marks >= 90) {
            points = 10;
        } else if (marks >= 80) {
            points = 9;
        } else if (marks >= 70) {
            points = 8;
        } else if (marks >= 60) {
            points = 7;
        } else if (marks >= 50) {
            points = 6;
        } else if (marks >= 40) {
            points = 4;
        }

        totalPoints += points * credits;
    }

    if (invalidInput) {
        document.getElementById("result").innerHTML = "Invalid input: Marks should be between 0 and 100, and credits should be between 0 and 10.";
    } else {
        const sgpa = totalPoints / totalCredits;
        document.getElementById("result").innerHTML = `SGPA: ${sgpa.toFixed(2)}`;
    }
}

function calculateCGPA() {
    const semester = document.getElementById("semester").value;
    let totalSGPA = 0;
    let invalidInput = false;

    for (let i = 1; i <= semester; i++) {
        const sgpa = parseFloat(document.getElementById(`marks${i}`).value);
        
        if (isNaN(sgpa) || sgpa < 0 || sgpa > 10) {
            invalidInput = true;
            break;
        }

        totalSGPA += sgpa;
    }

    if (invalidInput) {
        document.getElementById("result").innerHTML = "Invalid input: SGPA should be between 0 and 10.";
    } else {
        const cgpa = totalSGPA / semester;
        document.getElementById("result").innerHTML = `CGPA: ${cgpa.toFixed(2)}`;
    }
}

document.getElementById("calculationType").addEventListener("change", function() {
    const calculationType = this.value;
    const semesterInput = document.getElementById("semesterInput");
    const subjectsDiv = document.getElementById("subjects");

    subjectsDiv.innerHTML = ""; // Clear any existing input fields

    if (calculationType === "sgpa") {
        semesterInput.style.display = "block";
        semesterInput.innerHTML = '<label for="semester">Enter Number of Subjects:</label>' +
            '<input type="number" id="semester" min="1" max="10" required>';
    } else {
        semesterInput.style.display = "block";
        semesterInput.innerHTML = '<label for="semester">Enter Number of Semesters:</label>' +
            '<input type="number" id="semester" min="1" max="10" required>';
    }
});

// Trigger the change event on calculation type select element
document.getElementById("calculationType").dispatchEvent(new Event("change"));
