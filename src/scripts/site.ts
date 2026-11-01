const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function replay(el: Element | null | undefined) {
  if (!el) return;
  el.querySelectorAll('.viz').forEach((viz) => {
    viz.classList.remove('is-live');
    void (viz as HTMLElement).offsetWidth;
    viz.classList.add('is-live');
  });
}

// Les visuels s'animent à leur entrée dans l'écran ; ils restent complets sans JS.
if (!reduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-live');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll('.viz').forEach((viz) => {
    if (!viz.closest('.stage__panel')) observer.observe(viz);
  });
}

// Héros : les onglets, les mots rotatifs et le visuel changent ensemble.
const stage = document.querySelector<HTMLElement>('[data-stage]');
if (stage) {
  const tabs = [...stage.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...stage.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const copies = [...stage.querySelectorAll<HTMLElement>('[data-copy]')];
  const words = [...document.querySelectorAll<HTMLElement>('.rotor__word')];
  const pause = stage.querySelector<HTMLButtonElement>('[data-pause]');
  let current = 0;
  let timer: number | undefined;
  let stopped = reduced;

  const show = (index: number, focus = false) => {
    current = index;
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });
    // Tout reste empilé dans la même cellule : la hauteur ne change pas d'un onglet à l'autre.
    panels.forEach((panel, i) => {
      panel.hidden = false;
      panel.classList.toggle('is-off', i !== index);
    });
    copies.forEach((copy) => {
      copy.hidden = false;
      copy.classList.toggle('is-off', copy.dataset.copy !== String(index));
    });
    words.forEach((word, i) => word.classList.toggle('is-on', i === index));
    if (!reduced) replay(panels[index]);
  };

  const tick = () => show((current + 1) % tabs.length);
  const start = () => {
    window.clearInterval(timer);
    if (!stopped) timer = window.setInterval(tick, 6000);
  };
  const stop = () => {
    stopped = true;
    window.clearInterval(timer);
    if (pause) {
      pause.setAttribute('aria-pressed', 'true');
      pause.setAttribute('aria-label', 'Reprendre le défilement');
      pause.querySelector('[data-icon-pause]')?.setAttribute('hidden', '');
      pause.querySelector('[data-icon-play]')?.removeAttribute('hidden');
    }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => { stop(); show(i); });
    tab.addEventListener('keydown', (event) => {
      const keys: Record<string, number> = {
        ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1,
      };
      if (event.key in keys) {
        event.preventDefault();
        stop();
        show((keys[event.key] + tabs.length) % tabs.length, true);
      }
    });
  });

  pause?.addEventListener('click', () => {
    if (stopped) {
      stopped = false;
      pause.setAttribute('aria-pressed', 'false');
      pause.setAttribute('aria-label', 'Mettre le défilement en pause');
      pause.querySelector('[data-icon-pause]')?.removeAttribute('hidden');
      pause.querySelector('[data-icon-play]')?.setAttribute('hidden', '');
      start();
    } else {
      stop();
    }
  });
  if (reduced && pause) pause.hidden = true;

  // Le défilement s'interrompt tant que le visiteur lit ou que le héros est hors écran.
  stage.addEventListener('pointerenter', () => window.clearInterval(timer));
  stage.addEventListener('pointerleave', start);
  stage.addEventListener('focusin', () => window.clearInterval(timer));
  stage.addEventListener('focusout', start);
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) start();
    else window.clearInterval(timer);
  }).observe(stage);

  show(0);
}

// Menu mobile : se referme avec Échap ou après un choix.
const menu = document.querySelector<HTMLDetailsElement>('.nav__mobile');
if (menu) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
  matchMedia('(min-width: 1041px)').addEventListener('change', () => { menu.open = false; });
}

// Formulaire : envoi sans rechargement ; sans JS, il repasse par une page classique.
const form = document.querySelector<HTMLFormElement>('[data-contact]');
if (form) {
  const stamp = form.querySelector<HTMLInputElement>('input[name="t"]');
  if (stamp) stamp.value = String(Math.floor(Date.now() / 1000));
  const error = form.querySelector<HTMLElement>('[data-error]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  const fail = (message: string) => {
    if (!error) return;
    error.hidden = false;
    error.querySelector('[data-error-text]')!.textContent = message;
    error.focus();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (error) error.hidden = true;
    if (submit) { submit.disabled = true; submit.dataset.label = submit.textContent ?? ''; submit.textContent = 'Envoi en cours…'; }
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.ok) {
        window.location.assign('/merci/');
        return;
      }
      fail(`${result?.error ?? "L'envoi a échoué"}.`);
    } catch {
      fail("L'envoi a échoué, vérifiez votre connexion.");
    }
    if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label ?? 'Envoyer le message'; }
  });
}
