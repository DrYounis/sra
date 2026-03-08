/**
 * SARA WhatsApp Chat Widget
 * Floating WhatsApp button with auto-messages
 */

(function() {
  // Configuration
  const config = {
    phoneNumber: '966555056545',
    position: 'bottom-left', // bottom-left or bottom-right
    language: 'ar', // ar or en
    businessHours: {
      start: 8, // 8 AM
      end: 17, // 5 PM
      timezone: 'Asia/Riyadh'
    }
  };

  // Auto-messages based on page/context
  const messages = {
    general: 'مرحباً، أود الاستفسار عن منصة SARA للصحة المؤسسية',
    b2b: 'مرحباً، أود الحصول على عرض سعر لشركتي',
    insurance: 'مرحباً، أود مناقشة شراكة مع شركة التأمين',
    investor: 'مرحباً، أود الاستفسار عن فرص الاستثمار',
    support: 'مرحباً، أحتاج إلى مساعدة تقنية'
  };

  // Check business hours
  function isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= config.businessHours.start && hour < config.businessHours.end;
  }

  // Get current page context
  function getPageContext() {
    const path = window.location.pathname;
    if (path.includes('b2b') || path.includes('companies')) return 'b2b';
    if (path.includes('insurance')) return 'insurance';
    if (path.includes('investor')) return 'investor';
    if (path.includes('support') || path.includes('contact')) return 'support';
    return 'general';
  }

  // Create widget HTML
  function createWidget() {
    const context = getPageContext();
    const message = messages[context] || messages.general;
    const encodedMessage = encodeURIComponent(message);

    const widgetHTML = `
      <div id="sara-whatsapp-widget" class="sara-wa-widget">
        <!-- Chat Button -->
        <button class="sara-wa-button" onclick="SARAWhatsApp.toggleChat()" aria-label="تواصل عبر واتساب">
          <svg viewBox="0 0 32 32" class="sara-wa-icon">
            <path fill="currentColor" d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.408 1.417-5.273-0.317-0.533c-1.267-2.197-1.943-4.697-1.943-7.24 0-7.402 6.007-13.408 13.408-13.408 7.402 0 13.408 6.007 13.408 13.408s-6.007 13.467-13.408 13.467v0.333zM21.907 18.303c-0.238-0.119-1.408-0.694-1.628-0.772-0.22-0.079-0.38-0.119-0.54 0.119-0.159 0.238-0.615 0.772-0.754 0.931-0.139 0.159-0.278 0.179-0.516 0.060-0.238-0.119-1.005-0.371-1.913-1.181-0.708-0.631-1.185-1.41-1.324-1.648-0.139-0.238-0.015-0.367 0.104-0.486 0.107-0.107 0.238-0.278 0.357-0.417 0.119-0.139 0.159-0.238 0.238-0.397 0.079-0.159 0.040-0.298-0.020-0.417-0.060-0.119-0.54-1.303-0.74-1.781-0.194-0.464-0.391-0.4-0.54-0.408-0.139-0.007-0.298-0.009-0.457-0.009s-0.417 0.060-0.635 0.298c-0.218 0.238-0.833 0.813-0.833 1.985s0.853 2.303 0.971 2.462c0.119 0.159 1.656 2.596 4.038 3.596 1.691 0.711 2.231 0.571 2.628 0.533 0.853-0.081 1.408-0.594 1.606-1.169 0.199-0.575 0.199-1.071 0.139-1.169-0.060-0.099-0.218-0.159-0.457-0.278v0.001z"/>
          </svg>
          <span class="sara-wa-text">${config.language === 'ar' ? 'تواصل معنا' : 'Chat with us'}</span>
          ${!isBusinessHours() ? '<span class="sara-wa-offline">⏰</span>' : '<span class="sara-wa-online">●</span>'}
        </button>

        <!-- Chat Preview -->
        <div class="sara-wa-preview" id="sara-wa-preview" style="display: none;">
          <div class="sara-wa-preview-header">
            <div class="sara-wa-avatar">S</div>
            <div class="sara-wa-preview-info">
              <div class="sara-wa-preview-name">فريق SARA</div>
              <div class="sara-wa-preview-status">${isBusinessHours() ? 'متصل الآن' : 'سيعود خلال ساعات العمل'}</div>
            </div>
            <button class="sara-wa-close" onclick="SARAWhatsApp.toggleChat()">✕</button>
          </div>
          <div class="sara-wa-preview-body">
            <div class="sara-wa-message">
              ${config.language === 'ar' ? 'مرحباً! 👋 كيف يمكننا مساعدتك اليوم؟' : 'Hello! 👋 How can we help you today?'}
            </div>
            <div class="sara-wa-message-time">${new Date().toLocaleTimeString(config.language === 'ar' ? 'ar-SA' : 'en-US', {hour: '2-digit', minute:'2-digit'})}</div>
          </div>
          <div class="sara-wa-preview-input">
            <input type="text" id="sara-wa-input" placeholder="${config.language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}" value="${message}">
            <button onclick="SARAWhatsApp.sendMessage()">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>
        /* Widget Styles */
        .sara-wa-widget {
          position: fixed;
          bottom: 24px;
          ${config.position === 'bottom-right' ? 'right' : 'left'}: 24px;
          z-index: 9999;
          font-family: 'Noto Naskh Arabic', sans-serif;
        }

        .sara-wa-button {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #25D366, #20be5a);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 14px 24px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          position: relative;
        }

        .sara-wa-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6);
        }

        .sara-wa-icon {
          width: 24px;
          height: 24px;
        }

        .sara-wa-online {
          position: absolute;
          top: -5px;
          ${config.position === 'bottom-right' ? 'right' : 'left'}: -5px;
          width: 16px;
          height: 16px;
          background: #25D366;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .sara-wa-offline {
          position: absolute;
          top: -5px;
          ${config.position === 'bottom-right' ? 'right' : 'left'}: -5px;
          font-size: 16px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* Chat Preview */
        .sara-wa-preview {
          position: absolute;
          bottom: 80px;
          ${config.position === 'bottom-right' ? 'right' : 'left'}: 0;
          width: 350px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sara-wa-preview-header {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #00C2A8, #00d4b8);
          padding: 16px;
          color: white;
        }

        .sara-wa-avatar {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .sara-wa-preview-info {
          flex: 1;
        }

        .sara-wa-preview-name {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .sara-wa-preview-status {
          font-size: 13px;
          opacity: 0.9;
        }

        .sara-wa-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .sara-wa-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .sara-wa-preview-body {
          padding: 16px;
          background: #f5f8fc;
          min-height: 100px;
        }

        .sara-wa-message {
          background: white;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          border: 1px solid #e0e0e0;
        }

        .sara-wa-message-time {
          font-size: 11px;
          color: #999;
          text-align: left;
        }

        .sara-wa-preview-input {
          display: flex;
          gap: 8px;
          padding: 16px;
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        .sara-wa-preview-input input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 24px;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
        }

        .sara-wa-preview-input input:focus {
          border-color: #00C2A8;
        }

        .sara-wa-preview-input button {
          background: linear-gradient(135deg, #00C2A8, #00d4b8);
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
        }

        .sara-wa-preview-input button:hover {
          transform: scale(1.1);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .sara-wa-widget {
            bottom: 16px;
            ${config.position === 'bottom-right' ? 'right' : 'left'}: 16px;
          }

          .sara-wa-preview {
            width: calc(100vw - 32px);
            bottom: 70px;
          }

          .sara-wa-button {
            padding: 12px 20px;
            font-size: 14px;
          }

          .sara-wa-text {
            display: none;
          }
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  // Toggle chat preview
  window.SARAWhatsApp = {
    toggleChat: function() {
      const preview = document.getElementById('sara-wa-preview');
      if (preview) {
        preview.style.display = preview.style.display === 'none' ? 'block' : 'none';
      }
    },

    sendMessage: function() {
      const input = document.getElementById('sara-wa-input');
      const message = input.value.trim();
      if (message) {
        const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        
        // Track click
        if (typeof gtag !== 'undefined') {
          gtag('event', 'whatsapp_click', {
            event_category: 'engagement',
            event_label: 'WhatsApp Widget',
            message_preview: message.substring(0, 50)
          });
        }
      }
    },

    setLanguage: function(lang) {
      config.language = lang;
      // Could reload widget with new language
    }
  };

  // Initialize widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
