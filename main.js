(function() {
    let followersUsernames = [];
    let isParsingFollowers = true;

    function parsePage() {
        const users = Array.from(document.querySelectorAll('.d-table.table-fixed'));
        const usernames = users.map(user => {
            return user.querySelector('.Link--secondary').innerText.trim();
        });

        if (isParsingFollowers) {
            followersUsernames.push(...usernames);
        } else {
            users.forEach(user => {
                const username = user.querySelector('.Link--secondary').innerText.trim();
                if (!followersUsernames.includes(username)) {
                    const unfollowForm = user.querySelector('form[action*="unfollow?target="]');
                    if (unfollowForm) {
                        const submitButton = unfollowForm.querySelector('input[type="submit"]');
                        if (submitButton && !submitButton.disabled) {
                            submitButton.click();
                            console.log(`Unfollowed: ${username}`);
                        } else {
                            console.log(`Unfollow button disabled or not found for: ${username}`);
                        }
                    } else {
                        console.log(`Unfollow form not found for: ${username}`);
                    }
                }
            });
        }

        const nextPageLink = document.querySelector('.pagination a[rel="nofollow"]');
        if (nextPageLink && nextPageLink.innerText.toLowerCase() === 'next') {
            nextPageLink.click();
            setTimeout(parsePage, 2000);
        } else {
            if (isParsingFollowers) {
                isParsingFollowers = false;
                const followingTab = document.querySelector('a[href*="following"]');
                if (followingTab) {
                    followingTab.click();
                    setTimeout(parsePage, 2000);
                }
            } else {
                console.log("Finished processing all pages.");
            }
        }
    }

    parsePage();
})();
