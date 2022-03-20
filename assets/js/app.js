// let people = [
//     {
//         name: "Edison Junior",
//         tel: "14999999999",
//         xp: true,
//     },
//     {
//         name: "Anderson Arcenio Matos da Costa",
//         tel: "14999999999",
//         xp: true,
//     },
//     {
//         name: "Karina do Amaral",
//         tel: "14999999999",
//         xp: false,
//     },
// ];

var peopleRaw = localStorage.getItem("people");
if (peopleRaw != null) {
    var people = JSON.parse(peopleRaw);
} else {
    var people = [];
}

function desenhaTabela() {
    currentLines = [
        ...document.querySelectorAll("table.lista tbody .dinamic-content"),
    ];

    currentLines.forEach((element) => {
        element.remove();
    });

    for (person in people) {
        let tbody = document.querySelector("table.lista tbody");
        // tinha utilizado anteriormente o nth-child(even) no css porém no github pages parece que não suporta ai deixei como o professor tinha feito
        tbody.innerHTML += `
            <tr class="dinamic-content" style="background-color: #${
                person % 2 == 0 ? "fff" : "eee"
            }>
                <td>${people[person].name}</td>
                <td>${people[person].tel}</td>
                <td>${expColor(people[person].xp)}</td>
                <td>
                    <button onclick="deleteUser(${person})">Excluir</button>
                    <a href="form.html?person=${person}">Editar</a>
                </td>
            </tr>
        `;
    }
}

function deleteUser(p) {
    people.splice(p, 1);
    desenhaTabela();
    localStorage.setItem("people", JSON.stringify(people));
}

function expColor(valor) {
    if (!valor) {
        return `<strong style="color:red">Não</strong>`;
    }
    return `<strong style="color:green">Sim</strong>`;
}

desenhaTabela();
