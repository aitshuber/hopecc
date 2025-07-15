(function() {
    var weightChecker = false;
    var numberChecker = false;

    function displaySearchResults(results, store) {
        const searchResults = document.getElementById('search_results');

        if (results.length) {
            // Map results to objects with data from the store
            const mappedResults = results.map(result => ({
                ...store[result.ref], // This spreads all properties from the referenced store item
                id: result.ref // Keep an explicit reference to the search result key
            }));

            // Sort the mapped results by `number` field as integers
            const sortedResults = mappedResults.sort((a, b) => {
                const sortA = parseInt(a.number || 0, 10);// Parse `number` as an integer
                const sortB = parseInt(b.number || 0, 10);
                const sortAWeight = parseInt(a.weight || 0, 10);
                const sortBWeight = parseInt(b.weight || 0, 10);

                if (sortA === 0 && sortB === 0) {
                    weightChecker = true;
                    return sortAWeight - sortBWeight;
                }
                else {
                    numberChecker = true;
                    return sortA - sortB; // Sort in ascending order

                }
            });

            let appendString = '';

            // Iterate over the sorted results
            sortedResults.forEach(item => {
                console.log('Rendering item:', item); // Debug: Check item structure here

                // var category_urls = [];
                //
                if (item.url) { // Ensure `url` exists before rendering


                    appendString += `<article class="uk-card uk-grid-collapse uk-margin-large" data-uk-grid>
  <div class="uk-width-1-3@s uk-card-media-left media-1-3 uk-cover-container">
    <a href="${item.url}">
      <img src="${item.image}" alt="${item.title}" data-uk-cover>
      <canvas width="600" height="450"></canvas>
    </a>
  </div>
  <div class="uk-width-expand@s uk-flex">
    <div class="uk-card-body search-query uk-margin-auto-vertical uk-text-center ">
      <div class="uk-text-uppercase article-title-font card-categories">
      </div>
      <h3 class="uk-card-title article-title-font"><a href="${item.url}">${item.title}</a></h3>
    </div>
  </div>
</article>`;
                } else {
                    console.warn(`Missing URL for item: ${JSON.stringify(item)}`);
                }
            });

            searchResults.innerHTML = appendString; // Update the results container in the DOM
        } else {
            const results_title = document.getElementById('results-title');
            results_title.innerHTML = 'No Results Found';
            // searchResults.innerHTML = '<li>No results found</li>'; // Display message for no results
        }
    }


    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        // Initalize lunr with the fields it will be searching on. I've given title
        // a boost of 10 to indicate matches on this field are more important.
        var idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('author');
            this.field('categories');
            this.field('content');
            this.field('number', { boost: 5 }); // Add the number field
            this.field('type');
            this.field('weight', { boost: 5 });
        });

        for (var key in window.store) { // Add the data to lunr
            idx.add({
                'id': key,
                'title': window.store[key].title,
                'author': window.store[key].author,
                'categories': window.store[key].category,
                'content': window.store[key].content,
                'number': window.store[key].number, // Add the number field
                'type': window.store[key].type,
                'weight': window.store[key].weight
            });
        }

        var results = idx.search(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, window.store); // We'll write this in the next section
    }
    console.log("Store contents: ", window.store);
})();