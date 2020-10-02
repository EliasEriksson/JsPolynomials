class Term {
    /**
     * represents a mathematical term a * x ^ b
     * where x is given value in format or evaluate method.
     * evaluate requires x to be a numeric value.
     */
    constructor(multiple, exponent) {
        /**
         * (multiple * x ^ exponent)
         */
        this.multiple = multiple;
        this.exponent = exponent;
    }

    format(x) {
        /**
         * string representation of the term
         */
        let result = "";
        if (x && this.multiple) {
            if (this.exponent === 0) {
                return this.multiple;
            }
            if (this.multiple !== 1) {
                result += `${this.multiple} * `;
            }
            if (this.exponent === 1) {
                if (result) {
                    result += `${x}`;
                } else {
                    return `${x}`;
                }
            } else {
                result += `${x} ^ ${this.exponent}`;
            }
            result = `(${result})`;
        }
        return result;
    }



    form(x) {
        // 3 1 1 1
        // (3 * -1 ^ 3) + (-1 ^ 2) + (1 * 0 ^ 1) + -1

        // VL om m != 0 och x != 0 och m != 1
        // HL om m != 0 och x != 0 och e != 0
        //      exp om HL och exp != 1

        let result = "";
        let res = []
        if (this.multiple) {
            if (x){
                if (this.multiple !== 1) {
                    // VL om m != 0 och x != 0 och m != 1
                    res.push(`${this.multiple}`)
                }
                if (this.exponent) {
                    // HL om m != 0 och x != 0 och e != 0
                    if (this.exponent !== 1) {
                        // exp om HL och exp != 1
                        res.push(`${x} ^ ${this.exponent}`)
                    }
                } else {
                    return x;
                }
            } else if (!this.exponent) {
                return this.multiple;
            }
        }
        return res ? `(${res.join(" * ")})` : "";
    }

    evaluate(x) {
        /**
         * calculates the value of the term based on the value of given x
         */
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
        /**
         * string representation of the terms in the polynomial
         *
         * x is allowed to be the string "x" or any number
         * if x is a number and evaluate is false the polynomial will only
         * replace "x" with the value but not calculate it.
         */
        return `f(${x}) = ` + this.terms.map(
            term => term.form(x)
        ).filter(
            term => term
        ).join(" + ") + (evaluate && (evaluate = this.evaluate(x)) ? " = " + evaluate : "");
    }

    evaluate(x) {
        /**
         * evaluates all the terms in the polynomial with the value of x
         */
        let sum = 0;
        for (let i = 0; i < this.terms.length; i++) {
            sum += this.terms[i].evaluate(x);
        }
        console.log(sum)
        return sum;
    }
}


polynome = new Polynomial(3, 1, 1, 1);

for (let x = -5; x < 5; x++) {
    console.log(polynome.format(x));
}
