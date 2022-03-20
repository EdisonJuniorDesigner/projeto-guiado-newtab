function testaFormulario(e) {
    let nameValue = e.target.elements["name"].value;
    let telValue = e.target.elements["phone"].value;
    let xpValue = e.target.elements["xp"].value == "true";

    // Regex para saber se o usuário digitou apenas números
    let phonePattern = /[^0-9-() ]+/g;
    if (phonePattern.test(telValue)) {
        alert("Apenas números são permitidos no campo telefone!");
        e.preventDefault();
        return false;
    }

    // Regex para saber se tem os caracteres necessários
    if (telValue.replace(/[-() ]/g, "").length < 11) {
        alert("Número inválido!");
        e.preventDefault();
        return false;
    }

    var peopleRaw = localStorage.getItem("people");
    if (peopleRaw != null) {
        var people = JSON.parse(peopleRaw);
    } else {
        var people = [];
    }

    if (id !== null) {
        people[id] = {
            name: nameValue,
            tel: telValue,
            xp: xpValue,
        };
    } else {
        people.push({
            name: nameValue,
            tel: telValue,
            xp: xpValue,
        });
    }

    localStorage.setItem("people", JSON.stringify(people));
}

var urlPrincipal = new URL(window.location.href);

var id = urlPrincipal.searchParams.get("person");
if (id !== null) {
    var peopleRaw = localStorage.getItem("people");
    if (peopleRaw != null) {
        var people = JSON.parse(peopleRaw);
    } else {
        var people = [];
    }

    console.log(people[id]);

    document.getElementById("name").value = people[id].name;
    document.getElementById("phone").value = people[id].tel;
    if (people[id].xp) {
        document.getElementById("xp-yes").checked = true;
    } else {
        document.getElementById("xp-no").checked = true;
    }
}

function testaCampoTelefone(e) {
    e.preventDefault();
    console.log(e);

    if (e.target.value.length == 0) {
        e.target.value += "(";
    }

    if (e.target.value.length == 3) {
        e.target.value += ") ";
    }

    if (e.target.value.length == 10) {
        e.target.value += "-";
    }

    if (/[0-9 -()]/g.test(e.key) && e.target.value.length < 15) {
        e.target.value += e.key;
    }
}
