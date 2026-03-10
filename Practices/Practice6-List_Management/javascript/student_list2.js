const MyStudent = new Student();
LoadTableArea();
function LoadTableArea() {
    const myTable = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    myTable.innerHTML = ''; // Clear the table before rendering filtered results
    
    const searchItem = document.getElementById('txtSearch');
    const searchValue = searchItem.value.toLowerCase();
    const students = MyStudent.StudentList();

    // FIXED: Added student_code to the filter criteria
    const filteredStudents = students.filter(student => {
        return (
            student.first_name.toLowerCase().includes(searchValue) ||
            student.last_name.toLowerCase().includes(searchValue) ||
            student.student_code.toString().includes(searchValue) // Allows searching by ID/Code
        );
    });

    let i = 0;
    filteredStudents.forEach(function (arrayItem) {
        i++;
        let row = myTable.insertRow();
        
        // Define cells
        let cell1 = row.insertCell(0); // No
        let cell2 = row.insertCell(1); // Student Code
        let cell3 = row.insertCell(2); // Full Name & [Sex]
        let cell4 = row.insertCell(3); // Contact
        let cell5 = row.insertCell(4); // On/Off
        let cell6 = row.insertCell(5); // Delete
        let cell7 = row.insertCell(6); // Edit

        // Fill Cells with data and styling
        cell1.classList.add("text-center");
        cell1.innerHTML = i;

        cell2.classList.add("text-center");
        cell2.innerHTML = arrayItem.student_code;

        // Use template literals for cleaner HTML injection
        cell3.innerHTML = `
            <div class='d-flex justify-content-between'>
                <div>${arrayItem.last_name} ${arrayItem.first_name}</div>
                <div>[${arrayItem.gender}]</div>
            </div>`;

        cell4.classList.add("text-center");
        cell4.innerHTML = arrayItem.contact;

        // Action Buttons
        cell5.classList.add("text-center");
        cell5.innerHTML = `<button type='button' class='btn btn-success btn-xs' onclick='OnOff_Fn("${arrayItem.id}")'>On/Off</button>`;

        cell6.classList.add("text-center");
        cell6.innerHTML = `<button type='button' class='btn btn-danger btn-xs' onclick='Delete_Fn("${arrayItem.id}")'>Delete</button>`;

        cell7.classList.add("text-center");
        cell7.innerHTML = `<button type='button' class='btn btn-success btn-xs' onclick='Edit_Fn("${arrayItem.id}")'>Edit</button>`;
    });
}

// Action Button Functions
function OnOff_Fn(id) {
    alert("On/Off on ID: " + id);
}

function Delete_Fn(id) {
    alert("Delete on ID: " + id);
}

function Edit_Fn(id) {
    alert("Edit on ID: " + id);
}

// Search Button Trigger
function searchSet() {
    LoadTableArea();
}
document.getElementById('txtSearch').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchSet();
    }
});