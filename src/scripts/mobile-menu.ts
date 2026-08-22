const menuTrigger =
  document.querySelector<HTMLButtonElement>('[data-menu-open]');
const mobileMenu =
  document.querySelector<HTMLDialogElement>('[data-mobile-menu]');

if (menuTrigger && mobileMenu) {
  let restoreFocus = true;

  const closeMenu = (shouldRestore = true) => {
    restoreFocus = shouldRestore;
    mobileMenu.close();
  };

  menuTrigger.addEventListener('click', () => {
    restoreFocus = true;
    mobileMenu.showModal();
    menuTrigger.setAttribute('aria-expanded', 'true');
    menuTrigger.setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-open');
    mobileMenu.querySelector<HTMLElement>('[data-menu-close]')?.focus();
  });

  mobileMenu
    .querySelector<HTMLElement>('[data-menu-close]')
    ?.addEventListener('click', () => {
      closeMenu();
    });

  mobileMenu
    .querySelectorAll<HTMLElement>('[data-menu-link]')
    .forEach((link) => {
      link.addEventListener('click', () => closeMenu(false));
    });

  mobileMenu
    .querySelectorAll<HTMLElement>('[data-menu-action]')
    .forEach((action) => {
      action.addEventListener('click', () => closeMenu(false));
    });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) closeMenu();
  });

  mobileMenu.addEventListener('cancel', () => {
    restoreFocus = true;
  });

  mobileMenu.addEventListener('close', () => {
    menuTrigger.setAttribute('aria-expanded', 'false');
    menuTrigger.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuTrigger.focus();
  });
}
