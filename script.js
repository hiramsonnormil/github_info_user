document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const userfoto = document.getElementById('userprofile');
    buscarinfo(username, userfoto);
});

async function buscarinfo(username, userfoto) {
    var liResult = document.querySelector('.userinfo');
    try {
        const request = await fetch(`https://api.github.com/users/${username}`);
        if (!request.ok) {
            throw new Error("user not found");
        } else {
            const data = await request.json();
            liResult.innerHTML = `
                <ul>
                    <li>Id do usuário: ${data.id}</li>
                    <li>Criação do usuário: ${data.created_at}</li>
                    <li>Foto de perfil: <a href="${data.avatar_url}" target="_blank">Acessar aqui</a></li>
                    <li>Número de seguidores: ${data.followers}</li>
                    <li>Bio do usuário: <br> ${data.bio}</li>
                </ul>
            `;
            userfoto.src = data.avatar_url;
        }
    } catch (error) {
        console.error(error);
        liResult.innerHTML = `<ul> user not found <ul>`;
        userfoto.src = "";
    }
};