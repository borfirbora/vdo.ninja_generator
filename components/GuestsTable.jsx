import { deleteGuest } from "@/redux/linkReducer";
import { useDispatch, useSelector } from "react-redux"

// Daha önce oluşturduğumuz copyToClipboard fonksiyonunu burada kullanabiliriz
// Alternatif olarak, direkt onClick içinde de tutabilirsin (senin yaptığın gibi)
async function copyToClipboard(textToCopy) {
  try {
    await navigator.clipboard.writeText(textToCopy);
    return true;
  } catch (err) {
    console.error('Panoya kopyalama başarısız oldu:', err);
    return false;
  }
}

function GuestsTable() {
  const guests = useSelector((state) => state.links.guestLinks);
  const dispatch = useDispatch();

  // guests.length'e göre koşullu renderlama ekle
  if (guests.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        Henüz hiçbir katılımcı eklenmedi.
      </div>
    );
  }

  return (
    // Tablonun responsive olması ve gölge alması için kapsayıcı div
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full max-w-4xl mx-auto mt-8">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">SIRA</th>
            <th scope="col" className="py-3 px-6">İSİM</th>
            <th scope="col" className="py-3 px-6">KİMLİK</th>
            <th scope="col" className="py-3 px-6">BAĞLANTI</th>
            <th scope="col" className="py-3 px-6 sr-only">EYLEMLER</th> {/* sr-only burada daha doğru */}
          </tr>
        </thead>
        <tbody>
          {guests.map((g, i) => (
            <tr key={g.guestId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6">{i + 1}</td>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{g.guestName}</td>
              <td className="py-4 px-6">{g.guestId}</td>
              <td className="py-4 px-6 text-blue-600 underline truncate max-w-xs">
                <a 
                  href={g.guestLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={`${g.guestName} için katılım bağlantısı (yeni pencerede açılır)`}
                >

Göster                  
                </a>
              </td>
              <td className="py-4 px-6 text-right space-x-2"> {/* space-x-2 butonlar arası boşluk */}
                <button 
                  onClick={async () => {
                    const success = await copyToClipboard(g.guestLink);
                    if (success) {
                      alert(`${g.guestName} için katılım bağlantısı kopyalandı!`);
                    } else {
                      alert('Kopyalama başarısız oldu.');
                    }
                  }}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Kopyala
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`${g.guestName} adlı katılımcıyı silmek istediğinizden emin misiniz?`)) {
                      dispatch(deleteGuest(g.guestId));
                      alert(`${g.guestName} adlı katılımcı silindi.`);
                    }
                  }}
                  className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GuestsTable;