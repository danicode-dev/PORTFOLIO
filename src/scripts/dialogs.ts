const dialogTriggers =
  document.querySelectorAll<HTMLElement>('[data-dialog-open]');

dialogTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const dialogId = trigger.dataset.dialogOpen;
    if (!dialogId) return;

    const dialog = document.getElementById(dialogId);
    if (!(dialog instanceof HTMLDialogElement)) return;

    document
      .querySelectorAll<HTMLDialogElement>('dialog[open]')
      .forEach((openDialog) => {
        if (openDialog !== dialog) openDialog.close();
      });

    dialog.dataset.returnFocus = 'true';
    dialog.dataset.triggerId = trigger.id || '';
    dialog.showModal();
    document.body.classList.add('dialog-open');

    const closeButton = dialog.querySelector<HTMLElement>(
      '[data-dialog-close]',
    );
    closeButton?.focus();

    const restoreFocus = () => trigger.focus();
    dialog.addEventListener('close', restoreFocus, { once: true });
  });
});

document
  .querySelectorAll<HTMLDialogElement>('dialog.content-dialog')
  .forEach((dialog) => {
    dialog
      .querySelectorAll<HTMLElement>('[data-dialog-close]')
      .forEach((button) => {
        button.addEventListener('click', () => dialog.close());
      });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]'))
        document.body.classList.remove('dialog-open');
    });
  });
