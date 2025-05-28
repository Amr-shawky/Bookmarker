var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("websiteUrl");
var currentindex = 0;
var bookmark = {
    name: bookmarkName,
    url: bookmarkUrl,
    date: new Date().toLocaleDateString()
}

var bookmarkList= [];
var viewstyle = "list"; // Default view style
function toggleViewStyle() {
var items = document.getElementById("items");
if (viewstyle == "list") {
    items.innerHTML = `<table id="bookmarkTable" class="table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Website Name</th>
                <th>Visit</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="bookmarkList">
    
            </tbody>
          </table>`;
}
else {
    items.innerHTML =`<div id="bookmarkList"class="row row-cols-1 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
    </div>`;
}
}
toggleViewStyle(); // Initialize the view style
function saveBookmark() {
    // Create a new bookmark object with the current input values
    var bookmark = {
        name: bookmarkName.value,
        url: bookmarkUrl.value,
        date: new Date().toLocaleDateString()
    };

    if (localStorage.getItem("bookmarkList") == null) {
        bookmarkList = [];
        bookmarkList.push(bookmark);
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    }
    else {
        bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
        bookmarkList.push(bookmark);
        // Update the localStorage with the new bookmark list
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    }
    console.log(bookmarkList);

    // Clear the input fields after saving
    bookmarkName.value = "";
    bookmarkUrl.value = "";
    displayBookmarks();
}
function displayBookmarks() {
    if (localStorage.getItem("bookmarkList") !== null) {
        bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
        toggleViewStyle(); // Initialize the view style
                        var bookmarksResults = document.getElementById("bookmarkList");
        for (var i = 0; i < bookmarkList.length; i++) {
            var name = bookmarkList[i].name;
            var url = bookmarkList[i].url;
            if(viewstyle == "list"){
                bookmarksResults.innerHTML += `<tr>
                <td>${i+1}</td>
                <td>${name}</td>
                <td><button class="btn-visit" data-url="${url}" onclick="visit(${i})"><i class="fas fa-eye"></i> Visit</button></td>
                <td><button class="btn-update" data-index="${i}"onclick="update(${i})"><i class="fas fa-edit"></i> Update</button></td>
                <td><button class="btn-delete" data-index="${i}" onclick="deleteBookmark(${i})"><i class="fas fa-trash"></i> Delete</button></td>
              </tr>`
            }
            else{
                bookmarksResults.innerHTML += `                    <div class="col">
                        <div class="card">
                            <img src="./Assets/Images/img4.jpeg" class="card-img-top w-100" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <div class="btns d-flex justify-content-start flex-nowrap" style="height: 55px;">
                                    <button class="btn-visit" data-url="${url}" onclick="visit(${i})"><i
                                            class="fas fa-eye"></i> Visit</button>
                                    <button class="btn-update" data-index="${i}" onclick="update(${i})"><i
                                            class="fas fa-edit"></i> Update</button>
                                    <button class="btn-delete" data-index="${i}" onclick="deleteBookmark(${i})"><i
                                            class="fas fa-trash"></i> Delete</button>
                                </div>

                            </div>
                        </div>
                    </div>`;
            }
            
        }
    }
    else {
        bookmarkList = [];
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    }
}
displayBookmarks();
function deleteBookmark(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayBookmarks();
}
function visit(index) {
    var url = bookmarkList[index].url;
    window.open(url, '_blank');
}

function update(index) {
    bookmarkName.value = bookmarkList[index].name;
    bookmarkUrl.value = bookmarkList[index].url;
    // updateBookmark btn i want it visible
    var updateButton = document.getElementById("updateBookmark");
    updateButton.style.display = "inline-block"
    // make the saveBookmark btn invisible
    var saveButton = document.getElementById("submitBookmark");
    saveButton.style.display = "none";
    // Set the current index to the one being updated
    currentindex = index;
    // Set the onclick event of the update button to call the updateBookmark function
}

function updateBookmark() {
    // Update the bookmark in the bookmarkList
    bookmarkList[currentindex].name = bookmarkName.value;
    bookmarkList[currentindex].url = bookmarkUrl.value;
    // Update the localStorage with the modified bookmark list
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    // Clear the input fields after updating
    bookmarkName.value = "";
    bookmarkUrl.value = "";
    // Reset the buttons visibility
    var updateButton = document.getElementById("updateBookmark");
    updateButton.style.display = "none";
    var saveButton = document.getElementById("submitBookmark");
    saveButton.style.display = "inline-block";
    displayBookmarks();
}

function gridstyle() {
    viewstyle = "grid";
    var gridbutton = document.getElementById("gridstyle");
    gridbutton.classList.add("active");
    var listbutton = document.getElementById("liststyle");
    listbutton.classList.remove("active");
    toggleViewStyle();
    displayBookmarks();
}
function liststyle() {
    viewstyle = "list";
    var listbutton = document.getElementById("liststyle");
    listbutton.classList.add("active");
    var gridbutton = document.getElementById("gridstyle");
    gridbutton.classList.remove("active");
    toggleViewStyle();
    displayBookmarks();
}