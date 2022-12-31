// creates a textbox
function createTextbox(boxID, posX, posY, url) {
    // setup box container
    let container = document.createElement("div");

    // setup box object
    let box = document.createElement("textarea");
    box.type = "text";
    box.id = boxID;
    box.new = true;
    box.bged = false;
//    box.associatedSelection = [];
    box.highlightBoxAttributes = [];
    // keep the url that box is on
    box.url = window.location.href;
    box.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    box.style.color = 'aliceblue';
    box.style.border = 'solid 1px lightblue';

    // create delButton
    let delButton = document.createElement("BUTTON");
    delButton.id = 'delButton';

    // create associationButton
    let associationButton = document.createElement("BUTTON");
    associationButton.id = 'associationButton';

    // put elements together
    initializeTextbox(container, box, delButton, associationButton, null);

    // set container position
    container.style.left = posX + 'px';
    container.style.top = posY + 'px';

    // add to page
    document.body.appendChild(container);
    container.style.zIndex = 1000;

    // add box to local storage
    let boxAttributes = [box.id, box.value, container.style.top, container.style.left, box.highlightBoxAttributes];
    browser.storage.local.get(url).then(
            function(val) {
                // if no key value pairs exist
                if (Object.keys(val).length === 0) {
                    // set first key value pair
                    let setVars = {};
                    setVars[url] = [boxAttributes];
                    browser.storage.local.set(setVars);
                    // otherwise add to existing array of values
                } else {
                    val[url].push(boxAttributes);
                    let setVars = {};
                    setVars[url] = val[url];
                    browser.storage.local.set(setVars);
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
            );
    return {container: container, textarea: box, delButton: delButton}
}
