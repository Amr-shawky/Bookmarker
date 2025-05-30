var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("websiteUrl");
var searchInput = document.getElementById("searchInput");
var currentindex = 0;
var pageSize = 6; // Number of items per page
var currentPage = 1; // Current page number

var bookmark = {
    name: bookmarkName,
    url: bookmarkUrl,
    date: new Date().toISOString()
}
var sortoption = "date"; // Default sort option
var sortorder = "asc"; // Default sort order
var bookmarkList = [];
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
        items.innerHTML = `<div id="bookmarkList" class="row row-cols-1 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
    </div>`;
    }
}
// 
toggleViewStyle(); // Initialize the view style

function saveBookmark() {
    var bookmark = {
        name: bookmarkName.value,
        url: bookmarkUrl.value,
        date: new Date().toISOString()
    };
    if (localStorage.getItem("bookmarkList") == null) {
        bookmarkList = [];
        bookmarkList.push(bookmark);
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
        bookmarkName.value = "";
        bookmarkUrl.value = "";
        currentPage = 1; // Reset to first page
        displayBookmarks();
    } else {
        swal({
            title: "Add Bookmark",
            text: "Are you sure you want to add this bookmark?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willAdd) => {
            if (!willAdd) {
                bookmarkName.value = "";
                bookmarkUrl.value = "";
                return;
            }

            bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));

            for (var i = 0; i < bookmarkList.length; i++) {
                if (bookmarkList[i].name === bookmark.name || bookmarkList[i].url === bookmark.url) {
                    swal({
                        title: "Duplicate Bookmark",
                        text: "A bookmark with this name or URL already exists.",
                        icon: "error",
                        button: "OK",
                    });
                    return;
                }
            }
            if (!isValidURL(bookmark.url)) {
                swal({
                    title: "Invalid URL",
                    text: "Please enter a valid URL with the following rules:\n" +
                        "- Start with 'http://' or 'https://'\n" +
                        "- Include a valid domain (e.g., example.com)\n" +
                        "- Optionally include a path or parameters (e.g., /page or ?id=123)\n" +
                        "- Example: https://www.example.com",
                    icon: "error",
                    button: "OK",
                });
                bookmarkUrl.value = "";
                return;
            }

            bookmarkList.push(bookmark);
            localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
            bookmarkName.value = "";
            bookmarkUrl.value = "";
            currentPage = 1; // Reset to first page
            displayBookmarks();
        });
    }
}

function displayBookmarks() {
    if (localStorage.getItem("bookmarkList") !== null) {
        bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    } else {
        bookmarkList = [];
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    }
    var filteredBookmarks = bookmarkList.filter(function (bookmark) {
        return bookmark.name.toLowerCase().includes(searchInput.value.toLowerCase());
    });
    var totalPages = Math.ceil(filteredBookmarks.length / pageSize);
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var bookmarksToDisplay = filteredBookmarks.slice(startIndex, endIndex);

    toggleViewStyle();
    var bookmarksResults = document.getElementById("bookmarkList");
    bookmarksResults.innerHTML = '';

    if (filteredBookmarks.length === 0) {
        if (viewstyle == "list") {
            bookmarksResults.innerHTML = '<tr><td colspan="5">No bookmarks found.</td></tr>';
        } else {
            bookmarksResults.innerHTML = '<p>No bookmarks found.</p>';
        }
        document.getElementById('pagination').innerHTML = '';
    } else {
        if (viewstyle == "list") {
            for (var j = 0; j < bookmarksToDisplay.length; j++) {
                var bookmark = bookmarksToDisplay[j];
                var indexInList = bookmarkList.indexOf(bookmark);
                var displayIndex = startIndex + j + 1;
                bookmarksResults.innerHTML += `<tr>
                    <td>${displayIndex}</td>
                    <td>${bookmark.name}</td>
                    <td><button class="btn-visit" data-url="${bookmark.url}" onclick="visit(${indexInList})"><i class="fas fa-eye"></i> Visit</button></td>
                    <td><button class="btn-update" data-index="${indexInList}" onclick="update(${indexInList})"><i class="fas fa-edit"></i> Update</button></td>
                    <td><button class="btn-delete" data-index="${indexInList}" onclick="deleteBookmark(${indexInList})"><i class="fas fa-trash"></i> Delete</button></td>
                  </tr>`;
            }
        } else {
            for (var j = 0; j < bookmarksToDisplay.length; j++) {
                var bookmark = bookmarksToDisplay[j];
                var indexInList = bookmarkList.indexOf(bookmark);
                bookmarksResults.innerHTML += `<div class="col">
                    <div class="card">
                        <img src="./Assets/Images/img4.jpeg" class="card-img-top w-100" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${bookmark.name}</h5>
                            <div class="btns d-flex justify-content-between flex-nowrap" style="height: 55px;">
                                <button class="btn-visit" data-url="${bookmark.url}" onclick="visit(${indexInList})"><i class="fas fa-eye"></i> Visit</button>
                                <button class="btn-update" data-index="${indexInList}" onclick="update(${indexInList})"><i class="fas fa-edit"></i> Update</button>
                                <button class="btn-delete" data-index="${indexInList}" onclick="deleteBookmark(${indexInList})"><i class="fas fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }
        // Generate pagination controls
        if (totalPages > 0) {
            var paginationHtml = '<nav aria-label="Page navigation"><ul class="pagination justify-content-center">';
            if (currentPage > 1) {
                paginationHtml += `<li class="page-item"><a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">Previous</a></li>`;
            } else {
                paginationHtml += `<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>`;
            }
            for (var p = 1; p <= totalPages; p++) {
                if (p === currentPage) {
                    paginationHtml += `<li class="page-item active"><a class="page-link" href="#">${p}</a></li>`;
                } else {
                    paginationHtml += `<li class="page-item"><a class="page-link" href="#" onclick="goToPage(${p})">${p}</a></li>`;
                }
            }
            if (currentPage < totalPages) {
                paginationHtml += `<li class="page-item"><a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">Next</a></li>`;
            } else {
                paginationHtml += `<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`;
            }
            paginationHtml += '</ul></nav>';
            document.getElementById('pagination').innerHTML = paginationHtml;
        } else {
            document.getElementById('pagination').innerHTML = '';
        }
    }
}
displayBookmarks();

function deleteBookmark(index) {
    // make a swal that say are you sure you want to delete this bookmark?
    swal({
        title: "Delete Bookmark",
        text: "Are you sure you want to delete this bookmark?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            bookmarkList.splice(index, 1);
            localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
            currentPage = 1; // Reset to first page
            displayBookmarks();
        } else {
            swal("Your bookmark is safe!");
            return;
        }
    });

}

function visit(index) {
    var url = bookmarkList[index].url;
    window.open(url, '_blank');
}

function update(index) {
    bookmarkName.value = bookmarkList[index].name;
    bookmarkUrl.value = bookmarkList[index].url;
    var updateButton = document.getElementById("updateBookmark");
    updateButton.style.display = "inline-block";
    var saveButton = document.getElementById("submitBookmark");
    saveButton.style.display = "none";
    currentindex = index;
}

function updateBookmark() {
    for (var i = 0; i < bookmarkList.length; i++) {
        if (i !== currentindex) {
            if (bookmarkList[i].name === bookmarkName.value || bookmarkList[i].url === bookmarkUrl.value) {
                swal({
                    title: "Duplicate Bookmark",
                    text: "A bookmark with this name or URL already exists.",
                    icon: "error",
                    button: "OK",
                });
                bookmarkName.value = "";
                bookmarkUrl.value = "";
                var updateButton = document.getElementById("updateBookmark");
                updateButton.style.display = "none";
                var saveButton = document.getElementById("submitBookmark");
                saveButton.style.display = "inline-block";
                return;
            }
        }
    }
    if (!isValidURL(bookmarkUrl.value)) {
        swal({
            title: "Invalid URL",
            text: "Please enter a valid URL with the following rules:\n" +
                "- Start with 'http://' or 'https://'\n" +
                "- Include a valid domain (e.g., example.com)\n" +
                "- Optionally include a path or parameters (e.g., /page or ?id=123)\n" +
                "- Example: https://www.example.com",
            icon: "error",
            button: "OK",
        });
        bookmarkUrl.value = "";
        var updateButton = document.getElementById("updateBookmark");
        updateButton.style.display = "none";
        var saveButton = document.getElementById("submitBookmark");
        saveButton.style.display = "inline-block";
        return;
    }
    else {
        // make a swal that say are you sure you want to update this bookmark?
        swal({
            title: "Update Bookmark",
            text: "Are you sure you want to update this bookmark?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                bookmarkList[currentindex].name = bookmarkName.value;
                bookmarkList[currentindex].url = bookmarkUrl.value;
                localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
                bookmarkName.value = "";
                bookmarkUrl.value = "";
                var updateButton = document.getElementById("updateBookmark");
                updateButton.style.display = "none";
                var saveButton = document.getElementById("submitBookmark");
                saveButton.style.display = "inline-block";
                currentPage = 1; // Reset to first page
                displayBookmarks();
            } else {
                bookmarkName.value = "";
                bookmarkUrl.value = "";
                var updateButton = document.getElementById("updateBookmark");
                updateButton.style.display = "none";
                var saveButton = document.getElementById("submitBookmark");
                saveButton.style.display = "inline-block";
            }
        });
    }

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

function isValidURL(url) {
    const urlPattern = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w\-\.\/?%&=]*)?$/;
    return urlPattern.test(url);
}

function Alphabeticsort() {
    bookmarkList.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    currentPage = 1; // Reset to first page
    displayBookmarks();
}

function datesort() {
    bookmarkList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    currentPage = 1; // Reset to first page
    displayBookmarks();
}

function searchBookmarks() {
    currentPage = 1; // Reset to first page
    displayBookmarks();
}

function goToPage(page) {
    currentPage = page;
    displayBookmarks();
}