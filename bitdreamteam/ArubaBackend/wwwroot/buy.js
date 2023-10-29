document.addEventListener("DOMContentLoaded", function() {
    fetchWebApps();
});

function fetchWebApps() {
    fetch('/apps/GetWebApps')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            populateWebAppTiles(data);
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation:', error.message);
        });
}

function populateWebAppTiles(webApps) {
    const container = document.getElementById('webAppTileContainer');
    
    webApps.forEach(app => {
        console.log("app:");
        console.log(app);
        
        const template = document.createElement('template');
        template.innerHTML = `
            <a href="customize_product.html" class="group">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                    <img src="${app.DisplayImageUrl}" alt="App image for ${app.Name}"
                        class="h-full w-full object-cover object-center group-hover:opacity-75">
                </div>
                <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                    <h3></h3>
                    <p></p>
                </div>
                <p class="mt-1 text-sm italic text-gray-500"></p>
            </a>
        `;

        const clone = document.importNode(template.content, true);
        clone.querySelector('h3').textContent = app.Name;
        clone.querySelector('p').textContent = `$${app.Price}`;
        clone.querySelectorAll('p')[1].textContent = app.Description;

        container.appendChild(clone);
    });
}
