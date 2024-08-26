import { Tree } from './index.mjs';

const array = [5, 8, 15, 1, 95, 50, 13, 7, 33, 68];
const tree = new Tree(array);
tree.prettyPrint(tree.root);
console.log(`Balanced ${tree.isBalanced()}`);
const callbackPrint = (node) => {
    console.log(node.data);
};
tree.levelOrderIteration(callbackPrint);
tree.preOrder(callbackPrint);
tree.postOrder(callbackPrint);
tree.inOrder(callbackPrint);

tree.insert(101);
tree.insert(120);
tree.insert(133);

console.log(`Balanced ${tree.isBalanced()}`);

tree.rebalance();
console.log(`Balanced ${tree.isBalanced()}`);

tree.levelOrderIteration(callbackPrint);
tree.preOrder(callbackPrint);
tree.postOrder(callbackPrint);
tree.inOrder(callbackPrint);
