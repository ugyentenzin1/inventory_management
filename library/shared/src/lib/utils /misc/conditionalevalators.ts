export class ConditionalEvaluator {
	static eq(valueX: string, valueY: string): boolean {
		return valueX === valueY;
	}

	static neq(valueX: string, valueY: string): boolean {
		return valueX !== valueY;
	}

	static gt(valueX: string, valueY: string): boolean {
		return +valueX > +valueY;
	}

	static gte(valueX: string, valueY: string): boolean {
		return +valueX >= +valueY;
	}

	static lt(valueX: string, valueY: string): boolean {
		return +valueX < +valueY;
	}

	static lte(valueX: string, valueY: string): boolean {
		return +valueX <= +valueY;
	}

	static and(valueX: boolean, valueY: boolean): boolean {
		return valueX && valueY;
	}

	static or(valueX: boolean, valueY: boolean): boolean {
		return valueX || valueY;
	}
}
