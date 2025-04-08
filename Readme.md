# B2YBooks Online Store - Web Application Development

## Project Title
B2YBooks Online Store - Client-side Implementation

## Description
This project is a client-side web application for B2YBooks, an online bookstore. The application allows users to browse books, search and filter book listings, add items to a shopping cart, and toggle between light/dark modes. The implementation uses core web technologies (HTML, CSS, and JavaScript) without any third-party frameworks or libraries.

Key features include:
- Dynamic loading of book data from JSON
- Search functionality with highlighting
- Category filtering with dropdown menu
- Shopping cart with quantity selection
- Dark mode toggle
- Responsive design

## Getting Started

### Dependencies
- Modern web browser (Chrome, Firefox, Edge, or Safari latest versions)
- Web server for local testing (optional but recommended to avoid CORS issues with JSON loading) e.g. Windows 10

### Installing
1. Download the project zip file
2. Extract all files to a directory on your computer
3. Ensure the folder structure maintains these relative paths:
   - `images/` - contains all book cover thumbnails
   - `data/books.json` - contains the book data
   - `css/styles.css` - contains all styling
   - `js/script.js` - contains all JavaScript functionality

### Executing Program
Install Node.js`http-server` in the command prompt. It will provide you url(s) to access your project from your browser, you usually can access your project from this address: "*http://127.0.0.1:8080*".
## Implementation Details

### Main Page Structure
- Displays website header with title and dark mode toggle
- Shows search bar and category filter dropdown
- Presents book listings in a table format with:
  - Thumbnail images
  - Title, author, publication year
  - Star ratings
  - Price, publisher, and category
  - Checkbox for selection

### Key Functionalities
1. **Dynamic Data Loading**:
   - Data is achieved from `data.json`, then is processed and rendered in the table
   
2. **Search Function**:
   - Search as user types
   - Highlights matching rows without filtering
   - Throw alert for no searching result
   
3. **Filter Function**:
   - Dropdown with all available categories plus "All" option
   - Throw alert for no books found in the category selected by user

4. **Shopping Cart**:
   - Single book selection at a time
   - Quantity input appears when adding to cart
   - Cart total updates dynamically
   - Reset function with confirmation dialog
   - Keep cart quantity even if user refresh the page
   
5. **Dark Mode**:
   - Toggle button at top of page
   - Adjusts colors for background, text

## Boundary Cases Handled
- Empty search results
- No matches for selected filter category
- Invalid quantity inputs
- Cart reset confirmation

## Code Structure
- **HTML**: Semantic structure with clear sections
- **CSS**: Organized with comments, using variables for colors
- **JavaScript**: Modular functions with clear responsibilities
- All code is properly commented for readability