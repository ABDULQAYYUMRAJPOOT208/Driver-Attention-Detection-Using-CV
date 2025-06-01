import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import tempfile
import random
from collections import Counter





app = Flask(__name__)
CORS(app, supports_credentials=True)

# Load the trained model
MODEL_PATH = 'driver_attention_cnn_model.h5'
model = load_model(MODEL_PATH)

if(model is None):
    print("Model not loaded properly. Please check the model path and file.")
else:
    print("Model loaded successfully.")

# Define image size for the model
IMAGE_SIZE = (128, 128)

# Class labels (adjust based on your dataset classes)
CLASS_LABELS = [f"c{i}" for i in range(10)]

def prepare_image(img):
    img = cv2.resize(img, IMAGE_SIZE)
    img = img / 255.0
    return img
@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to the Driver Attention Detection API!'})


@app.route('/predict', methods=['POST'])
def predict_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Read image file
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = prepare_image(img)
    img = np.expand_dims(img, axis=0)

    predictions = model.predict(img)
    class_idx = int(np.argmax(predictions, axis=1)[0])
    return jsonify({
        'prediction': CLASS_LABELS[class_idx],
        'confidence': float(np.max(predictions))
    })


@app.route('/predict_video', methods=['POST'])
def predict_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
        file.save(temp_video.name)
        temp_video_path = temp_video.name
    
    cap = cv2.VideoCapture(temp_video_path)
    if not cap.isOpened():
        os.remove(temp_video_path)
        return jsonify({'error': 'Failed to open video file'}), 400
    
    frame_predictions = []
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Preprocess frame for model input (example resize + normalize)
        img = cv2.resize(frame, (128, 128))
        img = img.astype('float32') / 255.0
        img = np.expand_dims(img, axis=0)
        
        # MOCK: Random prediction for demo (replace with your model)
        predicted_class = random.choice(['c1', 'c2', 'c3'])
        
        frame_predictions.append(predicted_class)
    
    cap.release()
    os.remove(temp_video_path)
    
    # Final prediction by majority vote
    prediction = Counter(frame_predictions).most_common(1)[0][0] if frame_predictions else "unknown"
    
    return jsonify({
        'prediction': prediction,
        'all_frame_predictions': frame_predictions
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)
