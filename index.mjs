class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
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
        const deleteRecursive = (node, value) => {
            if (node === null) {
                return node;
            }

            if (value < node.data) {
                node.left = deleteRecursive(node.left, value);
            } else if (value > node.data) {
                node.right = deleteRecursive(node.right, value);
            } else {
                if (node.left === null && node.right === null) {
                    return null;
                }

                if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                }

                let minValueNode = this.findMin(node.right);

                node.data = minValueNode.data;

                node.right = deleteRecursive(node.right, minValueNode.data);
            }
            return node;
        };
        this.root = deleteRecursive(this.root, value);
    }

    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    find(value) {
        const findRecursive = (node, value) => {
            if (node === null) {
                return null;
            }

            if (value < node.data) {
                return findRecursive(node.left, value);
            } else if (value > node.data) {
                return findRecursive(node.right, value);
            } else {
                return node;
            }
        };
        return findRecursive(this.root, value);
    }

    levelOrderIteration(callback) {
        if (!callback) {
            throw new Error('A callback function is required');
        }
        const queue = [];
        if (this.root !== null) {
            queue.push(this.root);
        }

        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback(currentNode);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }

            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }

    inOrder(callback) {
        if (!callback) {
            throw new Error('A callback function is required');
        }

        const inOrderRecursive = (node) => {
            if (node === null) return;

            inOrderRecursive(node.left);
            callback(node);
            inOrderRecursive(node.right);
        };

        inOrderRecursive(this.root);
    }

    preOrder(callback) {
        if (!callback) {
            throw new Error('A callback function is required');
        }

        const preOrderRecursive = (node) => {
            if (node === null) return;

            callback(node);
            preOrderRecursive(node.left);
            preOrderRecursive(node.right);
        };

        preOrderRecursive(this.root);
    }

    postOrder(callback) {
        if (!callback) {
            throw new Error('A callback function is required');
        }

        const postOrderRecursive = (node) => {
            if (node === null) return;

            postOrderRecursive(node.left);
            postOrderRecursive(node.right);
            callback(node);
        };

        postOrderRecursive(this.root);
    }

    height(node) {
        const findNode = this.find(node);
        const heightRecursive = (node) => {
            if (node === null) {
                return -1;
            }

            const leftHeight = heightRecursive(node.left);
            const rightHeight = heightRecursive(node.right);

            return Math.max(leftHeight, rightHeight) + 1;
        };
        return heightRecursive(findNode);
    }

    depth(node) {
        const depthRecursive = (node, current, depth = 0) => {
            if (current === null) {
                return -1;
            }

            if (current.data === node.data) {
                return depth;
            }

            const leftDepth = depthRecursive(node, current.left, depth + 1);

            if (leftDepth !== -1) {
                return leftDepth;
            }

            return depthRecursive(node, current.right, depth + 1);
        };
        return depthRecursive(node, this.root);
    }

    isBalanced() {
        const balancedRecursive = (node) => {
            if (node === null) {
                return { isBalanced: true, height: 0 };
            }

            const left = balancedRecursive(node.left);
            if (!left.isBalanced) {
                return { isBalanced: false, height: 0 };
            }

            const right = balancedRecursive(node.right);
            if (!right.isBalanced) {
                return { isBalanced: false, height: 0 };
            }

            const heightDifference = Math.abs(left.height - right.height);
            const isBalanced = heightDifference <= 1;
            const height = Math.max(left.height, right.height) + 1;

            return { isBalanced, height };
        };
        return balancedRecursive(this.root).isBalanced;
    }

    rebalance() {
        let inOrderTree = [];
        const callbackPush = (node) => {
            inOrderTree.push(node.data);
        };
        this.inOrder(callbackPush);
        this.root = this.buildTree(inOrderTree);
    }
}
