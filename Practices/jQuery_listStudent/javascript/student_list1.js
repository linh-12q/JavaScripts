LoadTableArea();

function LoadTableArea() {
    let text = "";
    const MyStudent = new Student();
    // console.log(MyStudent.StudentList());

    let myTable = document.getElementById('myTable').getElementsByTagName('tbody')[0];

    let i = 0;
    MyStudent.StudentList().forEach(function (arrayItem) {
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
        cell4.innerHTML = arrayItem.contact;

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