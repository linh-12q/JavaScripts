const pagination = document.getElementById('Pagination');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumbers = document.getElementById('page-numbers');
const MyStudent = new Student();

// Calculate the total number of pages
const itemPerPage = 10;
const totalPages = Math.ceil(MyStudent.StudentList().length / itemPerPage);
let currentPage = 1;

LoadTableArea(currentPage);
updatePagination();

function LoadTableArea(page) {
    let text = "";
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const filteredArray = MyStudent.StudentList().slice(startIndex, endIndex);

    let myTable = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    myTable.innerHTML = '';
    let i = 0;

    filteredArray.forEach(function (arrayItem) {
        i++;
        let row = myTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);

        cell1.setAttribute("align", "center");
        cell1.innerHTML = i;

        cell2.setAttribute("align", "center");
        cell2.innerHTML = arrayItem.student_code;

        cell3.innerHTML = "<div class='d-flex justify-content-between'><div>" + arrayItem.last_name + ' ' + arrayItem.first_name + "</div><div>[" + arrayItem.gender + "]</div></div>";

        cell4.setAttribute("class", "text-center");
        cell4.innerHTML = moment(arrayItem.created_date).format("MM-DD-YY");

        cell5.setAttribute("class", "text-center");
        cell5.innerHTML = "<button type='button' class='btn btn-success btn-xs' onclick='OnOff_Fn(\"" + arrayItem.id + "\")'>On/Off</button>";

        cell6.setAttribute("class", "text-center");
        cell6.innerHTML = "<button type='button' class='btn btn-danger btn-xs' onclick='Delete_Fn(\"" + arrayItem.id + "\")'>Delete</button>";

        cell7.setAttribute("class", "text-center");
        cell7.innerHTML = "<button type='button' class='btn btn-success btn-xs' onclick='Edit_Fn(\"" + arrayItem.id + "\")'>Edit</button>";
    });
}

function OnOff_Fn(id) {
    alert("On/Off on ID: " + id);
}

function Delete_Fn(id) {
    alert("Delete on ID: " + id);
}

function Edit_Fn(id) {
    alert("Edit on ID: " + id);
}

// Function to update pagination buttons and page numbers
function updatePagination() {
    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;

    if (currentPage === 1) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }

    if (currentPage === totalPages) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}

// Event listener for "Previous" button
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        LoadTableArea(currentPage);
        updatePagination();
    }
});

// Event listener for "Next" button
nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        LoadTableArea(currentPage);
        updatePagination();
    }
});