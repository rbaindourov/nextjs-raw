#include <iostream>
#include <algorithm>
#include <climits> // For INT_MAX

using namespace std;

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    int findSecondMinimumValue(TreeNode* root) {
        if (!root) return -1; // Handle empty tree case

        int minVal = root->val;
        int secondMin = INT_MAX;

        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (!node) return;

            if (node->val > minVal) { // If value is larger than min
                secondMin = min(secondMin, node->val); // update secondMin
            } else if (node->val == minVal) {
               // if node is equal to the min keep traversing to children
               dfs(node->left);
               dfs(node->right);
            }
        };

        dfs(root);

        return (secondMin == INT_MAX) ? -1 : secondMin; // Return -1 if no second min found
    }
};


// Helper function to create the tree based on input like [2,2,5,null,null,5,7]
TreeNode* createTree(const vector<int>& values, int& index) {
    if (index >= values.size() || values[index] == -1) {
        return nullptr;
    }
    TreeNode* node = new TreeNode(values[index++]);
    node->left = createTree(values, index);
    node->right = createTree(values, index);
    return node;
}


int main() {
    Solution sol;
    // Example 1: [2,2,5,null,null,5,7]
    vector<int> values1 = {2, 2, 5, -1, -1, 5, 7};
    int index1 = 0;
    TreeNode* root1 = createTree(values1, index1);
    cout << "Second minimum (example 1): " << sol.findSecondMinimumValue(root1) << endl;  // Output: 5

    // Example 2: [2,2,2]
    vector<int> values2 = {2, 2, 2};
    int index2 = 0;
    TreeNode* root2 = createTree(values2, index2);
    cout << "Second minimum (example 2): " << sol.findSecondMinimumValue(root2) << endl;  // Output: -1

      // Example 3: [1,1,3,1,1,3,4,3,1,1,1,3,8,4,8,7,8]
    vector<int> values3 = {1, 1, 3, 1, 1, 3, 4,3,1,1,1,3,8,4,8,7,8};
    int index3 = 0;
    TreeNode* root3 = createTree(values3, index3);
     cout << "Second minimum (example 3): " << sol.findSecondMinimumValue(root3) << endl; // Output 3

    return 0;
}