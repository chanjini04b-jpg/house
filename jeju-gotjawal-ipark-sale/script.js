//
// script.js
// 모든 동적인 기능(갤러리, 필터, 모달)을 정의합니다.
//

// 🚨 중요: 실제 사용 시 'images/...' 경로는 아파트 사진이 저장된 실제 경로로 변경해야 합니다.
// 그리고 010-XXXX-XXXX 연락처를 실제 번호로 변경해야 합니다.
const allImages = [
    // 1.평면도
    { src: 'images/1.평면도/1249441202101111635083173130111163508629000000.jpg', tag: '평면도: 전체 구조', category: '평면도' },
    { src: 'images/1.평면도/1249441202101111635093191200111163509690000000.jpg', tag: '평면도: 세부 구조', category: '평면도' },
    { src: 'images/1.평면도/photoinfra_1557996399645.jpg', tag: '평면도: 기타 도면', category: '평면도' },
    // 2.아파트 외관 풍경
    { src: 'images/2.out/KakaoTalk_20251031_124528760.jpg', tag: '아파트 외관: 전경', category: '외관' },
    { src: 'images/2.out/KakaoTalk_20251031_124528760_01.jpg', tag: '아파트 외관: 입구', category: '외관' },
    { src: 'images/2.out/KakaoTalk_20251031_124528760_10.jpg', tag: '아파트 외관: 측면', category: '외관' },
    { src: 'images/2.out/KakaoTalk_20251031_124528760_11.jpg', tag: '아파트 외관: 야경', category: '외관' },
    { src: 'images/2.out/KakaoTalk_20251031_141512830.jpg', tag: '아파트 외관: 주차장', category: '외관' },
    { src: 'images/2.out/KakaoTalk_20251031_141520702.jpg', tag: '아파트 외관: 단지 내부', category: '외관' },
    // 3.거실겸 주방
    { src: 'images/3.거실겸 주방/KakaoTalk_20251031_124528760_04.jpg', tag: '거실: 넓은 공간', category: '거실겸 주방' },
    { src: 'images/3.거실겸 주방/KakaoTalk_20251031_124528760_05.jpg', tag: '거실: 햇살 가득', category: '거실겸 주방' },
    { src: 'images/3.거실겸 주방/KakaoTalk_20251031_124528760_06.jpg', tag: '주방: 최신 빌트인', category: '거실겸 주방' },
    { src: 'images/3.거실겸 주방/KakaoTalk_20251031_141217099.jpg', tag: '거실: 소파 공간', category: '거실겸 주방' },
    { src: 'images/3.거실겸 주방/KakaoTalk_20251031_141233282.jpg', tag: '주방: 조리대', category: '거실겸 주방' },
    { src: 'images/3.거실겸 주방/KakaoTalk_20251031_141309567.jpg', tag: '거실: TV 공간', category: '거실겸 주방' },
    // 4.안방과 드레스룸
    { src: 'images/3.안방 드레스룸/KakaoTalk_20251031_124528760_07.jpg', tag: '안방: 드레스룸 포함', category: '안방 드레스룸' },
    { src: 'images/3.안방 드레스룸/KakaoTalk_20251031_124528760_08.jpg', tag: '안방: 넓은 공간', category: '안방 드레스룸' },
    { src: 'images/3.안방 드레스룸/KakaoTalk_20251031_141325009.jpg', tag: '드레스룸: 수납공간', category: '안방 드레스룸' },
    { src: 'images/3.안방 드레스룸/KakaoTalk_20251031_141332572.jpg', tag: '안방: 창문', category: '안방 드레스룸' },
    { src: 'images/3.안방 드레스룸/KakaoTalk_20251031_141352339.jpg', tag: '드레스룸: 전신거울', category: '안방 드레스룸' },
    { src: 'images/3.안방 드레스룸/KakaoTalk_20251031_141402570.jpg', tag: '안방: 침대 공간', category: '안방 드레스룸' },
    { src: 'images/3.안방 드레스룸/KakaoTalk_20251031_141416194.jpg', tag: '드레스룸: 옷장', category: '안방 드레스룸' },
    // 5.작은방 2개
    { src: 'images/4.작은방/KakaoTalk_20251031_124528760_03.jpg', tag: '작은방: 자녀방/서재', category: '작은방' },
    // 6.화장실 2개
    { src: 'images/5.화장실/KakaoTalk_20251031_124528760_02.jpg', tag: '화장실1: 메인 욕실', category: '화장실' },
    { src: 'images/5.화장실/KakaoTalk_20251031_124528760_09.jpg', tag: '화장실2: 게스트 욕실', category: '화장실' },
    { src: 'images/5.화장실/KakaoTalk_20251031_141426579.jpg', tag: '화장실: 세면대', category: '화장실' },
    // 7.베란다(바베큐가능)
    { src: 'images/6.베란다/KakaoTalk_20251031_141452034.jpg', tag: '베란다: 바베큐 가능', category: '베란다' },
    // 8.부대시설
    { src: 'images/7.부대시설/1739843880707037.jpg', tag: '부대시설: 커뮤니티', category: '부대시설' },
    { src: 'images/7.부대시설/1739843880929173.jpg', tag: '부대시설: 피트니스', category: '부대시설' },
    { src: 'images/7.부대시설/1739843881158281.jpg', tag: '부대시설: 실내 놀이터', category: '부대시설' },
    { src: 'images/7.부대시설/1739843881404930.jpg', tag: '부대시설: 기타 시설', category: '부대시설' },
    { src: 'images/7.부대시설/KakaoTalk_20251031_141530682.jpg', tag: '부대시설: 라운지', category: '부대시설' },
    { src: 'images/7.부대시설/KakaoTalk_20251031_141541288.jpg', tag: '부대시설: 주차장', category: '부대시설' }
];

let currentImageIndex = 0;
let filteredImages = allImages;

// DOM 요소 가져오기
const currentImageElement = document.getElementById('current-image');
const imageTagElement = document.getElementById('image-tag');
const currentIndexElement = document.getElementById('current-index');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const filterButtonsContainer = document.getElementById('filter-buttons');
const contactModal = document.getElementById('contact-modal');

// --- 갤러리 로직 ---
// 장소별 갤러리(폴더별 썸네일 그리드) 렌더링
function renderGalleryGrid() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    // 카테고리별 그룹화
    const grouped = {};
    allImages.forEach(img => {
        if (!grouped[img.category]) grouped[img.category] = [];
        grouped[img.category].push(img);
    });
    Object.keys(grouped).forEach(category => {
        grouped[category].forEach(img => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-md overflow-hidden flex flex-col';
            card.innerHTML = `
                <img src="${img.src}" alt="${img.tag}" class="w-full h-40 object-cover">
                <div class="p-3 flex-1 flex flex-col justify-between">
                    <span class="text-sm font-bold text-jeju-green mb-2">${category}</span>
                    <span class="text-xs text-gray-700">${img.tag}</span>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    });
}

function updateSlider() {
    if (filteredImages.length === 0) {
        currentImageElement.src = '';
        imageTagElement.value = '선택된 카테고리에 사진이 없습니다.';
        currentIndexElement.textContent = '0 / 0';
        return;
    }

    const image = filteredImages[currentImageIndex];
    
    // 이미지 전환 효과 (심플하게 opacity 사용)
    currentImageElement.style.opacity = '0'; 
    setTimeout(() => {
        currentImageElement.src = image.src;
        currentImageElement.style.opacity = '1';
    }, 200);

    imageTagElement.value = image.tag; 
    currentIndexElement.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
}

function changeSlide(direction) {
    currentImageIndex = (currentImageIndex + direction + filteredImages.length) % filteredImages.length;
    updateSlider();
}

function createFilterButtons() {
    // 모든 이미지의 카테고리를 추출하고 'all'을 추가
    const categories = ['all', ...new Set(allImages.map(img => img.category))]; 
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category === 'all' ? '전체' : category.charAt(0).toUpperCase() + category.slice(1);
        
        // Tailwind 클래스는 HTML에서 미리 정의해 두었으므로, CSS 클래스만 동적으로 관리
        button.className = 'filter-btn px-4 py-2 text-sm rounded-full font-semibold transition bg-gray-200 text-gray-700 hover:bg-gray-300';
        button.dataset.category = category;
        
        button.addEventListener('click', () => filterImages(category));
        filterButtonsContainer.appendChild(button);
    });
    // 초기화: '전체' 카테고리 필터링
    filterImages('all'); 
}

function filterImages(category) {
    // 버튼 활성화/비활성화 스타일 업데이트
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('bg-jeju-green', 'text-white');
            btn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        } else {
            btn.classList.remove('bg-jeju-green', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        }
    });

    // 이미지 배열 필터링
    if (category === 'all') {
        filteredImages = allImages;
    } else {
        filteredImages = allImages.filter(img => img.category === category);
    }

    currentImageIndex = 0; // 필터 변경 시 첫 이미지로 이동
    updateSlider();
}

// 이벤트 리스너 연결
prevBtn.addEventListener('click', () => changeSlide(-1));
nextBtn.addEventListener('click', () => changeSlide(1));

// 초기화 함수 실행
createFilterButtons();
renderGalleryGrid();

// --- 모달 로직 ---

/**
 * 상담 모달을 표시하거나 숨깁니다.
 * @param {boolean} show - true면 표시, false면 숨김.
 */
function toggleModal(show) {
    if (show) {
        contactModal.classList.remove('hidden');
        document.body.classList.add('no-scroll'); 
    } else {
        contactModal.classList.add('hidden');
        document.body.classList.remove('no-scroll'); 
    }
}