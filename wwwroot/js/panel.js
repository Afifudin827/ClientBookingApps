$(document).ready(function () {

    let table = $("#tableEmployee").DataTable({
        ajax: {
            url: "https://localhost:7134/server/Employee/Detail",
            dataType: "JSON",
            dataSrc: "data"
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: "nik" },
            { data: "fullName" },
            { data: "birthDate" },
            { data: "gender" },
            { data: "hiringDate" },
            { data: "email" },
            { data: "phoneNumber" },
            { data: "major" },
            { data: "degree" },
            { data: "gpa" },
            { data: "univercity" },
            {
                data: "guid",
                render: function (data, type, row) {
                    return `<button type="button" onclick="showModalEdit('${data}')" class="btn btn-primary editEmployee" >Edit</button><button type="button" onclick="confirmDelete('${data}')" data-guid="${data}" class="btn btn-danger" >Hapus</button>`;
                }
            }
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                className: 'btn btn-success',
                exportOptions: {
                    columns: [0, 1, 2, 4, 6, 7, 8, 10, 11]
                }
            },
            {
                extend: 'pdfHtml5',
                className: 'btn btn-danger',
                exportOptions: {
                    columns: [0, 1, 2, 4, 6, 7, 8, 10, 11]
                }
            },
            {
                extend: 'colvis',
                className: 'btn btn-primary',
                columnText: function (dt, idx, title) {
                    return (idx + 1) + ': ' + title;

                }
            },
            {
                text: 'Tambah Data Employee',
                className: 'btn btn-success',
                action: function (e, dt, node, config) {
                    $('#tambahEmployee').modal('show');
                    document.getElementById("first-name").value = "";
                    document.getElementById("last-name").value = "";
                    document.getElementById("birth-date").value = "";
                    document.getElementById("gander").value = "";
                    document.getElementById("hiring-date").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone-number").value = "";
                    document.getElementById("exampleModalLabel").innerHTML = "Register New Employee";
                    var Major = document.querySelector('.Major');
                    Major.style.visibility = "";
                    Major.style.position = "static";
                    var Degree = document.querySelector('.Degree');
                    Degree.style.visibility = "";
                    Degree.style.position = "static";
                    var GPA = document.querySelector('.GPA');
                    GPA.style.visibility = "";
                    GPA.style.position = "static";
                    var UnivercityCode = document.querySelector('.UnivercityCode');
                    UnivercityCode.style.visibility = "";
                    UnivercityCode.style.position = "static";
                    var UnivercityName = document.querySelector('.UnivercityName');
                    UnivercityName.style.visibility = "";
                    UnivercityName.style.position = "static";
                    var Password = document.querySelector('.Password');
                    Password.style.visibility = "";
                    Password.style.position = "static";
                    var PasswordConfirm = document.querySelector('.ConfirmPassword');
                    PasswordConfirm.style.visibility = "";
                    PasswordConfirm.style.position = "static";
                    var alertDiv = document.querySelector(".createEmployee");
                    alertDiv.style.visibility = "";
                    alertDiv.style.position = "static";
                    var UpdateButton = document.querySelector('.updateEmployee');
                    UpdateButton.style.visibility = "hidden";
                    UpdateButton.style.position = "absolute";
                }
            }
        ]
    });

    $('.dt-buttons').removeClass('dt-buttons');

    //$('#datepicker').datepicker();
})

function validateForm() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var birthDate = document.getElementById("birth-date").value;
    var gender = parseInt(document.getElementById("gander").value);
    var hiringDate = document.getElementById("hiring-date").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phone-number").value;
    var major = document.getElementById("major").value;
    var degree = document.getElementById("degree").value;
    var gpa = parseFloat(document.getElementById("gpa").value).toFixed(2);
    var univercityCode = document.getElementById("univercity-code").value;
    var univercityName = document.getElementById("univercity-name").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
        var alertDiv = document.querySelector(".alert.alert-warning");
        alertDiv.style.visibility = "";
        alertDiv.style.position = "static";

    if (firstName === "" || lastName === "" || birthDate === "" || gender === "" || hiringDate === "" || email === "" || phoneNumber === "" || major === "" || degree === "" || gpa === "" || univercityCode === "" || univercityName === "" || password === "" || confirmPassword === "") {
        alertDiv.innerHTML = alertValidate("Silahkan Isi Semua Form Dengan Benar");
        return false;
    } else if (password !== confirmPassword) {
        alertDiv.innerHTML = alertValidate("Password Yang Di Inputkan Tidak Sama");
        return false;
    }
    if (password.length < 8) {
        alertDiv.innerHTML = alertValidate("Password Yang Di Inputkan minimal 8 karater");
        return false;
    }
    // Check if the password contains at least 1 uppercase letter.
    if (!/[A-Z]/.test(password)) {
        alertDiv.innerHTML = alertValidate("Password must contain at least 1 uppercase letter.");
        return false;
    }
    // Check if the password contains at least 1 lowercase letter.
    if (!/[a-z]/.test(password)) {
        alertDiv.innerHTML = alertValidate("Password must contain at least 1 lowercase letter.");
        return false;
    }
    // Check if the password contains at least 1 digit.
    if (!/\d/.test(password)) {
        alertDiv.innerHTML = alertValidate("Password must contain at least 1 digit.");
        return false;
    }
    // Check if the password contains at least 1 symbol.
    if (!/[^A-Za-z0-9]/.test(password)) {
        alertDiv.innerHTML = alertValidate("Password must contain at least 1 symbol.");
        return false;
    }
    sendDataEmployee(firstName, lastName, birthDate, gender, hiringDate, email, phoneNumber, major, degree, gpa, univercityCode, univercityName, password, confirmPassword);
    return true;
}

function alertValidate(text) {
    return `<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill" /></svg><div>${text}</div>`;
}

function sendDataEmployee(firstName, lastName, birthDate, gender, hiringDate, email, phoneNumber, major, degree, gpa, univercityCode, univercityName, password, confirmPassword) {
    $.ajax({
        url: 'https://localhost:7134/server/Account/Registration',
        type: 'POST',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "birthDate": birthDate,
            "gender": gender,
            "hiringDate": hiringDate,
            "email": email,
            "phoneNumber": phoneNumber,
            "major": major,
            "degree": degree,
            "gpa": gpa,
            "univercityCode": univercityCode,
            "univercityName": univercityName,
            "newPassword": password,
            "confirmPassword": confirmPassword
        }),
        success: function (data) {
            console.log('Success:', data);
            Swal.fire(
                'Create Success!',
                'Create Employee was Success!',
                'success'
            )
            table.ajax.reload();
            $('#tambahEmployee').modal('hide');
        },
        error: function (xhr, status, error) {
            console.log('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error Add New Employee!',
            })
            table.ajax.reload();
            $('#tambahEmployee').modal('hide');
        }
    });
}


function showModalEdit(guid) {
    $('#tambahEmployee').modal('show');
    document.getElementById("exampleModalLabel").innerHTML = "Edit Information Employee";
    var Major = document.querySelector('.Major');
    Major.style.visibility = "hidden";
    Major.style.position = "absolute";
    var Degree = document.querySelector('.Degree');
    Degree.style.visibility = "hidden";
    Degree.style.position = "absolute";
    var GPA = document.querySelector('.GPA');
    GPA.style.visibility = "hidden";
    GPA.style.position = "absolute";
    var UnivercityCode = document.querySelector('.UnivercityCode');
    UnivercityCode.style.visibility = "hidden";
    UnivercityCode.style.position = "absolute";
    var UnivercityName = document.querySelector('.UnivercityName');
    UnivercityName.style.visibility = "hidden";
    UnivercityName.style.position = "absolute";
    var Password = document.querySelector('.Password');
    Password.style.visibility = "hidden";
    Password.style.position = "absolute";
    var PasswordConfirm = document.querySelector('.ConfirmPassword');
    PasswordConfirm.style.visibility = "hidden";
    PasswordConfirm.style.position = "absolute";

    $.ajax({    //create an ajax request to display.php
        type: "GET",
        url: "https://localhost:7134/server/Employee/" + guid,
        dataType: "JSON",   //expect html to be returned            
        dataSrc: "data",
        success: function (response) {
            document.getElementById("first-name").value = response.data.firstName;
            document.getElementById("last-name").value = (response.data.lastName);
            document.getElementById("birth-date").value = formatDate(response.data.birthDate);
            document.getElementById("gander").value = (response.data.gender);
            document.getElementById("hiring-date").value = formatDate(response.data.hiringDate);
            document.getElementById("email").value = (response.data.email);
            document.getElementById("phone-number").value = (response.data.phoneNumber);
            //alert(response);
            var alertDiv = document.querySelector(".createEmployee");
            alertDiv.style.visibility = "hidden";
            alertDiv.style.position = "absolute";
            var UpdateButton = document.querySelector('.updateEmployee');
            UpdateButton.style.visibility = "";
            UpdateButton.style.position = "static";
            UpdateButton.setAttribute("onclick", `updateEmployees('${response.data.guid}','${response.data.nik}')`);
        }
    });
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function updateEmployees(guid, nik) {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let birthDate = document.getElementById("birth-date").value;
    let gender = parseInt(document.getElementById("gander").value);
    let hiringDate = document.getElementById("hiring-date").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phone-number").value;

    $.ajax({    //create an ajax request to display.php
        type: "PUT",
        url: "https://localhost:7134/server/Employee",
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "guid": guid,
            "nik": nik,
            "firstName": firstName,
            "lastName": lastName,
            "birthDate": birthDate,
            "gender": gender,
            "hiringDate": hiringDate,
            "email": email,
            "phoneNumber": phoneNumber,
        }),
        success: function (data) {
            console.log('Success:', data);
            Swal.fire(
                'Update Success!',
                'Data Employee Update Success!',
                'success'
            )
            table.ajax.reload();
            $('#tambahEmployee').modal('hide');
        },
        error: function (xhr, status, error) {
            console.log('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error Add Update Employee!',
            })
            table.ajax.reload();
            $('#tambahEmployee').modal('hide');
        }
    });
}

function confirmDelete(guid) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Hapus data Employee ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'https://localhost:7134/server/AccountRole/guidAccount?guid=' + guid,
                type: 'DELETE',
                headers: {
                    'accept': '*/*'
                },
                success: function (data) {
                    $.ajax({
                        url: 'https://localhost:7134/server/Account/' + guid,
                        type: 'DELETE',
                        headers: {
                            'accept': '*/*'
                        },
                        success: function (data) {
                            $.ajax({
                                url: 'https://localhost:7134/server/Education/' + guid,
                                type: 'DELETE',
                                headers: {
                                    'accept': '*/*'
                                },
                                success: function (data) {
                                    $.ajax({
                                        url: 'https://localhost:7134/server/Employee/' + guid,
                                        type: 'DELETE',
                                        headers: {
                                            'accept': '*/*'
                                        },
                                        success: function (data) {
                                            swalWithBootstrapButtons.fire(
                                                'Deleted!',
                                                'Employee Data has been deleted.',
                                                'success'
                                            )
                                            table.ajax.reload();
                                            $('#tambahEmployee').modal('hide');
                                        },
                                        error: function (xhr, status, error) {
                                            console.log('Error: ' + error);
                                            swalWithBootstrapButtons.fire(
                                                'Cancelled',
                                                'Data Employee gagal DI Hapus',
                                                'error'
                                            )
                                        }
                                    });
                                },
                                error: function (xhr, status, error) {
                                    console.log('Error: ' + error);

                                }
                            });
                        },
                        error: function (xhr, status, error) {
                            console.log('Error: ' + error);

                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);

                }
            });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Hapus data Employee Di batalkan',
                'error'
            )
        }
    })
}

