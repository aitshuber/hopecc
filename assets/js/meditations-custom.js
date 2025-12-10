document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll(".post-item"); // All post elements
    const loadMoreButton = document.querySelector(".loadmore-button"); // "Load More Content" button
    const allButton = document.querySelector(".all-button");
    const filterButtons = document.querySelectorAll(".uk-nav.uk-dropdown-nav li"); // All filter buttons
    const postContainer = document.querySelector(".js-filter");

    var debug_category = "";

    function sortPosts(postsArray) {
        return Array.from(postsArray).sort((a, b) => {
            const sortA = parseInt(a.dataset.sort || 0, 10);
            const sortB = parseInt(b.dataset.sort || 0, 10);
            return sortA - sortB; // Ascending order
        });
    }

    function groupAndSortPosts(postsArray) {
        // Create an object to group posts by category
        const groupedPosts = {};
        postsArray.forEach((post) => {
            const categories = (post.dataset.category || "").split(" ").filter(cat => cat && !["Meditations", "Life", "Carpe Diem", "Health", "Moments", "Difficulty", "Sports & rec", "Virtues"].includes(cat));
            if (categories.length === 0) {
                categories.push("Uncategorized"); // Fallback for posts with no valid categories
            }
            categories.forEach((category) => {
                if (!groupedPosts[category]) {
                    groupedPosts[category] = [];
                }
                groupedPosts[category].push(post);
            });
        });

        // Sort categories alphabetically and sort posts within each category
        const sortedCategories = Object.keys(groupedPosts).sort();
        let sortedPosts = [];
        sortedCategories.forEach((category) => {
            sortedPosts = sortedPosts.concat(sortPosts(groupedPosts[category]));
        });

        return sortedPosts;
    }

    // Helper function: Show or hide posts based on the selected category
    function filterPosts(category) {
        let postsToShow = [];
        if (category === "All") {
            // Reset to default state: Show all posts and hide extras based on `more-content`
            posts.forEach((post) => {
                postsToShow.push(post);
                post.removeAttribute("hidden");
                if (post.classList.contains("more-content")) {
                    post.removeAttribute("hidden"); // Re-hide extra posts
                }
            });
            postsToShow = groupAndSortPosts(postsToShow);
        } else {
            // Show only posts that match the selected category
            posts.forEach((post) => {
                const postCategories = post.dataset.category || ""; // Get the data-category attribute
                if (postCategories.includes(category)) {
                    postsToShow.push(post);
                    post.removeAttribute("hidden"); // Show matching posts
                } else {
                    post.setAttribute("hidden", true); // Hide non-matching posts
                }
            });
            loadMoreButton.style.display = "none"; // Hide "Load More Content" when filtering
            postsToShow = sortPosts(postsToShow);
        }
        postContainer.innerHTML = "";
        postsToShow.forEach((post) => {
            postContainer.appendChild(post);
        });

    }

    // Event listener for category filters
    filterButtons.forEach((filterButton) => {
        filterButton.addEventListener("click", function () {
            var filter = this.textContent.trim(); // Get the text content of the clicked filter
            if (filter.includes("...")){
                filter = this.getAttribute("uk-filter-control").replace(".", "");
            }
            filterButtons.forEach((button) => button.classList.remove("uk-active")); // Reset active class
            this.classList.add("uk-active"); // Mark the clicked filter as active
            debug_category = filter;
            filterPosts(filter); // Apply the filter
        });
    });
    // Event listener for all button
    allButton.addEventListener("click", function () {
        filterButtons.forEach((button) => button.classList.remove("uk-active"));
        this.classList.add("uk-active");
        filterPosts("All");
    });

});

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector("#responsive-dropdown");
    function updateDropdownPosition(){
        if (window.innerWidth < 1024) {
            dropdown.setAttribute('uk-dropdown', 'mode: click; animation: slide-top; animate-out: true; pos: bottom-center;');
        } else {
            dropdown.setAttribute('uk-dropdown', 'mode: click; animation: slide-top; animate-out: true; pos: bottom-left;');
        }
    }
    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);
});