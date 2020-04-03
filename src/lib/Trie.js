class TrieNode {
    constructor() {
        this.keys = new Map();
        this._isEnd = false;
    }

    get isEnd() {
        return this._isEnd;
    }

    set isEnd(bool) {
        this._isEnd = bool;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();   
    }

    add(word) {
        let node = this.root;
        let input = word;

        while(input.length > 0) {
            if(!node.keys.has(input[0])) {
                node.keys.set(input[0], new TrieNode());
            }
            
            node = node.keys.get(input[0]);

            input = input.substring(1);
        }

        node.isEnd = true;
    }

    getLastNode(word) {
        let node = this.root;
        let input = word;

        while(input.length > 0) {
            if(!node.keys.has(input[0])) {
                return false;
            }
            
            node = node.keys.get(input[0]);
            input = input.substring(1);
        }

        return node;
    }

    suggestions(word) {
        const suggestions = [];
        let node = this.getLastNode(word);

        if(!node) {
            return suggestions;
        }

        if(node.isEnd) {
            suggestions.push(word);
        }

        const search = (node, input) => {
            if(input.length !== 0) {

                for(let letter of node.keys.keys()) {
                    if(node.keys.has(letter)) {
                        search(node.keys.get(letter), input.concat(letter));
                    }
                }
            }

            if(node.isEnd) {
                suggestions.push(input);
            }            
        }

        search(node, word);

        return suggestions;
    }
}

export default Trie;