if (document.querySelector('body')) {
    document.querySelector('body').addEventListener('click', eventsHandler);
}

function eventsHandler(e) {
    if (e.target.classList.contains('onoffswitch__button')) {
        switchTheme(e.target);
    } else if (hasSomeParentTheClass(e.target, 'e-accordion')) {
        accordionToggle(getParentWithTheClass(e.target, 'e-accordion'));
    }
}

function switchTheme(button) {
    let colorDefaultList = document.querySelectorAll('.theme_color_project-default');
    let colorInverseList = document.querySelectorAll('.theme_color_project-inverse');

    colorDefaultList.forEach(function(element) {
        element.className = element.className.replace(/\btheme_color_project-default\b/g, 'theme_color_project-inverse');
    })

    colorInverseList.forEach(function(element) {
        element.className = element.className.replace(/\btheme_color_project-inverse\b/g, 'theme_color_project-default');
    })

    if (button.parentNode.classList.contains('onoffswitch_checked')) {
        button.parentNode.classList.remove('onoffswitch_checked');
    } else {
        button.parentNode.classList.add('onoffswitch_checked');
    }
}



function accordionToggle(target) {
    target.childNodes.forEach(function(item) {
        if (item.classList.contains('e-accordion__more')) {
            if (item.style.display === "block") {
                item.style.display = "none";
              } else {
                item.style.display = "block";
            }
        }
    });
}

function hasSomeParentTheClass(element, classname) {
    if (element.classList !== undefined) {
        if (element.classList.contains(classname)) {
            return true;
        }
    };
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

function getParentWithTheClass(element, classname) {
    if (element.classList.contains(classname)) return element;
    return element.parentNode && getParentWithTheClass(element.parentNode, classname);
}