
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
    id: 'supervised-ml',
    title: 'Supervised Machine Learning: Regression and Classification',
    description: 'Build machine learning models in Python using NumPy and scikit-learn to solve regression and classification problems.',
    difficulty: 'Beginner',
    imageId: 'course-supervised-ml',
    videoUrl: 'https://www.youtube.com/embed/PPLop4426hU', // Linear Regression
    topic: 'regression-classification',
  },
  {
    id: 'advanced-learning-algos',
    title: 'Advanced Learning Algorithms',
    description: 'Build and train neural networks with TensorFlow for multi-class classification, and apply decision trees and tree ensembles.',
    difficulty: 'Intermediate',
    imageId: 'course-advanced-algos',
    videoUrl: 'https://www.youtube.com/embed/aircAruvnKk', // Neural Networks
    topic: 'advanced-neural-networks',
  },
  {
    id: 'unsupervised-learning',
    title: 'Unsupervised Learning & Recommenders',
    description: 'Use unsupervised learning techniques for clustering and anomaly detection, and build recommender systems and reinforcement learning models.',
    difficulty: 'Intermediate',
    imageId: 'course-unsupervised',
    videoUrl: 'https://www.youtube.com/embed/mwa_S3C_v00', // Clustering
    topic: 'unsupervised-recommenders',
  },
  {
    id: 'neural-networks-dl',
    title: 'Neural Networks and Deep Learning',
    description: 'Master the architectural foundations of deep learning and build fully connected deep neural networks.',
    difficulty: 'Advanced',
    imageId: 'course-dl-foundations',
    videoUrl: 'https://www.youtube.com/embed/OcycT1Jwsns', // Deep Learning basics
    topic: 'dl-foundations',
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
    slug: 'regression-classification',
    title: 'Supervised Learning: Regression & Classification',
    description: 'Master linear and logistic regression, the foundations of supervised learning.',
    content: `
# Supervised Learning Foundations

Supervised learning is where you have input variables (x) and an output variable (Y) and you use an algorithm to learn the mapping function from the input to the output.

## Linear Regression
Linear regression is used to predict a continuous numerical value. For example, predicting house prices based on square footage.
- **Model:** $f_{w,b}(x) = wx + b$
- **Cost Function:** Mean Squared Error (MSE) measures how well the model fits the data.
- **Gradient Descent:** An optimization algorithm used to minimize the cost function by iteratively adjusting weights ($w$) and bias ($b$).

## Logistic Regression
Despite its name, logistic regression is used for **classification** (e.g., is this email spam or not?).
- **Sigmoid Function:** $g(z) = \frac{1}{1 + e^{-z}}$ maps any value to a range between 0 and 1.
- **Decision Boundary:** The threshold (usually 0.5) that separates the classes.
- **Regularization:** Techniques like L2 (Ridge) and L1 (Lasso) used to prevent overfitting by penalizing large weights.
    `,
  },
  {
    slug: 'advanced-neural-networks',
    title: 'Advanced Learning Algorithms',
    description: 'Building deep neural networks and multi-class classifiers.',
    content: `
# Advanced Learning Algorithms

Moving beyond simple regression, we dive into complex architectures and ensemble methods.

## Neural Networks for Classification
Multi-class classification allows us to categorize data into more than two groups (e.g., recognizing handwritten digits 0-9).
- **Softmax Layer:** Generalizes logistic regression to multi-class outputs.
- **Activation Functions:** ReLU (Rectified Linear Unit) is the standard for hidden layers to prevent vanishing gradients.

## Decision Trees & Tree Ensembles
Trees are intuitive and powerful models for both regression and classification.
- **Random Forests:** An ensemble of decision trees, usually trained with the "bagging" method to reduce variance.
- **XGBoost:** Gradient Boosted Trees that focus on correcting errors of previous trees, providing state-of-the-art accuracy on tabular data.
    `,
  },
  {
    slug: 'unsupervised-recommenders',
    title: 'Unsupervised Learning & AI Systems',
    description: 'Clustering, anomaly detection, and building recommendation engines.',
    content: `
# Unsupervised Learning & Systems

Unsupervised learning finds hidden structure in unlabeled data.

## Clustering with K-Means
Groups data points into $K$ clusters based on similarity.
- **Centroids:** The "center" of each cluster.
- **Elbow Method:** A technique to find the optimal number of clusters.

## Anomaly Detection
Identifying unusual data points that don't fit the pattern. Crucial for fraud detection and system monitoring.
- **Gaussian Distribution:** Probability density functions are often used to identify outliers.

## Recommender Systems
Powering platforms like Netflix and Amazon.
- **Collaborative Filtering:** Recommending items based on user similarities.
- **Content-Based Filtering:** Recommending items similar to those a user liked before.
    `,
  },
  {
    slug: 'dl-foundations',
    title: 'Neural Networks and Deep Learning',
    description: 'The core foundations of deep learning and backpropagation.',
    content: `
# Deep Learning Foundations

"Deep" learning refers to neural networks with many hidden layers.

## Vectorization
Using linear algebra (NumPy) to process data in batches rather than for-loops. This is essential for training deep models efficiently.

## Backpropagation
The mathematical process of calculating gradients through the chain rule. 
- **Forward Pass:** Compute predictions and loss.
- **Backward Pass:** Efficiently propagate the error back through the network to update weights.

## Optimization
- **Adam Optimizer:** An adaptive learning rate method that is generally faster and more robust than standard SGD.
- **Hyperparameter Tuning:** Systematically searching for the best learning rate, layer size, and regularization strength.
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
    slug: 'supervised-ml-quiz',
    title: 'Supervised Learning Mastery',
    description: 'Test your understanding of regression and classification foundations.',
    topic: 'regression-classification',
    questions: [
      {
        id: 'q1',
        question: 'What is the primary goal of Linear Regression?',
        options: ['Predict a categorical label', 'Predict a continuous numerical value', 'Find hidden patterns in data', 'Maximize cumulative reward'],
        correctAnswer: 'Predict a continuous numerical value',
      },
      {
        id: 'q2',
        question: 'Which function is used in Logistic Regression to map outputs to a probability between 0 and 1?',
        options: ['ReLU', 'Softmax', 'Sigmoid', 'Linear'],
        correctAnswer: 'Sigmoid',
      },
      {
        id: 'q3',
        question: 'What does the Cost Function measure in machine learning?',
        options: ['The speed of the algorithm', 'How well the model fits the training data', 'The size of the dataset', 'The complexity of the network'],
        correctAnswer: 'How well the model fits the training data',
      },
      {
        id: 'q4',
        question: 'Regularization (L1/L2) is primarily used to:',
        options: ['Increase training speed', 'Add more features', 'Prevent overfitting', 'Increase model complexity'],
        correctAnswer: 'Prevent overfitting',
      },
    ],
  },
  {
    slug: 'nn-mastery-quiz',
    title: 'Neural Networks Deep Dive',
    description: 'A quiz on deep learning architectures and backpropagation.',
    topic: 'dl-foundations',
    questions: [
      {
        id: 'q1',
        question: 'What is the "Backward Pass" (Backpropagation) used for?',
        options: ['To make predictions', 'To calculate the gradients and update weights', 'To load data into the network', 'To visualize the neurons'],
        correctAnswer: 'To calculate the gradients and update weights',
      },
      {
        id: 'q2',
        question: 'Which optimizer is known for using an adaptive learning rate?',
        options: ['SGD', 'Momentum', 'Adam', 'RMSprop'],
        correctAnswer: 'Adam',
      },
      {
        id: 'q3',
        question: 'Why is vectorization important in deep learning?',
        options: ['It makes the code easier to read', 'It allows processing data in batches efficiently', 'It reduces the number of neurons needed', 'It prevents overfitting'],
        correctAnswer: 'It allows processing data in batches efficiently',
      },
      {
        id: 'q4',
        question: 'What does "Deep" in Deep Learning typically refer to?',
        options: ['The complexity of the math', 'The depth of the data', 'The large number of hidden layers', 'The high accuracy of the model'],
        correctAnswer: 'The large number of hidden layers',
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
    id: 'roadmap-ml-spec',
    title: 'Machine Learning Specialization Roadmap',
    topic: 'regression-classification',
    steps: [
      {
        title: 'Supervised Learning',
        description: 'Start with the fundamentals of regression and classification.',
        subSteps: ['Linear Regression', 'Logistic Regression', 'Regularization'],
      },
      {
        title: 'Advanced Learning Algorithms',
        description: 'Move to neural networks and tree-based models.',
        subSteps: ['Neural Network Foundations', 'Decision Trees', 'Random Forests & XGBoost'],
      },
      {
        title: 'Unsupervised Learning',
        description: 'Learn to find patterns in unlabeled data.',
        subSteps: ['Clustering', 'Anomaly Detection', 'Recommender Systems'],
      },
    ],
  },
  {
    id: 'roadmap-dl-spec',
    title: 'Deep Learning Specialization Roadmap',
    topic: 'dl-foundations',
    steps: [
      {
        title: 'Neural Networks and Deep Learning',
        description: 'Build and train deep neural networks.',
        subSteps: ['Vectorization', 'Backpropagation', 'Activation Functions'],
      },
      {
        title: 'Improving Deep Neural Networks',
        description: 'Master the practical aspects of deep learning.',
        subSteps: ['Hyperparameter Tuning', 'Regularization (Dropout, Batch Norm)', 'Optimization (Adam)'],
      },
      {
        title: 'Structuring ML Projects',
        description: 'Learn how to strategize and organize your AI projects.',
        subSteps: ['Error Analysis', 'Training/Dev/Test Sets', 'Transfer Learning'],
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
    id: 'linear-regression-scratch',
    title: 'Linear Regression from Scratch',
    description: 'Implement simple linear regression using only NumPy to understand the math behind gradient descent.',
    difficulty: 'Beginner',
    tags: ['Machine Learning', 'NumPy', 'Math'],
    imageId: 'project-linear-scratch',
    content: `
# Project: Linear Regression from Scratch

## 1. Objective
Implement a single-variable linear regression model using gradient descent to predict house prices based on square footage.

## 2. Mathematical Model
- **Prediction:** $f_{w,b}(x) = wx + b$
- **Cost Function:** $J(w,b) = \frac{1}{2m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})^2$

## 3. Implementation Steps
1. **Initialize Parameters:** Set $w$ and $b$ to 0.
2. **Compute Gradients:** Calculate partial derivatives of $J$ with respect to $w$ and $b$.
3. **Update Parameters:** Apply gradient descent:
   $w = w - \alpha \frac{\partial J}{\partial w}$
   $b = b - \alpha \frac{\partial J}{\partial b}$
4. **Iterate:** Repeat until the cost function converges.

## 4. Solution Code
\`\`\`python
import numpy as np

def compute_cost(x, y, w, b):
    m = x.shape[0]
    cost = np.sum((w * x + b - y)**2) / (2 * m)
    return cost

def compute_gradient(x, y, w, b):
    m = x.shape[0]
    dj_dw = np.sum((w * x + b - y) * x) / m
    dj_db = np.sum(w * x + b - y) / m
    return dj_dw, dj_db

def gradient_descent(x, y, w_in, b_in, alpha, num_iters):
    w, b = w_in, b_in
    for i in range(num_iters):
        dj_dw, dj_db = compute_gradient(x, y, w, b)
        w = w - alpha * dj_dw
        b = b - alpha * dj_db
    return w, b
\`\`\`
`
  },
  {
    id: 'deep-neural-network-cat',
    title: 'Building a Deep Neural Network',
    description: 'Build a L-layer deep neural network for binary image classification (Cat vs. Non-Cat).',
    difficulty: 'Advanced',
    tags: ['Deep Learning', 'Neural Networks', 'Vectorization'],
    imageId: 'project-deep-nn',
    content: `
# Project: L-layer Deep Neural Network

## 1. Objective
Classify images of cats using a multi-layer neural network with ReLU and Sigmoid activations.

## 2. Architecture
- **Input Layer:** Flattened image pixels (e.g., $64 \times 64 \times 3 = 12288$).
- **Hidden Layers:** $L-1$ layers with ReLU activation.
- **Output Layer:** Single neuron with Sigmoid activation for binary classification.

## 3. Key Concepts
- **Weight Initialization:** Using He-initialization for deep networks.
- **Forward Propagation:** Iteratively computing $Z$ and $A$ for each layer.
- **Backward Propagation:** Computing gradients for weight updates.

## 4. Solution Code
\`\`\`python
def L_model_forward(X, parameters):
    caches = []
    A = X
    L = len(parameters) // 2
    
    # [LINEAR -> RELU] * (L-1)
    for l in range(1, L):
        A_prev = A 
        A, cache = linear_activation_forward(A_prev, parameters['W' + str(l)], parameters['b' + str(l)], "relu")
        caches.append(cache)
        
    # [LINEAR -> SIGMOID] Layer L
    AL, cache = linear_activation_forward(A, parameters['W' + str(L)], parameters['b' + str(L)], "sigmoid")
    caches.append(cache)
    
    return AL, caches
\`\`\`
`
  }
];
