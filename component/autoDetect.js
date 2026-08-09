/**
 * autoDetect.js
 * Contoh integrasi React Native untuk memanggil backend deteksi otomatis
 * dan mengisi state titik-titik landmark yang SUDAH ADA di
 * FormCephalometricAnalysis.js (sella, nasion, pointA, dst).
 *
 * Cara pakai di dalam FormCephalometricAnalysis.js:
 *
 *   import { runAutoDetect } from './autoDetect';
 *   // `imageUri` di bawah ini SAMA dengan variabel yang sudah ada di komponen:
 *   // const imageUri = useSelector((state) => state.patientReducer.imageUri);
 *   ...
 *   <TouchableOpacity onPress={() => handleAutoDetect(imageUri)}>
 *     <Text>Deteksi Otomatis</Text>
 *   </TouchableOpacity>
 *
 *   const handleAutoDetect = async (imageUri) => {
 *     setLoading(true);
 *     try {
 *       const result = await runAutoDetect(imageUri, API_BASE_URL);
 *       applyDetectedPoints(result.points_canvas);
 *     } catch (err) {
 *       Alert.alert('Deteksi gagal', err.message);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *
 *   // Nama handler ini sudah dicocokkan PERSIS dengan FormCephalometricAnalysis.js
 *   // (dicek langsung dari source aslinya -- perhatikan set_pointa/set_pointb pakai huruf kecil)
 *   const applyDetectedPoints = (pointsCanvas) => {
 *     set_sella_handler(pointsCanvas.sella);
 *     set_nasion_handler(pointsCanvas.nasion);
 *     set_pointa_handler(pointsCanvas.pointA);   // <- huruf kecil "pointa", bukan "pointA"
 *     set_pointb_handler(pointsCanvas.pointB);   // <- huruf kecil "pointb", bukan "pointB"
 *     set_u6_handler(pointsCanvas.u6);
 *     set_u4_handler(pointsCanvas.u4);
 *     set_gonion_handler(pointsCanvas.gonion);
 *     set_gnathion_handler(pointsCanvas.gnathion);
 *     set_isa_handler(pointsCanvas.isa);
 *     set_isi_handler(pointsCanvas.isi);
 *     set_iia_handler(pointsCanvas.iia);
 *     set_iii_handler(pointsCanvas.iii);
 *     set_ms_handler(pointsCanvas.ms);
 *     set_pogs_handler(pointsCanvas.pogs);
 *     set_ls_handler(pointsCanvas.ls);
 *     set_li_handler(pointsCanvas.li);
 *     set_pog_handler(pointsCanvas.pog);
 *     set_ans_handler(pointsCanvas.ans);
 *     set_menton_handler(pointsCanvas.menton);
 *     // Setelah ini, titik-titik akan langsung muncul di kanvas ImageZoom
 *     // yang sudah ada, dan pengguna tinggal geser/koreksi manual seperti biasa.
 *   };
 */

/**
 * Upload gambar ke backend deteksi & kembalikan hasilnya.
 *
 * @param {string} imageUri - URI gambar lokal dari image picker (mis. hasil
 *                             launchImageLibrary / launchCamera)
 * @param {string} apiBaseUrl - contoh: 'http://192.168.1.10:8000' (IP komputer
 *                             yang menjalankan server Node.js, BUKAN 'localhost'
 *                             kalau diakses dari HP fisik -- lihat catatan di bawah)
 * @returns {Promise<{points: object, points_canvas: object, angles: object,
 *                     image_width: number, image_height: number,
 *                     overlay_image_base64: string}>}
 */
export async function runAutoDetect(imageUri, apiBaseUrl) {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    name: "xray.jpg",
    type: "image/jpeg",
  });

  const response = await fetch(`${apiBaseUrl}/predict`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Server error ${response.status}: ${text}`);
  }

  return response.json();
}
