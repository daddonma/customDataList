const initCustomDataList = (cssSelector = '.custom-data-list') => {

    var inputField = Array.from(document.querySelectorAll(cssSelector));

    inputField.forEach((input) => initCustomDataListByInput(input));
  
}

const initCustomDataListByInput = (inputElem) => {

    if (!(inputElem instanceof HTMLElement)) {
        console.error('Der übergebene Parameter ist kein gültiges HTML-Element');
        return;
    }

    if (inputElem.tagName !== 'INPUT') {
        console.error('Der übergebene Parameter ist kein gültiges Input-Element');
        return;
    }

    // Mehrfaches initialisieren der DataList verhindern
    if (inputElem.classList.contains('initialized')) {
        console.warn('Die Data List wurde bereits initialisiert');
        return;
    }

    if (!inputElem.hasAttribute('list')) {
        console.error('Dem übergebenem Input-Element ist keine Datalist über das list-Attribut zugeordnet');
        return;
    }

    // Deaktivieren des automatisierten Browser-Autocompletes
    inputElem.setAttribute('autocomplete', 'off');
    inputElem.dataset.customDataList = inputElem.getAttribute('list');

    inputElem.removeAttribute('list');

    let currentActive = -1;

    //Event um beim Klicken die Komplette Liste zu öffnen
    inputElem.addEventListener('click', (e) => {
        closeAllCustomDataLists(inputElem);
        currentActive = -1;
        openCustomDataList(inputElem, false);
    });

    //Event um in der Liste über die Pfeiltasten navigieren zu können
    inputElem.addEventListener("keydown", (e) => {
        let customDataListItemContainer = getCustomDataListItemsByInput(inputElem);
        if (!customDataListItemContainer) {
            return;
        }

        const items = Array.from(customDataListItemContainer.querySelectorAll('.custom-data-list-item'));
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            if (currentActive >= 0) {
                items[currentActive].classList.remove('custom-data-list-active');
            }

            // Wieder am Anfang beginnen, wenn das Ende erreicht
            currentActive = (currentActive + 1) % items.length;

            items[currentActive].classList.add('custom-data-list-active');
            
            // Scrollen, um das aktuelle Element sichtbar zu machen
            items[currentActive].scrollIntoView({ block: 'nearest' });

        } else if (e.key === 'ArrowUp') {
            if (currentActive >= 0) {
                items[currentActive].classList.remove('custom-data-list-active');
            }

            // Nach unten, wenn obere Grenze erreicht
            currentActive = (currentActive - 1 + items.length) % items.length;
            items[currentActive].classList.add('custom-data-list-active');

             // Scrollen, um das aktuelle Element sichtbar zu machen
            items[currentActive].scrollIntoView({ block: 'nearest' });
            
        } else if (e.key === 'Enter' && currentActive >= 0) {
            e.preventDefault();
            items[currentActive].click();
        }
    });



    inputElem.addEventListener('input', (e) => {
        // Schließe nur die Datenliste, die mit dem aktuellen Input-Element verbunden ist
        closeCustomDataList(e.target);
        openCustomDataList(e.target, true);
    });


    // Klasse '.initialized' hinzufügen, um mehrfaches initialisieren der DataList zu verhindern
    inputElem.classList.add('initialized');
}

const openCustomDataList = (inputElem, doSearch = true) => {
    if (!(inputElem instanceof HTMLElement) || inputElem.tagName !== 'INPUT') {
        console.error('Es wurde keine gültiges Input-Element übergeben');
        return;
    }

    const dataList = getRealDataListByInput(inputElem);

    let maxItems = null;
    if ('maxSearch' in inputElem.dataset) {
        maxItems = parseInt(inputElem.dataset.maxSearch, 10);
    }

    let search = null;
    if (doSearch) {
        search = inputElem.value;
    }

    // Der Container für alle Suchergebnisse
    const dataListItemContainer = document.createElement("DIV");
    dataListItemContainer.classList.add('custom-data-list-items');

    if (inputElem.dataset.customDataList) {
        dataListItemContainer.dataset.customDataList = inputElem.dataset.customDataList;
    }

    // Einträge herausfiltern
    let optionArr = filterDataListOptions(dataList, search, maxItems);

    optionArr.forEach((optionItem) => {
        const optionContainer = document.createElement("DIV");
        optionContainer.classList.add('custom-data-list-item');

        const hiddenInput = document.createElement("INPUT");
        hiddenInput.type = 'hidden';

        if ('content' in optionItem) {
            
            let optionHtmlContent;
            if(search) {
                let regex = new RegExp(`(${search})`, 'gi');
               optionHtmlContent = optionItem.content.replace(regex, `<span class="custom-data-list-highlight">$1</span>`);
            } else {
                optionHtmlContent = optionItem.content;
            }

            optionContainer.innerHTML = optionHtmlContent;
            hiddenInput.value = optionItem.content;
        }

        if ('class' in optionItem) {
            optionContainer.classList.add(...optionItem.class.split(" "));
        }

        if ('title' in optionItem) {
            optionContainer.setAttribute('title', optionItem.title);
        }

        if ('style' in optionItem) {
            optionContainer.setAttribute('style', optionItem.style);
        }

        if (!optionContainer.classList.contains('custom-data-list-group')) {
            optionContainer.addEventListener("click", (e) => {
                if (inputElem.classList.contains('use-value')) {
                    if ('value' in optionItem) {
                        inputElem.value = optionItem.value;
                    } else {
                        inputElem.value = '';
                    }
                } else {
                    inputElem.value = optionItem.content;
                }

                // Trigger Change-Event
                inputElem.dispatchEvent(new Event('change'));

                closeAllCustomDataLists();
            });
        }

        optionContainer.append(hiddenInput);
        dataListItemContainer.append(optionContainer);
    });

    if (inputElem.parentNode) {
        const parentNode = inputElem.parentNode;
        parentNode.classList.add('custom-data-list-container');
        parentNode.appendChild(dataListItemContainer);
    } else {
        console.warn('Das Input-Element hat kein übergeordnetes Element.');
    }
};

const getRealDataListByInput = (inputElem) => {
    if (!(inputElem instanceof HTMLElement)) {
        console.error('Der übergebene Parameter ist kein gültiges HTML-Element');
        return null;
    }

    const listID = inputElem.dataset.customDataList;

    if (!listID) {
        console.error('Das Input-Element hat kein gültiges list-Attribut.');
        return null;
    }

    const dataListElem = document.getElementById(listID);
    if (!dataListElem || dataListElem.tagName !== 'DATALIST') {
        console.error('Kein gültiges DataList-Element mit der angegebenen ID gefunden.');
        return null;
    }

    return dataListElem;
};

const getCustomDataListItemsByInput = (inputElem) => {
    if (!(inputElem instanceof HTMLElement)) {
        console.error('Der übergebene Parameter ist kein gültiges HTML-Element');
        return null;
    }

    if (!inputElem.parentNode) {
        console.warn('Das Input-Element hat kein übergeordnetes Element.');
        return null;
    }

    const parentNode = inputElem.parentNode;

    const customDataListItemContainer = parentNode.querySelector('.custom-data-list-items');
    if (!customDataListItemContainer) {
        return null;
    }

    return customDataListItemContainer;
};

const filterDataListOptions = (dataListElem, search = null, maxItems = null) => {
    if (!(dataListElem instanceof HTMLElement) || dataListElem.tagName !== 'DATALIST') {
        console.warn('Es wurde keine gültige DataList übergeben');
        return [];
    }

    // search in Großbuchstaben umwandeln, um case-insensitive suchen zu können
    const searchUpper = search ? search.toUpperCase() : null;

    const optionNodeList = dataListElem.querySelectorAll('option');
    const optionArray = Array.from(optionNodeList);

    const dataListOptions = [];
    let countItems = 0;

    optionArray.some((optionElem) => {
        let optionContent = optionElem.innerHTML.trim();
        if (searchUpper === null || optionContent.toUpperCase().indexOf(searchUpper) !== -1) {
            let optionObj = {
                content: optionContent,
            };

            if (optionElem.hasAttribute('value')) {
                optionObj.value = optionElem.getAttribute('value');
            }
            if (optionElem.hasAttribute('class')) {
                optionObj.class = optionElem.getAttribute('class');
            }
            if (optionElem.hasAttribute('title')) {
                optionObj.title = optionElem.getAttribute('title');
            }
            if (optionElem.hasAttribute('style')) {
                optionObj.style = optionElem.getAttribute('style');
            }

            dataListOptions.push(optionObj);
            countItems++;
        }

        if (maxItems !== null && countItems >= maxItems) {
            return true;
        }
    });

    return dataListOptions;
};

/* Schließt eine Data List */
closeCustomDataList = (inputElem) => {
    const customDataList = getCustomDataListItemsByInput(inputElem);
    if(customDataList) {
        customDataList.remove();
    }
};

/* Schließt alle derzeit geöffneten Data Lists */
const closeAllCustomDataLists = () => {
    const inputElems = Array.from(document.querySelectorAll('input.custom-data-list'));

    inputElems.forEach(inputElem => closeCustomDataList(inputElem));
};


// Event listener to close all data lists when clicking outside
document.addEventListener('click', (event) => {
    const inputElem = event.target.closest('input.custom-data-list');

    let inputArray;
    if(!inputElem || !inputElem.dataset.customDataList) {
        inputArray = document.querySelectorAll('input.custom-data-list');
    } 
    //Alle Listen schließen, außer die auf die man geklickt hat
    else {
      const dataListID = inputElem.dataset.customDataList;
       inputArray = Array.from(document.querySelectorAll('input.custom-data-list:not([data-custom-data-list="' + dataListID + '"])'));
    }

  
   Array.from(inputArray).forEach(inputElem => closeCustomDataList(inputElem));
});