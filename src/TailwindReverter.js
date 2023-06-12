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

}
