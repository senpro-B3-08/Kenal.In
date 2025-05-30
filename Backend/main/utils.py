import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from deepface import DeepFace

def extract_embedding(img_path: str):
    embedding_result = DeepFace.represent(img_path=img_path, model_name="Facenet512", detector_backend="fastmtcnn")
    # normalize the embedding
    embedding = np.array(embedding_result[0]["embedding"])
    # normalize the embedding
    normalized_embedding = embedding / np.linalg.norm(embedding)
    return np.array(normalized_embedding)

def find_most_similar_face(input_embedding, stored_embeddings):
    input_vec = input_embedding.reshape(1, -1)
    scores = []

    for doc in stored_embeddings:
        stored_vec = np.array(doc['embedding']).reshape(1, -1)
        score = cosine_similarity(input_vec, stored_vec)[0][0]
        scores.append((doc['id'], score))

    if scores:
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[0]
    return None

def compare_embeddings(embedding1, embedding2):
    similarity = cosine_similarity(embedding1.reshape(1, -1), embedding2.reshape(1, -1))[0][0]
    return similarity
