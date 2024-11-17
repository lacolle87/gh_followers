(function() {
    const users = Array.from(document.querySelectorAll('.d-table.table-fixed'));
    return users.map(user => {
        return user.querySelector('.Link--secondary').innerText.trim();
    });
})();