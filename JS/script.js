var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("websiteUrl");

var bookmark = {
    name: bookmarkName,
    url: bookmarkUrl
}

var bookmarkList;


function saveBookmark() {
    if (localStorage.getItem("bookmarkList") === null) {
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
    console.log("$bookmarkName: " + bookmark.name.value);
    console.log("$bookmarkUrl: " + bookmark.url.value);


}