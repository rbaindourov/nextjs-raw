import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow warnings (1=INFO, 2=WARNING, 3=ERROR)

import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer

# Step 1: Define sample dialogues (at least 10 to match n_clusters=10)
dialogues = [
    "Hi, how’s your day? __eou__ Good, thanks! How about yours? __eou__ Pretty busy.",
    "What’s your favorite movie? __eou__ I love sci-fi films, you? __eou__ Action movies.",
    "How’s work going? __eou__ Stressful lately, too many deadlines. __eou__ I feel you.",
    "Planning any trips? __eou__ Maybe to the beach next month. __eou__ Sounds relaxing!",
    "Do you like cooking? __eou__ Yes, I enjoy trying new recipes. __eou__ Me too!",
    "What’s your favorite book? __eou__ I’m into fantasy novels. __eou__ I prefer mysteries.",
    "How’s your family? __eou__ They’re doing well, thanks. __eou__ Glad to hear that.",
    "What do you do for fun? __eou__ I like hiking and photography. __eou__ That’s cool!",
    "Are you into sports? __eou__ Yes, I play soccer on weekends. __eou__ I’m more of a basketball fan.",
    "What’s your favorite food? __eou__ I love Italian cuisine. __eou__ Me too, especially pizza!",
    "How’s the weather there? __eou__ It’s sunny and warm. __eou__ Lucky, it’s raining here."
]

# Step 2: Generate embeddings with Sentence-BERT
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
dialogue_embeddings = []

for dialogue in dialogues:
    utterances = dialogue.split(' __eou__ ')
    embeddings = model.encode(utterances)
    dialogue_embedding = np.mean(embeddings, axis=0)  # Average embeddings for the dialogue
    dialogue_embeddings.append(dialogue_embedding)

dialogue_embeddings = np.array(dialogue_embeddings)

# Step 3: Cluster conversations into 10 themes using K-means
kmeans = KMeans(n_clusters=10, random_state=42)
clusters = kmeans.fit_predict(dialogue_embeddings)

# Step 4: Compute TF-IDF across all conversations
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(dialogues)
feature_names = vectorizer.get_feature_names_out()

# Step 5: Identify and print themes for each cluster
for cluster_id in range(10):
    cluster_indices = np.where(clusters == cluster_id)[0]
    if len(cluster_indices) > 0:
        cluster_tfidf = tfidf_matrix[cluster_indices].mean(axis=0).A1
        top_word_indices = cluster_tfidf.argsort()[-5:][::-1]  # Top 5 words
        top_words = [feature_names[i] for i in top_word_indices]
        print(f"Cluster {cluster_id} Theme: {', '.join(top_words)}")
        sample_idx = cluster_indices[0]
        print(f"Sample: {dialogues[sample_idx][:50]}...\n")
    else:
        print(f"Cluster {cluster_id}: Empty cluster")
