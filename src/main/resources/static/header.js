$(document).ready(async function () {
    await getHeader();
});

async function getHeader() {
    const response = await fetch("../api/user");
    const data = await response.json();
    const rolesText = data.roles.map(role => role.value).join(' ');
    const userInfoElement = document.querySelector('#userInfo');
    userInfoElement.innerHTML = `
            <b><span>${data.email}</span></b>
            <span>with roles:</span>
            <span>${rolesText}</span>`;
}