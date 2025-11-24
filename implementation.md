# 📅 10 GÜNLÜK "CRUNCH MODE" PLAN: SignSpace

Bu plan, 18 günlük süreci 10 güne sıkıştırılmış, teknik detayları artırılmış ve "ne yapılacak" sorusunu ortadan kaldıran agresif bir yol haritasıdır.

---

## 🟢 GÜN 1: Veri ve Temel (The Data Foundation)
**Hedef:** Projeyi ayağa kaldırmak ve El Hareketlerini Sayısallaştırmak.

- **09:00 - Kurulum:**
  ```bash
  npx react-native init SignSpace --template @metaspatial/react-native-template
  ```

- **13:00 - Veri Madenciliği (MediaPipe):**  
  - Masaüstünde `dataset_images` klasörü oluştur.  
  - Planlanan 15 kelimenin (Hello, Water, Love, vb.) beyaz arka planlı net fotoğraflarını indir.  
  - `converter_batch.py` scriptini çalıştır.  
  - JSON dosyalarını aç ve z değerlerinin -0.1 ile 0.1 arasında mantıklı olduğundan emin ol.

---

## 🟢 GÜN 2: Sahne ve Passthrough (The Stage)
**Hedef:** Gerçek dünyayı uygulamanın içine almak.

- **10:00 - Passthrough Ayarı:**  
  - `App.js` veya ana bileşeninde arka plan rengini transparent yap.  
  - `AndroidManifest.xml` içine şu satırı ekle:  
    ```xml
    <uses-feature android:name="com.oculus.feature.PASSTHROUGH" android:required="true" />
    ```

- **14:00 - 3D Motoru (R3F):**  
  - `three`, `@react-three/fiber`, `@react-three/drei` paketlerini kur.  
  - Ekrana basit bir `<Box />` bileşeni yerleştir.  
  - Uygulamayı çalıştır: Odanı görmeli ve ortasında havada asılı bir küp olmalı.

---

## 🟡 GÜN 3: Hayalet El (The Ghost Hand Engine)
**Hedef:** JSON verisini 3D modele dönüştürmek.

- **09:00 - Model Entegrasyonu:**  
  - Sketchfab'dan "Low Poly Rigged Hand" (.glb formatında) indir ve `assets/models/hand.glb` yoluna koy.  
  - React bileşeninde modeli yükle:  
    ```javascript
    const { nodes, materials } = useGLTF(require('./assets/models/hand.glb'))
    ```

- **14:00 - Rigging Mantığı:**  
  - `useEffect` içinde `gestures/hello.json` dosyasını oku.  
  - JSON'daki her parmak için modelin kemiklerine rotasyon uygula.  
  - İpucu: Eğer zor gelirse, kemikleri bükmek yerine JSON noktalarına küçük küreler (Spheres) koyarak "Nokta Bulutu" oluştur.

---

## 🟡 GÜN 4: Sensör Bağlantısı (Sensor Hookup)
**Hedef:** Kullanıcının ellerini canlı izlemek.

- **10:00 - Veri Akışı:**  
  - `useHandTracking()` hook'unu kullan.  
  - `console.log(handData.joints.index_tip.position)` ile verinin aktığını kontrol et.

- **15:00 - Debug Görselleştirme:**  
  - Kullanıcının 21 parmak eklem noktasına küçük mavi küreler yerleştir.  
  - El hareketlerini test et, gecikme olup olmadığını gözlemle.

---

## 🟡 GÜN 5: Karşılaştırma Motoru (The Brain)
**Hedef:** "Doğru Yaptın" geri bildirimi verebilmek.

- **09:00 - Algoritma:**  
  - `calculateSimilarity(userJoints, targetJoints)` fonksiyonunu yaz.  
  - Sadece parmak uçlarına odaklan (Baş parmak, İşaret, Orta, Yüzük, Serçe).  
  - Her parmak ucu için Euclidean Distance hesapla.  
  - 5 parmağın ortalama sapmasını bul.

- **14:00 - Threshold Tuning:**  
  - "Merhaba" işaretini yap ve hata payını gözlemle.  
  - Eşik değeri ayarla: `if error < 0.1 then SUCCESS`.

---

## 🔴 GÜN 6: Oyunlaştırma ve UI (Gamification)
**Hedef:** Deneyimi eğlenceli ve anlaşılır hale getirmek.

- **10:00 - Geri Bildirim:**  
  - SUCCESS → Ghost Hand rengi `"green"`.  
  - Başarısız → Renk `"white"` kalsın.

- **15:00 - Medikal UI:**  
  - Cam görünümlü (Glassmorphism) panel oluştur.  
  - Üstte: `"Current Word: WATER"`  
  - Altta: `"Accuracy: %85"`  
  - Yanlarda: "Next / Previous" el ile tıklanabilir.

---

## 🔴 GÜN 7: Yapay Zeka Gözü (Snap & Sign)
**Hedef:** Masadaki nesneyi tanımak.

- **09:00 - Kamera Erişimi:**  
  - `react-native-vision-camera` kur.  
  - "Scan" butonuna basınca `takePhoto()` çalıştır ve Base64 al.

- **14:00 - AI API:**  
  - Fotoğrafı OpenAI GPT-4o veya Google Gemini API'ye gönder.  
  - Prompt: `"What is the main object in this image? Reply with one word only (e.g. Water)."`  
  - Cevabı al, `setCurrentWord('Water')` ile Ghost Hand'i güncelle.

---

## 🔴 GÜN 8: Ayna ve Ses (The Polish)
**Hedef:** Görsel ve işitsel geri bildirim eklemek.

- **10:00 - Dijital Ayna (Mirror):**  
  - Ghost Hand yanına ikinci el modeli ekle (Wireframe/Mavi).  
  - Kullanıcının el verilerini bağla → kendi iskelet elini görsün.

- **15:00 - TTS (Silent Voice):**  
  - `expo-speech` veya Android TTS kullan.  
  - Doğru işaret → `Speech.speak("Water")`.

---

## 🏁 GÜN 9: Son Kontroller ve Cila
**Hedef:** Hataları gidermek ve tüm kelimeleri test etmek.

- 15 kelimenin hepsini tek tek dene.  
- "Water" işaretinde sorun varsa Threshold'ı ayarla.  
- Işıklandırmayı ayarla (`<AmbientLight />`, `<SpotLight />`).  
- Uygulama ikonunu ve adını düzenle (`android/app/src/main/res/`).

---

## 🏁 GÜN 10: Video ve Teslimat
**Hedef:** Projeyi sunmak ve teslim etmek.

- **09:00 - Kayıt:**  
  - Odayı topla, ışığı aç.  
  - Meta Quest kayıt aracını kullanarak 16:9 video çek.  
  - Senaryo: Merhaba → Su şişesini tara → Suyu iç → Teşekkür et.

- **14:00 - Upload:**  
  - APK’yı `Release` modunda build et (`./gradlew assembleRelease`).  
  - Meta Dashboard’a yükle.  
  - Devpost sayfasına hikayeyi ("Engelsiz İletişim") yaz.

**Teknik İpucu:**  
3. gün rigging zor gelirse, kemik animasyonu yerine Morph Targets veya Nokta Birleştirme (Line Renderer) yöntemine geç. Önemli olan jüri için görsel sonuç, yöntem değil.
