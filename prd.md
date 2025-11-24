# 🛠️ PRODUCT REQUIREMENTS DOCUMENT (PRD) - SignSpace

## 1. Teknik Mimari (Tech Stack)
- **Platform:** Meta Horizon OS (Android)  
- **Core Framework:** React Native (v0.73+)  
- **XR Template:** @metaspatial/react-native-template  
- **3D Engine:** React Three Fiber (R3F) - 3D El Modeli renderlamak için  
- **AI Vision:** Python Backend (FastAPI + YOLO/Gemini) veya On-device ML (TensorFlow Lite)  
- **Dataset Tool:** Google MediaPipe (Python Script)  

---

## 2. Müfredat Yapısı (15 Kelime - 5 Seviye)
Sistem, JSON formatındaki veri setlerini okuyarak çalışır.

**Seviye 1: Evrensel (Universal)**  
- Hello (Merhaba)  
- Yes (Evet - Yumruk sallama)  
- No (Hayır)  

**Seviye 2: Nezaket (Social)**  
- Please (Lütfen - Göğüste daire)  
- Thank You (Teşekkürler - Çeneden öne)  
- Good (İyi/Beğeni - Thumbs Up)  

**Seviye 3: İhtiyaçlar (Needs)**  
- Water (Su - 'W' çenede)  
- Help (Yardım - Thumbs up avuç içinde)  
- Home (Ev - O harfi düzleşmiş)  

**Seviye 4: Harfler (Alphabet)**  
- A (Yumruk)  
- B (Açık el)  
- L (L işareti)  

**Seviye 5: Duygular (Emotions)**  
- Love (Sevgi - Göğüste çapraz eller)  
- Happy (Mutlu)  
- Sad (Üzgün)  

---

## 3. Özellik Detayları & Mantık

### 3.1. Ghost Hand Engine (3D El Oynatıcı)
- **Girdi:** `gesture_data.json` (MediaPipe'ten gelen parmak eklem açıları)  
- **İşlem:** React Three Fiber içindeki SkinnedMesh (Rigged Hand Model). JSON'daki koordinatlar, modelin `Bone.rotation` değerlerine map edilir.  
- **Çıktı:** 3D el modeli, pürüzsüz bir animasyonla (Spring Animation) hedef şekli alır.  

### 3.2. Pose Comparison Logic (Karşılaştırma Motoru)
- **Sıklık:** Her 100ms'de bir kontrol (Performans optimizasyonu)  
- **Yöntem:**  
  1. Kullanıcının elindeki 21 noktanın (Joints) vektörlerini al  
  2. Hedef JSON'daki vektörlerle karşılaştır (Cosine Similarity veya Euclidean Distance)  
- **Threshold:** Benzerlik > %85 ise → **SUCCESS**  
- **UI:** Benzerlik %50 iken el "Mavi", %85 üstü olunca "Yeşil" yanar  

### 3.3. Snap & Sign (Passthrough AI)
- **Trigger:** Kullanıcı "Scan" butonuna basar  
- **Process:**  
  1. `react-native-vision-camera` ile anlık kare (frame) yakalanır  
  2. Görüntü Base64 olarak Backend'e gönderilir  
  3. Backend (AI): "Bu resimde ne var?" → Cevap: "Water Bottle"  
  4. App: `gestures/water.json` dosyasını yükler ve Ghost Hand'e oynatır  

---

## 4. Varlıklar (Assets)
- **3D Hand Model:** .glb formatında, "Rigged" (Kemik yapısı olan) sade bir el modeli  
- **Sound Effects:**  
  - `success_chime.mp3` (Zen çan sesi)  
  - `hover_click.wav` (Yumuşak tık)  
  - `scan_sound.wav` (Fütüristik tarama sesi)  

---

## 5. Performans Kriterleri
- React Native Bridge trafiği minimize edilmeli (Animasyonlar Native Driver veya Reanimated ile yapılmalı)  
- Passthrough gecikmesi olmamalı
