function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

var bookList = [];  // store the total books read from json
var matchBooks = [];  // store the books which need to be highlight
var currentBook = [];  // store the current book display in the screen now

window.onload = function() {
    getJsonObject('data.json',
        function(data){
            bookList = data;
            currentBook = bookList;
            displayBook(bookList); // show the orginal book list
        },
        function(xhr) {
            console.log(xhr);
        }
    );

    // search function
    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = function(){
        var searchValue = document.getElementById("searchInput").value.trim(); // get the input without blank
        if (searchValue != ""){  // if user has input, get the book title and store in the matchBooks list
            for (var i = 0; i < currentBook.length; i++){  // only search the current book display in the screen now
                var bookTitle = currentBook[i].title;
                if (bookTitle.toLowerCase().includes(searchValue.toLowerCase())){
                    matchBooks.push(bookTitle);
                } else {
                    continue;
                }
            }
            if (matchBooks.length <= 0){  // if no books match the characters, throw alert
                alert("No books match!");
            }
        } else {  // if no input, no book needs to be highlight, than clear the matchBooks list
            matchBooks = [];
        }
        displayBook(currentBook);  // if user click the search button, need to display the current book list again
    }
    
    // filter function
    var filterCategory = document.getElementById("filterButton");
    filterCategory.onclick = function() {
        var categorySeleted = document.getElementById("category").value;  // get the category user choose
        currentBook = [];  // clear the current book list, to rechoose the current book base on category
        if (categorySeleted.toLowerCase() === "all") {  // if user choose all category, current books is all books
            currentBook = bookList;
        } else {  // if user choose one category, store that books in the current book list
            for (var i = 0; i < bookList.length; i++){
                if (bookList[i].category.toLowerCase() === categorySeleted.toLowerCase()){  // category filter should be case insensitive
                    currentBook.push(bookList[i]);
                } else {
                    continue;
                }
            }
        }

        if (currentBook.length > 0){  // if we have book to display
            displayBook(currentBook);
        } else {  // throw alert
            alert("No book in this category");
            displayBook(currentBook);  // this will display a blank table
        }
    }

    // dark mode
    var darkMode = document.getElementById("darkMode");
    darkMode.onclick = function(){
        var currentMode = document.getElementsByTagName("link")[0];  // get the current css file
        if (currentMode.getAttribute("href") == "index.css"){  // if now is light mode, change it to dark mode
            currentMode.setAttribute("href", "dark.css");
        } else {
            currentMode.setAttribute("href", "index.css");  // if now is dark mode, change it to light mode
        }
    }

    // add to cart
    var cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0; // Initialize cart quantity from localStorage (or default to 0 if not set)
    document.getElementById("cartQuantity").innerHTML = cartQuantity; // show the local cartQuantity if user refresh the page
    console.log(cartQuantity);
    var addToCart = document.getElementById("addBooks");
    addToCart.onclick = function(){
        var checkBook = document.getElementsByName("bookCheckBox");  // get the checkbox list
        var selectedBook = null;
        for (var i = 0; i < checkBook.length; i++){  // to check which checkbox has been checked, tag it as selected book
            if (checkBook[i].checked){
                selectedBook = checkBook[i];
                break;
            } else {
                continue;
            }
        }
        if (selectedBook != null){  // if a book has been checked
            var quantity = prompt("Please enter the quantity:", "1");  // throw prompt for user to enter number
            if (quantity != null && quantity >= 1 && quantity%1 == 0 ){  // if the number is valid (not null, more than 1, integer)
                cartQuantity += parseInt(quantity);  // Update cart quantity
                document.getElementById("cartQuantity").innerHTML = cartQuantity;  // renew the quantity in html
                localStorage.setItem('cartQuantity', cartQuantity);  // save to localStorage
                selectedBook.checked = false;  // clear the checkbox
            } else {  // if the number is invalid, throw alert
                alert("Please enter a valid integer and click confirm!");
            }
        } else {  // if no book has been checked, throw alert
            alert("Please select a book to add to cart!");
        }
    }



    // reset the cart
    var resetCart = document.getElementById("resetBooks");
    resetCart.onclick = function(){
        if (cartQuantity > 0){  // if there are books in cart, throw confirm
            var isConfirmed = confirm("Are you sure you want to reset the cart?");  // throw confirm information
            if (isConfirmed){  // if user confirm to reset the cart, than clear the checkbox, reset the cart quantity
                var checkBook = document.getElementsByName("bookCheckBox");
                for (var i = 0; i < checkBook.length; i++){
                    checkBook[i].checked = false;
                }
                document.getElementById("cartQuantity").innerHTML = "0";  // reset cart quantity
                cartQuantity = 0;  // reset cart quantity
                // localStorage.setItem('cartQuantity', 0);  // reset localStorage
                localStorage.removeItem('cartQuantity');
            } else {  // if canceled reset, throw alert
                alert("Reset operation cancelled.");
            }
        } // else, no need to do anything
    }
}

// display the books
function displayBook(data) {
    var bookTable = document.getElementById("bookTable");
    bookTable.innerHTML = "";  // clear the current display to ensure the new display could be show
    // display book elements
    for (var i = 0; i < data.length; i++){  // loop each book data
        var book = data[i];
        var row = document.createElement("tr");  // create a line
        
        var selected = document.createElement("td");  // create checkbox
        selected.innerHTML = `<input type="checkbox" name="bookCheckBox">`;
        row.appendChild(selected);

        var image = document.createElement("td");  // store imgage of the book
        image.innerHTML = `<img src="${book.img}" height="100" width = "80" />`;
        row.appendChild(image);

        var title = document.createElement("td");  // store book title
        title.innerHTML = book.title;
        row.appendChild(title);

        var star = document.createElement("td");  // store stars 
        var rate = book.rating;
        for (var j = 0; j < rate; j++){
            var starImg = document.createElement("img");
            starImg.setAttribute("src", "images/star-16.ico");
            star.appendChild(starImg);
            console.log("starImg i rate"+i);
        }
        for (var j = 0; j < 5 - rate; j++){
            var emptyStar = document.createElement("img");
            emptyStar.setAttribute("src", "images/outline-star-16.ico");
            star.appendChild(emptyStar);
            console.log("emptyStar i"+i);

        }
        row.appendChild(star);

        var author = document.createElement("td");  // store author
        author.innerHTML = book.authors;
        row.appendChild(author);
        
        var year = document.createElement("td");  // store year
        year.innerHTML = book.year;
        row.appendChild(year);

        var price = document.createElement("td");  // store price
        price.innerHTML = book.price;
        row.appendChild(price);

        var publisher = document.createElement("td");  // store publisher
        publisher.innerHTML = book.publisher;
        row.appendChild(publisher);

        var category = document.createElement("td");  // store category
        category.innerHTML = book.category;
        row.appendChild(category);

        if (matchBooks.includes(book.title)){  // if the book are matched user's search result, highlight
            row.style.backgroundColor = "green";
        } else { // else, clear the highlight
            row.style.backgroundColor = "";
        }

        bookTable.appendChild(row);
    }
    
    singleCheckBox();  // to ensure user can only select one book
}

function singleCheckBox(){
    var checkbox = document.getElementsByName("bookCheckBox");
    for (var i = 0; i < checkbox.length; i++){
        checkbox[i].onclick = function (){  // if this book has been selected, clear other book's select
            for (var j = 0; j < checkbox.length; j++){
                if (this != checkbox[j]){
                    checkbox[j].checked = false;
                }
            }
        };
    }
}