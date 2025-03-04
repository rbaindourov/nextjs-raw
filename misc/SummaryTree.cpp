#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>
#include <functional>

// Node structure for the Summary Tree
struct Node {
    std::string content; // Episode text or summary
    Node *left;
    Node *right;
    int level; // Level of the node in the tree (0 for leaf, 1 for level above leaves, etc.)

    Node(std::string cont, Node* l=nullptr, Node* r=nullptr, int lvl=0) : content(cont), left(l), right(r), level(lvl) {}
    bool isLeaf() const { return left == nullptr && right == nullptr; }
};

// SummaryTree class
class SummaryTree {
private:
    Node *root;
    std::vector<Node*> leafNodes; // Keep track of leaf nodes in insertion order

    // Summarization function (basic concatenation for demonstration)
    std::string summarize(const std::string& text1, const std::string& text2) {
        return "Summary: \"" + text1 + "\" and \"" + text2 + "\""; // Basic summary
    }

    Node* buildSummaryNode(Node* leftChild, Node* rightChild) {
        if (!leftChild || !rightChild) return nullptr;
        std::string summary = summarize(leftChild->content, rightChild->content);
        return new Node(summary, leftChild, rightChild, leftChild->level + 1); // Level is one level higher
    }

public:
    SummaryTree() : root(nullptr) {}

    void insertEpisode(const std::string& episode) {
        Node* newLeaf = new Node(episode, nullptr, nullptr, 0);
        leafNodes.push_back(newLeaf);

        if (leafNodes.size() == 1) {
            root = newLeaf;
        } else if (leafNodes.size() % 2 == 0) {
            std::vector<Node*> currentLevelNodes = leafNodes;
            std::vector<Node*> nextLevelNodes;

            while (currentLevelNodes.size() > 1) {
                for (size_t i = 0; i < currentLevelNodes.size(); i += 2) {
                    Node* leftNode = currentLevelNodes[i];
                    Node* rightNode = (i + 1 < currentLevelNodes.size()) ? currentLevelNodes[i+1] : nullptr;
                    if (rightNode) {
                        nextLevelNodes.push_back(buildSummaryNode(leftNode, rightNode));
                    } else {
                        nextLevelNodes.push_back(leftNode); // If odd number, carry over to next level
                    }
                }
                currentLevelNodes = nextLevelNodes;
                nextLevelNodes.clear();
            }
            root = currentLevelNodes[0];
        }
    }

    std::vector<Node*> fetchNodes(int num_nodes) {
        if (num_nodes <= 0) return {};
        std::vector<Node*> allNodes;
        std::vector<std::pair<Node*, double>> scoredNodes;

        std::function<void(Node*)> traverse = [&](Node* node) {
            if (node) {
                double score = std::pow(0.5, node->level); // Exponential weight: higher level, lower score
                scoredNodes.push_back({node, score});
                traverse(node->left);
                traverse(node->right);
            }
        };
        traverse(root);

        std::sort(scoredNodes.begin(), scoredNodes.end(), [](const std::pair<Node*, double>& a, const std::pair<Node*, double>& b) {
            return a.second > b.second; // Sort in descending order of scores
        });

        std::vector<Node*> resultNodes;
        int count = 0;
        for (const auto& pair : scoredNodes) {
            if (count < num_nodes) {
                resultNodes.push_back(pair.first);
                count++;
            } else {
                break;
            }
        }
        return resultNodes;
    }

    // For debugging - print the tree structure (level order traversal)
    void printTree() {
        if (!root) return;
        std::vector<Node*> currentLevel = {root};
        while (!currentLevel.empty()) {
            std::vector<Node*> nextLevel;
            for (Node* node : currentLevel) {
                std::cout << "\"" << node->content << "\" (Level " << node->level << ") ";
                if (node->left) nextLevel.push_back(node->left);
                if (node->right) nextLevel.push_back(node->right);
            }
            std::cout << std::endl;
            currentLevel = nextLevel;
        }
    }
};

int main() {
    SummaryTree tree;
    tree.insertEpisode("Episode 1: Text of episode 1.");
    tree.insertEpisode("Episode 2: Text of episode 2.");
    tree.insertEpisode("Episode 3: Text of episode 3.");
    tree.insertEpisode("Episode 4: Text of episode 4.");
    tree.insertEpisode("Episode 5: Text of episode 5.");
    tree.insertEpisode("Episode 6: Text of episode 6.");

    std::cout << "Tree Structure:\n";
    tree.printTree();

    std::cout << "\nFetch 2 nodes:\n";
    std::vector<Node*> fetchedNodes = tree.fetchNodes(2);
    for (Node* node : fetchedNodes) {
        std::cout << "- \"" << node->content << "\" (Level " << node->level << ")\n";
    }

    std::cout << "\nFetch 5 nodes:\n";
    fetchedNodes = tree.fetchNodes(5);
    for (Node* node : fetchedNodes) {
        std::cout << "- \"" << node->content << "\" (Level " << node->level << ")\n";
    }

    return 0;
}