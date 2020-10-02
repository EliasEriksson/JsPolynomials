class Term {
    constructor(multiple, exponent) {
        this.multiple = multiple;
        this.exponent = exponent;
    }

    format(x) {
        let result = "";
        if (x && this.multiple) {
            if (this.exponent === 0) {
                return this.multiple;
            }
            if (this.multiple !== 1) {
                result += `${this.multiple} * `
            }
            if (this.exponent === 1) {
                if (result) {
                    result += `${x}`
                } else {
                    return `${x}`
                }
            } else {
                result += `${x} ^ ${this.exponent}`;
            }
            result = `(${result})`
        }
        return result;
    }

    evaluate(x) {
        return this.multiple * x ** this.exponent;
    }
}

class Polynomial {
    /**
     * can construct, format and evaluate a mathematical polynomials
     */
    constructor(...params) {
        /**
         * defines a polynomial
         *
         * the length of the params controls the grade of the polynomial.
         * the grade of the params is params.length - 1 meaning to have a second degree polynomial
         * params needs to be [2, x, y].
         *
         * example 2x^3 + 6x + 2  Polynomial(2, 0, 6, 2)
         * example 7x^2 + 2x + 3  Polynomial(7, 2, 3)
         * example 7*x**2         Polynomial(7, 0, 0)
         *
         */
        this.terms = [];
        for (let i = 0; i < params.length; i++) {
            this.terms.push(
                new Term(params[i], params.length - i - 1)
            );
        }
    }

    format(x = "x", evaluate = true) {
        return `f(${x}) = ` + this.terms.map(
            term => term.format(x)
        ).filter(term => term).join(" + ") + (x !== "x" && evaluate ? " = " + this.evaluate(x) : "");
    }

    evaluate(x) {
        let sum = 0;
        for (let i = 0; i < this.terms.length; i++) {
            sum += this.terms[i].evaluate(x);
        }
        return sum;
    }
}


polynome = new Polynomial(1, 0, 0);
console.log(polynome.format())
console.log(polynome.format(5, true))
