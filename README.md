# Bookmarker

A simple web application to save and manage your favorite website bookmarks. Built with HTML, CSS (Bootstrap), and JavaScript, this project allows you to add, view, visit, and delete bookmarks with URL validation and duplicate name prevention.

## Table of Contents
- [Features](#features)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- Add new bookmarks with a name and valid URL.
- View bookmarks in a table format.
- Visit bookmarks by opening the URL in a new tab.
- Delete bookmarks from the list.
- Validate URLs to ensure they start with `http://` or `https://`.
- Prevent duplicate bookmark names.
- Display error messages with rules if an invalid URL is entered (using SweetAlert).
- Optional pagination to limit 6 bookmarks per page.

## Live Demo
Check out the live page hosted on GitHub Pages here: [https://amr-shawky.github.io/Bookmarker/](https://amr-shawky.github.io/Bookmarker/)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Amr-shawky/Bookmarker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Bookmarker
   ```
3. Open `index.html` in a web browser to start using the application. No additional setup is required as it relies on CDN-hosted libraries.

## Usage
- Enter a bookmark name and a valid URL in the input fields.
- Click "Save Bookmark" to add the bookmark to the list.
- Use the "Visit" button to open the bookmark's URL in a new tab.
- Use the "Delete" button to remove a bookmark.
- If an invalid URL is entered, a popup will show the required rules (e.g., must start with `http://` or `https://`).
- Navigate pages using the pagination controls if more than 6 bookmarks are added.

## Technologies Used
- **HTML**: Structure of the web page.
- **CSS**: Styling with Bootstrap.
- **JavaScript**: Core functionality and logic.
- **Bootstrap**: For responsive design and components.
- **Font Awesome**: Icons for buttons.
- **SweetAlert**: For user-friendly error and confirmation messages.

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is open-source and available under the [MIT License](LICENSE).
