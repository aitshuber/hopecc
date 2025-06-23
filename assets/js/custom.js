document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll(".post-item"); // All post elements
    const loadMoreButton = document.querySelector(".loadmore-button"); // "Load More Content" button
    const allButton = document.querySelector(".all-button");
    const filterButtons = document.querySelectorAll(".uk-subnav-pill li"); // All filter buttons

    // Helper function: Show or hide posts based on the selected category
    function filterPosts(category) {
        if (category === "All") {
            // Reset to default state: Show all posts and hide extras based on `more-content`
            posts.forEach((post, index) => {
                post.removeAttribute("hidden");
                if (post.classList.contains("more-content")) {
                    post.removeAttribute("hidden"); // Re-hide extra posts
                }
            });
        } else {
            // Show only posts that match the selected category
            posts.forEach((post) => {
                const postCategories = post.dataset.category || ""; // Get the data-category attribute
                if (postCategories.includes(category)) {
                    post.removeAttribute("hidden"); // Show matching posts
                } else {
                    post.setAttribute("hidden", true); // Hide non-matching posts
                }
            });
            loadMoreButton.style.display = "none"; // Hide "Load More Content" when filtering
        }
    }

    // Event listener for category filters
    filterButtons.forEach((filterButton) => {
        filterButton.addEventListener("click", function () {
            const filter = this.textContent.trim(); // Get the text content of the clicked filter
            filterButtons.forEach((button) => button.classList.remove("uk-active")); // Reset active class
            this.classList.add("uk-active"); // Mark the clicked filter as active
            filterPosts(filter); // Apply the filter
        });
    });
    allButton.addEventListener("click", function () {
        filterPosts("All");
    });

});
