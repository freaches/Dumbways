    let menu = false

    function openMenu () {
        let menuNav = document.getElementById ("menu-container")

        console.log(menuNav)

        if(!menu) {
            menuNav.style.display = "block";
            menu = true
        } else {
            menuNav.style.display = "none";
            menu = false
        }
    }