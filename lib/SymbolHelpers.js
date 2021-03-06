const {Range} = require('atom');

const LanguageClientUtils = require('../node_modules/atom-languageclient/build/lib/utils');

module.exports = {
    /**
     * Slightly modified variant of the LanguageClientUtils getWordAtPosition.
     *
     * This variant does not treat the backslash as a non-word character, so it is not treated as boundary and the range
     * does not stop when it is found. This is important for qualified names in PHP (i.e. imports, qualified function
     * calls, ...).
     *
     * @param {TextEditor} editor
     * @param {Point}      position
     *
     * @see https://github.com/atom/atom-languageclient/blob/master/lib/utils.js
    */
    getRangeForSymbolAtPosition(editor, position) {
        const scopeDescriptor = editor.scopeDescriptorForBufferPosition(position);
        let nonWordCharacters = editor.getNonWordCharacters(scopeDescriptor);
        nonWordCharacters = nonWordCharacters.replace('\\', '');
        nonWordCharacters = LanguageClientUtils.escapeRegExp(nonWordCharacters);

        const range = LanguageClientUtils._getRegexpRangeAtPosition(
            editor.getBuffer(),
            position,
            new RegExp(`^[\\t]*$|[^\\s${nonWordCharacters}]+`, 'g')
        );

        if (range === null) {
            return new Range(position, position);
        }

        return range;
    }
};
