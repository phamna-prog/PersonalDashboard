const demoStates = {
  identity: {
    titleVi: 'Tôi là sinh viên Quản trị kinh doanh, đang học Logistics.',
    titleZh: '我是一名工商管理专业学生，正在学习物流。',
    bodyVi: 'Agent đưa nội dung đã xác nhận vào khu lời chào, không thêm thông tin ngoài phần bạn cung cấp.',
    bodyZh: '智能体将已确认的内容放入问候区，不添加你未提供的信息。',
    resultVi: 'Đã sẵn sàng đưa vào bản xem trước', resultZh: '已准备好加入页面预览'
  },
  metrics: {
    titleVi: 'Bốn thẻ cần số hiện tại và mục tiêu rõ ràng.',
    titleZh: '四张数据卡需要明确的当前值与目标值。',
    bodyVi: 'Hai số phải cùng kiểu đơn vị. Nếu một chi tiết thiếu, Agent để trống và ghi lại thay vì tự đặt số.',
    bodyZh: '当前值与目标值的单位类型必须一致。缺少某个细节时，智能体会留空并记录，而不是自行编造。',
    resultVi: 'Mẫu minh họa lấy từ trang hiện tại', resultZh: '示例内容取自现有页面'
  },
  missing: {
    titleVi: 'Thiếu dữ liệu? Agent không đoán thay bạn.',
    titleZh: '数据缺失？智能体不会替你猜测。',
    bodyVi: 'Thiếu chi tiết thì để trống trong trang và liệt kê ở phần bàn giao. Thiếu toàn bộ một nhóm thì dừng để hỏi.',
    bodyZh: '缺少细节时，页面留空并在交接中列出。整组信息缺失时，智能体会暂停并询问。',
    resultVi: 'Bạn luôn kiểm tra trước khi dùng', resultZh: '使用前由你确认'
  }
};

const demoPanel = document.querySelector('#demo-panel');
document.querySelectorAll('[data-demo]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-demo]').forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('is-selected', active);
      tab.setAttribute('aria-selected', String(active));
    });
    const data = demoStates[button.dataset.demo];
    if (!data) return;
    demoPanel.innerHTML = `<div class="demo-kicker">DEMO INPUT · 示例输入</div>
      <h3><span class="vi">${data.titleVi}</span><span class="zh">${data.titleZh}</span></h3>
      <p><span class="vi">${data.bodyVi}</span><span class="zh">${data.bodyZh}</span></p>
      <div class="demo-result"><span>✓</span><span class="vi">${data.resultVi}</span><span class="zh">${data.resultZh}</span></div>`;
  });
});

const languageButton = document.querySelector('.language-toggle');
languageButton.addEventListener('click', () => {
  const body = document.body;
  const next = body.classList.contains('lang-both') ? 'lang-vi' : body.classList.contains('lang-vi') ? 'lang-zh' : 'lang-both';
  body.classList.remove('lang-both', 'lang-vi', 'lang-zh');
  body.classList.add(next);
  languageButton.textContent = next === 'lang-both' ? 'VI / 中' : next === 'lang-vi' ? 'VI' : '中文';
});

const sideLinks = [...document.querySelectorAll('.side-link[href^="#"]')];
const bottomLinks = [...document.querySelectorAll('.bottom-link[href^="#"]')];
const observedSections = [...new Set([...sideLinks, ...bottomLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean))];

const setActive = (sectionId) => {
  sideLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${sectionId}`));
  bottomLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${sectionId}`));
};

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(visible.target.id);
}, {rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6]});
observedSections.forEach((section) => observer.observe(section));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) setActive(target.id);
  });
});
