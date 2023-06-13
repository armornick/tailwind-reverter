import vars from './tailwind-vars.js';

export default class TwReverter {

    stylesheet = {};

    /**
     * @param {string} className 
     * @param {string} tailwindInput 
     */
    add(className, tailwindInput) {
        const converted = this.convertTwClasses(tailwindInput);
        this.stylesheet[className] = converted;
    }

    /**
     * @param {string} varname 
     */
    addVar(varname) {
        if (varname in vars) {
            this.stylesheet[':root'] = this.stylesheet[':root'] || {};
            this.stylesheet[':root'][varname] = vars[varname];
        }
        else {
            console.log(`ùnrecognized variable: ${varname}`);
        }
    }

    /**
     * @param {string} tailwindInput
     * @returns {{ [string]: string }}
     */
    convertTwClasses(tailwindInput) {
        const result = {};
        const classList = tailwindInput.split(' ');

        for (const clazz of classList) {
            if (clazz.startsWith('text-')) {
                this.convertTwTextClass(result, clazz);
            }
            else if (clazz.startsWith('bg-')) {
                this.convertTwBgClass(result, clazz);
            }
            else if (clazz.startsWith('from-')) {
                const color = clazz.replace(/^from\-/, '');
                const varname = `--tw-${color}`;
                this.addVar(varname);
                result['--tw-gradient-from'] = `var(${varname}) var(--tw-gradient-from-position)`;
            }
            else if (clazz.startsWith('to-')) {
                const color = clazz.replace(/^to\-/, '');
                const varname = `--tw-${color}`;
                this.addVar(varname);
                result['--tw-gradient-to'] = `var(${varname}) var(--tw-gradient-to-position)`;
            }
            else if (this.isSpacingClass(clazz)) {
                this.convertTwSpacingClass(result, clazz);
            }
            else if (clazz.startsWith('rounded')) {
                const varname = `--tw-${clazz}`;
                if (varname in vars) {
                    this.addVar(varname);
                    result['border-radius'] = `var(${varname})`;
                }
            }
            else {
                console.log(`unrecognized class type: ${clazz}`);
            }
        }

        return result;
    }

    /**
     * @param {{ [string]:string }} result 
     * @param {string} clazz 
     */
    convertTwTextClass(result, clazz) {
        const mod = clazz.replace(/^text\-/, '');
        if (mod === 'xs') {
            result['font-size'] = '0.75rem';
            result['line-height'] = '1rem';
        }
        else if (mod === 'sm') {
            result['font-size'] = '0.875rem';
            result['line-height'] = '1.25rem';
        }
        else if (mod === 'base') {
            result['font-size'] = '1rem';
            result['line-height'] = '1.5rem';
        }
        else if (mod === 'lg') {
            result['font-size'] = '1.125rem';
            result['line-height'] = '1.75rem';
        }
        else if (mod === 'xl') {
            result['font-size'] = '1.25rem';
            result['line-height'] = '1.75rem';
        }
        else if (mod === 'left') {
            result['text-align'] = 'left';
        }
        else if (mod === 'right') {
            result['text-align'] = 'right';
        }
        else if (mod === 'center') {
            result['text-align'] = 'center';
        }
        else if (mod === 'black' || mod === 'white') {
            result['color'] = mod;
        }
        else if (/\-\d{3}$/.test(mod)) {
            const varname = `--tw-${mod}`;
            this.addVar(varname);
            result['color'] = `var(${varname})`;
        }
        else {
            console.log(`unrecognized modifier: ${mod}`);
        }
    }

    /**
     * @param {{ [string]:string }} result 
     * @param {string} clazz 
     */
    convertTwBgClass(result, clazz) {
        const mod = clazz.replace(/^bg\-/, '');
        if (mod === 'black' || mod === 'white') {
            result['background-color'] = mod;
        }
        else if (/\-\d{3}$/.test(mod)) {
            const varname = `--tw-${mod}`;
            this.addVar(varname);
            result['background-color'] = `var(${varname})`;
        }
        else if (mod === 'none') {
            result['background-image'] = 'none';
        }
        else if (mod === 'gradient-to-t') {
            result['background-image'] = 'linear-gradient(to top, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else if (mod === 'gradient-to-tr') {
            result['background-image'] = 'linear-gradient(to top right, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else if (mod === 'gradient-to-r') {
            result['background-image'] = 'linear-gradient(to right, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else if (mod === 'gradient-to-br') {
            result['background-image'] = 'linear-gradient(to bottom right, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else if (mod === 'gradient-to-b') {
            result['background-image'] = 'linear-gradient(to bottom, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else if (mod === 'gradient-to-bl') {
            result['background-image'] = 'linear-gradient(to bottom left, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else if (mod === 'gradient-to-l') {
            result['background-image'] = 'linear-gradient(to left, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else if (mod === 'gradient-to-tl') {
            result['background-image'] = 'linear-gradient(to top left, var(--tw-gradient-stops))';
            result['--tw-gradient-stops'] = 'var(--tw-gradient-from), var(--tw-gradient-to)';
        }
        else {
            console.log(`unrecognized modifier: ${mod}`);
        }
    }

    #RE_SPACING_CLASS = /^(p|m)(x|y|t|b|l|r)?\-/;

    /**
     * @param {string} clazz 
     * @returns {boolean}
     */
    isSpacingClass(clazz) {
        return this.#RE_SPACING_CLASS.test(clazz);
    }

    /**
     * @param {{ [string]:string }} result 
     * @param {string} clazz 
     */
    convertTwSpacingClass(result, clazz) {
        const [_, box, pos] = this.#RE_SPACING_CLASS.exec(clazz);
        const [_2, size] = clazz.split('-');
        
        let prop;
        if (box === 'p') {
            prop = 'padding';
        }
        else if (box === 'm') {
            prop = 'margin';
        }
        if (pos === 'x') {
            prop += '-inline';
        }
        else if (pos === 'y') {
            prop += '-block';
        }
        else if (pos === 't') {
            prop += '-block-start';
            // prop += '-top';
        }
        else if (pos === 'b') {
            prop += '-block-end';
            // prop += '-bottom';
        }
        else if (pos === 'l') {
            prop += '-inline-start';
            // prop += '-left';
        }
        else if (pos === 'r') {
            prop += '-inline-end';
            // prop += '-right';
        }

        if (size === 'auto') {
            result[prop] = 'auto';
        }
        else {
            const varname = `--tw-size-${size}`;
            this.addVar(varname);
            result[prop] = `var(${varname})`;
        }
    }

}
