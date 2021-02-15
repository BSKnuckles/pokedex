export default class Pokemon {
	constructor(pokemon) {
		let lowerName = pokemon.name.toLowerCase();
		let formattedName =
			pokemon.name.charAt(0).toUpperCase() + lowerName.slice(1);
		this.name = formattedName;
		this.id = pokemon.id;
		this.species = pokemon.species;
		this.types = pokemon.types;
		this.height = pokemon.height;
		this.weight = pokemon.weight;
		this.shiny = false;

		this.sprites = {
			back_default: pokemon.sprites.back_default,
			back_female: pokemon.sprites.back_female,
			back_shiny: pokemon.sprites.back_shiny,
			back_shiny_female: pokemon.sprites.back_shiny_female,
			front_default: pokemon.sprites.front_default,
			front_female: pokemon.sprites.front_female,
			front_shiny: pokemon.sprites.front_shiny,
			front_shiny_female: pokemon.sprites.front_shiny_female,
			artwork: pokemon.sprites.other['official-artwork'].front_default
		};

		this.stats = [];
		pokemon.stats.forEach(stat => {
			let individualStat = {
				name: stat.stat.name,
				base: stat.base_stat,
				effort: stat.effort
			};
			this.stats.push(individualStat)
		});

		this.moves = pokemon.moves;

		if (pokemon.sprites.front_female != null) {
			this.gender = "Male / Female";
		} else {
			this.gender = "Unknown";
		}
	}

	isGendered() {
		if (this.gender != "Unknown") {
			return true;
		} else {
			return false;
		}
	}

	hasShiny() {
		if (this.sprites.front_shiny) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		let sprite = this.sprites.front_default;
		if (
			this.shiny == true &&
			this.gender == "Unknown" &&
			this.sprites.front_shiny != null
		) {
			sprite = this.sprites.front_shiny;
		} else if (
			this.shiny == true &&
			this.gender == "Male" &&
			this.sprites.front_shiny != null
		) {
			sprite = this.sprites.front_shiny;
		} else if (
			this.shiny == true &&
			this.gender == "Female" &&
			this.sprites.front_shiny_female != null
		) {
			sprite = this.sprites.front_shiny_female;
		} else if (
			this.shiny == false &&
			this.gender == "Female" &&
			this.sprites.front_female != null
		) {
			sprite = this.sprites.front_female;
		}

		let types = '';
		this.types.forEach(type => {
			let formattedType =
				type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
			types += `<p>${formattedType}</p>`
		});

		let stats = '';
		this.stats.forEach(stat => {
			switch (stat.stat.name) {
				case "hp": {
					stats += `<p>HP: ${stat.base_stat}</p>`;
					break;
				}
				case "attack": {
					stats += `<p>Attack: ${stat.base_stat}</p>`;
					break;
				}
				case "defense": {
					stats += `<p>Defense: ${stat.base_stat}</p>`;
					break;
				}
				case "special-attack": {
					stats += `<p>Special Attack: ${stat.base_stat}</p>`;
					break;
				}
				case "special-defense": {
					stats += `<p>Special Defense: ${stat.base_stat}</p>`;
					break;
				}
				case "speed": {
					stats += `<p>Speed: ${stat.base_stat}</p>`;
					break;
				}
				default:
					break;
			}
		});

		let template = `
                <h1>${this.name} #${this.id}</h1>
                <img src="${sprite}" alt="${this.name}" />
                <p><b>Height:</b> ${this.height}</p>
                <p><b>Weight:</b> ${this.weight}</p>
                <p><b>Gender:</b> ${this.gender}</p>
				<div class="types">
					${types}
				</div>
				<div class="stats">
					${stats}
				</div>`;
		return template;
	}
}