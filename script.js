document.addEventListener("DOMContentLoaded", function () {
    // Helper function to fetch JSON data
    function fetchData(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(error => {
                console.error("Error fetching JSON data:", error);
            });
    }

    // Function to render the data
    function renderData(data) {
        // Render about
        var aboutElement = document.getElementById("about");
        aboutElement.textContent = data.about;

        // Render sections
        var sectionsElement = document.getElementById("sections");
        sectionsElement.innerHTML = ""; // Clear existing content

        data.sections.forEach(function (section) {
            var sectionElement = document.createElement("div");
            sectionElement.classList.add("section");

            var titleElement = document.createElement("div");
            titleElement.classList.add("title");
            titleElement.textContent = section.title;

            var contentElement = document.createElement("div");
            contentElement.classList.add("content");

            section.content.forEach(function (content) {
                var paragraphElement = document.createElement("p");
                paragraphElement.textContent = content;
                contentElement.appendChild(paragraphElement);
            });

            var papersElement = document.createElement("div");
            papersElement.classList.add("papers");

            if (section.papers && section.papers.length > 0) {
                var papersTitleElement = document.createElement("p");
                papersTitleElement.textContent = "Papers/Blogs:";
                papersElement.appendChild(papersTitleElement);

                section.papers.forEach(function (paper) {
                    var paperLinkElement = document.createElement("a");
                    paperLinkElement.href = paper.link;
                    paperLinkElement.target = "_blank"; // Open link in a new tab
                    paperLinkElement.textContent = paper.title;
                    paperLinkElement.style.color = "#ad2737"; // Set link color to white
                    papersElement.appendChild(paperLinkElement);

                    var lineBreakElement = document.createElement("br");
                    papersElement.appendChild(lineBreakElement);
                });
            }

            sectionElement.appendChild(titleElement);
            sectionElement.appendChild(contentElement);
            sectionElement.appendChild(papersElement);
            sectionsElement.appendChild(sectionElement);

            // Toggle content visibility on title click
            titleElement.addEventListener("click", function () {
                contentElement.style.display = contentElement.style.display === "none" ? "block" : "none";
                sectionElement.classList.toggle("expanded");
            });
        });
    }

    // Fetch and render data based on user choice
    var selectElement = document.getElementById("dataSelect");
    var jsonDataUrl = "framework.json"; // Set default data source
    selectElement.addEventListener("change", function () {
        jsonDataUrl = selectElement.value + ".json";
        fetchData(jsonDataUrl)
            .then(data => {
                renderData(data);
            });
    });

    // Fetch and render default data
    fetchData(jsonDataUrl)
        .then(data => {
            renderData(data);
        });
});
