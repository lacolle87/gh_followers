(function() {
    const followersUsernames = [];
    let isParsingFollowers = true;
    let counter = 0;

    function processPage() {
        const users = Array.from(document.querySelectorAll('.d-table.table-fixed'));
        users.forEach(user => {
            const username = user.querySelector('.Link--secondary').innerText.trim();

            if (isParsingFollowers) {
                followersUsernames.push(username);
            } else if (!followersUsernames.includes(username)) {
                const unfollowButton = user.querySelector('form[action*="unfollow?target="] input[type="submit"]');
                if (unfollowButton && !unfollowButton.disabled) {
                    unfollowButton.click();
                    counter++;
                    console.log(`Unfollowed: ${username}`);
                } else {
                    console.log(`Cannot unfollow: ${username}`);
                }
            }
        });

        handlePagination();
    }

    function handlePagination() {
        const nextPage = document.querySelector('.pagination a[rel="nofollow"]:last-child');
        if (nextPage && nextPage.innerText.toLowerCase() === 'next') {
            nextPage.click();
            setTimeout(processPage, 2000);
        } else {
            if (isParsingFollowers) {
                isParsingFollowers = false;
                document.querySelector('a[href*="following"]').click();
                setTimeout(processPage, 2000);
            } else {
                if (counter > 0) {
                    console.log(`Finished processing all pages. Unfollowed ${counter} users.`);
                } else {
                    console.log("Finished processing all pages. No users to unfollow.");
                }
            }
        }
    }

    processPage();
})();
