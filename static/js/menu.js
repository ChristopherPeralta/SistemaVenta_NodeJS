const Mostrarmenu = (headerToggle, navbarId) => {
    const toggleBtn = document.getElementById(headerToggle);
    const nav = document.getElementById(navbarId);
    if (headerToggle && navbarId) {
      toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("show-menu");
        toggleBtn.classList.toggle("bx-x");
      });
    }
  };
  Mostrarmenu("header-toggle", "navbar");
  
  
  
  const navLink = document.querySelectorAll(".nav_link");
  function linkAction() {
	  const navBar = document.getElementById("navbar");
	  navBar.classList.remove("show-menu")
  }
  navLink.forEach(item => item.addEventListener("click", linkAction))
  
  
  // Obtenemos todas las opciones del navbar
const navLinks = document.querySelectorAll('.nav_link');

// Recorremos las opciones del navbar
navLinks.forEach(navLink => {
  // Verificamos si la URL de la opción coincide con la URL actual
  if (navLink.href === window.location.href) {
    // Agregamos la clase "active" a la opción activa
    navLink.classList.add('active');
  } else {
    // Quitamos la clase "active" de las demás opciones
    navLink.classList.remove('active');
  }
});


