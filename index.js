class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    removeDuplicatesAndSort(array) {
        return Array.from(new Set(array)).sort((a, b) => a - b);
    }

    buildTree(array) {
        const sortedArray = this.removeDuplicatesAndSort(array);

        const buildTreeRecursive = (arr, start, end) => {
            if (start > end) return null;

            const mid = Math.floor((start + end) / 2);
            const node = new Node(arr[mid]);

            node.left = buildTreeRecursive(arr, start, mid - 1);
            node.right = buildTreeRecursive(arr, mid + 1, end);

            return node;
        };
        return buildTreeRecursive(sortedArray, 0, sortedArray.length - 1);
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true
            );
        }
    }

    insert(value) {
        const insertRecursive = (node) => {
            if (node === null) {
                return new Node(value);
            }

            if (value === node.data) {
                return;
            }

            if (value < node.data) {
                node.left = insertRecursive(node.left);
            } else if (value > node.data) {
                node.right = insertRecursive(node.right);
            }

            return node;
        };
        this.root = insertRecursive(this.root);
    }

    deleteItem(value) {
        const deleteRecursive = (node) => {
            if (node === null) {
                return;
            }

            if (value === node.data) {
                if (node.left !== null && node.right !== null) {
                    let rightNode = node.right;
                    node = node.left;
                    node.right = rightNode;
                }

                if (node.left === null || node.right === null) {
                }
            }
        };
    }
}

const array = [1, 7, 4, 23, 8, 9, 4];
const tree = new Tree(array);
tree.prettyPrint(tree.root);
tree.insert(6);
tree.prettyPrint(tree.root);
