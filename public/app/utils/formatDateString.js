
function formatDateString(m) {
    return (
        ("0" + (m.getDate()+1)).slice(-2) + "/" +
        ("0" + m.getMonth()).slice(-2) + "/" +
        m.getFullYear() + " " +
        ("0" + m.getHours()).slice(-2) + ":" +
        ("0" + m.getMinutes()).slice(-2) + ":" +
        ("0" + m.getSeconds()).slice(-2)
    );
}
