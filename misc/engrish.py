class Node:
    def __init__(self, word):
        self.word = word
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def pretty_print(self, level=0):
        indent = "  " * level
        result = f"{indent}{self.word}\n"
        for child in self.children:
            result += child.pretty_print(level + 1)
        return result

def minimal_parser(line):
    # Tokenize the single line of pseudocode into words.
    tokens = line.strip().split()
    if not tokens:
        return None

    # Start with the first token as the most general (summary) node.
    root = Node(tokens[0])
    current = root

    # Each subsequent word becomes a more specific modifier.
    # In this minimal approach we simply nest each word as the child of the previous.
    for token in tokens[1:]:
        child = Node(token)
        current.add_child(child)
        current = child

    return root

# Example usage:
if __name__ == "__main__":
    # Engrish pseudocode example:
    # "do task quickly now"
    pseudocode = "do task quickly now"
    tree = minimal_parser(pseudocode)
    if tree:
        print("Parse Summary Tree:")
        print(tree.pretty_print())
////

import re

class Node:
    def __init__(self, word):
        self.word = word
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def __repr__(self, level=0):
        ret = "  " * level + self.word + "\n"
        for child in self.children:
            ret += child.__repr__(level + 1)
        return ret

def parse_pseudocode(line):
    words = re.findall(r"\w+", line)
    if not words:
        return None

    root = Node("ROOT")
    stack = [root]

    for word in words:
        new_node = Node(word)
        
        # Insert as a child of the last node
        if stack:
            stack[-1].add_child(new_node)
        
        # Push the new node for potential future children
        stack.append(new_node)

    return root

# Example usage
line = "fast running fox jumps high"
tree = parse_pseudocode(line)
print(tree)

