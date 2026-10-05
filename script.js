const requiredDomain = "@ashokacollege.in";
const correctPassword = "askw@1234";

function showSection(sectionName) {
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.add("active");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

function searchSection() {
    const value = document.getElementById("searchInput").value.toLowerCase().trim();

    if (value.includes("login") || value.includes("student")) {
        showSection("login");
    } else if (value.includes("about") || value.includes("dfa")) {
        showSection("about");
    } else if (value.includes("program") || value.includes("technology")) {
        showSection("programs");
    } else if (value.includes("project") || value.includes("module")) {
        showSection("projects");
    } else if (value.includes("contact")) {
        showSection("contact");
    }
}

function validateEmail(email) {
    if (!email) {
        return false;
    }

    if (!email.endsWith(requiredDomain)) {
        return false;
    }

    const atIndex = email.indexOf("@");

    if (atIndex <= 0) {
        return false;
    }

    if (email.indexOf("@", atIndex + 1) !== -1) {
        return false;
    }

    if (/\s/.test(email)) {
        return false;
    }

    return true;
}

function validateLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const result = document.getElementById("result");

    const emailValid = validateEmail(email);
    const passwordValid = password === correctPassword;

    createEmailDFA(email);
    createPasswordDFA(password);

    if (emailValid && passwordValid) {
        result.className = "success";
        result.innerHTML = "✓ Login Valid<br>Both DFA validations accepted the input.";
    } else {
        result.className = "error";

        let message = "✗ Login Invalid<br>";

        if (!emailValid) {
            message += "Email DFA rejected the input.<br>";
        }

        if (!passwordValid) {
            message += "Password DFA rejected the input.";
        }

        result.innerHTML = message;
    }
}

function createArrowMarker(svg, id, color) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    const marker = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
    );

    marker.setAttribute("id", id);
    marker.setAttribute("markerWidth", "8");
    marker.setAttribute("markerHeight", "8");
    marker.setAttribute("refX", "7");
    marker.setAttribute("refY", "4");
    marker.setAttribute("orient", "auto");

    const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

    path.setAttribute("d", "M0,0 L8,4 L0,8 Z");
    path.setAttribute("fill", color);

    marker.appendChild(path);
    defs.appendChild(marker);
    svg.appendChild(defs);
}

function createState(svg, x, y, label, accepting, dead) {
    const group = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
    );

    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "28");

    if (accepting) {
        circle.setAttribute("class", "state accept-state");
    } else if (dead) {
        circle.setAttribute("class", "state dead-state");
    } else {
        circle.setAttribute("class", "state");
    }

    group.appendChild(circle);

    if (accepting) {
        const innerCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        innerCircle.setAttribute("cx", x);
        innerCircle.setAttribute("cy", y);
        innerCircle.setAttribute("r", "22");
        innerCircle.setAttribute("fill", "none");
        innerCircle.setAttribute("stroke", "#16823b");
        innerCircle.setAttribute("stroke-width", "2");

        group.appendChild(innerCircle);
    }

    const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );

    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("class", "state-text");
    text.textContent = label;

    group.appendChild(text);
    svg.appendChild(group);
}

function createTransition(svg, x1, y1, x2, y2, label, markerId) {
    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("class", "transition-line");
    line.setAttribute("marker-end", `url(#${markerId})`);

    svg.appendChild(line);

    const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );

    text.setAttribute("x", (x1 + x2) / 2);
    text.setAttribute("y", (y1 + y2) / 2 - 8);
    text.setAttribute("class", "transition-text");
    text.textContent = label;

    svg.appendChild(text);
}

function createStartArrow(svg, x, y, markerId) {
    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line.setAttribute("x1", x - 60);
    line.setAttribute("y1", y);
    line.setAttribute("x2", x - 30);
    line.setAttribute("y2", y);
    line.setAttribute("class", "start-line");
    line.setAttribute("marker-end", `url(#${markerId})`);

    svg.appendChild(line);

    const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );

    text.setAttribute("x", x - 60);
    text.setAttribute("y", y - 12);
    text.setAttribute("fill", "#061b45");
    text.setAttribute("font-size", "12");
    text.setAttribute("font-weight", "bold");
    text.textContent = "Start";

    svg.appendChild(text);
}

function createDFAContainer(container, input, expected, type) {
    container.innerHTML = "";

    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.classList.add("dfa-svg");

    const totalStates = input.length + 1;
    const spacing = 105;
    const width = Math.max(900, totalStates * spacing + 100);
    const height = 190;

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const markerId = type + "Arrow";

    createArrowMarker(svg, markerId, "#65728a");

    const y = 100;

    createStartArrow(svg, 70, y, markerId);

    let deadIndex = -1;

    for (let i = 0; i < input.length; i++) {
        if (input[i] !== expected[i]) {
            deadIndex = i;
            break;
        }
    }

    for (let i = 0; i <= input.length; i++) {
        const x = 100 + i * spacing;

        const accepting =
            input.length === expected.length &&
            deadIndex === -1 &&
            i === input.length;

        createState(
            svg,
            x,
            y,
            "q" + i,
            accepting,
            false
        );
    }

    for (let i = 0; i < input.length; i++) {
        const x1 = 100 + i * spacing + 28;
        const x2 = 100 + (i + 1) * spacing - 28;

        let label = input[i];

        createTransition(
            svg,
            x1,
            y,
            x2,
            y,
            label,
            markerId
        );
    }

    if (deadIndex !== -1) {
        const deadX = 100 + (input.length + 1) * spacing;

        createState(
            svg,
            deadX,
            y,
            "qd",
            false,
            true
        );

        const previousX =
            100 +
            (input.length) * spacing +
            28;

        createTransition(
            svg,
            previousX,
            y,
            deadX - 28,
            y,
            "reject",
            markerId
        );
    }

    container.appendChild(svg);

    const description = document.createElement("p");

    description.style.marginTop = "12px";
    description.style.color = "#68748c";
    description.style.fontSize = "13px";

    if (type === "email") {
        if (validateEmail(input)) {
            description.textContent =
                "Accepted: The email reached the final accepting state.";
        } else {
            description.textContent =
                "Rejected: The email did not satisfy the required DFA pattern.";
        }
    } else {
        if (input === expected) {
            description.textContent =
                "Accepted: The password reached the final accepting state.";
        } else {
            description.textContent =
                "Rejected: The password did not match the required DFA pattern.";
        }
    }

    container.appendChild(description);
}

function createEmailDFA(email) {
    const container = document.getElementById("emailDfa");

    if (!email) {
        container.innerHTML =
            '<p class="empty-message">No email input was entered.</p>';
        return;
    }

    const expected = requiredDomain;

    let processedExpected = "";

    const atIndex = email.indexOf("@");

    if (atIndex > 0) {
        processedExpected = email.substring(0, atIndex) + expected;
    } else {
        processedExpected = expected;
    }

    createDFAContainer(
        container,
        email,
        processedExpected,
        "email"
    );
}

function createPasswordDFA(password) {
    const container = document.getElementById("passwordDfa");

    if (!password) {
        container.innerHTML =
            '<p class="empty-message">No password input was entered.</p>';
        return;
    }

    createDFAContainer(
        container,
        password,
        correctPassword,
        "password"
    );
}

document.getElementById("searchInput").addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            searchSection();
        }
    }
);