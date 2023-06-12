
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
            result['color'] = `var(--tw-${mod})`;
        }
        else {
            console.log(`unrecognized modifier: ${mod}`);
        }
    }

}
