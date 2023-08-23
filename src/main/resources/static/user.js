$(document).ready(async function () {
    await getCurrentUserTable();
});

async function getCurrentUserTable() {
    const currentUser = await fetch("../api/user").then(res => res.json());
    document.getElementById('currentUser').innerHTML = `
            <tr>
                <td>${currentUser.id}</td>
                <td>${currentUser.username}</td>
                <td>${currentUser.surname}</td>
                <td>${currentUser.age}</td>
                <td>${currentUser.email}</td>
                <td>${currentUser.roles.map(role => " " + role.value).join(' ')}</td>`;
}

