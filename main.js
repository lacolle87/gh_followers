(function() {
    let followersUsernames = [];
    let followingUsernames = [];
    let isParsingFollowers = true;

    function parsePage() {
        const users = Array.from(document.querySelectorAll('.d-table.table-fixed'));
        const usernames = users.map(user => {
            return user.querySelector('.Link--secondary').innerText.trim();
        });

        if (isParsingFollowers) {
            followersUsernames.push(...usernames);
        } else {
            followingUsernames.push(...usernames);
            checkForUnfollow(usernames);
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
            }
        }
    }

    function checkForUnfollow(usernames) {
        usernames.forEach(username => {
            if (!followersUsernames.includes(username)) {
                const unfollowForm = Array.from(document.querySelectorAll('form[action*="unfollow?target="]'))
                    .find(form => form.action.includes(username));

                if (unfollowForm) {
                    const submitButton = unfollowForm.querySelector('input[type="submit"]');
                    if (submitButton && !submitButton.disabled) {
                        submitButton.click();
                        console.log(`Unfollowed: ${username}`);
                    } else {
                        console.log(`Unfollow button is disabled or not found for: ${username}`);
                    }
                } else {
                    console.log(`Unfollow button not found for: ${username}`);
                }
            }
        });
    }

    parsePage();
})();
