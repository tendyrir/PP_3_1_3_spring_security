async function getAll() {
    return await fetch("../api/admin");
}

async function getUser(id) {
    return await fetch("../api/admin/" + id);
}

async function fetchRoles() {
    const response = await fetch("../api/admin/roles");
    return await response.json();
}

function fillRoleSelect(selectElementId, items) {
    const select = document.getElementById(selectElementId);
    select.innerHTML = items.map(item => `<option value="${item.id}">${item.value}</option>`).join(' ');
}

async function getRolesAndFillSelect(selectElementId) {
    const roles = await fetchRoles();
    fillRoleSelect(selectElementId, roles);
}

$(document).ready(async function () {
    await getAllUsersTable();
});

async function getAllUsersTable() {
    const usersResponse = await getAll();
    const users = await usersResponse.json();
    let usersTableContent = "";
    users.forEach(function (data) {
        usersTableContent += `
            <tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${data.surname}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${data.roles.map(role => role.value).join(', ')}</td>
                <td>
                    <button 
                        class="btn btn-info" 
                        data-toggle="modal" 
                        onclick="editUserButtonInTable(${data.id})"
                        type="button" 
                        data-target="#editUserModalWindow">Edit
                    </button>
                </td>
                <td>
                    <button 
                        class="btn btn-danger" 
                        data-toggle="modal" 
                        onclick="deleteUserButtonInTable(${data.id})"
                        data-target="#deleteUserModalWindow" 
                        type="button">Delete
                    </button>
               </tr>`;
    });
    document.getElementById('users').innerHTML = usersTableContent;
}


async function editUserButtonInTable(id) {
    const user = await getUser(id).then(data => data.json());
    document.getElementById('editId').value = id;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editSurname').value = user.surname;
    document.getElementById('editAge').value = user.age;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editPassword').value = user.password;
    await getRolesAndFillSelect('rolesEditUser');
}

async function deleteUserButtonInTable(id) {
    const user = await getUser(id).then(data => data.json());
    document.getElementById('deleteId').value = id;
    document.getElementById('deleteUsername').value = user.username;
    document.getElementById('deleteSurname').value = user.surname;
    document.getElementById('deleteAge').value = user.age;
    document.getElementById('deleteEmail').value = user.email;
    document.getElementById('deletePassword').value = user.password;
    await getRolesAndFillSelect('rolesDeleteUser');
}


$(async function () {
    await newUser();
});

async function newUser() {
    const rolesResponse = await fetch("../api/admin/roles");
    const roles = await rolesResponse.json();
    const rolesSelect = document.getElementById('newRoles');
    roles.forEach(role => {
        let option = document.createElement("option");
        option.value = role.id;
        option.text = role.value;
        rolesSelect.appendChild(option);
    });

    const form = document.forms["formNewUser"];

    form.addEventListener('submit', addNewUser)

    async function addNewUser(e) {
        e.preventDefault();

        let usernameValue = document.getElementById('newUsername').value;
        let surnameValue = document.getElementById('newSurname').value;
        let ageValue = document.getElementById('newAge').value;
        let emailValue = document.getElementById('newEmail').value;
        let passwordValue = document.getElementById('newPassword').value;

        let newUserRoles = [];

        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) newUserRoles.push({
                id: form.roles.options[i].value,
                name: form.roles.options[i].name,
                value: form.roles.options[i].text
            })
        }

        let user = {
            username: usernameValue,
            surname: surnameValue,
            age: ageValue,
            email: emailValue,
            password: passwordValue,
            roles: newUserRoles
        }

        await fetch("../api/admin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        form.reset();
        await getAllUsersTable();
        $('#userTableTab').click();
    }
}

async function editUserButtonInModalWindow() {

    const editForm = document.forms["editFormInModalWindow"];
    let idValue = document.getElementById('editId').value;
    let usernameValue = document.getElementById('editUsername').value;
    let surnameValue = document.getElementById('editSurname').value;
    let ageValue = document.getElementById('editAge').value;
    let emailValue = document.getElementById('editEmail').value;
    let passwordValue = document.getElementById('editPassword').value;
    const editUserRoles = [];

    for (let i = 0; i < editForm.roles.options.length; i++) {
        if (editForm.roles.options[i].selected) editUserRoles.push({
            id: editForm.roles.options[i].value,
            name: "ROLE_" + editForm.roles.options[i].text,
            value: editForm.roles.options[i].text
        })
    }

    let user = {
        id: idValue,
        username: usernameValue,
        surname: surnameValue,
        age: ageValue,
        email: emailValue,
        password: passwordValue,
        roles: editUserRoles
    }

    await fetch("../api/admin/" + user.id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });

    await getAllUsersTable();
}

async function deleteUserButtonInModalWindow() {
    const id = document.getElementById("deleteId").value;
    await fetch("../api/admin/" + id, {method: 'DELETE'});
    await getAllUsersTable();
}
