var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("websiteUrl");

var bookmark = {
    name: bookmarkName,
    url: bookmarkUrl
}

var bookmarkList= [];


function saveBookmark() {
    // Create a new bookmark object with the current input values
    var bookmark = {
        name: bookmarkName.value,
        url: bookmarkUrl.value
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

    displayBookmarks();
}
function displayBookmarks() {
    if (localStorage.getItem("bookmarkList") !== null) {
        bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
        var bookmarksResults = document.getElementById("bookmarkList");
        bookmarksResults.innerHTML = "";
        for (var i = 0; i < bookmarkList.length; i++) {
            var name = bookmarkList[i].name;
            var url = bookmarkList[i].url;

            bookmarksResults.innerHTML += `<tr>
            <td>${i+1}</td>
            <td>${name}</td>
            <td><button class="btn-visit" data-url="${url}" onclick="visit(${i})"><i class="fas fa-eye"></i> Visit</button></td>
            <td><button class="btn-update" data-index="${i}"><i class="fas fa-edit"></i> Update</button></td>
            <td><button class="btn-delete" data-index="${i}" onclick="deleteBookmark(${i})"><i class="fas fa-trash"></i> Delete</button></td>
          </tr>`
        }
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