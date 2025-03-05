#include <iostream>
#include <vector>
#include <queue>

// Define the structure for a tree node
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Binary Search Tree class
class BST {
public:
    TreeNode* root;

    // Constructor
    BST() : root(nullptr) {}

    // Destructor to free memory
    ~BST() {
        deleteTreeHelper(root);
    }

    // Insert a value into the BST
    void insert(int val) {
        root = insertHelper(root, val);
    }

    // DFS Traversals
    std::vector<int> inorderTraversal() {
        std::vector<int> result;
        inorderHelper(root, result);
        return result;
    }

    std::vector<int> preorderTraversal() {
        std::vector<int> result;
        preorderHelper(root, result);
        return result;
    }

    std::vector<int> postorderTraversal() {
        std::vector<int> result;
        postorderHelper(root, result);
        return result;
    }

    // BFS Traversal (Level Order)
    std::vector<int> bfsTraversal() {
        std::vector<int> result;
        if (root == nullptr) return result;

        std::queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* current = q.front();
            q.pop();
            result.push_back(current->val);

            if (current->left != nullptr) {
                q.push(current->left);
            }
            if (current->right != nullptr) {
                q.push(current->right);
            }
        }
        return result;
    }

private:
    // Helper function to insert a value
    TreeNode* insertHelper(TreeNode* node, int val) {
        if (node == nullptr) {
            return new TreeNode(val);
        }
        if (val < node->val) {
            node->left = insertHelper(node->left, val);
        } else {
            node->right = insertHelper(node->right, val);
        }
        return node;
    }

    // Helper function for inorder traversal (left, root, right)
    void inorderHelper(TreeNode* node, std::vector<int>& result) {
        if (node != nullptr) {
            inorderHelper(node->left, result);
            result.push_back(node->val);
            inorderHelper(node->right, result);
        }
    }

    // Helper function for preorder traversal (root, left, right)
    void preorderHelper(TreeNode* node, std::vector<int>& result) {
        if (node != nullptr) {
            result.push_back(node->val);
            preorderHelper(node->left, result);
            preorderHelper(node->right, result);
        }
    }

    // Helper function for postorder traversal (left, right, root)
    void postorderHelper(TreeNode* node, std::vector<int>& result) {
        if (node != nullptr) {
            postorderHelper(node->left, result);
            postorderHelper(node->right, result);
            result.push_back(node->val);
        }
    }

    // Helper function to delete the tree
    void deleteTreeHelper(TreeNode* node) {
        if (node != nullptr) {
            deleteTreeHelper(node->left);
            deleteTreeHelper(node->right);
            delete node;
        }
    }
};

// Main function to test the implementation
int main() {
    BST bst;
    // Insert values into the BST
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(2);
    bst.insert(4);
    bst.insert(6);
    bst.insert(8);

    // Perform and print inorder traversal
    std::cout << "Inorder traversal: ";
    for (int val : bst.inorderTraversal()) {
        std::cout << val << " ";
    }
    std::cout << std::endl;  // Expected output: 2 3 4 5 6 7 8

    // Perform and print preorder traversal
    std::cout << "Preorder traversal: ";
    for (int val : bst.preorderTraversal()) {
        std::cout << val << " ";
    }
    std::cout << std::endl;  // Expected output: 5 3 2 4 7 6 8

    // Perform and print postorder traversal
    std::cout << "Postorder traversal: ";
    for (int val : bst.postorderTraversal()) {
        std::cout << val << " ";
    }
    std::cout << std::endl;  // Expected output: 2 4 3 6 8 7 5

    // Perform and print BFS traversal
    std::cout << "BFS traversal: ";
    for (int val : bst.bfsTraversal()) {
        std::cout << val << " ";
    }
    std::cout << std::endl;  // Expected output: 5 3 7 2 4 6 8

    return 0;
}