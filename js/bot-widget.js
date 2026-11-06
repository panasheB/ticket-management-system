/**
 * HelpDesk Customer Bot Floating Widget Injector
 * Injects a floating bubble in the bottom-right corner to open the customer bot.
 */

(function() {
  function initWidget() {
    if (document.getElementById('helpdesk-bot-launcher-root') || document.getElementById('pulse-bot-launcher-root')) return;

    // Check if css/bot.css is already loaded, otherwise link it
    if (!document.querySelector('link[href*="bot.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/bot.css';
      document.head.appendChild(link);
    }

    const container = document.createElement('div');
    container.id = 'helpdesk-bot-launcher-root';
    container.className = 'bot-floating-launcher';

    container.innerHTML = `
      <!-- Popup Frame -->
      <div class="bot-floating-popup" id="helpdesk-bot-popup" style="display:none;">
        <div id="helpdesk-bot-widget-mount" style="height:100%;display:flex;flex-direction:column;overflow:hidden;"></div>
      </div>

      <!-- Floating Trigger Button -->
      <button class="bot-launcher-btn" id="btn-toggle-bot-widget" title="Open Customer Support Bot">
        <svg id="bot-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg id="bot-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    document.body.appendChild(container);

    const popup = document.getElementById('helpdesk-bot-popup');
    const btn = document.getElementById('btn-toggle-bot-widget');
    const iconChat = document.getElementById('bot-icon-chat');
    const iconClose = document.getElementById('bot-icon-close');
    const mount = document.getElementById('helpdesk-bot-widget-mount');

    let isBotMounted = false;

    btn.addEventListener('click', () => {
      const isOpen = popup.style.display !== 'none';
      if (isOpen) {
        popup.style.display = 'none';
        iconChat.style.display = 'block';
        iconClose.style.display = 'none';
      } else {
        popup.style.display = 'flex';
        iconChat.style.display = 'none';
        iconClose.style.display = 'block';

        const BotClass = window.HelpDeskBotEngine || window.PulseBotEngine;
        if (!isBotMounted && BotClass) {
          window.embeddedBot = new BotClass();
          window.embeddedBot.init(mount);
          isBotMounted = true;
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
