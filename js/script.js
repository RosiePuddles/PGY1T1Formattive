const regexMatches = {"name": /^.+$/g, "email": /^[\w.\-_]*[\w\-_]@[\w\-_.]*\w$/g}; // regex matches used for the sign-up pop over form
let originalWindowWidth = 0; // Original width of the container with the SVG inside it

/**
 * Opens a random published article on arxiv
 * There are 1295 random article that it could result in
 * This is possible based on the way in which arxiv categorises its articles
 */
function randomArticle() {
    alert("Congratulations! You're the one millionth visitor too this site!");
    open("https://arxiv.org/pdf/2101.0" + Math.round(Math.random() * 1295 + 1000) + ".pdf");
}

/**
 * Fake sign up. Used when clicked on the "sign up" button on the homepage
 */
function fakeSignUp() {
    alert("no.");
}

/**
 * Signup form parsing function
 * Works through the form, checking the values of each input based on a regex string, and then formatting incorrect
 * inputs to show that, and if all is okay going to a 404 page
 */
function signUpSelect() {
    let wholeFormElements = document.getElementById("signUpForm").elements;
    let okay = true;
    for (let i = 0; i < wholeFormElements.length; i++) {
        let fieldElem = wholeFormElements[i];
        if (!fieldElem.classList.contains("invalid_input") && fieldElem.value === "") {
            okay = false;
            fieldElem.classList.add("invalid_input");
            fieldElem.placeholder = "Required field";
        } else if (!(fieldElem.value === "")) {
            if (!fieldElem.value.match(regexMatches[fieldElem.id])) {
                fieldElem.value = "";
                fieldElem.placeholder = "Invalid " + fieldElem.id;
                if (!fieldElem.classList.contains("invalid_input")) {
                    fieldElem.classList.add("invalid_input");
                }
                okay = false;
            }
        }
    }
    if (okay) {
        open("404.html", "_self");
    }
}

/**
 *
 * @param node
 */
function myReset(node) {
    node.classList.remove("invalid_input");
}

/**
 * Loads the navbar contents to the pages navbar
 */
function loadNavBar() {
    document.getElementById('navbarSupportedContent').innerHTML = `
<ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
        <a class="nav-link" aria-current="page" href="index.html">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" aria-current="page" href="about_us.html">About Us</a>
    </li>
    <li class="nav-item dropdown">
        <a aria-expanded="false" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#"
           id="reportsDropdown" role="button">
            Reports
        </a>
        <ul aria-labelledby="reportsDropdown" class="dropdown-menu">
            <li><a class="dropdown-item" href="reports.html">All reports</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="co2_emissions.html">CO₂ Emissions</a></li>
            <li><a class="dropdown-item" href="fertilisers.html">Fertilisers</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="report_about.html">About our reports</a></li>
        </ul>
    </li>
    <li class="nav-item">
        <a class="nav-link" aria-current="page" href="visual.html">Visualise</a>
    </li>
</ul>
`;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementById('navCollapseButton').classList.add("navbar-dark");
    } else {
        document.getElementById('navCollapseButton').classList.add("navbar-light");
    }
}

/**
 * Sets the width of an element to be the same as the parent and updates originalWindowWidth
 * @param svg the svg to have the size set
 */
function svgSize(svg) {
    let parent = document.getElementById("svg_parent");
    svg.style.width = "" + parent.clientWidth;
    originalWindowWidth = parent.clientWidth;
}

/**
 * Dynamic resizing of the choropleth SVG
 * Changes style attributes of the svg and D3 attributes of the g tag inside the SVG
 */
function resizeSVG() {
    let width = document.getElementById("svg_parent").clientWidth;
    let svg = document.getElementById("find_me");
    let svg_body = d3.select("g");
    if (width < subWidth) {
        svg.style.width = "" + width;
        svg.style.height = "" + 491.02 * width / subWidth;
        svg_body.attr("transform", "scale(" + width / subWidth + ") translate(0,0)");
    } else {
        svg.style.width = "" + width;
        svg.style.height = "" + 491.02;
        svg_body.attr("transform", "scale(1) translate(" + (width - subWidth) / 2 + ", 0)")

    }
}
