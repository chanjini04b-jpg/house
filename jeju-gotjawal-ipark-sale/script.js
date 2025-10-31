/* script.js 파일: CTA 버튼의 기능을 강화하고 스크롤 이벤트를 개선 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 전화번호 클릭 추적 (실제 서비스에서는 Google Analytics 같은 추적 코드를 사용)
    const phoneCtaButtons = document.querySelectorAll('a[href^="tel:"]');
    phoneCtaButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('전화 문의 버튼 클릭됨');
            // 여기에 실제 매매 전환 추적 코드를 넣을 수 있습니다.
        });
    });

    // 2. 스크롤에 따른 CTA 바 (Sticky Bar) 구현 (선택 사항: 모바일에서 전환율 높이는 핵심 기능)
    const body = document.body;
    const stickyCta = document.createElement('div');
    stickyCta.className = 'sticky-cta-bar';
    stickyCta.innerHTML = '<a href="tel:010-XXXX-XXXX">📞 시세 이하 **매매 5억!** 지금 전화하기</a>';
    body.appendChild(stickyCta);

    // 3. 스타일시트(`styles.css`)에 `.sticky-cta-bar` 스타일 추가 요청
    // (CSS 프롬프트는 4단계에서 요청)
});