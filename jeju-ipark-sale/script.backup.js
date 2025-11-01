// 장소별 갤러리 렌더링
function renderGallery() {
	const galleryContainer = document.getElementById('gallery-grid');
	if (!galleryContainer) return;
	let html = '';
	sliderImages.forEach((img, i) => {
			if (img === 'map.png') return;
			const savedTag = localStorage.getItem('galleryTag_' + img) || '';
			// 태그 뱃지 생성
			const tagArr = savedTag.split(',').map(t => t.trim()).filter(t => t);
			let tagBadges = '';
			if (tagArr.length) {
				tagBadges = `<div class="gallery-tags">${tagArr.map(tag => `<span class="gallery-tag-badge">${tag}</span>`).join('')}</div>`;
			}
			html += `
				<div class="gallery-card">
					<img src="images/${img}" alt="이미지 ${i+1}" class="gallery-thumb" data-img="${img}" tabindex="0" onerror="this.style.display='none';console.error('갤러리 이미지 로드 실패:', this.src)">
					<input type="text" class="gallery-tag" placeholder="태그 입력(쉼표로 구분)" value="${savedTag}" data-img="${img}">
					${tagBadges}
				</div>
			`;
	});
	galleryContainer.innerHTML = html;

	// 태그 입력값 저장 및 뱃지 실시간 갱신
	galleryContainer.querySelectorAll('.gallery-tag').forEach(tagInput => {
		tagInput.addEventListener('input', e => {
			localStorage.setItem('galleryTag_' + tagInput.dataset.img, tagInput.value);
			// 태그 뱃지 실시간 갱신
			const card = tagInput.closest('.gallery-card');
			const tagArr = tagInput.value.split(',').map(t => t.trim()).filter(t => t);
			let tagBadges = '';
			if (tagArr.length) {
				tagBadges = `<div class="gallery-tags">${tagArr.map(tag => `<span class="gallery-tag-badge">${tag}</span>`).join('')}</div>`;
			}
			// 기존 뱃지 영역 제거 후 새로 추가
			const oldBadges = card.querySelector('.gallery-tags');
			if (oldBadges) oldBadges.remove();
			if (tagBadges) card.insertAdjacentHTML('beforeend', tagBadges);
		});
	});

	// 갤러리 모달 생성 및 이벤트
	let modal = document.getElementById('gallery-modal');
	if (!modal) {
		modal = document.createElement('div');
		modal.id = 'gallery-modal';
		modal.className = 'hidden';
		modal.innerHTML = `
			<div id="gallery-modal-content">
				<img id="gallery-modal-img" src="" alt="갤러리 확대 이미지">
				<button id="gallery-modal-close">닫기</button>
			</div>
		`;
		document.body.appendChild(modal);
	}
	const modalImg = document.getElementById('gallery-modal-img');
	const modalClose = document.getElementById('gallery-modal-close');
	galleryContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
		thumb.onclick = () => {
			modal.classList.remove('hidden');
			modalImg.src = `images/${thumb.dataset.img}`;
			modalImg.alt = thumb.alt;
		};
		thumb.onkeydown = e => {
			if (e.key === 'Enter' || e.key === ' ') {
				thumb.onclick();
			}
		};
	});
	modalClose.onclick = () => {
		modal.classList.add('hidden');
		modalImg.src = '';
	};
	modal.onclick = e => {
		if (e.target === modal) {
			modal.classList.add('hidden');
			modalImg.src = '';
		}
	};
}

// 지도 이미지 렌더링 (map.png)
function renderMap() {
	const mapImg = document.getElementById('map-image');
	if (mapImg) {
		mapImg.src = 'images/map.png';
		mapImg.alt = '제주 곶자왈아이파크 위치 지도';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	renderSlider();
	renderGallery();
	renderMap();
});

// images 폴더 내 모든 jpg 파일을 자동으로 슬라이더/갤러리 이미지로 사용
function getImageList() {
	return [
		'amenities1.jpg', 'amenities2.jpg', 'amenities4.jpg', 'amenities5.jpg', 'amenities6.jpg',
		'amenities7.jpeg', 'amenities8.jpg',
		'apartmet flat1.jpg', 'apartmet flat2.jpg',
		'bathroom1.jpg', 'bathroom2.jpg', 'bathroom3.jpg',
		'dressroom1.jpg', 'dressroom2.jpg', 'dressroom3.jpg', 'dressroom4.jpg', 'dressroom5.jpg', 'dressroom6.jpg',
		'kitchen1.jpg', 'kitchen2.jpg', 'kitchen3.jpg', 'kitchen4.jpg',
		'layout1.jpg', 'layout2.jpg', 'layout3.jpg',
		'livingroom1.jpg', 'livingroom2.jpg', 'livingroom3.jpg', 'livingroom4.jpg',
		'livingroom5.jpg', 'livingroom6.jpg', 'livingroom7.jpg', 'livingroom8.jpg',
		'map.png', 'pantry.jpg', 'parking lot entryway.jpg',
		'room1.jpg', 'room2.jpg', 'room3.jpg',
		'the exterior of an apartment1.jpg', 'the exterior of an apartment2.jpg',
		'the exterior of an apartment3.jpg', 'the exterior of an apartment4.jpg',
		'the exterior of an apartment5.jpg', 'the exterior of an apartment6.jpg', 'the exterior of an apartment7.jpg',
		'veranda.jpg', 'veranda2.jpg'
	];
}

const sliderImages = getImageList().filter(name => name.match(/\.jpg$/i));

function renderSlider() {
	const imgEl = document.getElementById('current-image');
	const prevBtn = document.getElementById('prev-btn');
	const nextBtn = document.getElementById('next-btn');
	const idxEl = document.getElementById('current-index');
	const thumbBar = document.getElementById('slider-thumbnails');
	if (!imgEl || !prevBtn || !nextBtn || !idxEl) return;

	let current = 0;
	let timer = null;

	// 썸네일 바 생성
	if (thumbBar) {
		let thumbs = '';
		sliderImages.forEach((img, i) => {
			thumbs += `<img src="images/${img}" class="slider-thumb" data-idx="${i}" style="width:48px;height:48px;object-fit:cover;margin:2px;border-radius:6px;cursor:pointer;opacity:${i===current?1:0.5};border:${i===current?'2px solid #22c55e':'2px solid #eee'}">`;
		});
		thumbBar.innerHTML = thumbs;
		Array.from(thumbBar.children).forEach(thumb => {
			thumb.onclick = () => {
				current = parseInt(thumb.dataset.idx);
				show(current);
				resetTimer();
			};
		});
	}

	function show(idx) {
		imgEl.style.opacity = 0;
		setTimeout(() => {
			imgEl.src = `images/${sliderImages[idx]}`;
			imgEl.alt = `실사진 슬라이드 ${idx+1}`;
			idxEl.textContent = `${idx+1} / ${sliderImages.length}`;
			imgEl.style.opacity = 1;
			// 썸네일 하이라이트
			if (thumbBar) {
				Array.from(thumbBar.children).forEach((thumb, i) => {
					thumb.style.opacity = i===idx ? 1 : 0.5;
					thumb.style.border = i===idx ? '2px solid #22c55e' : '2px solid #eee';
				});
			}
		}, 200);
	}
	show(current);
	prevBtn.onclick = () => {
		current = (current - 1 + sliderImages.length) % sliderImages.length;
		show(current);
		resetTimer();
	};
	nextBtn.onclick = () => {
		current = (current + 1) % sliderImages.length;
		show(current);
		resetTimer();
	};
	function resetTimer() {
		if (timer) clearInterval(timer);
		timer = setInterval(() => {
			current = (current + 1) % sliderImages.length;
			show(current);
		}, 3500);
	}
	resetTimer();
}
