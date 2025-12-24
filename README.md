# Music Theory Trainer

An interactive web application for music theory training, focused on harmonizing major and natural minor scales.

## Description

This project is a REST API built with Flask that generates random music theory questions and verifies user answers. The application helps memorize harmonized chords in C major and A natural minor scales.

## Features

- **Random question generation**: Receive questions about tonality (C major or A natural minor) with random scale degrees (1-7, 9, 11, 13)
- **Automatic harmonization**: Calculates harmonized chords for major and natural minor scales
- **Answer verification**: Checks if the user's answer is correct
- **RESTful API**: Simple and intuitive interface for frontend integration

## Requirements

- Python 3.x
- Flask
- Flask-CORS
- musthe

## Installation

1. Clone or download the repository

2. Install dependencies:
```bash
pip install flask flask-cors musthe
```

## Usage

1. Start the server:
```bash
python app.py
```

2. The server will be available at `http://localhost:8080`

## API Endpoints

### GET /get_question

Generates a random question with a scale degree and tonality.

**Response:**
```json
{
  "9": "C-major"
}
```

### GET /get_chords/<input>

Returns all harmonized chords for a specific scale.

**Parameters:**
- `input`: format `note-quality` (e.g., `C-major`, `A-natural_minor`)

**Example:**
```
GET /get_chords/C-major
```

**Response:**
```json
["C", "Dm", "Em", "F", "G", "Am", "Bdim"]
```

### GET /check_answer/<note_number>/<tonality>/<user_response>

Verifies if the user's answer is correct.

**Parameters:**
- `note_number`: scale degree (1-7, 9, 11, 13)
- `tonality`: format `note-quality` (e.g., `C-major`)
- `user_response`: chord entered by user (e.g., `Dm`)

**Example:**
```
GET /check_answer/2/C-major/Dm
```

**Response:**
```json
{
  "Response": true
}
```

### GET /

Serves the main HTML page of the application.

### GET /static/<path>

Serves static files (CSS, JavaScript, images).

## Harmonization Logic

### Major Scale
- I, IV, V: major chords
- ii, iii, vi: minor chords (m)
- vii: diminished chord (dim)

### Natural Minor Scale
- i, iv, v: minor chords (m)
- III, VI, VII: major chords
- ii: diminished chord (dim)

## Extended Degrees

The application also supports extended degrees:
- **9**: corresponds to the II degree
- **11**: corresponds to the IV degree
- **13**: corresponds to the VI degree

## Project Structure

```
.
├── app.py                 # Main application file
├── templates/
│   └── index.html        # Main HTML page
├── static/               # Static files (CSS, JS, images)
└── README.md            # This file
```

## CORS Configuration

The application has CORS enabled to allow requests from any origin, useful for developing separate frontends.

## Development Notes

- The server is configured to listen on all network interfaces (`0.0.0.0`) on port `8080`
- Currently supports only C major and A natural minor scales
- The logic can be extended to include other tonalities and scales

## License

This project is available for educational use.

## Contributing

Contributions, bug reports, and feature requests are welcome!
