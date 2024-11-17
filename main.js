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
                compareLists();
            }
        }
    }

    function compareLists() {
        const missing = followingUsernames.filter(username => !followersUsernames.includes(username));
        console.log("Missing Followers:", missing);
    }

    parsePage();
})();
