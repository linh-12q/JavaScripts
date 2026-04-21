function LoadTableArea() {
  const MyStudent = new Student();
  const $tableBody = $("#myTableBody");

  // 1. Clear the table first to avoid duplication
  $tableBody.empty();

  // 2. jQuery each loop
  $.each(MyStudent.StudentList(), function (index, arrayItem) {
    let i = index + 1;
    let newRow = `
            <tr>
                <td class='text-center'>${i}</td>
                <td class='text-center'>${arrayItem.student_code}</td>
                <td>
                    <div class='d-flex justify-content-between'>
                        <div>${arrayItem.last_name} ${arrayItem.first_name}</div>
                        <div>[${arrayItem.gender}]</div>
                    </div>
                </td>
                <td class='text-center'>${arrayItem.contact}</td>
                <td class='text-center'>
                    <button type='button' class='btn btn-success btn-xs btn-onoff' value='${arrayItem.id}'>On/Off</button>
                </td>
                <td class='text-center'>
                    <button type='button' class='btn btn-danger btn-xs btn-delete' value='${arrayItem.id}'>Delete</button>
                </td>
                <td class='text-center'>
                    <button type='button' class='btn btn-success btn-xs btn-edit' value='${arrayItem.id}'>Edit</button>
                </td>
            </tr>`;

    $tableBody.append(newRow);
  });
}

$(document).on("click", ".btn-onoff", function () {
  let Btvalue = $(this).val();
  $("#onOffBody").html(`Change status for ID: <b>${Btvalue}</b>?`);
  $("#btnConfirmOnOff").val(Btvalue);
  $("#ModalOnOff").modal("show");
});
$(document).on("click", "#btnConfirmOnOff", function () {
  let Btvalue = $(this).val();
  if (Btvalue) {
    console.log("Toggling status for student with ID: " + Btvalue);
    alert("Status toggled for student with ID: " + Btvalue);
    const onOffModal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("ModalOnOff"),
    );
    onOffModal.hide();
  }
});

// Delete Trigger (Opens Modal)
$(document).on("click", ".btn-delete", function () {
  let Btvalue = $(this).val();
  // Pass the ID to the actual "Yes" button inside the modal
  $("#btnConfirmDelete").val(Btvalue);
  $("#ModalDelete").modal("show");
});

// The actual "Delete Now" button inside the modal
$(document).on("click", "#btnConfirmDelete", function () {
  let Btvalue = $(this).val();
  if (Btvalue) {
    console.log("Deleting student with ID: " + Btvalue);
    alert("Deleting student with ID: " + Btvalue);
    // Logic to delete from database would go here
    // Close modal after deletion
    const deleteModal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("ModalDelete"),
    );
    deleteModal.hide();
  }
});

// Edit Handler
$(document).on("click", ".btn-edit", function () {
  let Btvalue = $(this).val();
  $("#editStudentId").val(Btvalue); // Set hidden input in Edit Modal
  $("#ModalEdit").modal("show");
});

// Load table when page is ready
$(document).ready(function () {
  LoadTableArea();
});
