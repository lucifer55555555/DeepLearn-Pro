
export type Course = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageId: string;
  videoUrl: string;
  topic: string;
};

export const courses: Course[] = [
  {
    id: 'ml-foundations',
    title: 'Machine Learning Foundations',
    description: 'A comprehensive introduction to the core concepts of machine learning, from linear regression to classification.',
    difficulty: 'Beginner',
    imageId: 'course-ml-foundations',
    videoUrl: 'https://www.youtube.com/embed/Gv5a_pI3pYQ',
    topic: 'intro-to-ml',
  },
  {
    id: 'dl-fundamentals',
    title: 'Deep Learning Fundamentals',
    description: 'Explore neural networks, backpropagation, and build your first models with popular frameworks.',
    difficulty: 'Intermediate',
    imageId: 'course-dl-fundamentals',
    videoUrl: 'https://www.youtube.com/embed/6M5VXKLf4D4',
    topic: 'neural-networks',
  },
  {
    id: 'cv-mastery',
    title: 'Computer Vision Mastery',
    description: 'Dive into image classification, object detection, and segmentation with convolutional neural networks.',
    difficulty: 'Advanced',
    imageId: 'course-cv-mastery',
    videoUrl: 'https://www.youtube.com/embed/N81PCpADwKQ',
    topic: 'computer-vision',
  },
  {
    id: 'nlp-expert',
    title: 'Natural Language Processing Expert',
    description: 'Learn to process and understand human language, from sentiment analysis to machine translation.',
    difficulty: 'Advanced',
    imageId: 'course-nlp-expert',
    videoUrl: 'https://www.youtube.com/embed/fNxaJsNG3-s',
    topic: 'natural-language-processing',
  },
];

export type LearningTopic = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export const learningTopics: LearningTopic[] = [
  {
    slug: 'intro-to-ml',
    title: 'Introduction to Machine Learning',
    description: 'Understand the basics of what machine learning is and its different types.',
    content: `
# Introduction to Machine Learning

Machine Learning (ML) is a subfield of artificial intelligence (AI) that focuses on building systems that can learn from data. Instead of being explicitly programmed to perform a task, these systems use algorithms to find patterns in data and make predictions or decisions.

## Types of Machine Learning

There are three main types of machine learning:

1.  **Supervised Learning:** The model is trained on a labeled dataset, meaning each data point is tagged with a correct output. The goal is to learn a mapping function that can predict the output for new, unseen data. Examples include spam detection and image classification.

2.  **Unsupervised Learning:** The model is given an unlabeled dataset and must find patterns or structure on its own. The goal is to discover hidden patterns in data. Examples include customer segmentation and anomaly detection.

3.  **Reinforcement Learning:** The model, or "agent," learns by interacting with an environment. It receives rewards or penalties for its actions, and its goal is to maximize the cumulative reward over time. Examples include game playing (like Chess or Go) and robotics.
    `,
  },
  {
    slug: 'neural-networks',
    title: 'Neural Networks Basics',
    description: 'Learn about the building blocks of deep learning: artificial neural networks.',
    content: `
# Neural Networks Basics

An Artificial Neural Network (ANN) is a computational model inspired by the structure and function of biological neural networks in the human brain. They are the foundational technology behind most deep learning models.

## Structure of a Neural Network

A neural network consists of layers of interconnected nodes, or "neurons."

1.  **Input Layer:** Receives the initial data for the network. The number of neurons in this layer corresponds to the number of features in the input data.

2.  **Hidden Layers:** These are the intermediate layers between the input and output layers. A network can have zero or more hidden layers. "Deep" learning refers to networks with many hidden layers (typically more than one). Each neuron in a hidden layer applies an "activation function" to the weighted sum of its inputs.

3.  **Output Layer:** Produces the final result of the network. The number of neurons and the activation function used in this layer depend on the specific task (e.g., a single neuron for regression, multiple neurons with a softmax function for multi-class classification).

## How They Learn

Neural networks learn through a process called **training**. During training, the network is presented with data, and it makes predictions. The difference between the prediction and the actual target (the "error" or "loss") is calculated. This error is then used to adjust the network's internal parameters (weights and biases) through an algorithm called **backpropagation** and an optimization technique like **gradient descent**. This process is repeated thousands or millions of times until the network's performance on the training data is satisfactory.
    `,
  },
  {
    slug: 'computer-vision',
    title: 'Fundamentals of Computer Vision',
    description: 'Explore how machines can "see" and interpret the visual world.',
    content: `
# Fundamentals of Computer Vision

Computer Vision (CV) is a field of AI that trains computers to interpret and understand the visual world. Using digital images from cameras and videos and deep learning models, machines can accurately identify and classify objects — and then react to what they “see.”

## Key Concepts in CV

1. **Image Classification:** The simplest task in CV. The model is given an image and it must predict what class the image belongs to (e.g., "cat", "dog", "car").

2. **Object Detection:** This task involves not only classifying objects in an image but also locating their position with a bounding box. A single image might contain multiple objects to be detected.

3. **Image Segmentation:** This goes a step further than object detection. Instead of just drawing a bounding box, segmentation models classify each pixel in an image to determine the exact outline of the objects.

## Core Technology: Convolutional Neural Networks (CNNs)

Most modern computer vision models are based on a special type of neural network called a **Convolutional Neural Network (CNN)**. CNNs are designed to process pixel data and can learn to recognize patterns like edges, textures, and shapes. They use layers of "convolutions," which are like filters that slide over the image to detect these features, and "pooling" layers that downsample the image to make the process more efficient.
    `,
  },
  {
    slug: 'natural-language-processing',
    title: 'Introduction to Natural Language Processing',
    description: 'Discover how computers can be taught to understand and process human language.',
    content: `
# Introduction to Natural Language Processing

Natural Language Processing (NLP) is a branch of artificial intelligence that helps computers understand, interpret, and manipulate human language. NLP draws from many disciplines, including computer science and computational linguistics, in its pursuit to fill the gap between human communication and computer understanding.

## Common NLP Tasks

1. **Sentiment Analysis:** Identifying the mood or emotional tone of a piece of text. Is a product review positive or negative? Is a tweet happy or angry?

2. **Machine Translation:** Automatically translating text or speech from one language to another. Services like Google Translate are a prime example.

3. **Named Entity Recognition (NER):** Locating and classifying named entities in text into pre-defined categories such as the names of persons, organizations, locations, expressions of times, quantities, monetary values, percentages, etc.

## Key Models: Transformers

While earlier NLP models like Recurrent Neural Networks (RNNs) were common, the field has been revolutionized by the **Transformer** architecture. Transformers use a mechanism called **attention** to weigh the importance of different words in the input text. This allows them to handle long-range dependencies in language much more effectively than their predecessors, leading to state-of-the-art performance on a wide variety of NLP tasks. Models like BERT and GPT are based on the Transformer architecture.
    `,
  },
];

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  slug: string;
  title: string;
  description: string;
  topic: LearningTopic['slug'];
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  {
    slug: 'ml-basics-quiz',
    title: 'Machine Learning Basics',
    description: 'Test your knowledge on the fundamental concepts of machine learning.',
    topic: 'intro-to-ml',
    questions: [
      {
        id: 'q1',
        question: 'Which type of machine learning uses labeled data for training?',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Semi-supervised Learning'],
        correctAnswer: 'Supervised Learning',
      },
      {
        id: 'q2',
        question: 'What is the main goal of Unsupervised Learning?',
        options: ['To predict a continuous value', 'To classify data into categories', 'To find hidden patterns or structure in data', 'To learn through rewards and penalties'],
        correctAnswer: 'To find hidden patterns or structure in data',
      },
      {
        id: 'q3',
        question: 'An agent learning to play chess by getting a reward for winning is an example of:',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Clustering'],
        correctAnswer: 'Reinforcement Learning',
      },
      {
        id: 'q4',
        question: 'Spam detection in emails is a classic example of:',
        options: ['Regression', 'Clustering', 'Classification', 'Reinforcement Learning'],
        correctAnswer: 'Classification',
      },
      {
        id: 'q5',
        question: 'Grouping customers into different segments based on their purchasing behavior is an example of:',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Regression'],
        correctAnswer: 'Unsupervised Learning',
      },
    ],
  },
  {
    slug: 'nn-basics-quiz',
    title: 'Neural Network Basics',
    description: 'Test your understanding of the components of a neural network.',
    topic: 'neural-networks',
    questions: [
      {
        id: 'q1',
        question: 'What is the process of adjusting the weights of a neural network called?',
        options: ['Forward Propagation', 'Backpropagation', 'Activation', 'Inference'],
        correctAnswer: 'Backpropagation',
      },
      {
        id: 'q2',
        question: 'Which layer of a neural network produces the final prediction?',
        options: ['Input Layer', 'Hidden Layer', 'Convolutional Layer', 'Output Layer'],
        correctAnswer: 'Output Layer',
      },
      {
        id: 'q3',
        question: 'The term "Deep Learning" typically refers to neural networks with:',
        options: ['Only one layer', 'Many input features', 'Many hidden layers', 'A complex activation function'],
        correctAnswer: 'Many hidden layers',
      },
      {
        id: 'q4',
        question: 'What is the purpose of an activation function in a neuron?',
        options: ['To normalize the input data', 'To introduce non-linearity into the network', 'To calculate the loss', 'To initialize the weights'],
        correctAnswer: 'To introduce non-linearity into the network',
      },
      {
        id: 'q5',
        question: 'What does "loss" or "error" represent during the training of a neural network?',
        options: ['The number of neurons in the hidden layer', 'The speed of the training process', 'The difference between the predicted output and the actual target', 'The amount of data used for training'],
        correctAnswer: 'The difference between the predicted output and the actual target',
      },
    ],
  },
    {
    slug: 'cv-basics-quiz',
    title: 'Computer Vision Basics',
    description: 'Test your knowledge on the fundamental concepts of computer vision.',
    topic: 'computer-vision',
    questions: [
      {
        id: 'q1',
        question: 'What is the primary type of neural network used in modern computer vision tasks?',
        options: ['Recurrent Neural Network (RNN)', 'Convolutional Neural Network (CNN)', 'Generative Adversarial Network (GAN)', 'Transformer'],
        correctAnswer: 'Convolutional Neural Network (CNN)',
      },
      {
        id: 'q2',
        question: 'Which computer vision task involves drawing a bounding box around an object and identifying what the object is?',
        options: ['Image Classification', 'Image Segmentation', 'Object Detection', 'Style Transfer'],
        correctAnswer: 'Object Detection',
      },
      {
        id: 'q3',
        question: 'Classifying each pixel in an image to a specific object class is called:',
        options: ['Object Localization', 'Image Segmentation', 'Image Classification', 'Object Recognition'],
        correctAnswer: 'Image Segmentation',
      },
      {
        id: 'q4',
        question: 'In a CNN, what is the purpose of a "pooling" layer?',
        options: ['To increase the number of parameters', 'To introduce non-linearity', 'To downsample the feature map and reduce dimensionality', 'To apply a filter to the image'],
        correctAnswer: 'To downsample the feature map and reduce dimensionality',
      },
      {
        id: 'q5',
        question: 'Which of the following is the simplest computer vision task?',
        options: ['Object Detection', 'Image Segmentation', 'Image Classification', 'Instance Segmentation'],
        correctAnswer: 'Image Classification',
      },
    ],
  },
  {
    slug: 'nlp-basics-quiz',
    title: 'NLP Basics',
    description: 'Test your knowledge on the fundamental concepts of Natural Language Processing.',
    topic: 'natural-language-processing',
    questions: [
      {
        id: 'q1',
        question: 'What is the name of the architecture that revolutionized NLP and is used in models like BERT and GPT?',
        options: ['Recurrent Neural Network (RNN)', 'Long Short-Term Memory (LSTM)', 'Convolutional Neural Network (CNN)', 'Transformer'],
        correctAnswer: 'Transformer',
      },
      {
        id: 'q2',
        question: 'What NLP task involves identifying if a piece of text expresses a positive, negative, or neutral opinion?',
        options: ['Named Entity Recognition (NER)', 'Machine Translation', 'Sentiment Analysis', 'Text Summarization'],
        correctAnswer: 'Sentiment Analysis',
      },
      {
        id: 'q3',
        question: 'The "attention mechanism" in a Transformer model helps it to:',
        options: ['Process text faster', 'Weigh the importance of different words in the input text', 'Reduce the model size', 'Only work with short sentences'],
        correctAnswer: 'Weigh the importance of different words in the input text',
      },
      {
        id: 'q4',
        question: 'Identifying names of people, organizations, and locations in a text is an example of which task?',
        options: ['Part-of-Speech Tagging', 'Named Entity Recognition (NER)', 'Sentiment Analysis', 'Coreference Resolution'],
        correctAnswer: 'Named Entity Recognition (NER)',
      },
      {
        id: 'q5',
        question: 'Which of the following is a well-known service that performs machine translation?',
        options: ['Siri', 'Alexa', 'Google Translate', 'Grammarly'],
        correctAnswer: 'Google Translate',
      },
    ],
  },
];

export type RoadmapStep = {
  title: string;
  description: string;
  subSteps?: string[];
};

export type Roadmap = {
  id: string;
  title: string;
  topic: string;
  steps: RoadmapStep[];
};

export const roadmaps: Roadmap[] = [
  {
    id: 'roadmap-ml-basics',
    title: 'Machine Learning Basics Roadmap',
    topic: 'intro-to-ml',
    steps: [
      {
        title: 'Understand the Core Concepts',
        description: 'Grasp what Machine Learning is, and the problems it can solve.',
        subSteps: ['What is ML?', 'Supervised vs. Unsupervised vs. Reinforcement Learning', 'Common applications'],
      },
      {
        title: 'Learn about Supervised Learning',
        description: 'Dive into the most common type of ML, where models learn from labeled data.',
        subSteps: ['Regression vs. Classification', 'Linear Regression', 'Logistic Regression', 'Decision Trees'],
      },
      {
        title: 'Explore Unsupervised Learning',
        description: 'Discover how models find hidden patterns in unlabeled data.',
        subSteps: ['Clustering with K-Means', 'Dimensionality Reduction with PCA'],
      },
      {
        title: 'Get Acquainted with Reinforcement Learning',
        description: 'Learn the basics of how agents learn to make decisions to maximize rewards.',
        subSteps: ['Agents and Environments', 'Rewards and Policies', 'Q-Learning basics'],
      },
    ],
  },
  {
    id: 'roadmap-nn-basics',
    title: 'Neural Networks Basics Roadmap',
    topic: 'neural-networks',
    steps: [
      {
        title: 'The Building Blocks: Neurons and Layers',
        description: 'Understand the fundamental components of a neural network.',
        subSteps: ['The Artificial Neuron (Perceptron)', 'Activation Functions (Sigmoid, ReLU)', 'Input, Hidden, and Output Layers'],
      },
      {
        title: 'Assembling a Network',
        description: 'Learn how layers are combined to create a full network.',
        subSteps: ['Feedforward Networks', 'Defining the architecture'],
      },
      {
        title: 'The Learning Process',
        description: 'Discover how a neural network "learns" from data.',
        subSteps: ['Loss Functions (e.g., Mean Squared Error)', 'Gradient Descent', 'Backpropagation'],
      },
      {
        title: 'Going "Deep"',
        description: 'Understand what makes a network "deep" and why it matters.',
        subSteps: ['Multiple Hidden Layers', 'The concept of feature hierarchy'],
      },
    ],
  },
  {
    id: 'roadmap-cv-basics',
    title: 'Computer Vision Basics Roadmap',
    topic: 'computer-vision',
    steps: [
       {
        title: 'Image Fundamentals',
        description: 'Understand how computers "see" images.',
        subSteps: ['Pixels and Color Channels (RGB)', 'Image resolution and size'],
      },
      {
        title: 'The Powerhouse: Convolutional Neural Networks (CNNs)',
        description: 'Learn about the specialized architecture for vision tasks.',
        subSteps: ['Convolutional Layers and Filters', 'Pooling Layers (Max Pooling)', 'Building a basic CNN'],
      },
      {
        title: 'Core CV Tasks',
        description: 'Explore the most common applications of computer vision.',
        subSteps: ['Image Classification', 'Object Detection (Bounding Boxes)', 'Image Segmentation (Pixel-level classification)'],
      },
      {
        title: 'Advanced Topics',
        description: 'A glimpse into more complex CV concepts.',
        subSteps: ['Transfer Learning with pre-trained models', 'Generative Adversarial Networks (GANs) for image generation'],
      },
    ],
  },
  {
    id: 'roadmap-nlp-basics',
    title: 'Natural Language Processing Roadmap',
    topic: 'natural-language-processing',
    steps: [
       {
        title: 'Text Preprocessing',
        description: 'Learn how to clean and prepare text data for machines.',
        subSteps: ['Tokenization (splitting text into words)', 'Stop Word Removal', 'Stemming and Lemmatization'],
      },
      {
        title: 'Representing Words as Numbers',
        description: 'Discover techniques to convert text into a format a model can understand.',
        subSteps: ['Bag-of-Words', 'TF-IDF', 'Word Embeddings (Word2Vec, GloVe)'],
      },
      {
        title: 'The Revolution: The Transformer Architecture',
        description: 'Understand the model that powers modern NLP.',
        subSteps: ['The Attention Mechanism', 'Encoder-Decoder Structure', 'Models like BERT and GPT'],
      },
      {
        title: 'Common NLP Applications',
        description: 'Explore key tasks in Natural Language Processing.',
        subSteps: ['Sentiment Analysis', 'Named Entity Recognition (NER)', 'Machine Translation'],
      },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  imageId: string;
  content: string;
};

export const projects: Project[] = [
    {
        id: 'sentiment-analyzer',
        title: 'Sentiment Analyzer for Movie Reviews',
        description: 'Build a model to classify movie reviews as positive or negative. A great introduction to NLP and classification.',
        difficulty: 'Beginner',
        tags: ['NLP', 'Classification', 'Supervised Learning'],
        imageId: 'project-sentiment-analyzer',
        content: `
# Project: Sentiment Analyzer for Movie Reviews

## 1. Objective
Build and train a machine learning model that can predict whether a movie review is positive or negative.

## 2. Dataset
You can use the classic IMDb movie reviews dataset. It contains 50,000 reviews, split into 25,000 for training and 25,000 for testing. Each review is labeled as either positive (1) or negative (0).

## 3. Preprocessing
1. **Clean the text:** Remove HTML tags, punctuation, and convert all text to lowercase.
2. **Tokenization:** Split the reviews into individual words (tokens).
3. **Vectorization:** Convert the text tokens into numerical vectors. The Bag-of-Words approach (using \`CountVectorizer\`) or TF-IDF (\`TfidfVectorizer\`) are great starting points.

## 4. Model Building
1. **Choose a model:** A simple Logistic Regression or a Naive Bayes classifier works well for this task.
2. **Train the model:** Fit your chosen model on the training data (the vectorized text and the corresponding labels).

## 5. Evaluation
1. **Make predictions:** Use your trained model to predict the sentiment of the reviews in the test set.
2. **Check accuracy:** Compare your model's predictions to the actual labels in the test set to calculate its accuracy. An accuracy above 85% is a good result for a first attempt!

## 6. Solution Code
\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd

# Assume you have a pandas DataFrame 'df' with 'review' and 'sentiment' columns
# df['sentiment'] should be 1 for positive, 0 for negative

# 1. Split data
X_train, X_test, y_train, y_test = train_test_split(
    df['review'], df['sentiment'], test_size=0.2, random_state=42
)

# 2. Vectorize text data
vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# 3. Train the model
model = LogisticRegression(solver='liblinear')
model.fit(X_train_tfidf, y_train)

# 4. Evaluate the model
y_pred = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")

# 5. Predict on new data
new_review = ["This movie was fantastic, the best I've seen all year!"]
new_review_tfidf = vectorizer.transform(new_review)
prediction = model.predict(new_review_tfidf)
print("Prediction for new review:", "Positive" if prediction[0] == 1 else "Negative")
\`\`\`
`
    },
    {
        id: 'digit-recognizer',
        title: 'Handwritten Digit Recognizer',
        description: 'Create a deep learning model that can recognize and classify handwritten digits from 0 to 9.',
        difficulty: 'Intermediate',
        tags: ['Computer Vision', 'Deep Learning', 'CNN'],
        imageId: 'project-digit-recognizer',
        content: `
# Project: Handwritten Digit Recognizer

## 1. Objective
Build a Convolutional Neural Network (CNN) to classify images of handwritten digits (from 0 to 9).

## 2. Dataset
Use the MNIST dataset, which is a famous collection of 70,000 grayscale images of handwritten digits, each 28x28 pixels in size. It's often called the "hello world" of computer vision.

## 3. Preprocessing
1. **Load the data:** Most deep learning frameworks have built-in functions to load the MNIST dataset.
2. **Normalize the data:** Pixel values usually range from 0 to 255. Normalize them to a range of 0 to 1 by dividing by 255. This helps the model train faster.
3. **Reshape the data:** CNNs expect a specific input shape, which includes the color channel. Reshape your images from (num_samples, 28, 28) to (num_samples, 28, 28, 1).
4. **One-hot encode labels:** Convert the numerical labels (0, 1, 2...) into one-hot vectors (e.g., 2 becomes [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]).

## 4. Model Building
1. **Define the CNN architecture:**
    * Start with a \`Conv2D\` layer with a small filter (e.g., 3x3) and ReLU activation.
    * Add a \`MaxPooling2D\` layer to downsample.
    * Add another \`Conv2D\` and \`MaxPooling2D\` layer.
    * \`Flatten\` the output from the convolutional layers.
    * Add a \`Dense\` (fully connected) layer with ReLU activation.
    * Add the final \`Dense\` output layer with 10 neurons (one for each digit) and a \`softmax\` activation function.
2. **Compile the model:** Choose an optimizer (like 'adam'), a loss function ('categorical_crossentropy' for one-hot labels), and a metric to track ('accuracy').

## 5. Training and Evaluation
1. **Train the model:** Use the \`.fit()\` method, passing in your training data, validation data, and the number of epochs to train for.
2. **Evaluate the model:** Use the \`.evaluate()\` method on the test set to see how well your model performs on unseen data. A well-built model can easily achieve over 99% accuracy on MNIST.

## 6. Solution Code
\`\`\`python
import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.utils import to_categorical

# 1. Load and preprocess data
(x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

x_train = x_train[..., tf.newaxis]
x_test = x_test[..., tf.newaxis]

y_train = to_categorical(y_train, num_classes=10)
y_test = to_categorical(y_test, num_classes=10)

# 2. Build the CNN model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(64, activation='relu'),
    Dense(10, activation='softmax')
])

# 3. Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# 4. Train the model
model.fit(x_train, y_train, epochs=5, batch_size=64, validation_split=0.1)

# 5. Evaluate the model
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print(f'\\nTest accuracy: {test_acc:.4f}')
\`\`\`
`
    }
];
