import { removeBackground } from 'https://cdn.jsdelivr.net/npm/@imgly/background-removal/+esm';

// Global variables for the current session
let originalFile = null;
let originalUrl = null;
let transparentBlob = null;
let transparentUrl = null;
let currentBgColor = 'transparent'; // 'transparent' or hex color

// DOM Elements
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const loadingContainer = document.getElementById('loadingContainer');
const progressBarInner = document.getElementById('progressBarInner');
const loadingStatus = document.getElementById('loadingStatus');
const loadingDetails = document.getElementById('loadingDetails');
const editorWorkspace = document.getElementById('editorWorkspace');
const originalPreview = document.getElementById('originalPreview');
const processedPreview = document.getElementById('processedPreview');
const sliderBar = document.getElementById('sliderBar');
const sliderContainer = document.getElementById('sliderContainer');

// Notification helper (from common.js)
const toast = (msg, type) => {
  if (window.showToast) window.showToast(msg, type);
  else console.log(msg, type);
};

// Initialize elements on load
document.addEventListener('DOMContentLoaded', () => {
  setupUploader();
  setupEditor();
  setupSlider();
  initRecentImages();
});

/* Uploader Event Listeners */
function setupUploader() {
  if (!uploadZone) return;

  // Click to open file explorer
  uploadZone.addEventListener('click', () => fileInput.click());

  // Handle file select
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      processInputFile(e.target.files[0]);
    }
  });

  // Drag and drop events
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    uploadZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadZone.classList.remove('dragover');
    }, false);
  });

  uploadZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      processInputFile(files[0]);
    }
  }, false);
}

/* File Validation and Pre-processing */
function processInputFile(file) {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    const isAr = document.documentElement.getAttribute('lang') === 'ar';
    toast(
      isAr ? 'صيغة الملف غير مدعومة! يرجى رفع صورة JPG أو PNG أو WEBP.' : 'Unsupported file format! Please upload a JPG, PNG, or WEBP image.',
      'error'
    );
    return;
  }

  // Set local state
  originalFile = file;
  if (originalUrl) URL.revokeObjectURL(originalUrl);
  originalUrl = URL.createObjectURL(file);
  
  runBackgroundRemoval(file);
}

/* AI Background Removal Processing */
async function runBackgroundRemoval(fileSource) {
  // Show loading container and hide other workspaces
  uploadZone.style.display = 'none';
  editorWorkspace.classList.remove('active');
  loadingContainer.classList.add('active');
  progressBarInner.style.width = '0%';

  const isAr = document.documentElement.getAttribute('lang') === 'ar';

  const texts = {
    model: isAr ? 'جاري تحميل نموذج الذكاء الاصطناعي (أول مرة قد تستغرق دقيقة)...' : 'Loading AI Model (first time may take a minute)...',
    proc: isAr ? 'جاري معالجة الصورة وإزالة الخلفية...' : 'Processing image and removing background...',
    success: isAr ? 'تمت إزالة الخلفية بنجاح!' : 'Background removed successfully!',
    error: isAr ? 'فشلت المعالجة! يرجى تجربة صورة أخرى.' : 'Processing failed! Please try another image.'
  };

  loadingStatus.textContent = texts.model;
  loadingDetails.textContent = '0%';

  try {
    const config = {
      progress: (key, current, total) => {
        // Compute percent
        const percent = Math.round((current / total) * 100);
        progressBarInner.style.width = `${percent}%`;
        loadingDetails.textContent = `${percent}%`;
        
        if (key === 'fetch') {
          loadingStatus.textContent = texts.model;
        } else if (key === 'compute') {
          loadingStatus.textContent = texts.proc;
        }
      }
    };

    // Run the IMG.LY processing
    const blob = await removeBackground(fileSource, config);
    
    transparentBlob = blob;
    if (transparentUrl) URL.revokeObjectURL(transparentUrl);
    transparentUrl = URL.createObjectURL(blob);

    // Setup preview images
    originalPreview.src = originalUrl;
    processedPreview.src = transparentUrl;

    // Reset color to transparent
    currentBgColor = 'transparent';
    applyBackgroundColor('transparent');

    // Reset slider
    resetSlider();

    // Toggle view
    loadingContainer.classList.remove('active');
    editorWorkspace.classList.add('active');
    
    toast(texts.success, 'success');

    // Save to recent list
    saveToRecent(fileSource.name, originalUrl, transparentUrl);
  } catch (err) {
    console.error('Background removal error:', err);
    loadingContainer.classList.remove('active');
    uploadZone.style.display = 'flex';
    toast(texts.error, 'error');
  }
}

/* Before/After Slider Interaction */
function setupSlider() {
  if (!sliderBar || !sliderContainer) return;

  let isDragging = false;

  const startDrag = (e) => {
    isDragging = true;
    e.preventDefault();
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    
    const rect = sliderContainer.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let position = ((clientX - rect.left) / rect.width) * 100;
    
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    
    updateSliderPosition(position);
  };

  sliderBar.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', onDrag);

  sliderBar.addEventListener('touchstart', startDrag);
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('touchmove', onDrag);
}

function updateSliderPosition(percent) {
  sliderBar.style.left = `${percent}%`;
  
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  
  if (isRtl) {
    // Clips from slider to right (original is on the right side)
    originalPreview.style.clipPath = `polygon(${percent}% 0, 100% 0, 100% 100%, ${percent}% 100%)`;
  } else {
    // Clips from left to slider (original is on the left side)
    originalPreview.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
  }
}

function resetSlider() {
  updateSliderPosition(50);
}

/* Editor Panel Controls (Background Colors & Downloads) */
function setupEditor() {
  const colorBtns = document.querySelectorAll('.color-options .color-btn');
  const customColorPicker = document.getElementById('customColorPicker');
  const pickerBtn = document.getElementById('pickerBtn');
  const btnDownload = document.getElementById('btnDownload');
  const btnCopy = document.getElementById('btnCopy');
  const btnShare = document.getElementById('btnShare');
  const btnUploadAnother = document.getElementById('btnUploadAnother');

  // Solid Color Presets
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active classes
      colorBtns.forEach(b => b.classList.remove('active'));
      pickerBtn.classList.remove('active');
      
      btn.classList.add('active');
      const color = btn.getAttribute('data-color');
      currentBgColor = color;
      applyBackgroundColor(color);
    });
  });

  // Custom Color Picker
  if (customColorPicker) {
    customColorPicker.addEventListener('input', (e) => {
      const color = e.target.value;
      currentBgColor = color;
      applyBackgroundColor(color);
      
      // Update picker button color preview
      pickerBtn.style.background = color;
      
      // Mark as active
      colorBtns.forEach(b => b.classList.remove('active'));
      pickerBtn.classList.add('active');
    });
  }

  // Back / Upload Another Button
  if (btnUploadAnother) {
    btnUploadAnother.addEventListener('click', () => {
      editorWorkspace.classList.remove('active');
      uploadZone.style.display = 'flex';
      fileInput.value = '';
    });
  }

  // Download Trigger
  if (btnDownload) {
    btnDownload.addEventListener('click', () => downloadEditedImage());
  }

  // Copy Link / Copy Image
  if (btnCopy) {
    btnCopy.addEventListener('click', () => copyToClipboard());
  }

  // Share Sheet
  if (btnShare) {
    btnShare.addEventListener('click', () => shareImage());
  }
}

function applyBackgroundColor(color) {
  const bgEl = document.getElementById('previewBackground');
  if (!bgEl) return;
  
  if (color === 'transparent') {
    bgEl.style.background = '';
    bgEl.classList.add('transparent-pattern');
  } else {
    bgEl.classList.remove('transparent-pattern');
    bgEl.style.backgroundColor = color;
    bgEl.style.backgroundImage = 'none';
  }
}

/* Download Merged Canvas */
async function downloadEditedImage() {
  const isAr = document.documentElement.getAttribute('lang') === 'ar';
  
  try {
    toast(isAr ? 'جاري تحضير التحميل...' : 'Preparing download...', 'info');

    // Create an image element to load the transparent blob
    const img = new Image();
    img.src = transparentUrl;
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Create offscreen canvas matching natural size
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    // Fill background color if it's not transparent
    if (currentBgColor !== 'transparent') {
      ctx.fillStyle = currentBgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw the processed subject image on top
    ctx.drawImage(img, 0, 0);

    // Save as transparent PNG or solid color image
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    
    // Create friendly file name
    const baseName = originalFile ? originalFile.name.substring(0, originalFile.name.lastIndexOf('.')) : 'bg-remover';
    a.download = `${baseName}_no_bg.png`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast(isAr ? 'تم تحميل الصورة!' : 'Image downloaded!', 'success');
  } catch (err) {
    console.error('Download error:', err);
    toast(isAr ? 'فشل تحميل الصورة!' : 'Failed to download image!', 'error');
  }
}

/* Share & Copy Utilities */
async function copyToClipboard() {
  const isAr = document.documentElement.getAttribute('lang') === 'ar';
  try {
    // Generate the blob from offscreen canvas to copy directly to clipboard
    const img = new Image();
    img.src = transparentUrl;
    await new Promise((resolve) => img.onload = resolve);

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    if (currentBgColor !== 'transparent') {
      ctx.fillStyle = currentBgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]);
        toast(isAr ? 'تم نسخ الصورة إلى الحافظة!' : 'Copied image to clipboard!', 'success');
      } catch (e) {
        // Fallback: Copy transparent URL link
        await navigator.clipboard.writeText(window.location.href);
        toast(isAr ? 'تم نسخ رابط الموقع للمشاركة!' : 'Copied website link to share!', 'success');
      }
    }, 'image/png');
  } catch (err) {
    console.error('Clipboard copy error:', err);
    toast(isAr ? 'فشل النسخ!' : 'Copy failed!', 'error');
  }
}

async function shareImage() {
  const isAr = document.documentElement.getAttribute('lang') === 'ar';
  
  if (navigator.share) {
    try {
      const img = new Image();
      img.src = transparentUrl;
      await new Promise((resolve) => img.onload = resolve);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');

      if (currentBgColor !== 'transparent') {
        ctx.fillStyle = currentBgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'remove_bg_result.png', { type: 'image/png' });
        try {
          await navigator.share({
            title: 'Remove Background AI',
            text: isAr ? 'قمت بإزالة خلفية الصورة باستخدام هذا الموقع الرائع!' : 'I removed the background of my image using this awesome AI tool!',
            files: [file]
          });
          toast(isAr ? 'تمت المشاركة بنجاح!' : 'Shared successfully!', 'success');
        } catch (shareErr) {
          // User cancelled or share failed
        }
      }, 'image/png');
    } catch (err) {
      fallbackShare(isAr);
    }
  } else {
    fallbackShare(isAr);
  }
}

function fallbackShare(isAr) {
  navigator.clipboard.writeText(window.location.href);
  toast(isAr ? 'تم نسخ رابط الموقع للمشاركة!' : 'Web Share API not supported. Copied website link to share!', 'info');
}

/* IndexedDB Storage for Recent Files (History) */
const DB_NAME = 'RemoveBgAI_DB';
const DB_VERSION = 1;
const STORE_NAME = 'recent_images';

let db = null;

function initRecentImages() {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  
  request.onerror = (event) => {
    console.warn('Database error:', event.target.errorCode);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    displayRecentImages();
  };

  request.onupgradeneeded = (event) => {
    const dbInstance = event.target.result;
    dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  };

  // Add click listener to clear button
  const clearBtn = document.getElementById('clearRecent');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => clearAllRecent());
  }
}

function saveToRecent(fileName, origUrl, transUrl) {
  if (!db) return;

  // We convert Blobs to canvas DataURLs for persistent IndexedDB storage
  // IndexedDB stores blobs natively, which is cleaner
  fetch(origUrl)
    .then(r => r.blob())
    .then(origBlob => {
      fetch(transUrl)
        .then(r => r.blob())
        .then(transBlob => {
          const transaction = db.transaction([STORE_NAME], 'readwrite');
          const store = transaction.objectStore(STORE_NAME);

          const newItem = {
            fileName: fileName,
            originalBlob: origBlob,
            transparentBlob: transBlob,
            timestamp: Date.now()
          };

          // Get existing items to cap at 5
          const getRequest = store.getAll();
          getRequest.onsuccess = () => {
            const items = getRequest.result;
            // Sort by timestamp asc
            items.sort((a, b) => a.timestamp - b.timestamp);

            if (items.length >= 5) {
              // Delete oldest
              store.delete(items[0].id);
            }
            
            store.add(newItem);
            transaction.oncomplete = () => {
              displayRecentImages();
            };
          };
        });
    });
}

function displayRecentImages() {
  if (!db) return;

  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const getRequest = store.getAll();

  getRequest.onsuccess = () => {
    const items = getRequest.result;
    // Sort by timestamp desc (newest first)
    items.sort((a, b) => b.timestamp - a.timestamp);

    const container = document.getElementById('recentGrid');
    const section = document.getElementById('recentImagesSection');
    
    if (!container || !section) return;

    if (items.length === 0) {
      section.classList.remove('active');
      return;
    }

    section.classList.add('active');
    container.innerHTML = '';

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'recent-item';
      
      const img = document.createElement('img');
      // Create Object URL from stored blob
      const objectUrl = URL.createObjectURL(item.transparentBlob);
      img.src = objectUrl;
      img.alt = item.fileName;
      img.title = item.fileName;

      div.appendChild(img);
      
      // Load recent item into editor on click
      div.addEventListener('click', () => {
        if (originalUrl) URL.revokeObjectURL(originalUrl);
        if (transparentUrl) URL.revokeObjectURL(transparentUrl);

        originalUrl = URL.createObjectURL(item.originalBlob);
        transparentUrl = URL.createObjectURL(item.transparentBlob);

        originalPreview.src = originalUrl;
        processedPreview.src = transparentUrl;

        originalFile = new File([item.originalBlob], item.fileName, { type: item.originalBlob.type });

        currentBgColor = 'transparent';
        applyBackgroundColor('transparent');
        resetSlider();

        uploadZone.style.display = 'none';
        loadingContainer.classList.remove('active');
        editorWorkspace.classList.add('active');

        const isAr = document.documentElement.getAttribute('lang') === 'ar';
        toast(isAr ? 'تم تحميل الصورة السابقة!' : 'Loaded recent image!', 'success');
      });

      container.appendChild(div);
    });
  };
}

function clearAllRecent() {
  if (!db) return;

  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const clearRequest = store.clear();

  clearRequest.onsuccess = () => {
    displayRecentImages();
    const isAr = document.documentElement.getAttribute('lang') === 'ar';
    toast(isAr ? 'تم مسح تاريخ الصور!' : 'Cleared history!', 'success');
  };
}
