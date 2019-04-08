
function formatDateString(m) {
    return (
        ("0" + (m.getUTCDate()+1)).slice(-2) + "/" +
        ("0" + m.getUTCMonth()).slice(-2) + "/" +
        m.getUTCFullYear() + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2)
    );
}
