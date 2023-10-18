$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/", 
}).done((result) => {
    result.results.forEach(element => {
        $.ajax({
            url: element.url,

        }).done((result) =>{
            let img = `<div class="card" style="width: 18rem;">
            <img src="${result.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="${result.name}">
                <div class="card-body">
                <div style="display:inline-block;" >
              <h5 class="card-title">${element.name} <p class="text-muted">#${result.id}</p></h5>
              `;
            
            
            result.types.forEach(type => {
                if (type.type.name == "grass") {
                    img += `<span class="card-text badge rounded-pill bg-success">Grass</span>`;
                } else if (type.type.name == "poison") {
                    img +=`<span class="card-text badge bg-info">Poison</span>`;
                } else if (type.type.name == "normal") {
                    img +=`<span class="card-text badge bg-secondary">Normal</span>`;
                } else if (type.type.name == "fighting") {
                    img +=`<span class="card-text badge bg-danger">Fighting</span>`;
                } else if (type.type.name == "flying") {
                    img +=`<span class="card-text badge bg-info">Flying</span>`;
                } else if (type.type.name == "ground") {
                    img +=`<span class="card-text badge bg-warning">Ground</span>`;
                } else if (type.type.name == "rock") {
                    img +=`<span class="card-text badge bg-emphasis">Rock</span>`;
                } else if (type.type.name == "bug") {
                    img +=`<span class="card-text badge bg-success">Bug</span>`;
                } else if (type.type.name == "ghost") {
                    img +=`<span class="card-text badge bg-secondary">Ghost</span>`;
                } else if (type.type.name == "steel") {
                    img +=`<span class="card-text badge bg-white">Steel</span>`;
                } else if (type.type.name == "fire") {
                    img +=`<span class="card-text badge bg-danger">Fire</span>`;
                } else if (type.type.name == "water") {
                    img +=`<span class="card-text badge bg-primary">Water</span>`;
                } else if (type.type.name == "electric") {
                    img +=`<span class="card-text badge bg-danger">Electric</span>`;
                } else if (type.type.name == "psychic") {
                    img +=`<span class="card-text badge bg-purple-500">Psychic</span>`;
                } else if (type.type.name == "ice") {
                    img +=`<span class="card-text badge bg-info">Ice</span>`;
                } else if (type.type.name == "dragon") {
                    img +=`<span class="card-text badge bg-primary">Dragon</span>`;
                } else if (type.type.name == "dark") {
                    img +=`<span class="card-text badge bg-black">Dark</span>`;
                } else if (type.type.name == "fairy") {
                    img +=`<span class="card-text badge bg-pink">fairy</span>`;
                } else if (type.type.name == "unknown") {
                    img +=`<span class="card-text badge bg-success">unknown</span>`;
                } else {
                    img +=`<span class="card-text badge bg-white">shadow</span>`;
                }
            });
            img += `
            <div style ="display: block;
  width: 100%;
  margin-top: 1rem;"
                <button type="button" class="btn btn-primary" onclick="bestMovement('${element.url}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Detail
                </button>
                </div>
             </div>`;
             $('.contain').append(img);

        });
    });
}).fail((error) => {
    console.log(error);
})




$('.movement').html("getBestMove");


function bestMovement(urlPoke) {
    $.ajax({
        url: urlPoke,
    }).done((result)=>{
        var data = result.moves.reduce(
            (bestMovement, move) => (move.power > bestMovement.power ? move : bestMovement),
            result.moves[0]
          );
        $.ajax({
            url: data.move.url
        }).done((results) => {
            $('.bestMovePoke').html(`<ul>Name : ${data.move.name}  </ul>
            <ul>Accuracy : ${results.accuracy} </ul>
            <ul>Power : ${results.power}</ul>`)

            $('.NamePoke').html(result.name)
            $('.modal-title').html("Pokemon : "+result.name)
            $('.IDPoke').html('#' + result.id)

            $('.base_stats').html(`
            <tr>
                <td>${result.stats[0].base_stat}</td>
                <td>${result.stats[1].base_stat}</td>
                <td>${result.stats[2].base_stat}</td>
                <td>${result.stats[3].base_stat}</td>
                <td>${result.stats[4].base_stat}</td>
                <td>${result.stats[5].base_stat}</td>
            </tr>
            `)
            let img = document.getElementById('imgThumb');

            img.src = `${ result.sprites.other["official-artwork"].front_default }`

        })
    })
}