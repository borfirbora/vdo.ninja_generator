import './globals.css'; // Global CSS dosyalarınız
import { ReduxProvider } from '@/redux/Provider'; // Oluşturduğunuz ReduxProvider'ı içe aktarın

export const metadata = {
    title: {
      default: 'Vdo.ninja Link Oluşturucu',
      template: '%s | Vdo.ninja Link Oluşturucu',
    },
    description: 'örnek açıklamam'
  }


export default function RootLayout({ children }) {


  return (
    <html lang="tr">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}