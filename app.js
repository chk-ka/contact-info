function initialize() {			// check internet
    var status = "* Offline *";
    if (navigator.onLine) {
        status = "* Online *";
        retrieveContacts();
    } else {
        const localStorage = window.localStorage;
        if (localStorage) {
            const contacts = localStorage.getItem("contacts");
            if (contacts) {
                displayContacts(JSON.parse(contacts));
            }
        }
    }

    document.getElementById("status").innerHTML = status;	// set online/ offline in the page

    document.body.addEventListener(		//just change the message
            "online",
            function () {
                document.getElementById("status").innerHTML = "Online";
            },
            false
            );
    document.body.addEventListener(
            "offline",
            function () {
                document.getElementById("status").innerHTML = "Offline";
            },
            false
            );
}

function retrieveContacts() {
    const xhr = new XMLHttpRequest();
//	const url = "contacts.json";
	const url = "https://ouhklab.github.io/contact-info-mobile-web-app/contacts.json";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var contacts = JSON.parse(xhr.response).contacts;	//contacts object in JSON
            displayContacts(contacts);

            // Store contact data to localstorage
            const localStorage = window.localStorage;
            if (localStorage) {
                localStorage.setItem("contacts", JSON.stringify(contacts));
									  // key ,	  data    stringify:convert to string for local storage
            }
        }
    };

    xhr.open("get", url);
    xhr.send();
}
						// array
function displayContacts(contacts) {
    contacts.forEach(addRow);	//add each elements to var
}

function addRow(contact) {
    var tcontent = document.getElementById("tcontent"); //tcontent: id for html's tbody
    var row = tcontent.insertRow();

    var nameCell = row.insertCell();
    nameCell.setAttribute('data-label', "Name");
    nameCell.innerHTML = contact.name;

    var addressCell = row.insertCell();
    addressCell.setAttribute('data-label', "Address");
    addressCell.innerHTML = contact.address;

    var emailCell = row.insertCell();
    emailCell.setAttribute('data-label', "Email");
    emailCell.innerHTML = contact.email;
}
