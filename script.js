document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const userfoto = document.getElementById('userprofile');
    buscarinfo(username, userfoto);
});

function buscarinfo(username, userfoto) {
    const liResult = document.querySelector('.userinfo');

    fetch(`https://api.github.com/users/${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        liResult.innerHTML = `
            <ul>Id do usuário: ${data.id}</ul>
            <ul>Criação do usuário: ${data.created_at}</ul>
            <ul>Foto de perfil: <a href="${data.avatar_url}" target="_blank">Acessar aqui</a></ul>
            <ul>Número de seguidores: ${data.followers}</ul>
            <ul>Bio do usuário: <br> ${data.bio}</ul>
        `;
        userfoto.src = data.avatar_url;
    })
    .catch((error) => {
        liResult.innerHTML = `<ul>Erro ao buscar informações. Verifique o nome de usuário.</ul>`;
        console.error('Erro ao buscar dados do usuário:', error);
    });
}
