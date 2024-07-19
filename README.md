# BeanBot

BeanBot is an advanced mobile application designed to identify various types of pulses and dals using state-of-the-art machine learning techniques. This project leverages the YOLOv5s model for real-time object detection and classification, providing users with an accurate and user-friendly tool for pulse classification. 

## Features

- **Accurate Pulse Identification**: Capture or upload images of pulses and get accurate classifications.
- **Detailed Information**: View nutritional, agricultural, and culinary information about each type of pulse.
- **User-Friendly Interface**: Simple and intuitive UI for easy navigation and interaction.
- **Offline Capability (Pending)**: Future scope includes offline identification using a downloadable pulse dataset.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [API Documentation](#api-documentation)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

### Prerequisites

- Node.js
- yarn
- Python
- Environment Setup for React Native Application (check https://reactnative.dev/docs/environment-setup?guide=native)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/BeanBot.git
    ```

2. Navigate to the project directory:
    ```bash
    cd BeanBot
    ```

3. Install dependencies for the React Native app:
    ```bash
    cd BeanBot
    yarn
    ```

4. Install dependencies for the backend:
    ```bash
    cd ../Backend
    pip install -r https://raw.githubusercontent.com/ultralytics/yolov5/master/requirements.txt
    pip install -r requirements.txt
    ```

5. Run the server file:
    ```bash
    python app.py
    ```

6. Start the React Native application:
    ```bash
    cd ../BeanBot
    npx expo run:android
    ```

## Usage

1. Use the app to capture or upload images of pulses for identification.
2. View the detailed information about the identified pulses.


