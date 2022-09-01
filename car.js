function notValid(val) {
	return typeof(val) !== 'number' || val === Infinity || val === -Infinity || isNaN(val); 
}

export class Car {
	#brand;
	#model;
	#yearOfManufacturing;
	#maxSpeed;
	#maxFuelVolume;
	#fuelConsumption;
	#currentFuelVolume = 0;
	#isStarted = false;
	#mileage = 0;

	constructor() {
		this.start = this.start.bind(this);
		this.shutDownEngine = this.shutDownEngine.bind(this);
		this.fillUpGasTank = this.fillUpGasTank.bind(this);
		this.drive = this.drive.bind(this);
	}

	get brand() {
		return this.#brand;
	}

	set brand(val) {
		const notValidStr = typeof(val) !== 'string' || val.length < 1 || val.length > 50;

		if (notValidStr) {
			throw new Error('Error! Incorrect value');
		}

		this.#brand = val;
	}

	get model() {
		return this.#model;
	}

	set model(val) {
		const notValidStr = typeof(val) !== 'string' || val.length < 1 || val.length > 50;
		
		if (notValidStr) {
			throw new Error('Error! Incorrect value');
		}

		this.#model = val;
	}
	
	get yearOfManufacturing() {
		return this.#yearOfManufacturing;
	}

	set yearOfManufacturing(val) {
		const notValidYear = notValid(val) || val < 1900 || val > new Date().getFullYear();

		if (notValidYear) {
			throw new Error('Error! Incorrect value');
		}

		this.#yearOfManufacturing = val;
	}

	get maxSpeed() {
		return this.#maxSpeed;
	}

	set maxSpeed(val) {
		const notValidSpeed = notValid(val) || val < 100 || val > 300;

		if (notValidSpeed) {
			throw new Error('Error! Incorrect value');
		}

		this.#maxSpeed = val;
	}

	get maxFuelVolume() {
		return this.#maxFuelVolume;
	}

	set maxFuelVolume(val) {
		const notValidFuelVol = notValid(val) || val < 5 || val > 20;
		
		if (notValidFuelVol) {
			throw new Error('Error! Incorrect value');
		}

		this.#maxFuelVolume = val;
	}

	get fuelConsumption() {
		return this.#fuelConsumption;
	}

	set fuelConsumption(val) {
		if ( notValid(val) || val <= 0 ) {
			throw new Error('Error! Incorrect value');
		}

		this.#fuelConsumption = val;
	}

	get currentFuelVolume() {
		return this.#currentFuelVolume;
	}

	get isStarted() {
		return this.#isStarted;
	}

	get mileage() {
		return this.#mileage;
	}
	
	start() {
		if (this.#isStarted) {
			throw new Error('Машина уже заведена');
		}

		this.#isStarted = true;
	}

	shutDownEngine() {
		if (!this.#isStarted) {
			throw new Error('Машина ещё не заведена');
		}

		this.#isStarted = false;
	}

	fillUpGasTank(amountFuel) {
		if ( notValid(amountFuel) || amountFuel <= 0 ) {
			throw new Error('Неверное количество топлива для заправки');
		}

		const fuelAfterFillUp = this.#currentFuelVolume + amountFuel;
		
		if ( fuelAfterFillUp > this.#maxFuelVolume) {
			throw new Error('Топливный бак переполнен');
		}

		this.#currentFuelVolume += amountFuel;		
	}

	drive(speed, hours) {
		if ( notValid(speed) || speed <= 0 ) {
			throw new Error('Неверная скорость');
		} 

		if (notValid(hours) || hours <= 0) {
			throw new Error('Неверное количество часов');
		}

		if (speed > this.#maxSpeed) {
			throw new Error('Машина не может ехать так быстро');
		}

		if (this.#isStarted === false) {
			throw new Error('Машина должна быть заведена, чтобы ехать');
		}

		const distance = speed * hours;
		const needFuel = (this.#fuelConsumption * distance) / 100;
		
		if (needFuel > this.#currentFuelVolume) {
			throw new Error('Недостаточно топлива');
		}

		this.#mileage +=  distance;
		this.#currentFuelVolume -= needFuel;
	}
}
